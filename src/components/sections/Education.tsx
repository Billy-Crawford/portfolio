"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Education({ locale }: Props) {
  const isFr = locale === "fr";

  const educationList = [
    {
      period: "2025 — EN COURS",
      degree: isFr ? "Master en Intelligence Artificielle & Big Data" : "Master in Artificial Intelligence & Big Data",
      institution: "ESGIS Lomé",
      specialization: isFr
        ? "M1 (2025–2026) · M2 (2026–en cours). Spécialisation en apprentissage automatique (Machine Learning, Deep Learning), ingénierie de données massives et intégration de modèles intelligents en production."
        : "M1 (2025–2026) · M2 (2026–present). Specialization in machine learning, deep neural architectures, big data pipelines, and production AI integration.",
      skills: ["Machine Learning", "Deep Learning", "Big Data", "NLP", "Computer Vision"],
    },
    {
      period: "2022 — 2025",
      degree: isFr ? "Licence en Informatique, Réseaux & Télécommunications" : "Bachelor in Computer Science, Networks & Telecom",
      institution: "ESGIS Lomé",
      specialization: isFr
        ? "Spécialité Architecture de Logiciels. Conception d'architectures applicatives web et mobiles, modélisation de bases de données relationnelles et ingénierie logicielle avancée."
        : "Specialty in Software Architecture. Engineering scalable web and mobile software architectures, relational database modeling, and clean code paradigms.",
      skills: ["Software Architecture", "Full-Stack Dev", "Databases", "Distributed Systems"],
    },
  ];

  return (
    <section id="education" className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            02 // {isFr ? "PARCOURS ACADÉMIQUE" : "ACADEMIC BACKGROUND"}
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
            {isFr ? "Parcours Scolaire" : "Education & Degrees"}
          </motion.h2>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            // {isFr ? "FONDATIONS THÉORIQUES & SPÉCIALISATION IA" : "THEORETICAL FOUNDATIONS & AI"}
          </p>
        </div>

        {/* TIMELINE ÉDITORIALE */}
        <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
          {educationList.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="py-10 sm:py-12 group flex flex-col lg:flex-row lg:items-start justify-between gap-8 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-300"
            >
              {/* PÉRIODE & ÉCOLE */}
              <div className="lg:w-1/3 flex flex-col justify-start space-y-2">
                <span className="inline-block text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
                  [{edu.period}]
                </span>
                <p className="font-display font-bold text-xl text-neutral-900 dark:text-white">
                  {edu.institution}
                </p>
              </div>

              {/* DIPLÔME ET DÉTAILS */}
              <div className="lg:w-2/3 flex flex-col space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight uppercase group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
                  {edu.specialization}
                </p>

                {/* CAPSULES DE COMPÉTENCES */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {edu.skills.map((skill, si) => (
                    <span
                      key={si}
                      className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
