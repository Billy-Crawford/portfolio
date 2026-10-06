"use client";

import { use } from "react";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import Services from "@/components/sections/Services";
import Footer from "@/components/layout/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ServicesPage({ params }: Props) {
  const { locale } = use(params);
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";
  const isFr = safeLocale === "fr";

  const workflowSteps = [
    {
      num: "01",
      title: isFr ? "Cadrage & Architecture" : "Scoping & Systems Architecture",
      desc: isFr
        ? "Analyse approfondie des besoins, modélisation des bases de données et choix d'une architecture modulaire et scalable (microservices, REST, serverless)."
        : "In-depth requirement analysis, database schema modeling, and selection of modular, future-proof architectures.",
    },
    {
      num: "02",
      title: isFr ? "Développement & Intégration IA" : "Engineering & AI Integration",
      desc: isFr
        ? "Implémentation sous typage strict (TypeScript, Python), entraînement/intégration de modèles ciblés et développement d'interfaces fluides et ergonomiques."
        : "Strictly-typed implementation (TypeScript, Python), fine-tuning and integration of targeted ML models, and high-performance UI delivery.",
    },
    {
      num: "03",
      title: isFr ? "Tests, Déploiement & Suivi" : "Verification, CI/CD & Delivery",
      desc: isFr
        ? "Audits de performance, pipelines d'intégration continue, déploiement Cloud automatisé et surveillance des métriques en production."
        : "Performance audits, automated continuous integration, cloud production deployment, and telemetry monitoring.",
    },
  ];

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
              [INDEX // 02]
            </span>
          </div>

          <div className="mb-8 sm:mb-14 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 font-bold">
                {isFr ? "CATALOGUE COMPLET DES PRESTATIONS" : "COMPLETE CAPABILITIES CATALOG"}
              </span>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-sm" />
            </div>

            <h1 className="font-display text-3xl sm:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white tracking-tight uppercase">
              {isFr ? "Services, Offres & Domaines d'Expertise" : "Services, Capabilities & Technical Scope"}
            </h1>

            <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans max-w-3xl leading-relaxed">
              {isFr
                ? "Découvrez l'ensemble des expertises mobilisables pour vos projets numériques : de la conception technique initiale au déploiement en production, en passant par l'intelligence artificielle appliquée."
                : "Explore the complete set of capabilities available for your digital products: from architectural blueprints to production deployments and applied AI models."}
            </p>
          </div>
        </div>

        <Services locale={safeLocale} preview={false} />

        <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16 my-20 sm:my-28">
          
          <div className="mb-20 sm:mb-28 space-y-12">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
                02.1 // {isFr ? "PROCESSUS DE COLLABORATION" : "DELIVERY WORKFLOW"}
              </span>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {workflowSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className={`bg-white dark:bg-[#101012] border border-neutral-200 dark:border-white/10 p-6 sm:p-8 lg:p-10 rounded-3xl space-y-4 shadow-sm dark:shadow-none ${
                    idx === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest block">
                    [{step.num}]
                  </span>
                  <h3 className="font-display font-black text-xl text-neutral-900 dark:text-white uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600 font-bold block">
                // {isFr ? "PRESTATIONS & CONSULTING" : "SERVICES & ENGAGEMENT"}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
                {isFr ? "Prêt à concrétiser votre vision ?" : "Ready to engineer your product?"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-700 font-sans leading-relaxed">
                {isFr
                  ? "Contactez-moi pour discuter de vos exigences techniques et planifier les prochaines étapes de votre projet."
                  : "Get in touch to define your technical requirements and align on milestones for your platform."}
              </p>
            </div>

            <Link
              href={`/${safeLocale}/contact`}
              className="px-8 py-4 rounded-full bg-emerald-500 text-black font-display font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors shrink-0 shadow-md w-full sm:w-auto text-center"
            >
              {isFr ? "Démarrer un projet →" : "Kick off a project →"}
            </Link>
          </div>

        </div>

        <Footer locale={safeLocale} />
      </main>
    </PageTransition>
  );
}
