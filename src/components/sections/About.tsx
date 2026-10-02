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

  const cards = [
    {
      icon: "🎓",
      label: locale === "fr" ? "Formation" : "Education",
      value: locale === "fr" ? "Master Intelligence Artificielle" : "MSc Artificial Intelligence",
    },
    {
      icon: "📍",
      label: locale === "fr" ? "Localisation" : "Location",
      value: "Ouagadougou, Burkina Faso",
    },
    {
      icon: "⚡",
      label: "Technologies Clés",
      value: "Next.js · Flask · Python · PostgreSQL",
    },
    {
      icon: "🎯",
      label: "Domaines de Spécialité",
      value: locale === "fr" ? "Applications Web · Modèles IA · Mobile" : "Web Apps · AI Models · Mobile",
    },
  ];

  return (
    <section id="about" className="py-32 bg-[#09090b] border-t border-zinc-800/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            {locale === "fr" ? "À Propos" : "About Me"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight"
            >
              {locale === "fr"
                ? "Concevoir des solutions robustes et intelligentes."
                : "Building robust and intelligent solutions."}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-zinc-400 text-base leading-relaxed"
            >
              {text}
            </motion.p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 space-y-3 transition-colors"
              >
                <span className="text-2xl block">{c.icon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{c.label}</p>
                  <p className="text-sm font-bold text-white mt-1 leading-snug">{c.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
