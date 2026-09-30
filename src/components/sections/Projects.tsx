// src/components/sections/Projects.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { useState, useEffect } from "react";

type Props = { locale: string };

type Project = {
  id?: number;
  name: string;
  name_fr?: string;
  name_en?: string;
  description: string;
  description_fr?: string;
  description_en?: string;
  stack: string[];
  link: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export default function Projects({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data.map((p) => ({
          ...p,
          name: locale === "fr" ? (p.name_fr || p.name) : (p.name_en || p.name),
          description: locale === "fr" ? (p.description_fr || p.description) : (p.description_en || p.description),
        })));
        setLoading(false);
      })
      .catch(() => {
        // fallback donnees statiques
        setProjects([
          { name: t.project1Name, description: t.project1Desc, stack: ["Next.js", "Django", "Tailwind", "TypeScript"], link: "#" },
          { name: t.project2Name, description: t.project2Desc, stack: ["Next.js", "Flutter", "Django", "Tailwind"], link: "#" },
          { name: t.project3Name, description: t.project3Desc, stack: ["Next.js", "Django", "Tailwind"], link: "#" },
          { name: t.project4Name, description: t.project4Desc, stack: ["React", "Laravel", "Tailwind"], link: "#" },
          { name: t.project5Name, description: t.project5Desc, stack: ["Python", "AI", "NLP"], link: "#" },
        ]);
        setLoading(false);
      });
  }, [locale]);

  return (
    <section id="projects" className="min-h-screen py-20">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {t.projectsTitle}
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project.name}
              className="p-6 rounded-xl bg-[var(--muted)] shadow-lg hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => window.open(project.link, "_blank")}
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded bg-[var(--accent)] text-black text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
