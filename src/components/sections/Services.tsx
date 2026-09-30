// src/components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { useState, useEffect } from "react";

type Props = { locale: string };
type Service = { id?: number; text_fr: string; text_en: string; order_index?: number };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export default function Services({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [title, setTitle] = useState(t.servicesTitle);
  const [servicesList, setServicesList] = useState<string[]>(t.servicesList);

  useEffect(() => {
    // Charger le titre
    fetch(`${API_URL}/api/content`)
      .then((res) => res.json())
      .then((data) => {
        if (data.services_title) setTitle(locale === "fr" ? data.services_title.value_fr : data.services_title.value_en);
      })
      .catch(() => {});

    // Charger la liste
    fetch(`${API_URL}/api/services`)
      .then((res) => res.json())
      .then((data: Service[]) => {
        setServicesList(data.map((s) => locale === "fr" ? s.text_fr : s.text_en));
      })
      .catch(() => {});
  }, [locale]);

  return (
    <section id="services" className="min-h-s py-20 flex flex-col justify-center">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-8">
        {servicesList.map((service, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-[var(--muted)] hover:bg-[var(--accent)] hover:text-black shadow-md hover:shadow-xl transition-all cursor-default"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="w-5 h-5 rounded-full bg-[var(--accent)] flex-shrink-0"
              whileHover={{ scale: 1.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="text-lg md:text-xl font-medium">{service}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
