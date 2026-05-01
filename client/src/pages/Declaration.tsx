import Navbar from "@/components/Navbar";
import declarationDocImg from "@assets/Screenshot_2026-02-26_at_3.47.00_PM_1772149622680.png";
import { ArrowRight, ExternalLink, PenLine, FileText, ChevronRight } from "lucide-react";

const GOLD = "#c9a227";
const FOREST = "#101910";
const CREAM = "hsl(40,28%,90%)";
const DOC_URL = "https://docs.google.com/document/d/1Eqz19Fd8DvVPL_9N4CVZL0n7pUvqddGyH52W6gm9zt4/edit?tab=t.0";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScO2jk0MO6oOWkJart_4zye_dw1-d1yRCejq8ZA2FJtiwziRQ/viewform";

const NAV_LINKS = [
  { label: "Nationwide Actions", href: "/#nationwide-actions" },
  { label: "Resource Hub", href: "/resource-hub" },
  { label: "Declaration", href: "/declaration" },
  { label: "Join Today", href: "/newsletter" },
];

const DEMANDS = [
  {
    num: "01",
    title: "Use Federal Purchasing and Siting Authority",
    desc: "Support efficient and cost-effective infrastructure. Require energy and water-efficient technologies, allow new federal-land data centers only when they do not strain local utilities.",
  },
  {
    num: "02",
    title: "Implement a Temporary Permit Pause",
    desc: "For high-impact data centers. Review projects that threaten grid reliability, deny permits that increase dependence on unstable energy sources, protect local families from higher bills.",
  },
  {
    num: "03",
    title: "Ensure Tech Corporations Pay Their Fair Share",
    desc: "Establish fees for extreme water use, grid strain, or PFAS contamination. Strengthen oversight of misleading environmental claims that hide true resource use.",
  },
  {
    num: "04",
    title: "Protect Consumers From Rising Energy Prices",
    desc: "Require transparency on expected impacts to utility rates and capacity before approving large projects. Many regions hosting data centers already face higher electricity bills.",
  },
  {
    num: "05",
    title: "Update Federal Standards",
    desc: "Reduce waste and strengthen grid reliability. Establish efficiency benchmarks for water, cooling, and power usage, update federal procurement to exclude inefficient AI hardware.",
  },
  {
    num: "06",
    title: "End Federal Subsidies for Inefficient AI Expansion",
    desc: "Redirect subsidies toward clean, community-beneficial infrastructure. Wasteful AI expansion must not be underwritten by American taxpayers.",
  },
];

export default function Declaration() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(120,22%,8%)", color: CREAM }}>
      <Navbar links={NAV_LINKS} />

      {/* SECTION 1: Full-screen Hero */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/declaration-bg.jpg')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(10,18,10,0.82) 0%, rgba(10,18,10,0.72) 50%, rgba(10,18,10,0.88) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to bottom, transparent, hsl(120,22%,8%))" }} />
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center py-32">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest mb-8" style={{ background: "rgba(201,162,39,0.13)", border: "1px solid rgba(201,162,39,0.4)", color: GOLD }}>
            Power Shift Project
          </div>
          <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: "rgba(201,162,39,0.85)" }}>
            National Sustainable AI
          </p>
          <h1 className="font-serif font-black leading-none mb-6" style={{ fontSize: "clamp(4.5rem, 13vw, 10rem)", color: "#f5edcf", letterSpacing: "-0.02em", textShadow: "0 8px 48px rgba(0,0,0,0.8)" }}>
            Declaration
          </h1>
          <div className="w-20 h-[3px] mx-auto mb-8 rounded-full" style={{ background: GOLD }} />
          <p className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#f5edcf", fontFamily: "'Playfair Display', serif" }}>
            Stop Big Data.
          </p>
          <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "rgba(220,208,176,0.78)", lineHeight: "1.8" }}>
            Big Oil, Big Tech, and Big Finance created a new supervillain and it is being built in your backyard, wasting your water, and spiking your electricity bill.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold text-sm tracking-wide transition-all hover:brightness-110 hover:scale-[1.02]" style={{ background: GOLD, color: FOREST, boxShadow: `0 0 40px rgba(201,162,39,0.4)` }}>
              <PenLine className="w-4 h-4" />
              Sign the Declaration
            </a>
            <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-bold text-sm tracking-wide transition-all hover:bg-white/10" style={{ background: "rgba(255,255,255,0.07)", color: CREAM, border: `1.5px solid rgba(201,162,39,0.45)`, backdropFilter: "blur(8px)" }}>
              <FileText className="w-4 h-4" />
              Read Full Statement
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: Stats Band */}
      <section style={{ background: "hsl(120,16%,10%)", borderTop: `3px solid ${GOLD}` }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Organizations Calling for Action", value: "50+" },
              { label: "Demands Sent to the White House", value: "6" },
              { label: "Data Centers Built Across the Country", value: "5000+" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-black font-serif mb-1" style={{ color: GOLD }}>{s.value}</p>
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgba(232,219,181,0.6)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Document Preview + Context Text */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: document card */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20" style={{ background: GOLD, transform: "scale(0.85)" }} />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: `1px solid rgba(201,162,39,0.25)`, transform: "rotate(-1.5deg)", maxWidth: 420 }}>
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: FOREST, borderBottom: `1px solid rgba(201,162,39,0.2)` }}>
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                <span className="ml-2 text-xs font-mono" style={{ color: "rgba(201,162,39,0.6)" }}>National_Sustainable_AI_Declaration.pdf</span>
              </div>
              <img src={declarationDocImg} alt="Declaration document preview" className="w-full block" style={{ maxHeight: 520, objectFit: "cover", objectPosition: "top" }} />
              <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to bottom, transparent, hsl(120,16%,11%))" }} />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold hover:opacity-90" style={{ background: GOLD, color: FOREST }}>
                  Read Full Document
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: context text */}
          <div>
            <div className="inline-flex items-center gap-2 mb-5 text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)", color: GOLD }}>
              Our Open Letter
            </div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-6" style={{ color: "#f0e8cc" }}>
              Protecting American Strength by Securing Our Future
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "rgba(232,219,181,0.75)" }}>
              <p>On behalf of the undersigned organizations, we write to recognize the Administration's key role in directing the nation's approach to the rapid growth of AI and data center infrastructure.</p>
              <p>America is leading the world in artificial intelligence, and the decisions made now will determine whether this AI boom will strengthen our economy, protect our communities, and preserve the resources our country depends on or cause greater damage to the nation.</p>
              <p>The United States is facing record demand from data centers. At the same time, we have become more energy dependent than ever, relying on aging infrastructure and unstable energy markets. The following priorities offer a path toward responsible AI growth that protects consumers, stabilizes the grid, and keeps America in control of its own energy supply.</p>
            </div>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm hover:brightness-110" style={{ background: GOLD, color: FOREST }}>
              <PenLine className="w-4 h-4" />
              Add Your Name
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: Six Demands Grid */}
      <section className="py-20 px-6" style={{ background: "hsl(120,16%,10%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: GOLD }}>The Six Demands</p>
            <h2 className="font-serif text-5xl font-bold" style={{ color: "#f0e8cc" }}>What We <em style={{ color: GOLD }}>Want</em></h2>
            <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: "rgba(232,219,181,0.6)" }}>
              Calling on the President to use executive power to regulate AI data centers and protect American communities, ratepayers, and the environment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEMANDS.map((d) => (
              <div key={d.num} className="rounded-2xl p-7 flex flex-col gap-4 transition-all hover:border-yellow-600/40" style={{ background: "hsl(120,18%,12%)", border: "1px solid rgba(201,162,39,0.12)" }}>
                <span className="text-5xl font-black leading-none" style={{ color: GOLD, fontFamily: "'Playfair Display', serif", opacity: 0.35 }}>{d.num}</span>
                <div>
                  <h3 className="font-serif text-base font-bold leading-snug mb-2" style={{ color: "#f0e8cc" }}>{d.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(232,219,181,0.6)" }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm hover:brightness-110 hover:scale-[1.02]" style={{ background: GOLD, color: FOREST, boxShadow: `0 0 28px rgba(201,162,39,0.3)` }}>
              <PenLine className="w-4 h-4" />
              Sign the Declaration
            </a>
            <a href={DOC_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80" style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: "4px" }}>
              Read the full document
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: Bottom CTA Strip */}
      <section className="py-16 px-6 relative overflow-hidden" style={{ background: GOLD }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-3xl font-bold leading-tight" style={{ color: FOREST }}>Ready to take a stand?</p>
            <p className="text-sm mt-1 font-medium" style={{ color: "rgba(16,25,16,0.65)" }}>Add your name to the National Sustainable AI Declaration today.</p>
          </div>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm hover:opacity-90 hover:scale-[1.02]" style={{ background: FOREST, color: CREAM }}>
            Sign Up Today
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* SECTION 6: Footer */}
      <footer className="border-t py-8 px-6 text-xs" style={{ borderColor: "rgba(201,162,39,0.15)", color: "rgba(232,219,181,0.45)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p>Campaign actions powered by <a href="https://app.chilli.club" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Chilli Club</a>.</p>
        </div>
      </footer>
    </div>
  );
}
