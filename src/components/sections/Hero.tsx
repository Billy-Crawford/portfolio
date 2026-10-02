"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Hero({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const subtitle =
    locale === "fr"
      ? (content?.hero_subtitle?.value_fr ?? t.heroSubtitle)
      : (content?.hero_subtitle?.value_en ?? t.heroSubtitle);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center bg-[#080808] pt-28 pb-20 overflow-hidden">
      {/* Halos de lumière ambiante */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grille de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        
        {/* COLONNE GAUCHE : TEXTE & ACTIONS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          
          {/* Badge statut */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-neutral-900/80 border border-neutral-800 rounded-full px-4 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              {locale === "fr" ? "Disponible pour opportunités" : "Available for opportunities"}
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              Oumarou <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">
                Billy
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-neutral-400 pt-2">
              {locale === "fr"
                ? "Développeur Full-Stack & Master en IA"
                : "Full-Stack Developer & AI Master Student"}
            </p>
          </motion.div>

          {/* Description claire et aérée */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-neutral-400 leading-relaxed max-w-xl font-normal"
          >
            {subtitle}
          </motion.p>

          {/* Boutons d'action bien espacés */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95"
            >
              <span>{locale === "fr" ? "Découvrir mes projets" : "Explore my work"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 text-white font-bold text-sm px-8 py-4 rounded-full border border-neutral-800 hover:border-neutral-600 transition-all duration-300 active:scale-95"
            >
              <span>{locale === "fr" ? "Me contacter" : "Get in touch"}</span>
            </a>
          </motion.div>

          {/* Chiffres clés */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-800/80 w-full max-w-lg"
          >
            <div>
              <p className="text-3xl font-black text-white tracking-tight">5+</p>
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mt-1">
                {locale === "fr" ? "Projets livrés" : "Projects Done"}
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-white tracking-tight">11+</p>
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mt-1">
                {locale === "fr" ? "Technologies" : "Tech Stack"}
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-white tracking-tight">2+</p>
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mt-1">
                {locale === "fr" ? "Ans d'expérience" : "Years Exp."}
              </p>
            </div>
          </motion.div>

        </div>

        {/* COLONNE DROITE : PORTRAIT (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="relative w-full max-w-[360px] aspect-[4/5]">
            {/* Ombre portée lumineuse */}
            <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-2xl transform scale-105" />

            {/* Conteneur de l'image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <Image
                src="/me.jpeg"
                alt="Oumarou Billy"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
            </div>

            {/* Badge d'accompagnement flottant */}
            <div className="absolute -bottom-6 -left-6 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Full-Stack & IA</p>
                <p className="text-[11px] text-neutral-400">Architecture & Code</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
