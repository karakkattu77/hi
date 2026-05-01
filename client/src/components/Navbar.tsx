import { Link } from "wouter";
import { X, Heart } from "lucide-react";

interface NavLink {
  label: string;
  href?: string;
  action?: () => void;
}

interface NavbarProps {
  links: NavLink[];
  onActNow?: () => void;
  actNowHref?: string;
}

const GOLD = "#c9a227";
const FOREST = "#101910";

export default function Navbar({ links, onActNow }: NavbarProps) {
  return (
    <nav 
      className="sticky top-0 z-[100] border-b backdrop-blur-md"
      style={{ background: "rgba(16, 25, 16, 0.8)", borderColor: "rgba(201,162,39,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: GOLD }}>
            <X className="w-5 h-5" style={{ color: FOREST }} strokeWidth={3} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block" style={{ color: "#e8dbb5" }}>
            STOP<span style={{ color: GOLD }}>BIG</span>DATA
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-6">
          <div className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              link.href ? (
                <Link 
                  key={i} 
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  style={{ color: "rgba(232,219,181,0.6)" }}
                  data-testid={`nav-link-${i}`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={i}
                  onClick={link.action}
                  className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  style={{ color: "rgba(232,219,181,0.6)" }}
                  data-testid={`nav-button-${i}`}
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://app.chilli.club/memberships/51f003f6-1506-4275-8dc9-c73119e84cc7/flow"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center gap-2"
              style={{ borderColor: "rgba(201,162,39,0.5)", color: GOLD }}
              data-testid="link-nav-donate"
            >
              <Heart className="w-4 h-4" />
              Donate
            </a>
            <Link
              href="/newsletter"
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ background: GOLD, color: FOREST }}
              data-testid="button-nav-act"
            >
              Act Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
