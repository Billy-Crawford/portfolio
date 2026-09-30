// src/components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function About({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();

  const title = content?.about_title ? (locale === "fr" ? content.about_title.value_fr : content.about_title.value_en) : t.aboutTitle;
  const text = content?.about_text ? (locale === "fr" ? content.about_text.value_fr : content.about_text.value_en) : t.aboutText;

  return (
    <section id="about" className="py-20">
      <motion.h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        {title}
      </motion.h2>
      <motion.p className="max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
        {text}
      </motion.p>
    </section>
  );
}
