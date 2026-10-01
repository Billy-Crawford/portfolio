"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function About({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const text =
    locale === "fr"
      ? (content?.about_text?.value_fr ?? t.aboutText)
      : (content?.about_text?.value_en ?? t.aboutText);

  const cards = [
    {
      icon: "01",
      label: locale === "fr" ? "Formation" : "Education",
      value:
        locale === "fr"
          ? "Master Intelligence Artificielle"
          : "MSc Artificial Intelligence",
    },
    {
      icon: "02",
      label: locale === "fr" ? "Localisation" : "Location",
      value: "Ouagadougou, Burkina Faso",
    },
    {
      icon: "03",
      label: "Stack",
      value: "Next.js · Flask · Python · PostgreSQL",
    },
    {
      icon: "04",
      label: "Focus",
      value: locale === "fr" ? "Web · IA · Mobile" : "Web · AI · Mobile",
    },
  ];

  return (
    <section id="about" className="relative w-full bg-[#0c0c0c] py-28 overflow-hidden select-none border-t border-neutral-900">
      
      {/* MOT EN ARRIÈRE-PLAN GÉANT TYPE GAZOO / WATERMARK EDITORIAL */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.02] tracking-tighter leading-none pointer-events-none whitespace-nowrap">
        ABOUT
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* SUR-TITRE MINIMALISTE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500">
            {locale === "fr" ? "02 — À PROPOS" : "02 — ABOUT ME"}
          </span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </motion.div>

        {/* SECTION 2 COLONNES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* COLONNE GAUCHE : TITRE GÉANT ET TEXTE */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight uppercase"
            >
              {locale === "fr" ? (
                <>
                  Concevoir <br />
                  <span className="text-neutral-500">avec précision</span>
                </>
              ) : (
                <>
                  Building <br />
                  <span className="text-neutral-500">that matters</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm sm:text-base leading-relaxed mt-8 max-w-lg font-normal"
            >
              {text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-xs uppercase font-bold tracking-widest text-white border-b-2 border-white pb-2 hover:text-neutral-400 hover:border-neutral-400 transition-all duration-200"
              >
                {locale === "fr" ? "Prendre contact" : "Get in touch"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* COLONNE DROITE : CARTES ÉDITORIALES STYLE INDEX (Image 2) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                viewport={{ once: true }}
                className="bg-[#141414] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-600 transition-colors group"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-mono text-neutral-500 font-bold group-hover:text-white transition-colors">
                    [{card.icon}]
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                    {card.label}
                  </span>
                </div>
                <p className="text-sm font-bold text-white tracking-tight leading-snug">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
