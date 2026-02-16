// src/components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { useState } from "react";

type Props = { locale: string };

type Skill = {
  name: string;
  level: number; // 0 à 100
  tooltip?: string;
};

const skillsList: Skill[] = [
  { name: "Next.js", level: 85, tooltip: "Framework React moderne pour frontend SSR/SSG" },
  { name: "React", level: 65, tooltip: "Bibliothèque principale pour UI web" },
  { name: "Tailwind CSS", level: 80, tooltip: "Framework CSS utilitaire rapide" },
  { name: "TypeScript", level: 75, tooltip: "Typage statique pour JS" },
  { name: "Django + DRF", level: 70, tooltip: "Backend Python RESTful API" },
  { name: "Python AI (TensorFlow, PyTorch, Scikit-learn)", level: 65, tooltip: "Apprentissage automatique et deep learning" },
  { name: "NLP / Computer Vision", level: 50, tooltip: "Projets IA sur texte et image" },
  { name: "Databases (PostgreSQL, MongoDB, MySQL, SQLServer)", level: 75, tooltip: "Bases de données relationnelles et NoSQL" },
];

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const radius = 50;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="min-h-screen py-20">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {t.skillsTitle}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 justify-items-center">
        {skillsList.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="relative flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Cercle SVG */}
            <svg width={120} height={120}>
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#333"
                strokeWidth={stroke}
                fill="transparent"
              />
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                stroke="var(--accent)"
                strokeWidth={stroke}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (skill.level / 100) * circumference }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-white font-semibold text-lg"
              >
                {skill.level}%
              </text>
            </svg>

            <h3 className="mt-4 text-center font-semibold text-lg">{skill.name}</h3>

            {/* Tooltip */}
            {hoveredSkill === skill.name && skill.tooltip && (
              <motion.div
                className="absolute top-full mt-2 p-2 rounded-md bg-[var(--background)] text-white text-sm shadow-lg w-52 text-center z-50"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {skill.tooltip}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
