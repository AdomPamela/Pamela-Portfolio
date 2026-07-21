import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const y = window.scrollY + 120;
      for (const l of links) {
        const el = document.querySelector<HTMLElement>(l.href);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(l.href.slice(1));
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-500 ${scrolled ? "pt-3" : "pt-6"}`}
    >
      <nav
        className={`glass-strong flex w-full max-w-6xl items-center justify-between rounded-full transition-all duration-500 ${scrolled ? "px-4 py-2" : "px-6 py-3"}`}
      >
        <a href="#home" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-primary-foreground"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}>
            P
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">Pamela A. O. Boafo</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: "color-mix(in oklab, var(--primary) 18%, transparent)" }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 pr-1">
          <ThemeToggle />
          <button
            className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-4 top-24 z-40 lg:hidden">
          <ul className="glass-strong flex flex-col gap-1 rounded-3xl p-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
