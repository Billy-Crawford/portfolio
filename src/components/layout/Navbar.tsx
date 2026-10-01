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
    { label: locale === "fr" ? "Projets" : "Projects", href: "#projects" },
    { label: locale === "fr" ? "Compétences" : "Skills", href: "#skills" },
    { label: locale === "fr" ? "À propos" : "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#1f1f1f]" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <span className="text-[#10b981] font-black text-xl">OB</span>
          <span className="text-white/40 font-light text-sm hidden sm:block">/ portfolio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-[#a3a3a3] hover:text-white transition-colors duration-200 relative group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-[#10b981] transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href={otherPath}
            className="text-xs font-bold uppercase tracking-widest text-[#a3a3a3] hover:text-[#10b981] transition-colors duration-200">
            {other}
          </Link>
          {/* Mobile burger */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden flex flex-col gap-1.5 p-1">
            <span className={`block h-px w-6 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#0f0f0f] border-t border-[#1f1f1f] px-6 py-6 flex flex-col gap-4">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-base text-[#a3a3a3] hover:text-white transition-colors">{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
