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
    <section id="home" className="relative min-h-[92vh] w-full flex items-center justify-center bg-[#080809] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      
      {/* Halo de lumière très subtil */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/[0.035] rounded-full blur-[160px] pointer-events-none" />

      {/* CONTENEUR ULTRA-LARGE AVEC PADDINGS RESPONSIVE ADAPTÉS */}
      <div className="relative w-full max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10">
        
        {/* BLOC GAUCHE : IDENTITÉ & TEXTE */}
        <div className="w-full lg:flex-1 flex flex-col items-start space-y-6 sm:space-y-8">
          
          {/* Badge statut */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 sm:gap-3 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-full px-4 sm:px-5 py-2 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-300 font-medium">
              {locale === "fr" ? "DISPONIBLE POUR MISSIONS" : "OPEN FOR OPPORTUNITIES"}
            </span>
          </motion.div>

          {/* Grand titre éditorial responsive fluide avec clamp pour ne jamais déborder sur mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3 w-full"
          >
            <h1 className="font-display text-[clamp(2.1rem,9vw,5.5rem)] font-black tracking-tight text-white leading-[1.05] uppercase">
              Oumarou <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300">
                Billy
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.2em] sm:tracking-[0.28em] text-neutral-400 pt-1 font-medium">
              // {locale === "fr" ? "DÉVELOPPEUR FULL-STACK & INGÉNIERIE IA" : "FULL-STACK DEVELOPER & AI ENGINEER"}
            </p>
          </motion.div>

          {/* Description aérée */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-neutral-400 leading-relaxed max-w-2xl font-normal"
          >
            {subtitle}
          </motion.p>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 sm:gap-5 pt-2 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-3 sm:gap-4 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold px-6 sm:px-8 py-3.5 sm:py-4.5 rounded-full transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)] w-full sm:w-auto"
            >
              <span>{locale === "fr" ? "VOIR MES PROJETS" : "SELECTED WORKS"}</span>
              <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold text-neutral-300 hover:text-white px-6 sm:px-8 py-3.5 sm:py-4.5 rounded-full border border-white/15 hover:border-white/40 transition-all duration-300 active:scale-95 w-full sm:w-auto text-center"
            >
              <span>CONTACT</span>
            </a>
          </motion.div>

          {/* Métriques bien aérées */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-xl"
          >
            <div>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">05+</p>
              <p className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "PROJETS RÉALISÉS" : "PROJECTS BUILT"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">11+</p>
              <p className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "TECHNOLOGIES" : "TECH STACK"}
              </p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">02+</p>
              <p className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "ANS D'EXPÉRIENCE" : "YEARS EXP."}
              </p>
            </div>
          </motion.div>

        </div>

        {/* BLOC DROITE : PORTRAIT AVEC BACKGROUND (me.jpeg) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-auto flex justify-center items-center relative shrink-0 pt-4 lg:pt-0"
        >
          <div className="relative w-[260px] sm:w-[340px] xl:w-[400px] aspect-[3.8/5]">
            
            {/* Liseré géométrique d'art */}
            <div className="absolute inset-0 border border-white/10 rounded-[28px] sm:rounded-[32px] transform translate-x-2.5 sm:translate-x-3 translate-y-2.5 sm:translate-y-3 pointer-events-none" />

            {/* Cadre de luxe avec filtre N&B par défaut et passage en couleur au survol */}
            <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden border border-white/15 bg-neutral-900 shadow-[0_30px_90px_rgba(0,0,0,0.85)] group cursor-pointer">
              <Image
                src="/me.jpeg"
                alt="Oumarou Billy"
                fill
                className="object-cover object-top filter grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
            </div>

            {/* Badge élégant */}
            <div className="absolute -bottom-4 sm:-bottom-5 -right-2 sm:-right-3 bg-[#101012] border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-md">
              <p className="text-[9px] sm:text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">// INGÉNIEUR</p>
              <p className="font-display font-bold text-xs sm:text-sm text-white mt-0.5">Oumarou Billy</p>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">Full-Stack & IA</p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
