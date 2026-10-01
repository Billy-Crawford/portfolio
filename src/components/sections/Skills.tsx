"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const lvl = (n: number, locale: string) =>
  n >= 80
    ? locale === "fr"
      ? "Expert"
      : "Expert"
    : n >= 65
    ? locale === "fr"
      ? "Avancé"
      : "Advanced"
    : locale === "fr"
    ? "Intermédiaire"
    : "Mid-level";

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { skills, loading } = usePortfolio();

  return (
    <section
      id="skills"
      className="relative w-full bg-[#0c0c0c] py-28 border-t border-neutral-900 select-none overflow-hidden"
    >
      {/* MOT EN ARRIÈRE-PLAN GÉANT TYPE GAZOO EDITORIAL */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.015] tracking-tighter leading-none pointer-events-none whitespace-nowrap">
        EXPERTISE
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* SUR-TITRE MINIMALISTE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500">
            {locale === "fr" ? "03 — COMPÉTENCES" : "03 — TECH STACK"}
          </span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </motion.div>

        {/* EN-TÊTE DE SECTION STYLE LOOKBOOK */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]"
          >
            {locale === "fr" ? (
              <>
                Arsenal <br />
                <span className="text-neutral-500">Technique</span>
              </>
            ) : (
              <>
                Tech <br />
                <span className="text-neutral-500">Arsenal</span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-neutral-500 text-xs sm:text-sm uppercase tracking-widest max-w-xs font-mono"
          >
            {locale === "fr"
              ? "// Technologies éprouvées en production et recherche appliquée."
              : "// Production-ready stacks & applied research."}
          </motion.p>
        </div>

        {/* CONTENU / SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-[#141414] rounded-2xl animate-pulse border border-neutral-900"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="group bg-[#141414] border border-neutral-800/80 hover:border-neutral-500 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between"
                title={skill.tooltip || skill.name}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-base font-bold text-white tracking-tight group-hover:translate-x-0.5 transition-transform">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 shrink-0">
                      {lvl(skill.level, locale)}
                    </span>
                  </div>
                </div>

                {/* JAUGE MONOCHROME ULTRA-FINE AVEC POURCENTAGE MONO */}
                <div className="pt-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mb-1.5">
                    <span>PROFICIENCY</span>
                    <span className="text-neutral-400">{skill.level}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.03 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
