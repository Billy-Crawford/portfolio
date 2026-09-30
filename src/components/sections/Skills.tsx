// src/components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { skills, loading } = usePortfolio();

  return (
    <section id="skills" className="py-20 min-h-screen flex flex-col justify-center">
      <motion.h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-14 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        {t.skillsTitle}
      </motion.h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-[var(--muted)] border border-gray-800 animate-pulse">
              <div className="h-6 bg-gray-700 rounded-md w-1/2 mb-4"></div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div className="h-2.5 rounded-full bg-gray-700 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
          {skills.map((skill, index) => (
            <motion.div key={index} className="group flex flex-col items-center p-6 rounded-2xl bg-[var(--muted)] border border-gray-800 hover:border-[var(--accent)] transition-colors relative" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
              <div className="text-lg md:text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors z-10 mb-4 text-center">
                {skill.name}
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <motion.div className="h-2.5 rounded-full bg-[var(--accent)]" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: 0.5 + index * 0.1 }} viewport={{ once: true }}></motion.div>
              </div>
              {skill.tooltip && (
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-[var(--accent)] text-black text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap z-20">
                  {skill.tooltip}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
