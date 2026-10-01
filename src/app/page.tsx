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
      setTimeout(() => router.push("/en"), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c0c] text-white select-none px-6">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="flex flex-col items-center justify-center gap-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* SPINNER MINIMALISTE ÉDITORIAL */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full border border-neutral-800 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
              <span className="absolute font-black text-xs tracking-tighter">OB</span>
            </div>

            {/* TYPOGRAPHIE D'ACCUEIL */}
            <div className="space-y-2">
              <motion.h1
                className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Oumarou Billy
              </motion.h1>

              <motion.p
                className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                // AI Engineer & Fullstack Developer
              </motion.p>
            </div>

            {/* JAUGE DE CHARGEMENT DISCRÈTE */}
            <motion.div
              className="w-32 h-[1px] bg-neutral-800 overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

