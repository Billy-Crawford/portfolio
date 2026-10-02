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
    <section id="home" className="relative min-h-[90vh] w-full flex items-center justify-center bg-[#080809] pt-36 pb-24 overflow-hidden">
      
      {/* Halo de lumière très subtil derrière le portrait */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10">
        
        {/* BLOC GAUCHE : TEXTE & ACTIONS (Largeur contrôlée pour ne jamais déborder) */}
        <div className="w-full lg:w-[60%] flex flex-col items-start space-y-8">
          
          {/* Badge statut */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-full px-4.5 py-2 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-300 font-medium">
              {locale === "fr" ? "DISPONIBLE POUR MISSIONS" : "OPEN FOR OPPORTUNITIES"}
            </span>
          </motion.div>

          {/* Grand titre éditorial responsive (clamp & overflow-hidden sécurisé) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3 w-full"
          >
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase break-words">
              Oumarou <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300">
                Billy
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400 pt-1 font-medium">
              // {locale === "fr" ? "DÉVELOPPEUR FULL-STACK & INGÉNIERIE IA" : "FULL-STACK DEVELOPER & AI ENGINEER"}
            </p>
          </motion.div>

          {/* Description aérée et lisible */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl font-normal"
          >
            {subtitle}
          </motion.p>

          {/* Boutons d'action grand style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-[0.18em] font-bold px-7 py-4 rounded-full transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            >
              <span>{locale === "fr" ? "VOIR MES PROJETS" : "SELECTED WORKS"}</span>
              <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] font-bold text-neutral-300 hover:text-white px-7 py-4 rounded-full border border-white/15 hover:border-white/40 transition-all duration-300 active:scale-95"
            >
              <span>CONTACT</span>
            </a>
          </motion.div>

          {/* Métriques style catalogue éditorial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-white/10 w-full max-w-lg"
          >
            <div>
              <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">05+</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "PROJETS RÉALISÉS" : "PROJECTS BUILT"}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">11+</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "TECHNOLOGIES" : "TECH STACK"}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">02+</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "ANS D'EXPÉRIENCE" : "YEARS EXP."}
              </p>
            </div>
          </motion.div>

        </div>

        {/* BLOC DROITE : PORTRAIT DÉTOURÉ (me-rbg.png) INTÉGRÉ NATURELLEMENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[40%] flex justify-center items-center relative"
        >
          <div className="relative w-[280px] sm:w-[320px] lg:w-[360px] aspect-[3/4]">
            
            {/* Halo lumineux d'aura subtile derrière le détourage */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent rounded-full blur-3xl opacity-70 transform scale-90 translate-y-6" />

            {/* Photo sans background */}
            <div className="relative w-full h-full">
              <Image
                src="/me-rbg.png"
                alt="Oumarou Billy"
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>

            {/* Petit badge élégant en coin */}
            <div className="absolute bottom-2 right-0 bg-[#101012]/90 border border-white/10 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md">
              <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">// INGÉNIEUR</p>
              <p className="font-display font-bold text-sm text-white mt-0.5">Oumarou Billy</p>
              <p className="text-[11px] text-neutral-400 font-mono">Full-Stack & IA</p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
