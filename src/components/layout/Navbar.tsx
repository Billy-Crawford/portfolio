"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ locale }: { locale: "en" | "fr" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: locale === "fr" ? "À propos" : "About", href: "#about" },
    { label: locale === "fr" ? "Parcours" : "Education", href: "#education" },
    { label: locale === "fr" ? "Pôle IA" : "AI Lab", href: "#ai-focus" },
    { label: locale === "fr" ? "Arsenal" : "Skills", href: "#skills" },
    { label: locale === "fr" ? "Travaux" : "Projects", href: "#projects" },
    { label: locale === "fr" ? "Méthode" : "Methodology", href: "#methodology" },
    { label: "CV", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-[#fafaf9]/90 dark:bg-[#080809]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3.5 sm:py-4 shadow-sm"
          : "bg-transparent py-5 sm:py-7"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-neutral-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
            OB<span className="text-emerald-500 dark:text-emerald-400">.</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-semibold border-l border-neutral-300 dark:border-white/10 pl-3">
            STUDIO
          </span>
        </Link>

        {/* NAVIGATION DESKTOP ÉTENDUE */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] xl:text-[12px] uppercase tracking-[0.18em] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* ACTIONS DROITE (THÈME + LANGUE + BURGER MOBILE) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* BOUTON TOGGLE THÈME CLAIR / SOMBRE */}
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full border border-neutral-300 dark:border-white/10 hover:border-neutral-500 dark:hover:border-white/30 flex items-center justify-center text-neutral-800 dark:text-neutral-200 transition-all duration-200 bg-black/[0.03] dark:bg-white/[0.03]"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* SÉLECTEUR DE LANGUE */}
          <Link
            href={otherPath}
            className="text-[10px] sm:text-[11px] font-mono uppercase font-bold tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white px-3 sm:px-4 py-1.5 rounded-full border border-neutral-300 dark:border-white/10 hover:border-neutral-500 dark:hover:border-emerald-400/50 bg-black/[0.03] dark:bg-white/[0.02] backdrop-blur-md transition-all"
          >
            {other.toUpperCase()}
          </Link>

          {/* BOUTON MENU BURGER MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8.5 h-8.5 rounded-full border border-neutral-300 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-white text-base hover:border-neutral-500 dark:hover:border-white/30 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* TIROIR MOBILE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fafaf9] dark:bg-[#080809] border-b border-black/10 dark:border-white/10 px-6 py-6 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 py-2 border-b border-black/5 dark:border-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
