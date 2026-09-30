// src/components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { useState, useEffect } from "react";

type Props = { locale: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export default function About({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [title, setTitle] = useState(t.aboutTitle);
  const [text, setText] = useState(t.aboutText);

  useEffect(() => {
    fetch(`${API_URL}/api/content`)
      .then((res) => res.json())
      .then((data) => {
        if (data.about_title) setTitle(locale === "fr" ? data.about_title.value_fr : data.about_title.value_en);
        if (data.about_text) setText(locale === "fr" ? data.about_text.value_fr : data.about_text.value_en);
      })
      .catch(() => {});
  }, [locale]);

  return (
    <section id="about" className="py-20">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-[var(--accent)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {text}
      </motion.p>
    </section>
  );
}
