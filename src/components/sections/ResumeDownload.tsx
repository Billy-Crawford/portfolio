"use client";

import { motion } from "framer-motion";

type Props = { locale: string };

export default function ResumeDownload({ locale }: Props) {
  const isFr = locale === "fr";

  return (
    <section id="resume" className="py-24 sm:py-32 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
        
        {/* BANNIÈRE ÉDITORIALE LUXE DU CV */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative w-full bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 rounded-3xl p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 shadow-xl dark:shadow-2xl overflow-hidden group"
        >
          {/* Filigrane discret en fond de carte */}
          <div className="absolute right-6 -bottom-6 text-[14vw] font-display font-black text-black/[0.02] dark:text-white/[0.015] pointer-events-none select-none">
            CV
          </div>

          {/* TEXTES */}
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-3">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-bold">
                // CURRICULUM VITAE
              </span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                [PDF · 2026]
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight uppercase leading-[1.05]">
              {isFr ? "Télécharger mon CV complet" : "Download Full Resume"}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              {isFr
                ? "Retrouvez le récapitulatif détaillé de mon cursus en Master IA, de mes certifications, de mes compétences techniques et de mes projets déployés."
                : "Access the comprehensive summary of my AI Master’s degree, technical stack, certifications, and production software projects."}
            </p>
          </div>

          {/* BOUTON DE TÉLÉCHARGEMENT DIRECT & LIEN GITHUB */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full lg:w-auto relative z-10">
            <a
              href="/CV-O.BILLY.pdf"
              download="CV_Oumarou_Billy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-mono uppercase tracking-[0.2em] font-bold px-8 py-5 rounded-2xl transition-all duration-300 shadow-lg active:scale-95 w-full sm:w-auto cursor-pointer"
            >
              <span>{isFr ? "TÉLÉCHARGER LE CV (PDF)" : "DOWNLOAD RESUME (PDF)"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

            <a
              href="https://github.com/Billy-Crawford"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.2em] font-bold text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white px-7 py-5 rounded-2xl border border-neutral-300 dark:border-white/15 hover:border-neutral-500 dark:hover:border-white/40 transition-all duration-300 active:scale-95 w-full sm:w-auto text-center"
            >
              <span>GITHUB</span>
              <span className="text-xs">↗</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
