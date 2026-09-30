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
    <section className="relative w-full h-screen bg-[#f4f4f5] text-black overflow-hidden flex items-center">
      
      {/* ─── NUMÉROTATION VERTICALE (DROITE) ─── */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-4 hidden lg:flex z-50">
        <span className="text-xs font-black tracking-widest text-black">01</span>
        <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <span className="text-xs font-bold tracking-widest text-gray-400 mt-2">05</span>
      </div>

      {/* ─── SCROLL MOUSE (BAS GAUCHE) ─── */}
      <div className="absolute left-6 md:left-12 bottom-12 flex items-center gap-4 z-50">
        <div className="w-5 h-8 border-2 border-black rounded-full flex justify-center pt-1">
          <motion.div 
            className="w-1 h-2 bg-black rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">Scroll Mouse</span>
      </div>

      {/* ─── CONTENU PRINCIPAL ─── */}
      <div className="w-full max-w-[1600px] mx-auto relative px-6 md:px-12 h-full flex items-center">
        
        {/* COLONNE GAUCHE (TEXTE GÉANT) */}
        <div className="w-full md:w-3/5 z-10 flex flex-col justify-between h-[60vh] mt-20 relative">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Typographie Géante - Calquée sur le style Joker */}
            <h1 className="text-[22vw] md:text-[14vw] font-black uppercase leading-[0.75] tracking-tighter text-black whitespace-nowrap">
              Oumarou
            </h1>
            <h1 className="text-[22vw] md:text-[14vw] font-black uppercase leading-[0.75] tracking-tighter text-black whitespace-nowrap md:ml-24">
              Billy
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mt-8 ml-2">
              Published By {locale === "fr" ? "Moi-même" : "Myself"}
            </p>
          </motion.div>

          {/* Block texte inférieur (comme "Power") */}
          <motion.div 
            className="mb-10 max-w-sm ml-2 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full mb-5"></div>
            <h3 className="text-lg font-black text-black uppercase tracking-wider mb-2">{badge}</h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* ─── IMAGE CENTRALE (QUI CHEVAUCHE LE TEXTE) ─── */}
        {/* L'image est z-20 pour passer au-dessus des lettres du titre */}
        <div className="absolute right-[-10%] md:right-[5%] lg:right-[15%] top-[40%] md:top-1/2 -translate-y-1/2 w-[110vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[85vh] z-20 pointer-events-none">
          
          {/* 
            mix-blend-multiply est LE secret. Il va faire disparaitre le fond de ton image 
            pour la fusionner dans le gris du site, comme si c'était détouré. 
          */}
          <motion.div 
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image 
              src="/profile.jpg" 
              alt="Oumarou Billy" 
              fill 
              className="object-contain grayscale contrast-[1.2] mix-blend-multiply drop-shadow-2xl" 
              priority 
            />
          </motion.div>

          {/* BADGES FLOTTANTS (Glassmorphism Tailwind) */}
          <motion.div 
            className="absolute top-[25%] right-[10%] lg:-right-10 bg-white/60 backdrop-blur-md border border-white/40 shadow-xl px-5 py-2.5 rounded-full flex items-center gap-3 pointer-events-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-2.5 h-2.5 bg-black rounded-full shadow-inner"></div>
            <span className="text-xs font-bold text-black uppercase tracking-widest">
              {locale === "fr" ? "Ingénierie Logicielle" : "Software Engineering"}
            </span>
          </motion.div>

          <motion.div 
            className="absolute bottom-[20%] left-[5%] lg:-left-12 bg-white/60 backdrop-blur-md border border-white/40 shadow-xl px-5 py-2.5 rounded-full flex items-center gap-3 pointer-events-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="w-2.5 h-2.5 bg-black rounded-full shadow-inner"></div>
            <span className="text-xs font-bold text-black uppercase tracking-widest">
              {locale === "fr" ? "Développeur Full-Stack" : "Full-Stack Developer"}
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
