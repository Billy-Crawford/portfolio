// src/app/page.tsx
// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function RootPage() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => router.push("/en"), 500); // délai pour laisser finir l'animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cercle animé */}
            <motion.div
              className="w-24 h-24 rounded-full border-4 border-[var(--accent)] border-t-[var(--primary)] border-b-[var(--muted)]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />

            {/* Texte */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-[var(--accent)] text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bienvenue sur mon portfolio
            </motion.h1>

            {/* Sous-texte */}
            <motion.p
              className="text-white text-lg md:text-xl text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Découvrez mon univers digital.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

