import Navbar from "@/components/Navbar";
import { ExternalLink, Map, Zap, Building2 } from "lucide-react";
const GOLD = "#c9a227";
const NAV_LINKS = [
  { label: "Nationwide Actions", href: "/#nationwide-actions" },
  { label: "Resource Hub", href: "/resource-hub" },
  { label: "Declaration", href: "/declaration" },
  { label: "Join Today", href: "/newsletter" },
];
const CHECK_CARDS = [
  {
    icon: Map,
    title: "Check Your Nearest Data Center",
    description: "Explore the leading global data center database to find facilities near you.",
    source: "datacentermap.com",
    url: "https://www.datacentermap.com/",
    accent: "#4a90d9",
  },
  {
    icon: Zap,
    title: "Is Your Utility Part of the Problem?",
    description: "They promised you clean energy — but there's a dirty truth behind your rising utility bills.",
    source: "Sierra Club",
    url: "https://www.sierraclub.org/coal/dirty-truth#utility",
    accent: "#e05c30",
  },
  {
    icon: Building2,
    title: "Check Your State Energy Office",
    description: "Find your state energy office and learn who's overseeing energy decisions in your community.",
    source: "naseo.org",
    url: "https://www.naseo.org/",
    accent: "#4caf6e",
  },
];
const ELECTIONS = [
  { state: "Arizona", abbr: "AZ", label: "SRP elections in Arizona", color: "#c9622a", ring: "#8b2e00" },
  { state: "Alabama", abbr: "AL", label: "PSC elections in Alabama", color: "#c9a227", ring: "#7a5e00" },
  { state: "Georgia", abbr: "GA", label: "PSC elections in Georgia", color: "#4a7c59", ring: "#1a3d28" },
];
export default function CheckUtility() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(120,22%,8%)", color: "hsl(40,28%,90%)" }}>
      <Navbar links={NAV_LINKS} />
      {/* HERO */}
      <section className="py-16 px-4 border-b" style={{ borderColor: "rgba(201,162,39,0.1)" }}>
        <div className="max-w-5xl mx-auto">
          <a href="/resource-hub" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest mb-6 hover:opacity-80" style={{ color: GOLD }}>
            Back to Resource Hub
          </a>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold leading-none" style={{ color: "#e8dbb5" }}>
            Check Your<br /><em style={{ color: GOLD }}>Utility</em>
          </h1>
          <p className="mt-5 text-lg leading-relaxed max-w-xl" style={{ color: "rgba(232,219,181,0.75)" }}>
            Find data centers near you, learn if your utility is fueling the AI boom, and discover who's making energy decisions in your state.
          </p>
        </div>
      </section>
      {/* THREE CHECK CARDS */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {CHECK_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <a key={card.url} href={card.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-2xl overflow-hidden hover:scale-[1.02] transition-all" style={{ background: "hsl(120,16%,11%)", border: `1px solid ${card.accent}22` }}>
                <div className="flex items-center justify-center py-10" style={{ background: `${card.accent}18`, borderBottom: `1px solid ${card.accent}22` }}>
                  <Icon className="w-10 h-10" style={{ color: card.accent }} />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-bold text-base leading-snug" style={{ color: "#e8dbb5", fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(232,219,181,0.65)" }}>{card.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono" style={{ color: card.accent }}>{card.source}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
      {/* ENERGY ELECTIONS */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-10" style={{ background: "hsl(40,28%,91%)", color: "#1a2a1a" }}>
            <h2 className="text-center font-serif text-4xl sm:text-5xl font-bold mb-10" style={{ color: "#1a2a1a" }}>
              Upcoming Energy Elections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {ELECTIONS.map((el) => (
                <div key={el.state} className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `radial-gradient(circle at 35% 35%, ${el.color}dd, ${el.ring})`, border: `4px solid ${el.color}`, boxShadow: `0 0 0 3px ${el.ring}, 0 4px 24px rgba(0,0,0,0.3)` }}>
                    <span className="text-3xl font-black tracking-tight" style={{ color: "#fff", fontFamily: "'Playfair Display', serif", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{el.abbr}</span>
                  </div>
                  <p className="text-center font-serif text-base italic font-semibold" style={{ color: "#1a2a1a" }}>{el.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t py-8 px-4 text-xs text-muted-foreground" style={{ borderColor: "rgba(201,162,39,0.15)" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p>Campaign actions powered by <a href="https://app.chilli.club" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Chilli Club</a>.</p>
          <p>Know your utility. Know your power.</p>
        </div>
      </footer>
    </div>
  );
}
