// billy-portfolio/src/components/sections/Projects.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Projects({ locale }: Props) {
  const t = locale === "fr" ? fr : en;

  const projects = [
    {
      name: t.project1Name,
      description: t.project1Desc,
      stack: ["Next.js", "Django", "Tailwind", "TypeScript"],
      link: "#",
    },
    {
      name: t.project2Name,
      description: t.project2Desc,
      stack: ["Next.js", "Flutter", "Django", "Tailwind"],
      link: "#",
    },
    {
      name: t.project3Name,
      description: t.project3Desc,
      stack: ["Next.js", "Django", "Tailwind"],
      link: "#",
    },
    {
      name: t.project4Name,
      description: t.project4Desc,
      stack: ["React", "Laravel", "Tailwind"],
      link: "#",
    },
    {
        name: t.project5Name,
        description: t.project5Desc,
        stack: ["Python", "AI", "NLP"],
        link: "#",
    },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
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
    </section>
  );
}
