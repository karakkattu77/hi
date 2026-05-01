import Navbar from "@/components/Navbar";
import { Flame, Droplets, Zap, Eye, TreePine, ArrowRight, ExternalLink } from "lucide-react";
const GOLD = "#c9a227";
const FOREST = "#101910";
const ACTIONS_URL = "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f?utm_source=christian_vanizette_97&utm_medium=copy&utm_campaign=cause-3c29d439-dcc8-4f00-ac9f-5dbac975836f";
const IMPACT_AREAS = [
  {
    id: "climate",
    label: "Climate",
    emphasis: "Change",
    icon: Flame,
    url: "/impact/climate-change",
    bg: "rgba(60,20,10,0.6)",
    accent: "#e05c30",
    stat: "44M tons CO₂ by 2030",
    image: "/impact-climate.jpg",
  },
  {
    id: "water",
    label: "Water",
    emphasis: "Use",
    icon: Droplets,
    url: "/impact/water-use",
    bg: "rgba(10,30,60,0.6)",
    accent: "#4a90d9",
    stat: "1 trillion liters by 2027",
    image: "/impact-water.jpg",
  },
  {
    id: "electricity",
    label: "Electricity &",
    emphasis: "Affordability",
    icon: Zap,
    url: "/impact/electricity-affordability",
    bg: "rgba(40,35,5,0.6)",
    accent: "#d4a017",
    stat: "267% energy cost increase",
    image: "/impact-electricity-v2.jpg",
  },
  {
    id: "surveillance",
    label: "Surveillance &",
    emphasis: "Power",
    icon: Eye,
    url: "/impact/surveillance-power",
    bg: "rgba(20,20,40,0.6)",
    accent: "#9b6dc5",
    stat: "Zero federal oversight",
    image: "/impact-surveillance.jpg",
  },
  {
    id: "envjustice",
    label: "Environmental",
    emphasis: "Justice",
    icon: TreePine,
    url: "/impact/environmental-justice",
    bg: "rgba(10,40,20,0.6)",
    accent: "#4caf6e",
    stat: "Clustered near marginalized communities",
    image: "/impact-justice.jpg",
  },
];
const BIG_PICTURE_STATS = [
  { value: "3000+", label: "Data Centers", sublabel: "in the U.S." },
  { value: "1000+", label: "AI-Data Centers", sublabel: null },
  { value: "4x", label: "than in 2010", sublabel: "which is still growing and hard to track" },
];
const PROBLEM_BULLETS = [
  "AI data centers are the physical backbone of artificial intelligence",
  "Their growth is being driven by Big Tech and financial actors, with limited oversight.",
  "Environmental, social, and democratic costs are being externalized onto communities.",
];
const ACTORS_BULLETS = [
  "Primary operators: Amazon, Microsoft, Google, Meta, QTS (Blackstone-owned)",
  "Secondary actors: NVIDIA, Dominion Energy, Oracle",
  "Many facilities are operated through LLCs to dilute tracking and reduce scrutiny",
];
const WHY_NOW_BULLETS = [
  "Infrastructure decisions locking in long-term environmental harm",
  "No central registry, regulator, or public map of U.S. data centers",
];
export default function ResourceHub() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(120,22%,8%)", color: "hsl(40,28%,90%)" }}>
      <Navbar
        links={[
          { label: "Nationwide Actions", href: "/#nationwide-actions" },
          { label: "Resource Hub", href: "/resource-hub" },
          { label: "Declaration", href: "/declaration" },
          { label: "Join Today", href: "/newsletter" },
        ]}
      />
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "52vh" }}>
        <div className="absolute inset-0">
          <img
            src="/resource-hub-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35) saturate(0.6) grayscale(0.2)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,14,7,0.85) 0%, rgba(7,14,7,0.4) 60%, rgba(7,14,7,0.7) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <h1 className="font-serif text-7xl md:text-9xl font-bold leading-none tracking-tight" style={{ color: "#e8dbb5" }}>Resource</h1>
            <h1 className="font-serif text-7xl md:text-9xl font-bold italic leading-none tracking-tight" style={{ color: "#e8dbb5" }}>Hub</h1>
          </div>
          <div className="md:self-end md:max-w-xs rounded-xl p-5 text-sm leading-relaxed" style={{ background: "rgba(14,30,14,0.88)", border: "1px solid rgba(201,162,39,0.2)", color: "hsl(40,28%,85%)" }}>
            A living resource hub on Big Data, and the environmental and social costs of AI infrastructure.
          </div>
        </div>
      </section>
      {/* CORE IMPACT AREAS */}
      <section className="py-14 px-4" style={{ background: "hsl(120,22%,8%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2" style={{ color: "#e8dbb5" }}>Core Impact Areas</h2>
            <div className="h-0.5 w-24" style={{ background: GOLD }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {IMPACT_AREAS.slice(0, 3).map((area) => <ImpactCard key={area.id} area={area} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl mx-auto">
            {IMPACT_AREAS.slice(3).map((area) => <ImpactCard key={area.id} area={area} />)}
          </div>
        </div>
      </section>
      {/* THE BIG PICTURE */}
      <section className="py-14 px-4" style={{ background: "hsl(120,18%,10%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(40,28%,92%)", color: "#1a2a1a" }}>
            <div className="grid md:grid-cols-5">
              {/* Left: stats */}
              <div className="md:col-span-2 p-8 flex flex-col justify-between" style={{ background: "hsl(40,28%,88%)" }}>
                <div>
                  <h2 className="font-serif text-5xl font-bold leading-tight mb-1" style={{ color: "#1a2a1a" }}>The</h2>
                  <h2 className="font-serif text-5xl font-bold italic leading-tight" style={{ color: "#1a2a1a" }}>
                    <span style={{ textDecoration: "underline", textDecorationColor: GOLD, textUnderlineOffset: "4px", textDecorationThickness: "3px" }}>Big</span>
                  </h2>
                  <h2 className="font-serif text-5xl font-bold leading-tight mb-8" style={{ color: "#1a2a1a" }}>Picture</h2>
                  <div className="space-y-5">
                    {BIG_PICTURE_STATS.map((stat, i) => (
                      <div key={i}>
                        <div className="text-xl font-black uppercase tracking-tight leading-none" style={{ color: "#1a2a1a" }}>
                          {stat.value} {stat.label}
                        </div>
                        {stat.sublabel && <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color: "#5a6a5a" }}>{stat.sublabel}</div>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-4 hover:opacity-90" style={{ background: "#1a2a1a", color: "#e8dbb5" }}>
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(201,162,39,0.2)" }}>
                      <ArrowRight className="w-5 h-5" style={{ color: GOLD }} />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest" style={{ color: GOLD }}>Take Action Now</div>
                      <div className="text-xs opacity-60 mt-0.5">Join the campaign</div>
                    </div>
                  </a>
                </div>
              </div>
              {/* Right: content */}
              <div className="md:col-span-3 p-8 space-y-7">
                <div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "#1a2a1a" }}>What Is the Problem?</h3>
                  <ul className="space-y-1.5">
                    {PROBLEM_BULLETS.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: "#3a4a3a" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "#1a2a1a" }}>
                    Big Tech, Big Oil, Big Finance = <span style={{ textDecoration: "underline", textDecorationColor: GOLD, textUnderlineOffset: "3px" }}>Big Data</span>
                  </h3>
                  <ul className="space-y-1.5">
                    {ACTORS_BULLETS.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: "#3a4a3a" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#1a2a1a" }}>Why This Matters Now</h3>
                  <p className="text-sm mb-2" style={{ color: "#3a4a3a" }}>
                    The AI boom is <span style={{ textDecoration: "underline", textDecorationColor: GOLD, textUnderlineOffset: "3px" }}>outpacing regulation</span>
                  </p>
                  <ul className="space-y-1.5">
                    {WHY_NOW_BULLETS.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: "#3a4a3a" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90" style={{ background: GOLD, color: FOREST }}>
                    Take Action Now
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* UTILITY BANNER */}
      <section className="py-12 px-4" style={{ background: "hsl(120,22%,8%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="p-10 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative" style={{ background: "linear-gradient(135deg, rgba(201,162,39,0.05) 0%, rgba(7,14,7,0.4) 100%)", borderColor: "rgba(201,162,39,0.2)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="flex-1 relative z-10 text-center lg:text-left">
              <div className="text-[10px] font-mono uppercase tracking-[0.4em] mb-3" style={{ color: GOLD }}>Knowledge is Power</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#e8dbb5" }}>
                Is your utility part of <br />the problem?
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">
                Check your nearest data center, look up your state energy office, and track upcoming energy elections that determine your rates.
              </p>
            </div>
            <a
              href="/check-utility"
              className="shrink-0 px-8 py-5 text-base font-bold flex items-center gap-3 relative z-10 transition-transform hover:scale-105 rounded-xl"
              style={{ background: GOLD, color: FOREST }}
              data-testid="button-check-utility"
            >
              Check Your Utility <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t py-8 px-4 text-xs text-muted-foreground" style={{ borderColor: "rgba(201,162,39,0.15)" }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p>Campaign actions powered by <a href="https://app.chilli.club" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Chilli Club</a>. Data from public filings, FT research, and investigative reporting.</p>
        </div>
      </footer>
    </div>
  );
}
function ImpactCard({ area }: { area: typeof IMPACT_AREAS[0] }) {
  return (
    <a href={area.url} className="group flex items-center gap-5 rounded-2xl overflow-hidden p-4 transition-all hover:scale-[1.015]" style={{ background: "hsl(120,16%,11%)", border: "1px solid rgba(201,162,39,0.1)" }}>
      <div className="relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden">
        <img src={area.image} alt={`${area.label} ${area.emphasis}`} className="w-full h-full object-cover" style={{ filter: "grayscale(40%) brightness(0.75) saturate(0.6)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${area.accent}33 0%, rgba(10,20,10,0.4) 100%)` }} />
      </div>
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="font-black uppercase tracking-wider leading-tight text-sm" style={{ color: "hsl(40,28%,90%)", fontFamily: "'Playfair Display', serif" }}>
          {area.label} <em>{area.emphasis}</em>
        </div>
        <div className="text-xs leading-snug line-clamp-1" style={{ color: `${area.accent}dd` }}>{area.stat}</div>
        <div className="text-xs flex items-center gap-1 font-semibold mt-0.5" style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "2px" }}>
          read more <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}
