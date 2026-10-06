"use client";

import { use } from "react";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";

  return (
    <PageTransition>
      <main className="w-full min-h-screen bg-[#fafaf9] dark:bg-[#080809] text-neutral-900 dark:text-white pt-28 sm:pt-36 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
          
          <div className="mb-8 flex items-center justify-between">
            <Link
              href={`/${safeLocale}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>{isFr ? "Retour à l'accueil" : "Back to Home"}</span>
            </Link>

            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
              [INDEX // 04]
            </span>
          </div>

          <div className="mb-8 sm:mb-14 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 font-bold">
                {isFr ? "CONTACT & DISPONIBILITÉ" : "GET IN TOUCH & AVAILABILITY"}
              </span>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-sm" />
            </div>

            <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
              {isFr ? "Démarrer une Collaboration" : "Let's Connect & Build"}
            </h1>

            <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans max-w-3xl leading-relaxed">
              {isFr
                ? "Vous avez un projet applicatif, un défi architectural ou une intégration de modèle d'IA à réaliser ? Échangeons dès aujourd'hui."
                : "Looking to architect a new platform, audit technical performance, or integrate intelligent models? Reach out directly below."}
            </p>
          </div>
        </div>

        <Contact locale={safeLocale} />

        <Footer locale={safeLocale} />
      </main>
    </PageTransition>
  );
}
