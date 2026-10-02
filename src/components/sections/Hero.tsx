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
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center bg-[#080809] pt-32 pb-24 overflow-hidden">
      
      {/* FILIGRANE ÉDITORIAL AWWWARDS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-display font-black text-white/[0.015] select-none pointer-events-none tracking-tighter leading-none whitespace-nowrap z-0">
        OUMAROU
      </div>

      {/* Halo de lumière très subtil */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center z-10">
        
        {/* COLONNE GAUCHE : TYPOGRAPHIE MONUMENTALE (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-10">
          
          {/* Badge statut chic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-full px-5 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-300 font-medium">
              {locale === "fr" ? "DISPONIBLE POUR MISSIONS" : "OPEN FOR OPPORTUNITIES"}
            </span>
          </motion.div>

          {/* Grand titre éditorial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.92] uppercase">
              Oumarou <br />
              <span className="text-neutral-500 font-extrabold italic font-sans lowercase tracking-normal">
                billy
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-emerald-400 pt-3 font-semibold">
              // {locale === "fr" ? "INGÉNIEUR FULL-STACK & MASTER IA" : "FULL-STACK ARCHITECT & AI ENGINEER"}
            </p>
          </motion.div>

          {/* Description aérée */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl font-normal"
          >
            {subtitle}
          </motion.p>

          {/* Boutons d'action grand style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-4 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-[0.2em] font-bold px-8 py-4.5 rounded-full transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            >
              <span>{locale === "fr" ? "DÉCOUVRIR LES TRAVAUX" : "SELECTED WORKS"}</span>
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] font-bold text-neutral-300 hover:text-white px-8 py-4.5 rounded-full border border-white/15 hover:border-white/40 transition-all duration-300"
            >
              <span>CONTACT</span>
            </a>
          </motion.div>

          {/* Métriques style catalogue éditorial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-3 gap-10 pt-10 border-t border-white/10 w-full max-w-lg"
          >
            <div>
              <p className="font-display text-4xl font-black text-white tracking-tighter">05+</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "PROJETS DEPLOYÉS" : "SYSTEMS BUILT"}
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-white tracking-tighter">11+</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "TECHNOLOGIES" : "TECH STACK"}
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-white tracking-tighter">02+</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                {locale === "fr" ? "ANS EXPÉRIENCE" : "YEARS EXP."}
              </p>
            </div>
          </motion.div>

        </div>

        {/* COLONNE DROITE : PORTRAIT ÉDITORIAL HAUT DE GAMME (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="relative w-full max-w-[380px] aspect-[3.8/5]">
            
            {/* Cadre de luxe avec double liseré */}
            <div className="absolute inset-0 border border-white/10 rounded-[32px] transform translate-x-3 translate-y-3 pointer-events-none" />

            <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/15 bg-neutral-900 shadow-[0_30px_90px_rgba(0,0,0,0.8)] group">
              <Image
                src="/me.jpeg"
                alt="Oumarou Billy"
                fill
                className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent opacity-60" />
            </div>

            {/* Légende typographique en bas de l'image */}
            <div className="absolute -bottom-6 -right-4 bg-[#101012] border border-white/10 rounded-2xl p-4.5 shadow-2xl backdrop-blur-md">
              <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">// PROFILE</p>
              <p className="font-display font-bold text-sm text-white mt-0.5">Oumarou Billy</p>
              <p className="text-[11px] text-neutral-400 font-mono">Master AI · Full-Stack</p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
