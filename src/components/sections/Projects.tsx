"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const colors = [
  "from-[#10b981]/20 to-[#065f46]/10",
  "from-[#3b82f6]/20 to-[#1e3a8a]/10",
  "from-[#8b5cf6]/20 to-[#4c1d95]/10",
  "from-[#f59e0b]/20 to-[#78350f]/10",
  "from-[#ef4444]/20 to-[#7f1d1d]/10",
];
const borders = [
  "hover:border-[#10b981]/40",
  "hover:border-[#3b82f6]/40",
  "hover:border-[#8b5cf6]/40",
  "hover:border-[#f59e0b]/40",
  "hover:border-[#ef4444]/40",
];

export default function Projects({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { projects, loading } = usePortfolio();

  return (
    <section id="projects" className="py-28 bg-[#080808] relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#10b981]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[#10b981]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">
                {locale === "fr" ? "Travaux sélectionnés" : "Selected Work"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              {t.projectsTitle}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
            className="text-sm text-[#737373] max-w-xs"
          >
            {locale === "fr"
              ? "Quelques-uns des projets qui définissent mon approche technique."
              : "Projects that define my technical approach and problem-solving."}
          </motion.p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-[#0f0f0f] rounded-3xl animate-pulse border border-[#1f1f1f]" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`group relative bg-[#0f0f0f] border border-[#1f1f1f] ${borders[i % borders.length]} rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer`}
              >
                {/* Gradient top */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${colors[i % colors.length]} opacity-60`} />

                <div className="relative p-7 flex flex-col h-full min-h-[280px]">
                  {/* Numéro + lien */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-xs font-black tabular-nums text-[#333]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {project.link && project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-[#1f1f1f] group-hover:border-white/20 flex items-center justify-center transition-colors"
                        onClick={e => e.stopPropagation()}>
                        <svg className="w-3.5 h-3.5 text-[#737373] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Nom + desc */}
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#10b981] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[#737373] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[#1f1f1f]">
                    {(project.stack || []).map((tech, ti) => (
                      <span key={ti}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#1a1a1a] text-[#a3a3a3] border border-[#2a2a2a]">
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
