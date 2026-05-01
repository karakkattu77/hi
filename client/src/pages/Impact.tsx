import Navbar from "@/components/Navbar";
import { Flame, Droplets, Zap, TreePine, ArrowRight, Wind, Users, Globe, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "#c9a227";
const FOREST = "#101910";
const ACTIONS_URL = "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f?utm_source=christian_vanizette_97&utm_medium=copy&utm_campaign=cause-3c29d439-dcc8-4f00-ac9f-5dbac975836f";

const NAV_LINKS = [
  { label: "Nationwide Actions", href: "/#nationwide-actions" },
  { label: "The Impact", href: "/impact" },
  { label: "Resource Hub", href: "/resource-hub" },
  { label: "Declaration", href: "/declaration" },
  { label: "Join Today", href: "/newsletter" },
];

const IMPACT_POINTS = [
  {
    title: "Fossil Fuel Addiction",
    icon: Flame,
    color: "#fb923c",
    description: "Over 40% of U.S. AI data center power comes from fossil fuels. Tech companies are building new gas plants and delaying coal retirement to feed insatiable AI computing demand. Every ChatGPT query runs on coal and gas in much of the country."
  },
  {
    title: "Water Crisis",
    icon: Droplets,
    color: "#60a5fa",
    description: "AI data centers cool their servers using billions of gallons of water every day. Many are being built in already drought-stricken regions Arizona, Texas, and the Southwest where communities are already fighting for water access."
  },
  {
    title: "Community Harm",
    icon: Users,
    color: "#fb923c",
    description: "In South Memphis, Elon Musk's xAI facility illegally polluted the air in one of America's highest-asthma communities. These aren't accidents, they're the business model."
  },
  {
    title: "Grid Destabilization",
    icon: Zap,
    color: "#fbbf24",
    description: "AI data centers are straining local power grids designed to serve their communities. Big tech is passing the energy costs onto homeowners, with some seeing a 30%+ rate increase."
  },
  {
    title: "Land Destruction",
    icon: TreePine,
    color: "#4ade80",
    description: "Data centers can be anywhere from 10 acres to 50,000. These facilities replace diverse ecosystems and agricultural heritage with massive concrete server farms that serve Silicon Valley."
  },
  {
    title: "Clean Energy Delay",
    icon: Flame,
    color: "#fb923c",
    description: "AI is literally blocking America's clean energy transition. By investing in continued fossil fuel production, tech companies are crowding out renewables and keeping dirty plants online for years longer than planned."
  }
];

export default function Impact() {
  return (
    <div className="min-h-screen text-foreground" style={{ background: "hsl(120,22%,8%)" }}>
      <Navbar links={NAV_LINKS} onActNow={() => window.open(ACTIONS_URL, "_blank")} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.08),transparent_70%)]" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="text-xs font-mono uppercase tracking-[0.3em] mb-4" style={{ color: GOLD }}>Why It Matters</div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#e8dbb5" }}>
              The Hidden Cost of <br /><em style={{ color: GOLD }}>Big AI</em>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              The AI industry wants you to think chatbots and image generators are harmless. Here's what they're not telling you about the physical infrastructure.
            </p>
          </div>
        </section>

        {/* Impact Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {IMPACT_POINTS.map((point, i) => {
              const Icon = point.icon;
              return (
                <div 
                  key={i} 
                  className="group p-8 rounded-3xl border transition-all duration-300 hover:translate-y-[-4px]" 
                  style={{ 
                    background: "rgba(201,162,39,0.03)", 
                    borderColor: "rgba(201,162,39,0.12)",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
                  }}
                  data-testid={`impact-card-${i}`}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300" style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)" }}>
                    <Icon className="w-7 h-7" style={{ color: point.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#e8dbb5", fontFamily: "'Playfair Display', serif" }}>{point.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground/90">{point.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Utility Banner */}
        <section className="max-w-7xl mx-auto px-4 mb-32">
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
            <Button 
              size="lg"
              className="shrink-0 px-8 py-7 text-base font-bold flex items-center gap-3 relative z-10 transition-transform hover:scale-105" 
              style={{ background: GOLD, color: FOREST }}
              onClick={() => window.open("https://data-center-defense--karakkattoo.replit.app/check-utility", "_blank")}
            >
              Check Your Utility <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-4 relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto relative z-10">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "#e8dbb5", fontFamily: "'Playfair Display', serif" }}>
              Ready to take the <em style={{ color: GOLD }}>next step?</em>
            </h3>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
              Join thousands of others in the fight for a clean AI future. Your voice matters in shaping how technology impacts our communities and our planet.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button size="lg" className="text-base px-10 py-7 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]" style={{ background: GOLD, color: FOREST }} onClick={() => window.open(ACTIONS_URL, "_blank")}>
                Take Nationwide Action
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-10 py-7 rounded-full border-amber-800/40 text-foreground hover:bg-white/5 transition-all hover:scale-105" onClick={() => window.location.href = "/"}>
                Find Local Projects
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-4 mt-20" style={{ borderColor: "rgba(201,162,39,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Stop Big Data Campaign</p>
          <div className="flex gap-8 justify-center">
            <a href="/declaration" className="hover:text-foreground">Declaration</a>
            <a href="/resource-hub" className="hover:text-foreground">Resource Hub</a>
            <a href="/impact" className="hover:text-foreground">The Impact</a>
            <a href="/newsletter" className="hover:text-foreground">Join Today</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
