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
    <section
      id="projects"
      className="relative w-full bg-[#ebebeb] text-[#121212] py-28 select-none overflow-hidden"
    >
      {/* MOT EN ARRIÈRE-PLAN GÉANT TYPE GAZOO ÉDITORIAL BLANC */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-black/[0.03] tracking-tighter leading-none pointer-events-none whitespace-nowrap">
        PROJECTS
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* SUR-TITRE MINIMALISTE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500">
            {locale === "fr" ? "04 — RÉALISATIONS" : "04 — SELECTED WORK"}
          </span>
          <div className="h-[1px] w-12 bg-black/20" />
        </motion.div>

        {/* EN-TÊTE ÉDITORIALE CONTRASTÉE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight leading-[0.95]"
          >
            {t.projectsTitle || (locale === "fr" ? "Projets Clés" : "Key Works")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-neutral-500 text-xs sm:text-sm font-mono uppercase tracking-widest max-w-xs"
          >
            {locale === "fr"
              ? "// Solutions complètes & architectures évolutives."
              : "// End-to-end systems & scalable solutions."}
          </motion.p>
        </div>

        {/* GRILLE PROJETS */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-black/5 rounded-3xl animate-pulse border border-black/10"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-black/10 hover:border-black rounded-[28px] p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* NUMÉROTATION TYPE LOOKBOOK & LIEN DIRECT */}
                  <div className="flex items-start justify-between mb-8 pb-4 border-b border-black/5">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full border border-black/15 group-hover:border-black group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-200"
                        title="Ouvrir le projet"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M7 17L17 7m0 0H7m10 0v10"
                          />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* NOM ET DESCRIPTION */}
                  <h3 className="text-xl font-black text-black uppercase tracking-tight mb-3 group-hover:opacity-80 transition-opacity">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* PILE DE TECHNOLOGIES (TAGS CAPSULES MONOCHROMES) */}
                <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t border-black/5">
                  {(project.stack || []).map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-black/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

