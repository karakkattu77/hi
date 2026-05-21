import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  Zap, Droplets, Flame, AlertTriangle, X, ChevronDown, 
  ArrowRight, Landmark, Building2, Cpu, ExternalLink, Heart, Mail, Phone, FileText, Megaphone, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DATACENTERS, STATS, NATIONWIDE_ACTIONS, NATIONWIDE_CATEGORIES,
  type DatacenterProject, type DatacenterAction, type NationwideCategory 
} from "@/data/datacenters";

const GOLD = "#c9a227";
const FEATURED_GOLD = "#d4af37";
const FOREST = "#101910";
const ACTIONS_URL = "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f";
const DONATE_URL = "https://app.chilli.club/memberships/51f003f6-1506-4275-8dc9-c73119e84cc7/flow";

const FT_STATUS_COLORS: Record<string, string> = {
  "Operating": "#e05a5a",
  "Proposed": "#e08c2a",
  "Blocked": "#4caf7d",
  "Site Fight": "#5ab4e0",
};

interface FtMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  operator?: string;
  city?: string;
  state?: string;
  mwLow?: number;
  mwHigh?: number;
  resistanceStatus?: string;
  petitionUrl?: string;
  communityUrl?: string;
}

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1JJ6kcVo-NjlAYtznwHOki2DVl4WWV6lhy-eXhFCdKKU/export?format=csv&gid=386766486";

async function fetchSheetMarkers(): Promise<FtMarker[]> {
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csvText = await response.text();

    const { data } = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return data
      .map((row, i) => {
        const lat = parseFloat(row.lat);
        const lng = parseFloat(row.long);
        if (isNaN(lat) || isNaN(lng)) return null;
        return {
          id: `sheet-${i}`,
          name: row.facility_name || "Data Center",
          lat,
          lng,
          status: row.status || "Unknown",
          operator: row.operator_name,
          city: row.city,
          state: row.state,
          mwLow: row.mw ? parseFloat(row.mw) : undefined,
          resistanceStatus: row.resistance_status,
          petitionUrl: row.petition_url,
          communityUrl: row.community_group_website_1,
        } as FtMarker;
      })
      .filter(Boolean) as FtMarker[];
  } catch (e) {
    console.error("Error fetching sheet data:", e);
    return [];
  }
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

function createMarkerIcon(isActive: boolean) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="featured-marker ${isActive ? 'active' : ''}" style="
      width: ${isActive ? '24px' : '20px'};
      height: ${isActive ? '24px' : '20px'};
      background: ${FEATURED_GOLD};
      border: 2px solid ${FOREST};
      border-radius: 50%;
      box-shadow: 0 0 ${isActive ? '12px' : '6px'} ${FEATURED_GOLD}88;
      transition: all 0.3s ease;
      animation: marker-pulse 3s infinite ease-in-out;
    "></div>
    <style>
      @keyframes marker-pulse {
        0% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 6px ${FEATURED_GOLD}88; }
        50% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 12px ${FEATURED_GOLD}aa; }
        100% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 6px ${FEATURED_GOLD}88; }
      }
    </style>`,
    iconSize: [isActive ? 24 : 20, isActive ? 24 : 20],
    iconAnchor: [isActive ? 12 : 10, isActive ? 12 : 10],
  });
}

function createFtIcon(status: string) {
  const color = FT_STATUS_COLORS[status] || "#94a3b8";
  return L.divIcon({
    className: 'ft-dot',
    html: `<div style="width:8px;height:8px;background:${color};border-radius:50%;"></div>`,
    iconSize: [8, 8],
    iconAnchor: [4, 4],
  });
}

function ActionTypeIcon({ type }: { type: DatacenterAction["type"] }) {
  const icons: Record<string, any> = {
    email: Mail,
    call: Phone,
    petition: FileText,
    social: Megaphone,
    comment: AlertTriangle,
  };
  const Icon = icons[type] || ArrowRight;
  return <Icon className="w-4 h-4" />;
}

function ActionTypeLabel({ type }: { type: DatacenterAction["type"] }) {
  const labels: Record<string, string> = {
    email: "Email Action",
    call: "Call Action",
    petition: "Sign Petition",
    social: "Social Media",
    comment: "Public Comment",
  };
  return <span>{labels[type] || "Take Action"}</span>;
}

function StatusBadge({ status }: { status: DatacenterProject["status"] }) {
  const config: Record<string, { label: string; color: string }> = {
    "proposed": { label: "Proposed", color: "bg-amber-900/30 text-amber-400 border-amber-700/40" },
    "approved": { label: "Approved", color: "bg-orange-900/30 text-orange-400 border-orange-700/40" },
    "under-construction": { label: "Under Construction", color: "bg-red-900/30 text-red-400 border-red-700/40" },
    "operational": { label: "Operational", color: "bg-red-950/50 text-red-300 border-red-800/40" },
  };
  const { label, color } = config[status];
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${color}`}>{label}</span>
  );
}

function ProjectPanel({ project, onClose }: { project: DatacenterProject; onClose: () => void }) {
  return (
    <div 
      className="absolute top-0 right-0 h-full w-full max-w-[420px] overflow-y-auto z-[1000] flex flex-col" 
      style={{ background: FOREST, borderLeft: "1px solid rgba(201,162,39,0.15)", boxShadow: "-8px 0 40px rgba(0,0,0,0.9)" }}
      data-testid="panel-project"
    >
      <div className="sticky top-0 z-10 border-b p-4 flex items-start justify-between gap-3" style={{ background: FOREST, borderColor: "rgba(201,162,39,0.15)" }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StatusBadge status={project.status} />
            <span className="text-xs text-muted-foreground font-mono">{project.state}</span>
          </div>
          <h2 className="text-lg font-bold leading-tight" style={{ color: "#e8dbb5", fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }} data-testid="text-project-name">
            {project.name}
          </h2>
          <p className="text-sm text-muted-foreground">{project.company} · {project.location}</p>
        </div>
        <button 
          onClick={onClose}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover-elevate"
          data-testid="button-close-panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 p-4 space-y-5">
        <p className="text-sm text-foreground/80 leading-relaxed">{project.description}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Zap, color: "#c9a227", label: "MW Power", value: project.power_mw.toLocaleString() },
            { icon: Droplets, color: "#60a5fa", label: "Gal/Day", value: `${(project.water_gallons_per_day / 1_000_000).toFixed(1)}M` },
            { icon: Flame, color: "#fb923c", label: "Energy", value: project.energy_source.split("(")[0].trim() },
          ].map(({ icon: Icon, color, label, value }) => (
            <div key={label} className="rounded-md p-3 text-center border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
              <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
              <div className="text-sm font-bold text-foreground leading-tight">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: GOLD }}>Key Concerns</h3>
          <ul className="space-y-1.5">
            {project.concerns.map((concern, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                {concern}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: GOLD }}>
            Take Action Against This Project
          </h3>
          <div className="space-y-3">
            {project.actions.map((action) => (
              <a 
                key={action.id} 
                href={action.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block rounded-md p-3.5 hover-elevate group"
                style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.2)" }}
                data-testid={`action-link-${action.id}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2" style={{ color: GOLD }}>
                    <ActionTypeIcon type={action.type} />
                    <span className="text-xs font-mono uppercase tracking-wide"><ActionTypeLabel type={action.type} /></span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{action.title}</h4>
                <div className="text-xs text-muted-foreground leading-relaxed">{action.description}</div>
                <div className="mt-2 text-xs text-muted-foreground">Target: {action.target}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="pt-2 border-t border-white/8">
          <p className="text-xs text-muted-foreground">
            Actions powered by{" "}
            <a href="https://app.chilli.club" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }} className="underline">Chilli Club</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

const CATEGORY_ICONS: Record<NationwideCategory, typeof Landmark> = {
  federal: Landmark,
  banks: Building2,
  bigtech: Cpu,
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<DatacenterProject | null>(null);
  const [ftMarkers, setFtMarkers] = useState<FtMarker[]>([]);
  const [isFtLoading, setIsFtLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchSheetMarkers().then(markers => {
      if (mounted) {
        setFtMarkers(markers);
        setIsFtLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const [mapCenter, setMapCenter] = useState<[number, number]>([39.5, -98.35]);
  const [mapZoom, setMapZoom] = useState(4);
  const [activeCategory, setActiveCategory] = useState<NationwideCategory>("federal");
  
  const federalRef = useRef<HTMLDivElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMarkerClick = (project: DatacenterProject) => {
    setSelectedProject(project);
    setMapCenter([project.lat, project.lng]);
    setMapZoom(9);
  };

  const handleClosePanel = () => {
    setSelectedProject(null);
    setMapCenter([39.5, -98.35]);
    setMapZoom(4);
  };

  const filteredActions = NATIONWIDE_ACTIONS.filter((a) => a.category === activeCategory);
  const activeCtg = NATIONWIDE_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen text-foreground" style={{ background: "hsl(120,22%,8%)" }}>
      <Navbar 
        links={[
          { label: "Nationwide Actions", action: () => scrollTo(federalRef) },
          { label: "Resource Hub", href: "/resource-hub" },
          { label: "Declaration", href: "/declaration" },
          { label: "Join Today", href: "/newsletter" },
        ]} 
        onActNow={() => scrollTo(federalRef)} 
      />

      {/* Hero — stripped editorial masthead with stronger painterly green bg */}
      <section className="relative min-h-[92vh] flex flex-col px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Painterly green background — layered gradients */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `radial-gradient(ellipse 70% 50% at 18% 28%, hsla(95, 30%, 24%, 0.85) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 85% 22%, hsla(75, 28%, 20%, 0.7) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 60% 95%, hsla(110, 35%, 10%, 0.95) 0%, transparent 65%), linear-gradient(170deg, hsla(110, 28%, 10%, 0.6) 0%, hsla(100, 30%, 6%, 0.98) 100%)` 
          }} 
        />

        {/* Globe — bigger, positioned bottom-right for asymmetric framing */}
        <img 
          src="/globe-bg.png" 
          alt="" 
          className="absolute pointer-events-none" 
          style={{ 
            width: "75%", 
            maxWidth: "1200px",
            bottom: "-22%",
            right: "-8%",
            opacity: 0.7,
            filter: "saturate(0.9) brightness(0.95) contrast(1.05)",
            mixBlendMode: "screen"
          }} 
        />

        {/* Painterly grain overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.16, mixBlendMode: "overlay" }} xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-grain"><feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"/></filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)"/>
        </svg>

        {/* Top eyebrow — campaign label only, left aligned */}
        <div className="relative z-10 pt-10 pb-6">
          <div className="font-mono text-[10px] uppercase inline-flex items-center gap-3" style={{ color: GOLD, letterSpacing: "0.32em" }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: GOLD, opacity: 0.55 }} />
            Stop Big Data — A National Campaign
          </div>
        </div>

        {/* Main composition — headline left, subhead+CTA boxes right */}
        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-10 lg:gap-x-16 items-end py-10 lg:py-14">
          <div className="md:col-span-8">
            <h1 
              className="text-[60px] sm:text-[88px] lg:text-[132px] xl:text-[148px] leading-[0.92] tracking-[-0.035em]" 
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", color: "#f0e8d0", fontWeight: 500 }}
            >
              Is <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 500 }}>Big Data</em><br />
              coming to your<br />
              <em style={{ fontStyle: "italic", fontWeight: 500 }}>backyard?</em>
            </h1>
          </div>

          <div className="md:col-span-4 max-w-sm">
            <p className="text-[15px] sm:text-base leading-[1.7] mb-7" style={{ color: "rgba(232,219,181,0.85)" }}>
              Big Tech is building hundreds of AI data centers — powered by fossil fuels, draining water supplies, and displacing communities. All without your consent.{" "}
              <strong style={{ color: "#f0e8d0", fontWeight: 500 }}>Together, we can stop it.</strong>
            </p>

            {/* Two equal CTA boxes — stacked */}
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => scrollTo(mapSectionRef)}
                className="text-left p-5 transition-all hover:opacity-90 group" 
                style={{ background: GOLD, color: FOREST, borderRadius: "2px" }}
                data-testid="button-hero-map"
              >
                <div className="font-mono text-[10px] uppercase mb-2 opacity-70" style={{ letterSpacing: "0.24em" }}>
                  01 · Local
                </div>
                <div className="text-[18px] flex items-center justify-between gap-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Find Projects Near You
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
              <button 
                onClick={() => scrollTo(federalRef)}
                className="text-left p-5 transition-all hover:bg-white/[0.03] border group" 
                style={{ background: "transparent", color: "#f0e8d0", borderColor: "rgba(201,162,39,0.45)", borderRadius: "2px" }}
                data-testid="button-hero-federal"
              >
                <div className="font-mono text-[10px] uppercase mb-2" style={{ letterSpacing: "0.24em", color: GOLD, opacity: 0.75 }}>
                  02 · National
                </div>
                <div className="text-[18px] flex items-center justify-between gap-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Take Nationwide Action
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal scroll cue at bottom */}
        <button 
          onClick={() => scrollTo(mapSectionRef)}
          className="relative z-10 self-start font-mono text-[10px] uppercase inline-flex items-center gap-2 pb-8 transition-opacity hover:opacity-100" 
          style={{ color: "rgba(232,219,181,0.5)", letterSpacing: "0.28em" }}
          data-testid="button-scroll-down"
        >
          Scroll
          <ChevronDown className="w-3 h-3" />
        </button>
      </section>

      {/* By The Numbers — editorial stats spread with video bg */}
      <section className="relative py-20 sm:py-24 px-4 border-y overflow-hidden" style={{ borderColor: "rgba(201,162,39,0.18)" }}>
        {/* Background video — Power Shift Project cover */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.28, filter: "saturate(0.7) contrast(1.05)" }}
          aria-hidden="true"
        >
          <source src="/cover-photo-ig.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay so editorial text + numbers stay readable */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(7,14,7,0.92) 0%, rgba(7,14,7,0.78) 35%, rgba(7,14,7,0.85) 70%, rgba(7,14,7,0.94) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section header — eyebrow + headline + supporting sentence on the right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-10 mb-14 sm:mb-16 pb-10 sm:pb-12" style={{ borderBottom: "1px solid rgba(201,162,39,0.18)" }}>
            <div className="md:col-span-7">
              <div className="font-mono text-[11px] uppercase mb-4 inline-flex items-center gap-3" style={{ color: GOLD, opacity: 0.85, letterSpacing: "0.32em" }}>
                <span style={{ display: "inline-block", width: 24, height: 1, background: GOLD, opacity: 0.55 }} />
                By The Numbers
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.04]" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", color: "#f0e8d0", fontWeight: 500 }}>
                The <em style={{ color: GOLD, fontStyle: "italic", fontWeight: 400 }}>cost</em> of inaction.
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-3">
              <p className="text-base sm:text-lg leading-[1.65]" style={{ color: "rgba(232,219,181,0.72)" }}>
                Big Tech's AI buildout is the largest fossil-fueled infrastructure project of the decade. Here is what is at stake.
              </p>
            </div>
          </div>

          {/* Stats — 3-column editorial grid with vertical rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-10 lg:gap-x-14">
            {STATS.map((stat, i) => {
              const showLeftRule = (i % 3 !== 0);
              return (
                <div 
                  key={i} 
                  className={showLeftRule ? "sm:pl-10 sm:border-l" : ""}
                  style={showLeftRule ? { borderColor: "rgba(201,162,39,0.18)" } : {}}
                  data-testid={`stat-item-${i}`}
                >
                  <div className="text-[72px] sm:text-[88px] lg:text-[104px] leading-[0.95] mb-4 tracking-[-0.035em]" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif", color: GOLD, fontWeight: 500 }}>
                    {stat.value}
                  </div>
                  <div className="text-[15px] sm:text-base leading-[1.55] max-w-[26ch]" style={{ color: "rgba(232,219,181,0.78)" }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapSectionRef} id="map" className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: GOLD }}>Interactive Map</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              AI Data Center Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Click any gold marker to see details about the project and take targeted digital actions to fight it.
            </p>
          </div>

          <div className="relative rounded-md overflow-hidden border" style={{ height: "65vh", minHeight: "400px", borderColor: "rgba(201,162,39,0.2)" }}>
            <MapContainer 
              center={[39.5, -98.35]} 
              zoom={4} 
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains="abcd"
                maxZoom={20}
              />
              <MapController center={mapCenter} zoom={mapZoom} />

              {/* FT Live Data Markers */}
              {ftMarkers.map((m) => (
                <Marker 
                  key={m.id} 
                  position={[m.lat, m.lng]} 
                  icon={createFtIcon(m.status)}
                >
                  <Popup>
                    <div className="min-w-[180px] space-y-2">
                      <div>
                        <div className="font-bold text-sm leading-tight">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.operator || "Unknown Operator"}</div>
                        <div className="text-xs text-muted-foreground">{m.city}, {m.state}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded" 
                          style={{ background: `${FT_STATUS_COLORS[m.status]}22`, color: FT_STATUS_COLORS[m.status], border: `1px solid ${FT_STATUS_COLORS[m.status]}44` }}
                        >
                          {m.status}
                        </span>
                        {(m.mwLow || m.mwHigh) && (
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {m.mwLow && m.mwHigh ? `${m.mwLow}-${m.mwHigh}MW` : `${m.mwLow || m.mwHigh}MW`}
                          </span>
                        )}
                      </div>
                      {m.resistanceStatus && (
                        <div className="text-[10px] text-emerald-400 italic">
                          {m.resistanceStatus}
                        </div>
                      )}
                      <div className="pt-1 flex flex-col gap-1.5">
                        <a 
                          href={ACTIONS_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block text-center text-[10px] font-bold py-1 rounded transition-opacity hover:opacity-80"
                          style={{ background: GOLD, color: FOREST }}
                        >
                          Take Action →
                        </a>
                        {m.petitionUrl && (
                          <a href={m.petitionUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-amber-400 underline hover:text-amber-300">
                            Local Petition →
                          </a>
                        )}
                        {m.communityUrl && (
                          <a href={m.communityUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 underline hover:text-blue-300">
                            Community Group →
                          </a>
                        )}
                      </div>
                      <div className="text-[9px] text-muted-foreground pt-1 border-t border-white/10">
                        Source: FracTracker Alliance
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Our curated featured project markers */}
              {DATACENTERS.map((dc) => (
                <Marker 
                  key={dc.id} 
                  position={[dc.lat, dc.lng]} 
                  icon={createMarkerIcon(selectedProject?.id === dc.id)}
                  eventHandlers={{ click: () => handleMarkerClick(dc) }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <div className="font-bold text-sm mb-0.5" style={{ color: "#e8dbb5" }}>{dc.name}</div>
                      <div className="text-xs mb-2" style={{ color: "#888" }}>{dc.company} · {dc.location}</div>
                      <div className="mb-3"><StatusBadge status={dc.status} /></div>
                      <a 
                        href={ACTIONS_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full text-center text-xs rounded px-3 py-1.5 font-semibold"
                        style={{ background: GOLD, color: FOREST }}
                        data-testid={`button-popup-actions-${dc.id}`}
                      >
                        See Actions →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {selectedProject && <ProjectPanel project={selectedProject} onClose={handleClosePanel} />}

            {/* Loading Overlay */}
            {isFtLoading && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-xs font-medium text-white">Loading live data center map…</span>
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse ml-1" />
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-[500] rounded-md px-3 py-2.5 text-[10px] space-y-1.5 border" style={{ background: "rgba(7,14,7,0.9)", borderColor: "rgba(201,162,39,0.2)" }}>
              <div className="font-mono uppercase tracking-widest mb-2" style={{ color: "rgba(201,162,39,0.6)" }}>Legend</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full inline-block flex-shrink-0" style={{ background: FEATURED_GOLD, border: `1.5px solid ${FEATURED_GOLD}`, boxShadow: `0 0 8px ${FEATURED_GOLD}88` }} />
                <span style={{ color: "rgba(232,219,181,0.8)" }}>Featured project (click for actions)</span>
              </div>
              {Object.entries(FT_STATUS_COLORS).map(([label, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ background: color }} />
                  <span style={{ color: "rgba(232,219,181,0.6)" }}>FracTracker: {label}</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-white/10 text-[9px] text-muted-foreground opacity-60">
                {isFtLoading ? "Fetching markers..." : `${ftMarkers.length.toLocaleString()} live sites loaded`}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground/60 italic">
              Data sourced from public permit filings, investigative reporting, and <a href="https://ft.maps.arcgis.com/apps/instant/sidebar/index.html?appid=fdb7678fb2e345eb8b0a3a49971240c4" target="_blank" rel="noopener noreferrer" className="underline hover:text-muted-foreground/80 transition-colors">FracTracker data center tracker</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Nationwide Actions */}
      <section ref={federalRef} id="nationwide-actions" className="py-20 px-4 bg-black/20 border-t" style={{ borderColor: "rgba(201,162,39,0.15)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: GOLD }}>National Campaign</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Demand Federal Oversight
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Data centers currently operate in a regulatory vacuum. Join thousands of Americans demanding transparency, water protections, and clean energy standards from our leaders.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {NATIONWIDE_CATEGORIES.map((ctg) => {
              const Icon = CATEGORY_ICONS[ctg.id];
              return (
                <button 
                  key={ctg.id} 
                  onClick={() => setActiveCategory(ctg.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all border"
                  style={{ 
                    background: activeCategory === ctg.id ? "rgba(201,162,39,0.12)" : "transparent",
                    borderColor: activeCategory === ctg.id ? GOLD : "rgba(201,162,39,0.25)",
                    color: activeCategory === ctg.id ? GOLD : "rgba(232,219,181,0.5)",
                  }}
                  data-testid={`category-tab-${ctg.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {ctg.label}
                </button>
              );
            })}
          </div>

          {/* Active category description */}
          <div className="mb-6 p-4 rounded-md border" style={{ background: "rgba(201,162,39,0.06)", borderColor: "rgba(201,162,39,0.2)" }}>
            <div className="flex items-start gap-3">
              {(() => {
                const Icon = CATEGORY_ICONS[activeCategory];
                return <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: GOLD }} />;
              })()}
              <p className="text-sm text-muted-foreground leading-relaxed">{activeCtg.description}</p>
            </div>
          </div>

          {/* Action cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActions.map((action) => (
              <a 
                key={action.id} 
                href={action.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block rounded-md p-5 hover-elevate group"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(201,162,39,0.15)" }}
                data-testid={`nationwide-action-${action.id}`}
              >
                <div className="flex items-center gap-2 mb-3" style={{ color: GOLD }}>
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.25)" }}>
                    <ActionTypeIcon type={action.type} />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wide"><ActionTypeLabel type={action.type} /></span>
                </div>
                <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: "#e8dbb5" }}>{action.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{action.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{action.target}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-amber-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", color: "#e8dbb5" }}>
            Every Action Counts. <br /> <em style={{ color: GOLD }}>Start Now.</em>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Governments and corporations respond to organized pressure. Your email, your signature, your call can be the difference between a new gas plant and a community-powered future. Every action you take here goes directly to the decision-makers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8" style={{ background: GOLD, color: FOREST }} onClick={() => scrollTo(mapSectionRef)} data-testid="button-cta-map">
              Find Your Local Project <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-amber-800/40 text-foreground" onClick={() => scrollTo(federalRef)} data-testid="button-cta-nationwide">
              Nationwide Actions
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black/40 border-t" style={{ borderColor: "rgba(201,162,39,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
            {/* Left: Brand */}
            <div>
              <a href="/" className="flex items-center gap-2 mb-4" data-testid="footer-logo">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: GOLD }}>
                  <X className="w-5 h-5" style={{ color: FOREST }} strokeWidth={3} />
                </div>
                <span className="font-bold text-xl tracking-tight" style={{ color: "#e8dbb5" }}>
                  STOP<span style={{ color: GOLD }}>BIG</span>DATA
                </span>
              </a>
              <p className="text-muted-foreground leading-relaxed max-w-xs text-sm">
                We are a non-partisan coalition of researchers, community organizers, and energy experts fighting for a clean, transparent, and community-led AI future.
              </p>
            </div>
            {/* Middle: Navigation */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest mb-6" style={{ color: GOLD }}>Navigation</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="/resource-hub" className="hover:text-foreground transition-colors">Resource Hub</a></li>
                <li><a href="/declaration" className="hover:text-foreground transition-colors">The Declaration</a></li>
                <li><a href="/newsletter" className="hover:text-foreground transition-colors">Join Today</a></li>
              </ul>
            </div>
            {/* Right: Take Action */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest mb-6" style={{ color: GOLD }}>Take Action</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><button onClick={() => { setActiveCategory("federal"); scrollTo(federalRef); }} className="hover:text-foreground transition-colors text-left">Federal Actions</button></li>
                <li><button onClick={() => { setActiveCategory("banks"); scrollTo(federalRef); }} className="hover:text-foreground transition-colors text-left">Banks & Insurance Actions</button></li>
                <li><button onClick={() => { setActiveCategory("bigtech"); scrollTo(federalRef); }} className="hover:text-foreground transition-colors text-left">Big Tech Actions</button></li>
                <li>
                  <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold transition-colors" style={{ color: GOLD }} data-testid="link-footer-donate">
                    <Heart className="w-3 h-3" /> Donate to the Campaign
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-wrap items-center justify-between gap-3" style={{ borderColor: "rgba(201,162,39,0.1)" }}>
            <p className="text-xs text-muted-foreground">
              © 2026 Stop Big Data Campaign. Campaign actions powered by{" "}
              <a href="https://app.chilli.club" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Chilli Club</a>. 
              Data from public filings, FT research, and investigative reporting.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
