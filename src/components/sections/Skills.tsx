"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const lvl = (n: number, locale: string) => n >= 80 ? (locale === "fr" ? "Expert" : "Expert") : n >= 65 ? (locale === "fr" ? "Avancé" : "Advanced") : (locale === "fr" ? "Intermédiaire" : "Mid-level");
const lvlColor = (n: number) => n >= 80 ? "text-emerald-400" : n >= 65 ? "text-emerald-300" : "text-emerald-200";

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { skills, loading } = usePortfolio();

  return (
    <section id="skills" className="w-full bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">{t.skillsTitle}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
        >
          {locale === "fr" ? "Mon arsenal technique" : "My tech arsenal"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}
          className="text-neutral-500 text-sm mb-12"
        >
          {locale === "fr"
            ? "Technologies maîtrisées à travers des projets réels."
            : "Technologies mastered through real-world projects."}
        </motion.p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-20 bg-[#111] rounded-2xl animate-pulse border border-neutral-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="group bg-[#111] border border-neutral-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-200"
                title={skill.tooltip || skill.name}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {skill.name}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-wider shrink-0 ml-2 ${lvlColor(skill.level)}`}>
                    {lvl(skill.level, locale)}
                  </span>
                </div>
                {/* Barre */}
                <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.04 }}
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
