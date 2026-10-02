"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const lvl = (n: number, locale: string) =>
  n >= 80
    ? "Expert"
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
    <section id="skills" className="py-28 bg-[#080808] border-t border-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{t.skillsTitle}</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-14"
        >
          {locale === "fr" ? "Arsenal Technique" : "Tech Arsenal"}
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 bg-neutral-900/60 rounded-2xl animate-pulse border border-neutral-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-5 space-y-3 transition-colors"
                title={skill.tooltip || skill.name}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{skill.name}</span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    {lvl(skill.level, locale)}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
