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
    ? content?.about_text?.value_fr ?? t.aboutText
    : content?.about_text?.value_en ?? t.aboutText;

  const items = [
    { icon: "🎓", label: "Formation", value: locale === "fr" ? "Master Intelligence Artificielle" : "MSc Artificial Intelligence" },
    { icon: "📍", label: locale === "fr" ? "Localisation" : "Location", value: "Ouagadougou, Burkina Faso" },
    { icon: "🌐", label: "Stack", value: "Next.js · Flask · Python · PostgreSQL" },
    { icon: "🎯", label: "Focus", value: locale === "fr" ? "Web · IA · Mobile" : "Web · AI · Mobile" },
  ];

  return (
    <section id="about" className="py-28 bg-[#080808] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#10b981]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-[#10b981]" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">
            {locale === "fr" ? "À propos" : "About me"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* TEXTE */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6"
            >
              {locale === "fr" ? "Construire des choses\nqui comptent." : "Building things\nthat matter."}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }}
              className="text-[#a3a3a3] text-base leading-relaxed mb-8"
            >
              {text}
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#10b981] border border-[#10b981]/30 px-5 py-2.5 rounded-full hover:bg-[#10b981]/10 transition-colors"
            >
              {locale === "fr" ? "Me contacter" : "Get in touch"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }} viewport={{ once: true }}
                className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#10b981]/30 transition-colors group"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <p className="text-xs text-[#737373] uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-white leading-snug">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
