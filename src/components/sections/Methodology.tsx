"use client";

import { motion } from "framer-motion";

type Props = { locale: string };

export default function Methodology({ locale }: Props) {
  const isFr = locale === "fr";

  const pillars = [
    {
      step: "01",
      title: isFr ? "Architecture Scalable & Ingénierie Rigoureuse" : "Scalable Architecture & Systems Engineering",
      subtitle: isFr ? "Pensé pour la montée en charge" : "Engineered for high availability",
      desc: isFr
        ? "Avant la moindre ligne de code, conception minutieuse des modèles de données, séparation claire des responsabilités (APIs modulaires, services découplés, serverless) et anticipation des charges de production."
        : "Prior to coding, meticulous database modeling, clear separation of concerns (modular REST APIs, decoupled services, serverless pipelines), and forward-looking load planning.",
      checklist: isFr
        ? ["APIs RESTful sécurisées & documentées", "Modélisation relationnelle (PostgreSQL / MySQL)", "Architectures Cloud Serverless (AWS / Docker)"]
        : ["Secure & documented RESTful APIs", "Relational modeling (PostgreSQL / MySQL)", "Serverless cloud architectures (AWS / Docker)"],
    },
    {
      step: "02",
      title: isFr ? "Code Propre, Typage Strict & Maintenabilité" : "Clean Code, Strict Typing & Maintainability",
      subtitle: isFr ? "Zéro compromis sur la qualité" : "Zero tolerance for technical debt",
      desc: isFr
        ? "Adhésion stricte aux standards de l'industrie : TypeScript rigoureux côté frontend, conventions PEP8 / Django côté backend, revues de code et pipelines CI/CD automatisés pour une fiabilité pérenne."
        : "Strict adherence to enterprise standards: TypeScript on the frontend, clean PEP8 Python services on the backend, automated test routines, and continuous delivery pipelines.",
      checklist: isFr
        ? ["TypeScript strict & composants réutilisables", "Standards PEP8 & design patterns éprouvés", "Versioning Git & intégration continue (CI/CD)"]
        : ["Strict TypeScript & reusable UI primitives", "PEP8 conventions & validated design patterns", "Git version control & automated CI/CD"],
    },
    {
      step: "03",
      title: isFr ? "IA Pragmatique, Utile & Déployable" : "Pragmatic, Useful & Production-Ready AI",
      subtitle: isFr ? "De l'expérimentation au produit réel" : "From research to real-world value",
      desc: isFr
        ? "L'IA ne doit pas rester un exercice théorique dans un notebook. Focus sur des modèles ciblés, efficients en inférence et directement connectés à des interfaces fluides pour répondre à de vrais besoins utilisateurs."
        : "Machine learning must never stay trapped in a research notebook. Strong focus on efficient inference, production integration, and seamless user experiences solving real business problems.",
      checklist: isFr
        ? ["Inférence optimisée & intégration Full-Stack", "Pipelines de traitement sémantique et vision", "Monitoring des prédictions & amélioration continue"]
        : ["Optimized inference & Full-Stack integration", "Semantic NLP and computer vision pipelines", "Prediction monitoring & iterative refinement"],
    },
  ];

  return (
    <section id="methodology" className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            06 // {isFr ? "MÉTHODOLOGIE & PRINCIPES" : "ENGINEERING PRINCIPLES"}
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight uppercase"
          >
            {isFr ? "Philosophie de Conception" : "How I Build"}
          </motion.h2>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            // {isFr ? "STANDARDS D'INGÉNIERIE & RIGUEUR TECHNIQUE" : "STANDARDS, RIGOR & VELOCITY"}
          </p>
        </div>

        {/* 3 GRANDS PILIERS ÉDITORIAUX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 group shadow-sm dark:shadow-none hover:-translate-y-1.5 ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-5 border-b border-neutral-100 dark:border-white/10">
                  <span className="font-display text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    {pillar.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    [PILLAR]
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  {pillar.title}
                </h3>
                
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-6">
                  // {pillar.subtitle}
                </p>

                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-8">
                  {pillar.desc}
                </p>
              </div>

              {/* LISTE DE POINTS CLÉS */}
              <div className="space-y-3 pt-6 border-t border-neutral-100 dark:border-white/10">
                {pillar.checklist.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
