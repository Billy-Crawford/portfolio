"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function Hero({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const subtitle = locale === "fr"
    ? content?.hero_subtitle?.value_fr ?? t.heroSubtitle
    : content?.hero_subtitle?.value_en ?? t.heroSubtitle;

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center bg-[#080808] overflow-hidden">

      {/* Glow ambiant top-left */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Glow ambiant bottom-right */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── GAUCHE : TEXTE ── */}
        <div className="flex flex-col">

          {/* Status badge */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-8 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
            </span>
            <span className="text-xs font-semibold text-[#10b981] uppercase tracking-widest">
              {locale === "fr" ? "Disponible pour des opportunités" : "Open to opportunities"}
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1 {...fadeUp(0.1)} className="text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1] tracking-tighter text-white">
            Oumarou<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#34d399]">
              Billy
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p {...fadeUp(0.2)} className="mt-5 text-xl font-medium text-[#a3a3a3]">
            {locale === "fr" ? "Développeur Full-Stack & Étudiant Master IA" : "Full-Stack Developer & AI Master Student"}
          </motion.p>

          {/* Description */}
          <motion.p {...fadeUp(0.3)} className="mt-4 text-base text-[#737373] leading-relaxed max-w-lg">
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects"
              className="group relative inline-flex items-center gap-2 bg-[#10b981] text-[#080808] text-sm font-bold px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <span className="relative z-10">{locale === "fr" ? "Voir mes projets" : "View my work"}</span>
              <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-full border border-[#1f1f1f] hover:border-[#10b981] hover:text-[#10b981] transition-all duration-300">
              Contact
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.5)} className="mt-14 flex gap-8 pt-8 border-t border-[#1f1f1f]">
            {[
              { value: "5+", label: locale === "fr" ? "Projets" : "Projects" },
              { value: "11+", label: locale === "fr" ? "Technos" : "Tech Stack" },
              { value: "2", label: locale === "fr" ? "Ans de code" : "Years coding" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-[#737373] uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── DROITE : PHOTO ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:flex justify-center items-center relative"
        >
          {/* Halo derrière la photo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[380px] h-[380px] bg-[#10b981]/10 rounded-full blur-3xl" />
          </div>

          {/* Cadre photo */}
          <div className="relative w-[360px] h-[420px] rounded-3xl overflow-hidden border border-[#1f1f1f] shadow-2xl shadow-black/60">
            <Image
              src="/me.jpeg"
              alt="Oumarou Billy"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient bas */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#080808] to-transparent" />
          </div>

          {/* Badge Tech Stack — flottant */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -right-4 top-16 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl px-5 py-4 shadow-xl"
          >
            <p className="text-xs text-[#737373] uppercase tracking-wider mb-2">Stack</p>
            <div className="flex flex-col gap-1">
              {["Next.js", "Flask", "Python AI"].map(t => (
                <span key={t} className="text-xs font-semibold text-white">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Badge Dispo — flottant */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -left-4 bottom-20 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl px-5 py-3 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-xs font-bold text-white">
                {locale === "fr" ? "Disponible" : "Available"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-[#333] rounded-full flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 bg-[#10b981] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
