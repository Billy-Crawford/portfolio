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

  const badge = content?.hero_badge ? (locale === "fr" ? content.hero_badge.value_fr : content.hero_badge.value_en) : t.heroBadge;
  const subtitle = content?.hero_subtitle ? (locale === "fr" ? content.hero_subtitle.value_fr : content.hero_subtitle.value_en) : t.heroSubtitle;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--background)]">
      
      {/* ─── NUMÉROTATION VERTICALE (DROITE) ─── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden lg:flex z-50">
        <span className="text-xs font-bold text-gray-800">01</span>
        <div className="w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
        </div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <span className="text-xs font-bold text-gray-400 mt-2">05</span>
      </div>

      {/* ─── SCROLL MOUSE (BAS GAUCHE) ─── */}
      <div className="absolute left-8 bottom-12 flex items-center gap-3 hidden md:flex z-50">
        <div className="w-5 h-8 border-2 border-gray-800 rounded-full flex justify-center pt-1">
          <motion.div 
            className="w-1 h-2 bg-gray-800 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Scroll Mouse</span>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative h-full pt-20">
        
        {/* ─── TEXTE (GAUCHE) ─── */}
        <div className="lg:col-span-5 flex flex-col justify-center z-20 order-2 lg:order-1 mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="title-editorial text-[15vw] lg:text-[7.5rem] leading-[0.8] text-black">
              Oumarou<br />Billy
            </h1>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-4 ml-1">
              Published By {locale === "fr" ? "Moi-même" : "Myself"}
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 ml-1 max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full mb-6"></div>
            <h3 className="text-xl font-bold text-black mb-3">{badge}</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* ─── IMAGE CENTRALE ET BADGES FLOTTANTS ─── */}
        <div className="lg:col-span-7 relative flex justify-center items-center h-[50vh] lg:h-[80vh] z-10 order-1 lg:order-2">
          
          {/* L'image principale (en noir et blanc pour le style) */}
          <motion.div 
            className="relative w-full h-full max-w-lg lg:max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image 
              src="/profile.jpg" 
              alt="Oumarou Billy" 
              fill 
              className="object-contain grayscale contrast-125 drop-shadow-2xl" 
              priority 
            />
          </motion.div>

          {/* Badge 1 (Haut Droite) */}
          <motion.div 
            className="absolute top-1/4 right-0 lg:-right-10 floating-badge px-4 py-2 rounded-full flex items-center gap-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              {locale === "fr" ? "Ingénierie Logicielle" : "Software Engineering"}
            </span>
          </motion.div>

          {/* Ligne connecteur Badge 1 (purement décoratif, optionnel) */}
          <div className="absolute top-[27%] right-[10%] w-16 h-[1px] bg-black/20 hidden lg:block"></div>

          {/* Badge 2 (Bas Droite) */}
          <motion.div 
            className="absolute bottom-1/4 right-10 lg:right-0 floating-badge px-4 py-2 rounded-full flex items-center gap-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              {locale === "fr" ? "Développeur Full-Stack" : "Full-Stack Developer"}
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
