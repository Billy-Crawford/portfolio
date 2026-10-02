"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const lvl = (n: number, locale: string) =>
  n >= 80
    ? "EXPERT"
    : n >= 65
    ? locale === "fr"
      ? "AVANCÉ"
      : "ADVANCED"
    : locale === "fr"
    ? "INTERMÉDIAIRE"
    : "MID-LEVEL";

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { skills, loading } = usePortfolio();

  return (
    <section id="skills" className="py-36 bg-[#080809] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            03 // {locale === "fr" ? "ARSENAL TECHNIQUE" : "TECH STACK"}
          </span>
          <div className="h-px flex-1 bg-white/10 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase"
          >
            {t.skillsTitle || (locale === "fr" ? "Compétences Clés" : "Technical Arsenal")}
          </motion.h2>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            // {locale === "fr" ? "PRODUCTIONS & RECHERCHE APPLIQUÉE" : "PRODUCTION & APPLIED RESEARCH"}
          </p>
        </div>

        {/* GRILLE ÉLÉGANTE ÉDITORIALE */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 bg-white/[0.02] rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="bg-[#101012] border border-white/10 hover:border-white/25 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
                title={skill.tooltip || skill.name}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 border border-white/10 px-2.5 py-1 rounded-full bg-white/[0.02]">
                      {lvl(skill.level, locale)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                    <span>MAÎTRISE</span>
                    <span className="text-neutral-300">{skill.level}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
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
