"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const ACCENTS = [
  "hover:border-emerald-500/40 from-emerald-500/10 to-transparent",
  "hover:border-blue-500/40 from-blue-500/10 to-transparent",
  "hover:border-violet-500/40 from-violet-500/10 to-transparent",
  "hover:border-amber-500/40 from-amber-500/10 to-transparent",
  "hover:border-rose-500/40 from-rose-500/10 to-transparent",
];

export default function Projects({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { projects, loading } = usePortfolio();

  return (
    <section id="projects" className="w-full bg-[#080808] py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            {locale === "fr" ? "Travaux sélectionnés" : "Selected Work"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-12"
        >
          {t.projectsTitle}
        </motion.h2>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-[#111] rounded-2xl animate-pulse border border-neutral-800" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className={`group relative bg-[#0f0f0f] border border-neutral-800 ${ACCENTS[i % ACCENTS.length].split(" ")[0]} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Gradient */}
                <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b ${ACCENTS[i % ACCENTS.length].split(" ").slice(1).join(" ")}`} />

                <div className="relative p-6 flex flex-col h-full min-h-[260px]">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-black text-neutral-600 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {project.link && project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-neutral-600 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <h3 className="text-base font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-800/60">
                    {(project.stack || []).map((tech, ti) => (
                      <span key={ti}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
