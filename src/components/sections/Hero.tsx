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
      className="relative w-full min-h-screen bg-[#0d0d0d] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-hidden"
    >
      {/* CADRE PRINCIPAL BLANC/GRIS ÉDITORIAL (Inspiré de l'image 1) */}
      <div className="relative w-full max-w-[1400px] min-h-[92vh] bg-[#ebebeb] text-[#121212] rounded-[32px] sm:rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        
        {/* FILIGRANE GÉANT D'ARRIÈRE-PLAN */}
        <div className="absolute top-6 right-8 text-[12vw] sm:text-[14vw] font-black text-black/[0.035] leading-none pointer-events-none select-none tracking-tighter">
          OB
        </div>

        {/* LIGNE SUPÉRIEURE : EN-TÊTE INTÉGRÉ AU HERO */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-black text-xs tracking-tighter shadow-md">
              OB
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hidden sm:inline-block">
              Portfolio
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
              {locale === "fr" ? "Disponible" : "Open for work"}
            </span>
          </div>
        </div>

        {/* CŒUR DU HERO : TEXTES + PORTRAIT ARTISTIQUE + TAGS FLOTTANTS */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
          
          {/* COLONNE GAUCHE : IDENTITÉ & DESCRIPTION */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-black leading-[0.9]">
                Oumarou
                <span className="block text-neutral-500 font-extrabold mt-1">Billy</span>
              </h1>
              
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                {locale === "fr"
                  ? "Développeur Full-Stack · Étudiant Master IA"
                  : "Full-Stack Developer · AI Master Student"}
              </p>
            </motion.div>

            {/* BLOC DESCRIPTION FORMATÉ TYPE FICHE DE PERSONNAGE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 pt-6 border-t border-black/10 max-w-sm"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 block mb-2">
                {locale === "fr" ? "Profil" : "Summary"}
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-medium">
                {subtitle}
              </p>
            </motion.div>

            {/* ACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
              >
                {locale === "fr" ? "Voir les projets" : "Explore work"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/70 hover:bg-white text-black border border-black/15 text-xs font-bold px-5 py-3.5 rounded-full transition-all duration-200 active:scale-95"
              >
                Contact
              </a>
            </motion.div>
          </div>

          {/* COLONNE CENTRALE : PORTRAIT DÉTOURÉ/MONOCHROME & BADGES FLOTTANTS */}
          <div className="lg:col-span-7 flex justify-center items-center relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative w-[280px] h-[360px] sm:w-[370px] sm:h-[480px] xl:w-[430px] xl:h-[540px]"
            >
              {/* Image en dégradé de gris contrasté */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden grayscale contrast-125 shadow-2xl bg-neutral-300">
                <Image
                  src="/me.jpeg"
                  alt="Oumarou Billy"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Dégradé doux d'intégration vers le bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#ebebeb]/80 via-transparent to-transparent opacity-90" />
              </div>

              {/* BADGE FLOTTANT 1 : HAUT DROITE */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -right-3 sm:-right-8 top-12 bg-white/90 backdrop-blur-md border border-black/10 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[11px] font-bold tracking-tight text-black">
                  Next.js & Full-Stack
                </span>
              </motion.div>

              {/* BADGE FLOTTANT 2 : BAS DROITE */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -right-2 sm:-right-6 bottom-16 bg-white/90 backdrop-blur-md border border-black/10 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[11px] font-bold tracking-tight text-black">
                  Python AI & Flask
                </span>
              </motion.div>

              {/* BADGE STATS COMPACT : BAS GAUCHE */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -left-3 sm:-left-6 bottom-8 bg-black text-white rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-4"
              >
                <div>
                  <p className="text-xl font-black leading-none">5+</p>
                  <p className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">Projects</p>
                </div>
                <div className="w-[1px] h-6 bg-neutral-800" />
                <div>
                  <p className="text-xl font-black leading-none">2+</p>
                  <p className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">Years exp</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* COLONNE DROITE : PAGINATION STYLE CAROUSEL (Image 1) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-4 order-3">
            <span className="text-[11px] font-bold text-neutral-400 font-mono">01</span>
            <div className="flex flex-col items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-black flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-black" />
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
            </div>
            <span className="text-[11px] font-bold text-neutral-400 font-mono">05</span>
          </div>

        </div>

        {/* PIED DE CARTE HERO : SCROLL MOUSE */}
        <div className="relative z-20 flex items-center justify-between w-full pt-4 border-t border-black/5">
          <a
            href="#about"
            className="flex items-center gap-2.5 text-neutral-500 hover:text-black transition-colors"
          >
            <div className="w-4 h-6 rounded-full border border-neutral-400 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 bg-black rounded-full"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
              Scroll Mouse
            </span>
          </a>

          <div className="text-[10px] font-mono text-neutral-400">
            2026 EDITION
          </div>
        </div>

      </div>
    </section>
  );
}

