"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ locale }: { locale: "en" | "fr" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: locale === "fr" ? "Projets"     : "Projects", href: "#projects" },
    { label: locale === "fr" ? "Compétences" : "Skills",   href: "#skills"   },
    { label: locale === "fr" ? "À propos"    : "About",    href: "#about"    },
    { label: "Contact",                                      href: "#contact"  },
  ];

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-[#080808]/95 backdrop-blur-md border-b border-neutral-800" : "",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 font-black text-xl tracking-tight">OB.</span>
          <span className="hidden sm:block text-neutral-600 text-sm font-light">portfolio</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="relative text-sm text-neutral-400 hover:text-white transition-colors duration-200 group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-emerald-500 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Droite : langue + burger */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href={otherPath}
            className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-emerald-400 transition-colors duration-200">
            {other}
          </Link>
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a0a] border-t border-neutral-800"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="text-base text-neutral-300 hover:text-white py-2 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
