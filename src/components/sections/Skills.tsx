"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const CATEGORIES: Record<string, string[]> = {
  "Frontend":   ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  "Backend":    ["Django + DRF", "Flask", "Python"],
  "IA & Data":  ["Python AI (TensorFlow, PyTorch, Scikit-learn)", "NLP / Computer Vision"],
  "Databases":  ["Databases (PostgreSQL, MongoDB, MySQL, SQLServer)"],
  "Tooling":    ["Git", "GitHub", "WordPress"],
};

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { skills, loading } = usePortfolio();

  const getLevelLabel = (level: number) => {
    if (level >= 80) return locale === "fr" ? "Expert" : "Expert";
    if (level >= 65) return locale === "fr" ? "Avancé" : "Advanced";
    return locale === "fr" ? "Intermédiaire" : "Intermediate";
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return "bg-[#0A0A0A] text-[#FAFAF9]";
    if (level >= 65) return "bg-[#374151] text-white";
    return "bg-[#E5E5E3] text-[#6B7280]";
  };

  return (
    <section id="skills" className="py-28 border-t border-[#E5E5E3] bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-6 h-px bg-[#C9A96E]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
            {t.skillsTitle}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-[#0A0A0A] uppercase mb-16"
        >
          {locale === "fr" ? "Mon Stack\nTechnique" : "My Tech\nStack"}
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 bg-[#F0EFED] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="group relative flex items-center justify-between gap-3 bg-white border border-[#E5E5E3] rounded-xl px-5 py-4 hover:border-[#0A0A0A] hover:shadow-md transition-all duration-200 cursor-default"
                title={skill.tooltip || skill.name}
              >
                <span className="text-sm font-bold text-[#0A0A0A] leading-tight truncate">
                  {skill.name}
                </span>
                <span className={`shrink-0 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${getLevelColor(skill.level)}`}>
                  {getLevelLabel(skill.level)}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
