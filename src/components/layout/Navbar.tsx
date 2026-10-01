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
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: locale === "fr" ? "À propos" : "About", href: "#about" },
    { label: locale === "fr" ? "Services" : "Services", href: "#services" },
    { label: locale === "fr" ? "Compétences" : "Skills", href: "#skills" },
    { label: locale === "fr" ? "Projets" : "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/90 backdrop-blur-md border-b border-neutral-800/80 py-4 shadow-lg"
          : "bg-transparent py-6 pointer-events-none"
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href={`/${locale}`}
          className={`flex items-center gap-2 group transition-opacity ${
            scrolled ? "pointer-events-auto opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-black text-lg tracking-tight text-white uppercase">
            OB.
          </span>
        </Link>

        {/* LIENS DE NAVIGATION CENTRÉS / ÉPURÉS */}
        <nav
          className={`hidden md:flex items-center gap-8 px-6 py-2 rounded-full border transition-all ${
            scrolled
              ? "pointer-events-auto bg-neutral-900/60 border-neutral-800"
              : "pointer-events-auto bg-black/40 backdrop-blur-md border-white/10"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase font-bold tracking-[0.2em] text-neutral-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* BOUTON LANGUE & BURGER */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            href={otherPath}
            className="text-[11px] font-bold uppercase tracking-widest text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/60 hover:border-neutral-500 transition-all shadow-sm"
          >
            {other}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-full border border-neutral-700 bg-neutral-900 text-white"
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] w-4 bg-white transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-white transition-all duration-200 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-white transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pointer-events-auto bg-[#0d0d0d] border-b border-neutral-800 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs uppercase tracking-widest font-bold text-neutral-300 hover:text-white py-2 border-b border-neutral-900"
                >
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
