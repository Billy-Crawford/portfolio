"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const getLevelLabel = (level: number, locale: string) => {
  if (level >= 80) return locale === "fr" ? "Expert" : "Expert";
  if (level >= 65) return locale === "fr" ? "Avancé" : "Advanced";
  return locale === "fr" ? "Intermédiaire" : "Mid-level";
};

const getLevelColor = (level: number) => {
  if (level >= 80) return "text-[#10b981]";
  if (level >= 65) return "text-[#34d399]";
  return "text-[#6ee7b7]";
};

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { skills, loading } = usePortfolio();

  return (
    <section id="skills" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#10b981]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[#10b981]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">
                {t.skillsTitle}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              {locale === "fr" ? "Mon arsenal\ntechnique" : "My tech\narsenal"}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
            className="text-sm text-[#737373] max-w-xs md:text-right"
          >
            {locale === "fr"
              ? "Technologies maîtrisées à travers des projets réels."
              : "Technologies mastered through real-world projects."}
          </motion.p>
        </div>

        {/* Grille */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-20 bg-[#0f0f0f] rounded-2xl animate-pulse border border-[#1f1f1f]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.4)" }}
                className="flex flex-col justify-between bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-4 cursor-default transition-colors group"
                title={skill.tooltip || skill.name}
              >
                <span className="text-sm font-bold text-white group-hover:text-[#10b981] transition-colors leading-tight">
                  {skill.name}
                </span>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex-1 h-1 bg-[#1f1f1f] rounded-full overflow-hidden mr-3">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.04 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider shrink-0 ${getLevelColor(skill.level)}`}>
                    {getLevelLabel(skill.level, locale)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
