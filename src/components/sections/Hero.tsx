// src/components/sections/Hero.tsx
"use client";

import Image from "next/image";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { motion } from "framer-motion";

type Props = {
  locale: string;
};

export default function Hero({ locale }: Props) {
  const t = locale === "fr" ? fr : en;

  return (
    <section className="min-h-screen flex items-center pt-24 relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full z-10">

        {/* LEFT SIDE — TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <p className="inline-block px-4 py-1 rounded-full bg-[var(--muted)] text-sm">
            {t.heroBadge}
          </p>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
  <motion.span
    className="gradient-text-3d"
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    OUMAROU BILLY
  </motion.span>
  <span className="text-gray-300"> — {locale === "fr" ? "Construire, apprendre, et créer des solutions intelligentes" : "Building, learning, and creating intelligent solutions"}</span>
</h1>


          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            {t.heroSubtitle}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:scale-105 transition-transform"
            >
              {locale === "fr" ? "Voir mes projets" : "View Projects"}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition"
            >
              {locale === "fr" ? "Me contacter" : "Contact Me"}
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE — PHOTO + halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center relative"
        >
          {/* Glow / halo derrière l'image */}
          <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 opacity-20 filter blur-3xl animate-blob"></div>

          {/* Image flottante */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/profile.jpg"
              alt="Oumarou Billy"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
