"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ProjectsPage({ params }: Props) {
  const { locale } = use(params);
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";

  const { projects, loading } = usePortfolio();
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      (p.stack || []).forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.stack || []).some((s) => s.toLowerCase().includes(q));

      const matchTag =
        selectedTag === "ALL" || (p.stack || []).includes(selectedTag);

      return matchSearch && matchTag;
    });
  }, [projects, search, selectedTag]);

  return (
    <PageTransition>
      <main className="w-full min-h-screen bg-[#fafaf9] dark:bg-[#080809] text-neutral-900 dark:text-white pt-28 sm:pt-36 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
          
          <div className="mb-8 flex items-center justify-between">
            <Link
              href={`/${safeLocale}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>{isFr ? "Retour à l'accueil" : "Back to Home"}</span>
            </Link>

            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
              [INDEX // 01]
            </span>
          </div>

          <div className="mb-14 sm:mb-20 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 font-bold">
                {isFr ? "RÉPERTOIRE COMPLET DES PROJETS" : "FULL PROJECT ARCHIVES"}
              </span>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-sm" />
            </div>

            <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
              {isFr ? "Toutes les Réalisations & Systèmes" : "All Projects & Deployed Systems"}
            </h1>

            <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans max-w-3xl leading-relaxed">
              {isFr
                ? "Exploration complète de l'ensemble de mes réalisations techniques : applications web full-stack, architectures serveur, pipelines de machine learning et modèles d'IA intégrés."
                : "Comprehensive catalog of all engineered deployments: full-stack web platforms, backend architectures, machine learning models, and real-world AI systems."}
            </p>
          </div>

          <div className="mb-12 sm:mb-16 space-y-6 bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-none">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    isFr
                      ? "Rechercher par mot-clé, techno, nom..."
                      : "Search by keyword, tech, title..."
                  }
                  className="w-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-emerald-500 transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-black dark:hover:text-white px-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 shrink-0">
                {isFr
                  ? `${filteredProjects.length} sur ${projects.length} projet(s)`
                  : `${filteredProjects.length} of ${projects.length} project(s)`}
              </div>
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100 dark:border-white/5">
                <button
                  onClick={() => setSelectedTag("ALL")}
                  className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                    selectedTag === "ALL"
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-black font-bold shadow-sm"
                      : "bg-neutral-100 dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/10 hover:border-neutral-400"
                  }`}
                >
                  {isFr ? "Tous" : "All"} ({projects.length})
                </button>

                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? "ALL" : tag)}
                    className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                      selectedTag === tag
                        ? "bg-emerald-600 dark:bg-emerald-400 text-white dark:text-black font-bold shadow-sm"
                        : "bg-neutral-100 dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/10 hover:border-neutral-400"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 bg-neutral-200 dark:bg-white/[0.02] rounded-3xl animate-pulse border border-neutral-300 dark:border-white/5"
                />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white dark:bg-[#101012] rounded-3xl border border-neutral-200 dark:border-white/10">
              <span className="text-3xl">🔍</span>
              <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white uppercase tracking-tight">
                {isFr ? "Aucun projet trouvé" : "No projects match your filter"}
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {isFr
                  ? "Essayez d'ajuster votre recherche ou réinitialisez les filtres."
                  : "Try loosening your search terms or clearing the selected tags."}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedTag("ALL");
                }}
                className="mt-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 underline font-bold"
              >
                {isFr ? "Réinitialiser les filtres" : "Reset filters"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:divide-white/10 mb-20 sm:mb-28">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="py-10 sm:py-14 group flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-3xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6 sm:gap-10 lg:w-3/5">
                    <span className="text-lg sm:text-2xl font-mono text-neutral-400 dark:text-neutral-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold transition-colors pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors uppercase">
                          {project.name}
                        </h2>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-5 sm:gap-6 lg:w-2/5">
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
                        className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-neutral-300 dark:border-white/20 group-hover:border-emerald-500 dark:group-hover:border-emerald-400 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-black text-neutral-900 dark:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm"
                        title={isFr ? "Ouvrir le projet" : "Open project"}
                      >
                        <span className="text-base sm:text-lg">↗</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mb-20 sm:mb-28 p-8 sm:p-14 rounded-3xl bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600 font-bold block">
                // {isFr ? "COLLABORATION & INGÉNIERIE" : "ENGINEERING & PARTNERSHIP"}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
                {isFr ? "Vous avez une idée de projet ?" : "Have an innovative project in mind?"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-700 font-sans leading-relaxed">
                {isFr
                  ? "Concevons ensemble une architecture performante et des solutions intelligentes adaptées à vos objectifs."
                  : "Let's engineer performant software and intelligent models tailored to your business challenges."}
              </p>
            </div>

            <Link
              href={`/${safeLocale}/contact`}
              className="px-8 py-4 rounded-full bg-emerald-500 text-black font-display font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shrink-0 shadow-md"
            >
              {isFr ? "Démarrer une discussion →" : "Start a conversation →"}
            </Link>
          </div>

        </div>

        <Footer locale={safeLocale} />
      </main>
    </PageTransition>
  );
}
