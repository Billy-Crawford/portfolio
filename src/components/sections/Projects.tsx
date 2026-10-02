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
    <section id="projects" className="py-36 bg-[#080809] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            04 // {locale === "fr" ? "PROJETS SÉLECTIONNÉS" : "SELECTED WORKS"}
          </span>
          <div className="h-px flex-1 bg-white/10 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase"
          >
            {t.projectsTitle || (locale === "fr" ? "Réalisations" : "Featured Work")}
          </motion.h2>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            // {locale === "fr" ? "ARCHITECTURES & PRODUCTIONS" : "END-TO-END DEPLOYMENTS"}
          </p>
        </div>

        {/* LISTE LOOKBOOK MONUMENTALE DES PROJETS */}
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 bg-white/[0.02] rounded-3xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="py-12 group flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-white/[0.015] px-6 -mx-6 rounded-2xl transition-all duration-300"
              >
                {/* PARTIE GAUCHE : NUMÉRO + NOM DU PROJET */}
                <div className="flex items-start gap-8 lg:w-1/2">
                  <span className="text-xl font-mono text-neutral-600 group-hover:text-emerald-400 font-bold transition-colors">
                    0{i + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors uppercase">
                      {project.name}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal max-w-lg">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* PARTIE DROITE : STACK CAPSULES & LIEN SORTANT */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-6 lg:w-1/2">
                  <div className="flex flex-wrap gap-2">
                    {(project.stack || []).map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/[0.03] text-neutral-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-white/20 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-black text-white flex items-center justify-center transition-all duration-300 shrink-0"
                      title="Ouvrir le projet"
                    >
                      <span className="text-lg">↗</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
