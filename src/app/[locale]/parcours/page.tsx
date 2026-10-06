"use client";

import { use } from "react";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import Education from "@/components/sections/Education";
import AiFocus from "@/components/sections/AiFocus";
import Methodology from "@/components/sections/Methodology";
import ResumeDownload from "@/components/sections/ResumeDownload";
import Footer from "@/components/layout/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ParcoursPage({ params }: Props) {
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
              [INDEX // 03]
            </span>
          </div>

          <div className="mb-8 sm:mb-14 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 font-bold">
                {isFr ? "FONDATIONS THÉORIQUES & PÔLE DE RECHERCHE" : "THEORETICAL FOUNDATIONS & AI RESEARCH"}
              </span>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-sm" />
            </div>

            <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
              {isFr ? "Parcours Scolaire & Pôle IA" : "Education, AI Lab & Methodology"}
            </h1>

            <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans max-w-3xl leading-relaxed">
              {isFr
                ? "Détail de mon cursus académique en Intelligence Artificielle et Ingénierie Logicielle, de mes domaines d'expérimentation en Deep Learning, ainsi que de mes principes méthodologiques de travail."
                : "Deep dive into my university curriculum in AI & Software Architecture, applied deep learning research lab, and rigorous engineering methodology."}
            </p>
          </div>
        </div>

        <Education locale={safeLocale} />
        <AiFocus locale={safeLocale} preview={false} />
        <Methodology locale={safeLocale} />
        <ResumeDownload locale={safeLocale} />

        <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16 my-20 sm:my-28">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600 font-bold block">
                // {isFr ? "ÉCHANGER AVEC MOI" : "GET IN TOUCH"}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
                {isFr ? "Intéressé par mon profil ?" : "Interested in my profile?"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-700 font-sans leading-relaxed">
                {isFr
                  ? "Que ce soit pour un projet de développement ou une opportunité liée à l'IA, n'hésitez pas à me contacter."
                  : "Whether for an engineering challenge or an AI initiative, let's connect and discuss possibilities."}
              </p>
            </div>

            <Link
              href={`/${safeLocale}/contact`}
              className="px-8 py-4 rounded-full bg-emerald-500 text-black font-display font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shrink-0 shadow-md"
            >
              {isFr ? "Me contacter →" : "Contact me →"}
            </Link>
          </div>
        </div>

        <Footer locale={safeLocale} />
      </main>
    </PageTransition>
  );
}
