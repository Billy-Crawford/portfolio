// src/components/sections/Hero.tsx
"use client";

import Image from "next/image";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = { locale: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export default function Hero({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [badge, setBadge] = useState(t.heroBadge);
  const [subtitle, setSubtitle] = useState(t.heroSubtitle);

  useEffect(() => {
    fetch(`${API_URL}/api/content`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hero_badge) {
          setBadge(locale === "fr" ? data.hero_badge.value_fr : data.hero_badge.value_en);
        }
        if (data.hero_subtitle) {
          setSubtitle(locale === "fr" ? data.hero_subtitle.value_fr : data.hero_subtitle.value_en);
        }
      })
      .catch(() => {});
  }, [locale]);

  return (
    <section className="min-h-screen flex items-center pt-24 relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="inline-block px-4 py-1 rounded-full bg-[var(--muted)] text-sm">
            {badge}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <motion.span
              className="gradient-text-3d"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              OUMAROU BILLY
            </motion.span>
            <span className="text-gray-300">
              {" "}— {locale === "fr" ? "Construire, apprendre, et creer des solutions intelligentes" : "Building, learning, and creating intelligent solutions"}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            {subtitle}
          </p>

          <div className="flex gap-4 pt-2">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:scale-105 transition-transform">
              {locale === "fr" ? "Voir mes projets" : "View Projects"}
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition">
              {locale === "fr" ? "Me contacter" : "Contact Me"}
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE — PHOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center relative"
        >
          <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 opacity-20 filter blur-3xl animate-blob"></div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image src="/profile.jpg" alt="Oumarou Billy" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
