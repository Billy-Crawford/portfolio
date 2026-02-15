// billy-portfolio/src/components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

const skillsList = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Django + DRF",
  "Python AI (TensorFlow, PyTorch, Scikit-learn)",
  "NLP / Computer Vision",
  "Databases (PostgreSQL, MongoDB, MySQL, SQLServer)",
];

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;

  return (
    <section id="skills" className="min-h-screen py-20">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {t.skillsTitle}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skillsList.map((skill, index) => (
          <motion.div
            key={skill}
            className="p-6 rounded-xl bg-[var(--muted)] hover:scale-105 transition-transform cursor-default"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">{skill}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
