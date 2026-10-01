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
  const subtitle = locale === "fr"
    ? (content?.hero_subtitle?.value_fr ?? t.heroSubtitle)
    : (content?.hero_subtitle?.value_en ?? t.heroSubtitle);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#080808] overflow-hidden flex items-center"
    >
      {/* Glow haut gauche */}
      <div className="pointer-events-none absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      {/* Glow bas droite */}
      <div className="pointer-events-none absolute -bottom-48 -right-48 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
      {/* Grille de fond */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* CONTENU CENTRÉ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 pt-24 pb-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── GAUCHE : TEXTE ── */}
          <div className="flex-1 flex flex-col items-start text-left">

            {/* Badge disponible */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.0 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                {locale === "fr" ? "Disponible pour des opportunités" : "Open to opportunities"}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tighter text-white"
            >
              Oumarou
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                Billy
              </span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg font-medium text-neutral-400"
            >
              {locale === "fr"
                ? "Développeur Full-Stack · Étudiant Master IA"
                : "Full-Stack Developer · AI Master Student"}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-base text-neutral-500 leading-relaxed max-w-md"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-6 py-3 rounded-full transition-colors duration-200 hover:shadow-[0_0_25px_rgba(52,211,153,0.35)]"
              >
                {locale === "fr" ? "Voir mes projets" : "View my work"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-full border border-neutral-700 hover:border-emerald-500 hover:text-emerald-400 transition-colors duration-200"
              >
                Contact
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-12 flex items-center gap-10 pt-8 border-t border-neutral-800 w-full"
            >
              {[
                { v: "5+",  l: locale === "fr" ? "Projets"     : "Projects"   },
                { v: "11+", l: locale === "fr" ? "Technos"     : "Tech Stack" },
                { v: "2",   l: locale === "fr" ? "Ans de code" : "Yrs coding" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-black text-white">{s.v}</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── DROITE : PHOTO ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex-shrink-0 w-[280px] h-[340px] sm:w-[320px] sm:h-[390px] lg:w-[360px] lg:h-[440px]"
          >
            {/* Halo */}
            <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-2xl scale-110" />

            {/* Cadre photo */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                src="/me.jpeg"
                alt="Oumarou Billy"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient bas */}
              <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#080808] to-transparent" />
            </div>

            {/* Badge Stack */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-4 top-10 bg-[#111] border border-neutral-800 rounded-2xl px-4 py-3 shadow-xl hidden sm:block"
            >
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1.5">Stack</p>
              {["Next.js", "Flask", "Python AI"].map(t => (
                <p key={t} className="text-xs font-semibold text-white leading-relaxed">{t}</p>
              ))}
            </motion.div>

            {/* Badge Dispo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -left-4 bottom-16 bg-[#111] border border-neutral-800 rounded-2xl px-4 py-2.5 shadow-xl hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white">
                  {locale === "fr" ? "Disponible" : "Available"}
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-neutral-700 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 bg-emerald-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
