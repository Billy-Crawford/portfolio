// src/components/sections/Projects.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Projects({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { projects, loading } = usePortfolio();

  return (
    <section id="projects" className="py-20 min-h-screen">
      <motion.h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-14 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        {t.projectsTitle}
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div key={index} className="flex flex-col h-full rounded-2xl overflow-hidden bg-[var(--muted)] hover:-translate-y-2 transition-transform duration-300 shadow-lg" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                <p className="text-gray-400 mb-6 line-clamp-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-[var(--accent)] border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
