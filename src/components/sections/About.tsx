"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function About({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const text = locale === "fr"
    ? (content?.about_text?.value_fr ?? t.aboutText)
    : (content?.about_text?.value_en ?? t.aboutText);

  const cards = [
    { icon: "🎓", label: locale === "fr" ? "Formation"     : "Education",  value: locale === "fr" ? "Master Intelligence Artificielle" : "MSc Artificial Intelligence" },
    { icon: "📍", label: locale === "fr" ? "Localisation"  : "Location",   value: "Ouagadougou, Burkina Faso" },
    { icon: "🌐", label: "Stack",                                            value: "Next.js · Flask · Python · PostgreSQL" },
    { icon: "🎯", label: "Focus",                                            value: locale === "fr" ? "Web · IA · Mobile" : "Web · AI · Mobile" },
  ];

  return (
    <section id="about" className="w-full bg-[#080808] py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            {locale === "fr" ? "À propos" : "About me"}
          </span>
        </motion.div>

        {/* Layout 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Col 1 : texte */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6"
            >
              {locale === "fr" ? "Construire des choses qui comptent." : "Building things that matter."}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
              className="text-neutral-400 text-base leading-relaxed mb-8"
            >
              {text}
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 border border-emerald-500/30 px-5 py-2.5 rounded-full hover:bg-emerald-500/10 transition-colors duration-200"
            >
              {locale === "fr" ? "Me contacter" : "Get in touch"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* Col 2 : cards 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i }} viewport={{ once: true }}
                className="bg-[#0f0f0f] border border-neutral-800 hover:border-emerald-500/30 rounded-2xl p-5 transition-colors duration-200"
              >
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{card.label}</p>
                <p className="text-sm font-semibold text-white leading-snug">{card.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
