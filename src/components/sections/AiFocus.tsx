"use client";

import { motion } from "framer-motion";

type Props = { locale: string };

export default function AiFocus({ locale }: Props) {
  const isFr = locale === "fr";

  const aiDomains = [
    {
      num: "01",
      tag: "NLP & LLM",
      title: isFr ? "Traitement du Langage Naturel & LLMs" : "Natural Language Processing & LLMs",
      desc: isFr
        ? "Conception de pipelines d'analyse sémantique, extraction d'entités, classification de documents et intégration de modèles de langage (LLMs) pour automatiser des analyses complexes."
        : "Building semantic analysis pipelines, entity extraction, text classification, and integrating LLMs to automate unstructured text processing.",
      techs: ["Transformers", "NLTK", "SpaCy", "LangChain", "OpenAI / HuggingFace"],
    },
    {
      num: "02",
      tag: "COMPUTER VISION",
      title: isFr ? "Vision par Ordinateur & Deep Learning" : "Computer Vision & Deep Learning",
      desc: isFr
        ? "Entraînement de réseaux de neurones convolutifs (CNN) pour la reconnaissance visuelle, l'analyse d'expressions faciales et la détection d'anomalies médicales (ex. détection de cellules infectées par le paludisme)."
        : "Training convolutional neural networks (CNNs) for visual classification, facial expression recognition, and biomedical anomaly detection (e.g. malaria-infected cell classification).",
      techs: ["TensorFlow", "PyTorch", "OpenCV", "CNNs", "Scikit-Learn"],
    },
    {
      num: "03",
      tag: "RECOMMENDER SYSTEMS",
      title: isFr ? "Systèmes de Recommandation & Filtrage" : "Recommender Systems & Collaborative Filtering",
      desc: isFr
        ? "Modélisation de moteurs de suggestion intelligents basés sur le filtrage collaboratif et le contenu pour prédire les préférences utilisateurs et optimiser l'engagement."
        : "Modeling intelligent recommendation engines utilizing collaborative and content-based filtering to predict user preferences and maximize platform engagement.",
      techs: ["Surprise", "Matrix Factorization", "Python", "Data Mining"],
    },
    {
      num: "04",
      tag: "BIG DATA PIPELINES",
      title: isFr ? "Ingénierie des Données Massives & IoT" : "Big Data Pipelines & Cloud Streaming",
      desc: isFr
        ? "Mise en place d'architectures Cloud Serverless pour la collecte, le traitement et le stockage de flux de données IoT en temps réel."
        : "Designing serverless cloud architectures for ingesting, processing, and storing real-time IoT and telemetry data streams at scale.",
      techs: ["AWS Lambda", "DynamoDB", "S3", "AWS SAM", "PostgreSQL"],
    },
  ];

  return (
    <section id="ai-focus" className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            04 // {isFr ? "RECHERCHE & EXPERTISE IA" : "AI & MACHINE LEARNING LAB"}
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
            {isFr ? "Pôle Intelligence Artificielle" : "Applied AI & Big Data"}
          </motion.h2>

          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            // {isFr ? "MODÈLES PRAGMATIQUES & DEEP LEARNING APPLIQUÉ" : "PRAGMATIC MODELS & APPLIED DEEP LEARNING"}
          </p>
        </div>

        {/* GRILLE ÉDITORIALE DES DOMAINES IA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {aiDomains.map((domain, i) => (
            <motion.div
              key={domain.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 rounded-3xl p-7 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-sm dark:shadow-none hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
                    [{domain.tag}]
                  </span>
                  <span className="text-sm font-mono text-neutral-400">
                    {domain.num}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors mb-4">
                  {domain.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {domain.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-8 border-t border-neutral-100 dark:border-white/10">
                {domain.techs.map((t, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
