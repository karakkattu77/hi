import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import { Flame, Droplets, Zap, Eye, TreePine, ArrowRight, ExternalLink, Play } from "lucide-react";
const GOLD = "#c9a227";
const FOREST = "#101910";
const ACTIONS_URL = "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f?utm_source=christian_vanizette_97&utm_medium=copy&utm_campaign=cause-3c29d439-dcc8-4f00-ac9f-5dbac975836f";
const NAV_LINKS = [
  { label: "Nationwide Actions", href: "/#nationwide-actions" },
  { label: "Resource Hub", href: "/resource-hub" },
  { label: "Declaration", href: "/declaration" },
  { label: "Join Today", href: "/newsletter" },
];
const AREAS = [
  {
    slug: "climate-change",
    title: "Climate",
    emphasis: "Change",
    icon: Flame,
    color: "#e05c30",
    bgAccent: "rgba(60,20,10,0.5)",
    description: "AI data centers are accelerating the climate crisis — burning fossil fuels at a rate that rivals small nations, all to power systems with little democratic oversight.",
    stats: [
      { value: "44M", label: "Tons of CO₂", sub: "emitted from data centers by 2030" },
      { value: "~60%", label: "of Data Centers", sub: "are powered from fossil fuels" },
      { value: "Up to 30x", label: "More Electricity", sub: "used than a single Google search" },
    ],
    youtubeIds: ["SkWzwoDIGmE", "-sNKfRq1oKg"],
    articles: [
      { title: "Data Centers Are Turning to Fossil Fuels to Meet AI's Soaring Energy Demands", source: "Utility Dive", url: "https://www.utilitydive.com/news/fossil-fuel-gas-coal-climate-data-centers/753565/" },
      { title: "Just an Unbelievable Amount of Pollution: How Big a Threat Is AI to the Climate?", source: "The Guardian", url: "https://www.theguardian.com/technology/2026/jan/03/just-an-unbelievable-amount-of-pollution-how-big-a-threat-is-ai-to-the-climate" },
      { title: "Responding to Generative AI's Climate Impact", source: "MIT News", url: "https://news.mit.edu/2025/responding-to-generative-ai-climate-impact-0930" },
    ],
  },
  {
    slug: "water-use",
    title: "Water",
    emphasis: "Use",
    icon: Droplets,
    color: "#4a90d9",
    bgAccent: "rgba(10,30,60,0.5)",
    description: "Data centers consume enormous volumes of water for cooling — often in the most water-stressed regions, competing directly with communities and agriculture.",
    stats: [
      { value: "43%", label: "of Data Centers", sub: "are placed in high water-stressed areas" },
      { value: "1 Trillion", label: "Liters of Water", sub: "projected use for data centers by 2027" },
      { value: "5M Gallons", label: "Per Day", sub: "consumed by a single large data center" },
    ],
    youtubeIds: ["H_c6MWk7PQc", "b0C56yqIkbk"],
    articles: [
      { title: "Data Center Growth Is Draining Global Water Supplies", source: "Data Center Knowledge", url: "https://www.datacenterknowledge.com/infrastructure/data-center-growth-draining-global-water-supplies" },
      { title: "Proposed Shreveport Data Center Would Use 75 Million Gallons of Water Daily", source: "KSLA News", url: "https://www.ksla.com/2025/12/12/documents-show-proposed-shreveport-data-center-would-use-75-million-gallons-water-daily/" },
      { title: "Data Centers, AI & Water: What It Means for the Midwest", source: "Milwaukee Journal Sentinel", url: "https://www.jsonline.com/story/opinion/readers/2025/12/10/data-centers-ai-water-midwest-iran-natural-resources/87670534007/" },
    ],
  },
  {
    slug: "electricity-affordability",
    title: "Electricity &",
    emphasis: "Affordability",
    icon: Zap,
    color: "#d4a017",
    bgAccent: "rgba(40,35,5,0.5)",
    description: "The explosive energy demand of AI infrastructure is being subsidized by ordinary ratepayers — driving up electricity bills for millions of households.",
    stats: [
      { value: "267%", label: "Increase in Energy Costs", sub: "in the last 5 years for high-data-center areas" },
      { value: "30M", label: "Households Worth", sub: "of energy going to data centers by 2030" },
      { value: "$4.3B", label: "Passed to Consumers", sub: "in 2024 across 7 states for data center costs" },
    ],
    youtubeIds: ["svo8o9OdtG4", "YN6BEUA4jNU"],
    articles: [
      { title: "Navigating the Energy Demands of AI", source: "Logistics Viewpoints", url: "https://logisticsviewpoints.com/2025/10/10/navigating-the-energy-demands-of-ai-how-data-center-growth-is-transforming-utility-planning-and-power-infrastructure/" },
      { title: "How AI Data Centers Are Reshaping America's Electric Grid", source: "Forbes", url: "https://www.forbes.com/sites/rrapier/2025/03/26/how-ai-data-centers-are-reshaping-americas-electric-grid/" },
      { title: "Texas Data Centers Are Fueling Demand for Gas Power Plants", source: "Texas Tribune", url: "https://www.texastribune.org/2025/06/05/texas-data-centers-gas-power-plants-ai/" },
    ],
  },
  {
    slug: "surveillance-power",
    title: "Surveillance &",
    emphasis: "Power",
    icon: Eye,
    color: "#9b6dc5",
    bgAccent: "rgba(20,20,40,0.5)",
    description: "The data center industry operates in near-total opacity — no public registry, no federal regulator, and power concentrated among a tiny number of corporations.",
    stats: [
      { value: "No Registry", label: "No Federal Oversight", sub: "no centralized body tracks data centers or their impacts" },
      { value: "No Map", label: "No Public Directory", sub: "researchers rely on permit records and investigative journalism to find them" },
      { value: "A Handful", label: "of Tech Giants", sub: "control most data centers and can influence the regulation of their own industry" },
    ],
    youtubeIds: ["qukC743Zv_Q", "h30Np0mnPDs"],
    articles: [
      { title: "Bernie Sanders Warns Billionaires Are Buying Elections as Pro-AI Super PACs Target Candidates", source: "Benzinga", url: "https://www.benzinga.com/news/politics/25/12/49525476/bernie-sanders-warns-billionaires-are-buying-elections-as-pro-ai-super-pacs-target-candidates-advocating-ai-safety-transparency-cannot-be-alllowed" },
      { title: "Stacey Abrams: AI Is a Tool for Authoritarianism", source: "Black Enterprise", url: "https://www.blackenterprise.com/stacey-abrams-ai-tool-for-authoritarianism/" },
      { title: "How China Is Using AI for Censorship and Surveillance", source: "CNN", url: "https://www.cnn.com/2025/12/04/china/china-ai-censorship-surveillance-report-intl-hnk" },
    ],
  },
  {
    slug: "environmental-justice",
    title: "Environmental",
    emphasis: "Justice",
    icon: TreePine,
    color: "#4caf6e",
    bgAccent: "rgba(10,40,20,0.5)",
    description: "The burden of AI infrastructure falls hardest on already vulnerable communities — who get the pollution, the noise, and the tax burden, but not the jobs.",
    stats: [
      { value: "Marginalized", label: "Communities Targeted", sub: "data centers cluster near lower-income areas, increasing local air pollutants" },
      { value: "Tax Breaks", label: "For Tech Only", sub: "local communities bear the costs without significant, well-paying jobs" },
      { value: "Cheapest Land", label: "= Biggest Impact", sub: "data centers create industrial zones in areas least able to push back" },
    ],
    youtubeIds: ["GNF4DDBH3z0", "vLKp6qeW_4I"],
    articles: [
      { title: "Watch on Instagram", source: "Instagram Reel", url: "https://www.instagram.com/reel/DRh2KpvEUO1/" },
      { title: "Watch on Instagram", source: "Instagram Reel", url: "https://www.instagram.com/reel/DSDYj-eCVEz/" },
      { title: "Community Members Speak Out Against Proposed Pine Island Data Center", source: "KAAL TV", url: "https://www.kaaltv.com/news/community-members-speak-out-against-proposed-pine-island-data-center/" },
      { title: "Data Center Developers Eye Black Areas for Expansion", source: "Canary Media", url: "https://www.canarymedia.com/articles/data-centers/data-center-developers-eye-black-area" },
      { title: "Data Center Boom Risks Health of Already Vulnerable Communities", source: "Tech Policy Press", url: "https://www.techpolicy.press/data-center-boom-risks-health-of-already-vulnerable-communities/" },
    ],
  },
];
const ALL_AREA_CARDS = [
  { slug: "climate-change", label: "Climate", emphasis: "Change", icon: Flame },
  { slug: "water-use", label: "Water", emphasis: "Use", icon: Droplets },
  { slug: "electricity-affordability", label: "Electricity &", emphasis: "Affordability", icon: Zap },
  { slug: "surveillance-power", label: "Surveillance &", emphasis: "Power", icon: Eye },
  { slug: "environmental-justice", label: "Environmental", emphasis: "Justice", icon: TreePine },
];
export default function ImpactArea() {
  const [, params] = useRoute("/impact/:area");
  const area = AREAS.find((a) => a.slug === params?.area);
  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(120,22%,8%)", color: "hsl(40,28%,90%)" }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Area not found</h1>
          <a href="/resource-hub" style={{ color: GOLD }}>Back to Resource Hub</a>
        </div>
      </div>
    );
  }
  const Icon = area.icon;
  return (
    <div className="min-h-screen" style={{ background: "hsl(120,22%,8%)", color: "hsl(40,28%,90%)" }}>
      <Navbar links={NAV_LINKS} />
      {/* HERO */}
      <section className="py-16 px-4 border-b" style={{ borderColor: "rgba(201,162,39,0.1)" }}>
        <div className="max-w-5xl mx-auto">
          <a href="/resource-hub" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest mb-6 hover:opacity-80" style={{ color: GOLD }}>
            Back to Resource Hub
          </a>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center mt-1" style={{ background: area.bgAccent, border: `1px solid ${area.color}33` }}>
              <Icon className="w-8 h-8" style={{ color: area.color }} />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-none" style={{ color: "#e8dbb5" }}>
              {area.title}<br /><em style={{ color: GOLD }}>{area.emphasis}</em>
            </h1>
          </div>
          <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(232,219,181,0.8)" }}>{area.description}</p>
        </div>
      </section>
      {/* STATS */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {area.stats.map((stat, i) => (
            <div key={i} className="rounded-2xl p-7 flex flex-col justify-between" style={{ background: "hsl(120,16%,11%)", border: `1px solid ${area.color}22` }}>
              <div className="text-4xl font-black leading-tight mb-3" style={{ color: area.color, fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
              <div>
                <div className="font-bold text-base mb-1" style={{ color: "#e8dbb5" }}>{stat.label}</div>
                {stat.sub && <div className="text-sm leading-relaxed" style={{ color: "rgba(232,219,181,0.6)" }}>{stat.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* VIDEOS */}
      {area.youtubeIds && area.youtubeIds.length > 0 && (
        <section className="py-10 px-4 border-t" style={{ borderColor: "rgba(201,162,39,0.08)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <Play className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: GOLD }}>Watch</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {area.youtubeIds.map((id) => (
                <div key={id} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,162,39,0.1)" }}>
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${id}`} title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ARTICLES */}
      {area.articles && area.articles.length > 0 && (
        <section className="py-10 px-4 border-t" style={{ borderColor: "rgba(201,162,39,0.08)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <ExternalLink className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: GOLD }}>Further Reading</span>
            </div>
            <div className="flex flex-col gap-3">
              {area.articles.map((article, i) => (
                <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 rounded-xl p-5 group hover:scale-[1.01] transition-all" style={{ background: "hsl(120,16%,11%)", border: "1px solid rgba(201,162,39,0.1)" }}>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest mb-1.5" style={{ color: area.color }}>{article.source}</div>
                    <div className="font-semibold text-sm leading-snug" style={{ color: "#e8dbb5" }}>{article.title}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* TAKE ACTION */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ background: "hsl(120,16%,11%)", border: "1px solid rgba(201,162,39,0.2)" }}>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: GOLD }}>Take Action</div>
              <h2 className="text-2xl font-bold" style={{ color: "#e8dbb5", fontFamily: "'Playfair Display', serif" }}>Ready to fight back?</h2>
              <p className="text-sm mt-1" style={{ color: "rgba(232,219,181,0.7)" }}>Join the campaign to stop fossil-fueled AI infrastructure.</p>
            </div>
            <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm" style={{ background: GOLD, color: FOREST }}>
              Take Action Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
      {/* CROSS-NAV */}
      <section className="py-10 px-4 border-t" style={{ borderColor: "rgba(201,162,39,0.1)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: GOLD }}>Core Impact Areas</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {ALL_AREA_CARDS.slice(0, 3).map((card) => {
              const CardIcon = card.icon;
              const isActive = card.slug === area.slug;
              return (
                <a key={card.slug} href={`/impact/${card.slug}`} className="flex items-center gap-3 rounded-xl p-4 transition-all" style={{ background: isActive ? "rgba(201,162,39,0.12)" : "hsl(120,16%,11%)", border: `1px solid ${isActive ? "rgba(201,162,39,0.4)" : "rgba(201,162,39,0.08)"}`, color: isActive ? GOLD : "hsl(40,28%,75%)" }}>
                  <CardIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wide">{card.label} <em>{card.emphasis}</em></span>
                </a>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:max-w-xl">
            {ALL_AREA_CARDS.slice(3).map((card) => {
              const CardIcon = card.icon;
              const isActive = card.slug === area.slug;
              return (
                <a key={card.slug} href={`/impact/${card.slug}`} className="flex items-center gap-3 rounded-xl p-4 transition-all" style={{ background: isActive ? "rgba(201,162,39,0.12)" : "hsl(120,16%,11%)", border: `1px solid ${isActive ? "rgba(201,162,39,0.4)" : "rgba(201,162,39,0.08)"}`, color: isActive ? GOLD : "hsl(40,28%,75%)" }}>
                  <CardIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wide">{card.label} <em>{card.emphasis}</em></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="border-t py-8 px-4 text-xs text-muted-foreground" style={{ borderColor: "rgba(201,162,39,0.15)" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p>Campaign actions powered by <a href="https://app.chilli.club" target="_blank" rel="noopener noreferrer" style={{ color: GOLD }}>Chilli Club</a>. Data from public filings, FT research, and investigative reporting.</p>
          <p>Not all AI is bad — just the kind burning your future.</p>
        </div>
      </footer>
    </div>
  );
}
