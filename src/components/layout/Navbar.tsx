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
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: locale === "fr" ? "Projets" : "Projects", href: "#projects" },
    { label: locale === "fr" ? "Compétences" : "Skills", href: "#skills" },
    { label: locale === "fr" ? "À propos" : "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0c0c0c]/90 backdrop-blur-md border-b border-neutral-800/80 py-3.5"
          : "bg-transparent py-5",
      ].join(" ")}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* LOGO STYLE ÉDITORIAL / MAGAZINE */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <span className="font-black text-xl tracking-tighter text-white uppercase group-hover:opacity-75 transition-opacity">
            OB.
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-500 pl-2 border-l border-neutral-800">
            Portfolio
          </span>
        </Link>

        {/* NAVIGATION DESKTOP ÉPURÉE */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase font-bold tracking-[0.18em] text-neutral-400 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ACTIONS : SÉLECTEUR DE LANGUE & BURGER */}
        <div className="flex items-center gap-5">
          <Link
            href={otherPath}
            className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white px-3 py-1 rounded-full border border-neutral-800 hover:border-neutral-600 transition-all"
          >
            {other}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-full border border-neutral-800 text-white"
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

      {/* MENU MOBILE DÉROULANT */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c0c0c] border-b border-neutral-800 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-widest font-bold text-neutral-300 hover:text-white py-2 border-b border-neutral-900"
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

