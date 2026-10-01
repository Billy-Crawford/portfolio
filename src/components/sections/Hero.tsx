"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Hero({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const subtitle =
    locale === "fr"
      ? (content?.hero_subtitle?.value_fr ?? t.heroSubtitle)
      : (content?.hero_subtitle?.value_en ?? t.heroSubtitle);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4 sm:p-8 lg:p-12"
    >
      {/* CARTE PRINCIPALE BLANCHE/GRIS CLAIR (Style Joker - Image 1) */}
      <div className="relative w-full max-w-[1360px] bg-[#f0f0f2] text-[#111111] rounded-[36px] sm:rounded-[48px] shadow-[0_30px_90px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 min-h-[90vh]">
        
        {/* FILIGRANE ARRIÈRE-PLAN TRÈS SUBTIL */}
        <div className="absolute top-4 right-10 text-[16vw] font-black text-black/[0.03] select-none pointer-events-none leading-none tracking-tighter">
          OB
        </div>

        {/* ── BARRE HAUTE INTÉGRÉE (Style Joker Navbar) ── */}
        <div className="relative z-20 flex items-center justify-between w-full">
          {/* Logo badge circulaire */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-xs tracking-tighter shadow-md">
              OB
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 font-semibold hidden sm:inline-block">
              // STUDIO
            </span>
          </div>

          {/* Statut disponibilité */}
          <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700">
              {locale === "fr" ? "Disponible" : "Open for work"}
            </span>
          </div>
        </div>

        {/* ── CORPS DU HERO (3 ZONES : INFOS GAUCHE / PORTRAIT CENTRE / PAGINATION DROITE) ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto py-12">
          
          {/* GAUCHE : IDENTITÉ & DESCRIPTION (Col 1 à 4) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-black tracking-tight leading-[0.9]">
                Oumarou
                <span className="block text-neutral-400 font-extrabold mt-1">Billy</span>
              </h1>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 pt-2 font-bold">
                {locale === "fr"
                  ? "Ingénieur IA & Développeur Full-Stack"
                  : "AI Engineer & Full-Stack Developer"}
              </p>
            </motion.div>

            {/* BLOC DESCRIPTION AÉRÉ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 pt-6 border-t border-black/10 max-w-sm"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block">
                {locale === "fr" ? "Power & Focus" : "Core Capabilities"}
              </span>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                {subtitle}
              </p>
            </motion.div>

            {/* BOUTONS D'ACTION ÉDITORIAUX */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs uppercase font-bold tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-md"
              >
                {locale === "fr" ? "Projets" : "Projects"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-black border border-black/15 text-xs uppercase font-bold tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* CENTRE : PORTRAIT MAJESTUEUX + TAGS FLOTTANTS STYLE JOKER (Col 5 à 11) */}
          <div className="lg:col-span-7 flex justify-center items-center relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] xl:w-[440px] xl:h-[580px]"
            >
              {/* Photo contrastée en noir et blanc */}
              <div className="relative w-full h-full rounded-[36px] overflow-hidden grayscale contrast-125 shadow-2xl bg-neutral-300">
                <Image
                  src="/me.jpeg"
                  alt="Oumarou Billy"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Dégradé bas doux pour fondre dans la carte */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f0f0f2] via-transparent to-transparent opacity-60" />
              </div>

              {/* BADGE FLOTTANT 1 : HAUT DROITE (Style Joker Tag) */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -right-4 sm:-right-8 top-16 bg-white/95 backdrop-blur-md border border-black/10 rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2.5 z-20"
              >
                <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                <span className="text-xs font-bold tracking-tight text-black">
                  Next.js & Full-Stack
                </span>
              </motion.div>

              {/* BADGE FLOTTANT 2 : BAS DROITE (Style Joker Tag) */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="absolute -right-2 sm:-right-6 bottom-20 bg-white/95 backdrop-blur-md border border-black/10 rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2.5 z-20"
              >
                <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                <span className="text-xs font-bold tracking-tight text-black">
                  Machine Learning & IA
                </span>
              </motion.div>

              {/* STATISTIQUES SOUPLES : BAS GAUCHE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="absolute -left-4 sm:-left-8 bottom-6 bg-black text-white rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-5 z-20"
              >
                <div>
                  <p className="text-2xl font-black leading-none">5+</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1 font-mono">Projects</p>
                </div>
                <div className="w-[1px] h-7 bg-neutral-800" />
                <div>
                  <p className="text-2xl font-black leading-none">2+</p>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1 font-mono">Years Exp</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* DROITE : PAGINATION CAROUSEL (Col 12) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-5 order-3">
            <span className="text-xs font-mono font-bold text-neutral-400">01</span>
            <div className="flex flex-col items-center gap-3">
              <span className="w-3 h-3 rounded-full border-2 border-black flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400">05</span>
          </div>

        </div>

        {/* ── PIED DE CARTE (Scroll Mouse + Mentions) ── */}
        <div className="relative z-20 flex items-center justify-between w-full pt-6 border-t border-black/5">
          <a
            href="#about"
            className="flex items-center gap-3 text-neutral-500 hover:text-black transition-colors"
          >
            <div className="w-4 h-6 rounded-full border border-neutral-400 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 bg-black rounded-full"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 font-mono">
              Scroll Mouse
            </span>
          </a>

          <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            2026 Edition // Portfolio
          </div>
        </div>

      </div>
    </section>
  );
}
