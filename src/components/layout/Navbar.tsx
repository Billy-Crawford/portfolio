"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export default function Navbar({ locale }: { locale: "en" | "fr" }) {
  const t = locale === "fr" ? fr : en;
  const pathname = usePathname();
  const oppositeLocale = locale === "fr" ? "en" : "fr";
  const newPath = pathname.replace(`/${locale}`, `/${oppositeLocale}`);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 pt-8 px-6 lg:px-12 flex justify-between items-center">
      
      {/* ─── LOGO + LIENS (GAUCHE) ─── */}
      <div className="flex items-center gap-12 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full shadow-sm border border-gray-200/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-bold text-xl tracking-tighter">
          OB
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-800 uppercase tracking-widest">
          <Link href="#home" className="hover:text-black transition-colors">Home</Link>
          <Link href="#projects" className="hover:text-black transition-colors">Projects</Link>
          <Link href="#about" className="hover:text-black transition-colors">About</Link>
          <Link href="#contact" className="hover:text-black transition-colors">Contact</Link>
        </div>
      </div>

      {/* ─── LANGUE (DROITE) ─── */}
      <Link 
        href={newPath}
        className="px-4 py-2 text-xs font-bold bg-black text-white rounded-full uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg"
      >
        {locale === "fr" ? "EN" : "FR"}
      </Link>
    </nav>
  );
}
