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
      <main className="w-full min-h-screen bg-[#fafaf9] dark:bg-[#080809] text-neutral-900 dark:text-white pt-24 sm:pt-32 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          
          {/* LIEN RETOUR & INDICATEUR D'INDEX */}
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
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

        </div>

        {/* SECTION FORMULAIRE & COORDONNÉES */}
        <Contact locale={safeLocale} />

        {/* PIED DE PAGE */}
        <Footer locale={safeLocale} />
      </main>
    </PageTransition>
  );
}
