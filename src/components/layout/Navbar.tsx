"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ locale }: { locale: "en" | "fr" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`);
  const [scrolled, setScrolled] = useState(false);

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
        scrolled
          ? "bg-[#080809]/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LOGO ÉDITORIAL AVEC MONOGRAMME */}
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            OB<span className="text-emerald-400">.</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-semibold border-l border-white/10 pl-3">
            STUDIO
          </span>
        </Link>

        {/* NAVIGATION CENTRÉE RAFFINÉE */}
        <nav className="hidden md:flex items-center gap-9">
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

        {/* CHANGEMENT DE LANGUE DISCRET & CHIC */}
        <div className="flex items-center gap-4">
          <Link
            href={otherPath}
            className="text-[11px] font-mono uppercase font-bold tracking-widest text-neutral-300 hover:text-white px-4 py-1.5 rounded-full border border-white/10 hover:border-emerald-400/50 bg-white/[0.02] backdrop-blur-md transition-all"
          >
            {other.toUpperCase()}
          </Link>
        </div>

      </div>
    </header>
  );
}
