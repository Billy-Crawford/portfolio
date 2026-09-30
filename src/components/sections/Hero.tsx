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

  const badge    = (locale === "fr" ? content?.hero_badge?.value_fr : content?.hero_badge?.value_en) ?? t.heroBadge;
  const subtitle = (locale === "fr" ? content?.hero_subtitle?.value_fr : content?.hero_subtitle?.value_en) ?? t.heroSubtitle;

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#FAFAF9] flex flex-col pt-16 overflow-hidden"
    >
      {/* Ligne décorative dorée horizontale */}
      <div className="absolute top-16 inset-x-0 h-px bg-[#E5E5E3]" />

      {/* ── GRILLE PRINCIPALE ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full px-6 md:px-12 gap-0">

        {/* GAUCHE — TEXTE */}
        <div className="flex flex-col justify-center pt-16 pb-12 lg:py-0 lg:pr-16 border-r border-[#E5E5E3]">

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-[#C9A96E]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
              Portfolio — 2026
            </span>
          </motion.div>

          {/* Titre géant */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter text-[#0A0A0A] uppercase"
          >
            Oumarou<br />
            <span className="text-[#C9A96E]">Billy</span>
          </motion.h1>

          {/* Badge rôle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-sm font-semibold text-[#6B7280] uppercase tracking-[0.15em]"
          >
            {badge}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-base text-[#6B7280] leading-relaxed max-w-md"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FAFAF9] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#2D2D2D] transition-colors duration-200"
            >
              {locale === "fr" ? "Voir mes projets" : "View Projects"}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full border border-[#E5E5E3] hover:border-[#0A0A0A] transition-colors duration-200 text-[#0A0A0A]"
            >
              Contact
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16 flex items-center gap-4"
          >
            <div className="w-5 h-8 border border-[#D1D5DB] rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-0.5 h-2 bg-[#0A0A0A] rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-widest">
              Scroll
            </span>
          </motion.div>
        </div>

        {/* DROITE — PHOTO */}
        <div className="hidden lg:flex flex-col justify-center items-center pl-12 relative">

          {/* Numérotation éditoriale */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col items-center gap-3">
            <span className="text-xs font-black text-[#0A0A0A] tracking-widest">01</span>
            <div className="w-4 h-4 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-full" />
            </div>
            {[2,3,4].map(n => (
              <div key={n} className="w-1.5 h-1.5 bg-[#D1D5DB] rounded-full" />
            ))}
            <span className="text-xs font-bold text-[#D1D5DB] tracking-widest">05</span>
          </div>

          {/* Photo — cadre élégant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative w-[380px] h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#E5E5E3] bg-[#F0EFED]"
          >
            <Image
              src="/profile.jpg"
              alt="Oumarou Billy"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Overlay bas avec badge flottant */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">
                  {locale === "fr" ? "Disponible" : "Available for work"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stat badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-1/4 -left-4 bg-white border border-[#E5E5E3] shadow-lg px-5 py-3 rounded-2xl"
          >
            <p className="text-2xl font-black text-[#0A0A0A]">5+</p>
            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">
              {locale === "fr" ? "Projets" : "Projects"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="absolute bottom-1/4 -left-4 bg-[#0A0A0A] shadow-lg px-5 py-3 rounded-2xl"
          >
            <p className="text-2xl font-black text-[#C9A96E]">AI</p>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Master</p>
          </motion.div>
        </div>
      </div>

      {/* Barre de stat mobile (uniquement mobile) */}
      <div className="lg:hidden border-t border-[#E5E5E3] grid grid-cols-3 divide-x divide-[#E5E5E3]">
        {[
          { value: "5+", label: locale === "fr" ? "Projets" : "Projects" },
          { value: "AI", label: "Master" },
          { value: "FS", label: "Full-Stack" },
        ].map(s => (
          <div key={s.label} className="py-5 flex flex-col items-center">
            <p className="text-xl font-black text-[#0A0A0A]">{s.value}</p>
            <p className="text-xs text-[#6B7280] uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
