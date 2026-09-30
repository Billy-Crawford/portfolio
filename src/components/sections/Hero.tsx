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
    <section className="relative w-full min-h-screen bg-[#f4f4f5] text-black pt-32 pb-16 flex items-center overflow-hidden">
      
      {/* ─── SCROLL MOUSE (BAS GAUCHE) ─── */}
      <div className="absolute left-6 md:left-12 bottom-8 flex items-center gap-4 z-50">
        <div className="w-5 h-8 border-2 border-black rounded-full flex justify-center pt-1">
          <motion.div 
            className="w-1 h-2 bg-black rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-xs font-bold text-gray-800 uppercase tracking-widest hidden md:block">Scroll Mouse</span>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* COLONNE GAUCHE (TEXTE) */}
        <div className="lg:col-span-7 flex flex-col z-10 order-2 lg:order-1">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter text-black">
              Oumarou<br/>Billy
            </h1>
            <p className="mt-8 text-xs sm:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase">
              Published By {locale === "fr" ? "Moi-même" : "Myself"}
            </p>
          </motion.div>

          {/* Badges intégrés proprement dans le flux */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-xs font-bold uppercase tracking-widest">
                {locale === "fr" ? "Ingénierie Logicielle" : "Software Engineering"}
              </span>
            </div>
            <div className="bg-white border border-gray-200 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-xs font-bold uppercase tracking-widest">
                {locale === "fr" ? "Développeur Full-Stack" : "Full-Stack Developer"}
              </span>
            </div>
          </motion.div>

          {/* Block texte description */}
          <motion.div 
            className="mt-12 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full mb-4"></div>
            <h3 className="text-lg font-black text-black uppercase tracking-wider mb-3">{badge}</h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* COLONNE DROITE (IMAGE) */}
        <motion.div 
          className="lg:col-span-5 relative w-full aspect-[4/5] lg:h-[75vh] order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Un conteneur propre, bords arrondis, ombre élégante */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
            <Image 
              src="/profile.jpg" 
              alt="Oumarou Billy" 
              fill 
              className="object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700 ease-out" 
              priority 
            />
          </div>
          
          {/* Pagination verticale accrochée à l'image */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 hidden xl:flex z-50">
            <span className="text-xs font-black tracking-widest text-black">01</span>
            <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs font-bold tracking-widest text-gray-400 mt-2">05</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
