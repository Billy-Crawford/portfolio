"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio, Skill } from "@/context/PortfolioContext";

type Props = { locale: string };

type CategoryKey = "ALL" | "FRONTEND" | "BACKEND" | "AI" | "CLOUD";

export const getSkillTier = (level: number, locale: string = "fr") => {
  const isFr = locale === "fr";
  if (level >= 80) {
    return {
      tier: "PRODUCTION",
      label: isFr ? "EN PRODUCTION" : "IN PRODUCTION",
      sub: isFr ? "Core Stack · Déployé en Prod" : "Core Stack · Production Deployed",
      badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      dotClass: "bg-emerald-500",
    };
  }
  if (level >= 65) {
    return {
      tier: "ARCHITECTURE",
      label: isFr ? "ARCHITECTURE & SYSTÈMES" : "SYSTEMS & ARCHITECTURE",
      sub: isFr ? "Conception & Scalabilité" : "System Design & Scalability",
      badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
      dotClass: "bg-sky-500",
    };
  }
  return {
    tier: "RESEARCH",
    label: isFr ? "R&D & EXPÉRIMENTATION" : "APPLIED R&D & MODELS",
    sub: isFr ? "Recherche & Modélisation IA" : "Applied AI & Modeling",
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    dotClass: "bg-purple-500",
  };
};

export const getSkillCategory = (name: string): CategoryKey => {
  const n = name.toLowerCase();
  if (
    n.includes("react") ||
    n.includes("next") ||
    n.includes("tailwind") ||
    n.includes("front") ||
    n.includes("css") ||
    n.includes("html") ||
    n.includes("ui") ||
    n.includes("flutter")
  ) {
    return "FRONTEND";
  }
  if (
    n.includes("django") ||
    n.includes("node") ||
    n.includes("flask") ||
    n.includes("api") ||
    n.includes("back") ||
    n.includes("type") ||
    n.includes("sql") ||
    n.includes("base") ||
    n.includes("mongo") ||
    n.includes("postgre")
  ) {
    return "BACKEND";
  }
  if (
    n.includes("python ai") ||
    n.includes("nlp") ||
    n.includes("vision") ||
    n.includes("tensor") ||
    n.includes("torch") ||
    n.includes("ia") ||
    n.includes("ai") ||
    n.includes("learning") ||
    n.includes("deep") ||
    n.includes("machine")
  ) {
    return "AI";
  }
  return "CLOUD";
};

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const isFr = locale === "fr";
  const { skills, loading } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("ALL");

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "ALL", label: isFr ? "Tout le Pôle" : "All Capabilities" },
    { key: "FRONTEND", label: "Frontend & UI" },
    { key: "BACKEND", label: isFr ? "Backend & APIs" : "Backend & APIs" },
    { key: "AI", label: isFr ? "IA & Deep Learning" : "AI & Deep Learning" },
    { key: "CLOUD", label: isFr ? "Data & DevOps" : "Data & DevOps" },
  ];

  const filteredSkills = useMemo(() => {
    if (selectedCategory === "ALL") return skills;
    return skills.filter((s) => getSkillCategory(s.name) === selectedCategory);
  }, [skills, selectedCategory]);

  return (
    <section
      id="skills"
      className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            03 // {isFr ? "ARSENAL TECHNIQUE & MATURITÉ" : "TECHNICAL ARSENAL & MATURITY"}
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight uppercase"
            >
              {t.skillsTitle || (isFr ? "Technologies & Systèmes" : "Technical Arsenal")}
            </motion.h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-2 max-w-xl">
              {isFr
                ? "Technologies éprouvées réparties par niveau de maturité opérationnelle et contexte d'ingénierie réel."
                : "Validated tools categorized by production readiness, system architecture, and applied research."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              // {isFr ? "CADRE DE QUALITÉ & PROD" : "ENGINEERING STANDARDS"}
            </span>
          </div>
        </div>

        {/* ONGLETS DE FILTRES PAR PÔLE */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10 pb-4 border-b border-black/5 dark:border-white/5">
          {categories.map((c) => {
            const count =
              c.key === "ALL"
                ? skills.length
                : skills.filter((s) => getSkillCategory(s.name) === c.key).length;
            const active = selectedCategory === c.key;

            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`text-[11px] sm:text-xs font-mono uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  active
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-black font-bold shadow-md scale-[1.02]"
                    : "bg-black/[0.03] dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/25"
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    active
                      ? "bg-white/20 dark:bg-black/15 text-white dark:text-black"
                      : "bg-black/5 dark:bg-white/5 text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* GRILLE DES COMPÉTENCES (SANS POURCENTAGES) */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-36 bg-neutral-200 dark:bg-white/[0.02] rounded-3xl animate-pulse border border-neutral-300 dark:border-white/5"
              />
            ))}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="py-16 text-center text-sm font-mono text-neutral-500">
            {isFr ? "Aucune compétence dans cette catégorie." : "No technologies found in this category."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredSkills.map((skill, i) => {
              const tier = getSkillTier(skill.level, locale);
              const cat = getSkillCategory(skill.name);

              return (
                <motion.div
                  key={skill.id ?? skill.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-sm dark:shadow-none"
                >
                  <div className="space-y-3.5">
                    
                    {/* HAUT DE CARTE : CATÉGORIE + PASTILLE DE MATURITÉ */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        // {cat}
                      </span>
                      
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${tier.badgeClass} font-bold`}
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          {tier.tier === "PRODUCTION" && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          )}
                          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${tier.dotClass}`} />
                        </span>
                        <span>{tier.label}</span>
                      </span>
                    </div>

                    {/* TITRE DE LA TECHNOLOGIE */}
                    <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                      {skill.name}
                    </h3>

                    {/* DESCRIPTION CONCRÈTE / RÔLE */}
                    {skill.tooltip && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                        {skill.tooltip}
                      </p>
                    )}
                  </div>

                  {/* BAS DE CARTE : STATUT DE CONCEPTION */}
                  <div className="pt-5 mt-5 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {tier.sub}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 group-hover:text-emerald-500 transition-colors">
                      ↗
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
