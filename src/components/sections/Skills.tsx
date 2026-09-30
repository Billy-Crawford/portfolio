// src/components/sections/Skills.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { useState, useEffect } from "react";

type Props = { locale: string };

type Skill = {
  id?: number;
  name: string;
  level: number;
  tooltip?: string;
  tooltip_fr?: string;
  tooltip_en?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data: Skill[]) => {
        setSkillsList(data.map((s) => ({
          ...s,
          tooltip: locale === "fr" ? s.tooltip_fr : s.tooltip_en,
        })));
        setLoading(false);
      })
      .catch(() => {
        // fallback donnees statiques
        const staticSkills: Skill[] = (t.skillsList as Skill[]) || [];
        setSkillsList(staticSkills);
        setLoading(false);
      });
  }, [locale]);

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

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
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
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="var(--accent)"
                  strokeWidth={stroke}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (skill.level / 100) * circumference}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {skill.level}%
                </text>
              </svg>

              {/* Nom */}
              <p className="mt-3 text-sm text-center font-medium text-white max-w-[100px]">
                {skill.name}
              </p>

              {/* Infobulle */}
              {hoveredSkill === skill.name && skill.tooltip && (
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-black text-xs px-3 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {skill.tooltip}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
