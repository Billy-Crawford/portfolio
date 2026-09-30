// src/components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Services({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content, services } = usePortfolio();

  const title = content?.services_title ? (locale === "fr" ? content.services_title.value_fr : content.services_title.value_en) : t.servicesTitle;

  return (
    <section id="services" className="min-h-s py-20 flex flex-col justify-center">
      <motion.h2 className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-14 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        {title}
      </motion.h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {services.map((service, index) => (
          <motion.div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-black shadow-md hover:shadow-xl transition-all cursor-default" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }}>
            <motion.span className="w-5 h-5 rounded-full bg-[var(--accent)] flex-shrink-0" whileHover={{ scale: 1.5, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }} />
            <p className="text-lg md:text-xl font-medium">{service}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
