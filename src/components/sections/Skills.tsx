"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio, Skill } from "@/context/PortfolioContext";

type Props = { locale: string };

type PillarKey = "frontend" | "backend" | "ai" | "devops";

interface Pillar {
  key: PillarKey;
  num: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
}

const PILLARS: Pillar[] = [
  {
    key: "frontend",
    num: "01",
    title_fr: "Architecture Frontend & Interfaces",
    title_en: "Frontend Architecture & Interfaces",
    desc_fr: "Composants typés, rendu hybride (SSR/SSG) et design systems réactifs.",
    desc_en: "Typed components, hybrid rendering (SSR/SSG), and responsive design systems.",
  },
  {
    key: "backend",
    num: "02",
    title_fr: "Systèmes Backend & APIs",
    title_en: "Backend Systems & APIs",
    desc_fr: "Conception d'APIs REST, logique métier Python/Node et modèles de données.",
    desc_en: "RESTful API design, Python/Node server logic, and structured data models.",
  },
  {
    key: "ai",
    num: "03",
    title_fr: "Intelligence Artificielle & Deep Learning",
    title_en: "Artificial Intelligence & Deep Learning",
    desc_fr: "Pipelines de traitement sémantique, classification d'images et réseaux neuronaux.",
    desc_en: "Semantic processing pipelines, image classification, and neural architectures.",
  },
  {
    key: "devops",
    num: "04",
    title_fr: "Bases de Données, Cloud & CI/CD",
    title_en: "Databases, Cloud & CI/CD",
    desc_fr: "Stockage relationnel ACID, gestion de versions Gitflow et pipelines automatisés.",
    desc_en: "ACID relational storage, Gitflow versioning, and continuous delivery.",
  },
];

const assignPillar = (name: string): PillarKey => {
  const n = name.toLowerCase();
  if (
    n.includes("react") ||
    n.includes("next") ||
    n.includes("tailwind") ||
    n.includes("front") ||
    n.includes("css") ||
    n.includes("html") ||
    n.includes("ui") ||
    n.includes("flutter") ||
    n.includes("typescript")
  ) {
    return "frontend";
  }
  if (
    n.includes("django") ||
    n.includes("node") ||
    n.includes("flask") ||
    n.includes("api") ||
    n.includes("back") ||
    n.includes("cms") ||
    n.includes("wordpress")
  ) {
    return "backend";
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
    return "ai";
  }
  return "devops";
};

const getPracticeTag = (level: number, locale: string) => {
  const isFr = locale === "fr";
  if (level >= 80) return isFr ? "Core Stack" : "Core Stack";
  if (level >= 65) return isFr ? "Avancé" : "Advanced";
  return isFr ? "Recherche" : "Applied R&D";
};

export default function Skills({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const isFr = locale === "fr";
  const { skills, loading } = usePortfolio();

  const grouped = useMemo(() => {
    const map: Record<PillarKey, Skill[]> = {
      frontend: [],
      backend: [],
      ai: [],
      devops: [],
    };
    skills.forEach((s) => {
      const p = assignPillar(s.name);
      map[p].push(s);
    });
    return map;
  }, [skills]);

  return (
    <section
      id="skills"
      className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE SOBRE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            03 // {isFr ? "COMPÉTENCES TECHNIQUES" : "TECHNICAL ARSENAL"}
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
              {t.skillsTitle || (isFr ? "Technologies & Systèmes" : "Technical Stack")}
            </motion.h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-2 max-w-xl">
              {isFr
                ? "Environnements techniques éprouvés, structurés par pôles d'application et de responsabilité."
                : "Validated engineering stack grouped by domain responsibility and system architecture."}
            </p>
          </div>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            // {isFr ? "CADRE D'INGÉNIERIE & OUTILS" : "ENGINEERING FRAMEWORK"}
          </p>
        </div>

        {/* 4 PÔLES D'INGÉNIERIE TYPOGRAPHIQUES */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-neutral-200 dark:bg-white/[0.02] rounded-3xl animate-pulse border border-neutral-300 dark:border-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {PILLARS.map((pillar, pi) => {
              const pillarSkills = grouped[pillar.key] || [];

              return (
                <motion.div
                  key={pillar.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: pi * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-sm dark:shadow-none hover:border-neutral-400 dark:hover:border-white/25 transition-all duration-300"
                >
                  <div>
                    {/* EN-TÊTE DU PÔLE */}
                    <div className="flex items-center justify-between pb-5 border-b border-black/5 dark:border-white/5 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500">
                          [{pillar.num}]
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-900 dark:text-white uppercase tracking-tight">
                          {isFr ? pillar.title_fr : pillar.title_en}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        {pillarSkills.length} {isFr ? "technos" : "tools"}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mb-6">
                      {isFr ? pillar.desc_fr : pillar.desc_en}
                    </p>

                    {/* LISTE SOBRE DES TECHNOLOGIES */}
                    <div className="divide-y divide-black/5 dark:divide-white/5">
                      {pillarSkills.map((s) => {
                        const tag = getPracticeTag(s.level, locale);

                        return (
                          <div
                            key={s.id ?? s.name}
                            className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group"
                          >
                            <div className="space-y-1 max-w-xl">
                              <div className="flex items-center gap-3">
                                <span className="font-display font-bold text-base text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {s.name}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 border border-black/10 dark:border-white/10 px-2 py-0.5 rounded-md">
                                  {tag}
                                </span>
                              </div>
                              {s.tooltip && (
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                                  {s.tooltip}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
