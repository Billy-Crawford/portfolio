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
    const fn = () => setScrolled(window.scrollY > 40);
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
          ? "bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-black text-xl tracking-tight text-white">
            OB<span className="text-emerald-400">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-widest font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href={otherPath}
          className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-emerald-400 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 transition-all"
        >
          {other}
        </Link>
      </div>
    </header>
  );
}
