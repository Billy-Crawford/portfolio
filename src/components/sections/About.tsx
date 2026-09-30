"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function About({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const title = (locale === "fr" ? content?.about_title?.value_fr : content?.about_title?.value_en) ?? t.aboutTitle;
  const text  = (locale === "fr" ? content?.about_text?.value_fr : content?.about_text?.value_en)  ?? t.aboutText;

  const facts = [
    { label: locale === "fr" ? "Localisation" : "Location", value: "Ouagadougou, BF" },
    { label: "Status",    value: locale === "fr" ? "Étudiant Master IA" : "AI Master Student" },
    { label: "Stack",     value: "Next.js · Flask · Python" },
    { label: "Email",     value: "billy@example.com" },
  ];

  return (
    <section id="about" className="py-28 border-t border-[#E5E5E3] bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-6 h-px bg-[#C9A96E]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
            {locale === "fr" ? "À propos" : "About"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* TITRE */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-[#0A0A0A] uppercase">
              {title}
            </h2>

            {/* Faits rapides */}
            <div className="mt-12 space-y-4">
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  viewport={{ once: true }}
                  className="flex items-baseline justify-between border-b border-[#E5E5E3] pb-3"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">{f.label}</span>
                  <span className="text-sm font-semibold text-[#0A0A0A]">{f.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TEXTE + VALEURS */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-[#374151] leading-relaxed font-medium">
              {text}
            </p>

            <div className="mt-12 grid grid-cols-3 divide-x divide-[#E5E5E3] border border-[#E5E5E3] rounded-2xl overflow-hidden">
              {[
                { n: "5+",  l: locale === "fr" ? "Projets"     : "Projects"   },
                { n: "10+", l: locale === "fr" ? "Technos"     : "Tech Stack" },
                { n: "1",   l: locale === "fr" ? "Ans d'expérience" : "Yr Exp" },
              ].map(s => (
                <div key={s.l} className="py-8 flex flex-col items-center bg-white hover:bg-[#F0EFED] transition-colors">
                  <p className="text-3xl font-black text-[#0A0A0A]">{s.n}</p>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
