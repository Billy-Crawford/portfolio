"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function About({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const text =
    locale === "fr"
      ? (content?.about_text?.value_fr ?? t.aboutText)
      : (content?.about_text?.value_en ?? t.aboutText);

  const stats = [
    {
      num: "01",
      title: locale === "fr" ? "PROFIL & VISION" : "PROFILE & FOCUS",
      desc: locale === "fr" ? "Développeur Full-Stack & Solutions Intelligentes" : "Full-Stack Developer & Smart Solutions",
    },
    {
      num: "02",
      title: "STACK CORE",
      desc: "Next.js · React · Python · Flask · PostgreSQL",
    },
    {
      num: "03",
      title: locale === "fr" ? "DOMAINES D'EXPERTISE" : "CORE CAPABILITIES",
      desc: locale === "fr" ? "Applications Web, APIs REST & Intégration IA" : "Web Platforms, REST APIs & AI Integration",
    },
    {
      num: "04",
      title: locale === "fr" ? "APPROCHE" : "METHODOLOGY",
      desc: locale === "fr" ? "Code Propre, Architecture Scalable & Rigueur" : "Clean Code, Scalable Architecture & Precision",
    },
  ];

  return (
    <section id="about" className="py-36 bg-[#080809] border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            01 // {locale === "fr" ? "À PROPOS" : "ABOUT ME"}
          </span>
          <div className="h-px flex-1 bg-white/10 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* TITRE ET PARAGRAPHE GAUCHE (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.02] uppercase"
            >
              {locale === "fr" ? (
                <>
                  Concevoir avec rigueur, <br />
                  <span className="text-neutral-500 font-sans italic font-normal lowercase">créer des solutions durables.</span>
                </>
              ) : (
                <>
                  Building with rigor, <br />
                  <span className="text-neutral-500 font-sans italic font-normal lowercase">crafting resilient solutions.</span>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal"
            >
              {text}
            </motion.p>
          </div>

          {/* LISTE ÉDITORIALE DROITE (5 cols) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="py-6 flex items-start gap-6 group"
              >
                <span className="text-xs font-mono text-emerald-400 font-bold pt-0.5">
                  [{s.num}]
                </span>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-1">
                    {s.title}
                  </p>
                  <p className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
