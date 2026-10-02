"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ locale }: { locale: "en" | "fr" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: locale === "fr" ? "À propos" : "About", href: "#about" },
    { label: locale === "fr" ? "Expertise" : "Services", href: "#services" },
    { label: locale === "fr" ? "Arsenal" : "Skills", href: "#skills" },
    { label: locale === "fr" ? "Travaux" : "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-[#080809]/95 backdrop-blur-xl border-b border-white/5 py-3.5 sm:py-4"
          : "bg-transparent py-5 sm:py-7"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            OB<span className="text-emerald-400">.</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-semibold border-l border-white/10 pl-3">
            STUDIO
          </span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.2em] font-medium text-neutral-400 hover:text-white transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* ACTIONS DROITE (LANGUE + BURGER MOBILE) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href={otherPath}
            className="text-[10px] sm:text-[11px] font-mono uppercase font-bold tracking-widest text-neutral-300 hover:text-white px-3 sm:px-4 py-1.5 rounded-full border border-white/10 hover:border-emerald-400/50 bg-white/[0.02] backdrop-blur-md transition-all"
          >
            {other.toUpperCase()}
          </Link>

          {/* BOUTON MENU BURGER MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white text-base hover:border-white/30 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* TIROIR MOBILE */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080809] border-b border-white/10 px-6 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] font-semibold text-neutral-300 hover:text-emerald-400 py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
