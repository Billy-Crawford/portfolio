"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { 
  locale: string;
  preview?: boolean;
};

export default function Projects({ locale, preview = false }: Props) {
  const t = locale === "fr" ? fr : en;
  const { projects, loading } = usePortfolio();

  const displayedProjects = preview ? projects.slice(0, 4) : projects;

  return (
    <section id="projects" className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            04 // {preview ? (locale === "fr" ? "PROJETS SÉLECTIONNÉS (APERÇU)" : "FEATURED SELECTION") : (locale === "fr" ? "TOUTES LES RÉALISATIONS" : "ALL SELECTED WORKS")}
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-14 sm:mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight uppercase"
            >
              {t.projectsTitle || (locale === "fr" ? "Réalisations" : "Featured Work")}
            </motion.h2>
            {preview && (
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-2">
                {locale === "fr" 
                  ? "Aperçu de quelques réalisations majeures développées de bout en bout."
                  : "Curated highlight of flagship full-stack and AI projects."}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              // {locale === "fr" ? "ARCHITECTURES & PRODUCTIONS" : "END-TO-END DEPLOYMENTS"}
            </p>
            {preview && projects.length > 4 && (
              <Link
                href={`/${locale}/projects`}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
              >
                <span>{locale === "fr" ? "Explorer tout" : "Explore all"} ({projects.length})</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>

        {/* LISTE LOOKBOOK DES PROJETS */}
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 bg-neutral-200 dark:bg-white/[0.02] rounded-3xl animate-pulse border border-neutral-300 dark:border-white/5" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
            {displayedProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="py-8 sm:py-12 group flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 hover:bg-black/[0.02] dark:hover:bg-white/[0.015] px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-300"
              >
                {/* PARTIE GAUCHE : NUMÉRO + NOM DU PROJET */}
                <div className="flex items-start gap-5 sm:gap-8 lg:w-1/2">
                  <span className="text-lg sm:text-xl font-mono text-neutral-400 dark:text-neutral-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold transition-colors">
                    0{i + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors uppercase">
                      {project.name}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-lg">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* PARTIE DROITE : STACK CAPSULES & LIEN SORTANT */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-4 sm:gap-6 lg:w-1/2">
                  <div className="flex flex-wrap gap-2">
                    {(project.stack || []).map((tech, ti) => (
                      <span
                        key={ti}
                        className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-white/10"
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
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-300 dark:border-white/20 group-hover:border-emerald-500 dark:group-hover:border-emerald-400 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-black text-neutral-900 dark:text-white flex items-center justify-center transition-all duration-300 shrink-0"
                      title="Ouvrir le projet"
                    >
                      <span className="text-base sm:text-lg">↗</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA EN BAS POUR ACCÉDER À LA PAGE COMPLÈTE */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-10 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-display font-black text-lg sm:text-2xl text-neutral-900 dark:text-white uppercase tracking-tight">
                {locale === "fr" ? "Explorer le répertoire complet" : "Explore the full directory"}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans max-w-xl">
                {locale === "fr"
                  ? `Accédez à l'ensemble des ${projects.length} projets avec détails techniques, stack et démonstrations en ligne.`
                  : `Access all ${projects.length} projects with architectural notes, stacks, and live deployments.`}
              </p>
            </div>

            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-display font-black text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shrink-0 shadow-lg group"
            >
              <span>{locale === "fr" ? "Voir tous les projets" : "View all projects"}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/20 dark:bg-black/10">
                {projects.length}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
