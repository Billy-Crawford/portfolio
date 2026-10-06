"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { 
  locale: string;
  preview?: boolean;
};

export default function Services({ locale, preview = false }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content, services } = usePortfolio();
  const title =
    locale === "fr"
      ? (content?.services_title?.value_fr ?? t.servicesTitle)
      : (content?.services_title?.value_en ?? t.servicesTitle);

  const displayedServices = preview ? services.slice(0, 4) : services;

  return (
    <section id="services" className="py-28 sm:py-36 bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 relative transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            02 // {preview ? (locale === "fr" ? "OFFRE & SERVICES (APERÇU)" : "CAPABILITIES (HIGHLIGHTS)") : (locale === "fr" ? "CATALOGUE COMPLET DES SERVICES" : "ALL CAPABILITIES")}
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight uppercase"
            >
              {title}
            </motion.h2>
            {preview && (
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans mt-2">
                {locale === "fr"
                  ? "Aperçu de mes expertises techniques pour concevoir, structurer et déployer vos solutions."
                  : "Overview of core services designed to architect, engineer, and deploy high-value software."}
              </p>
            )}
          </div>

          {preview && services.length > 4 && (
            <Link
              href={`/${locale}/services`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
            >
              <span>{locale === "fr" ? "Explorer tout le catalogue" : "View all services"} ({services.length})</span>
              <span>→</span>
            </Link>
          )}
        </div>

        {/* LISTE LIGNES ÉDITORIALES */}
        <div className="flex flex-col divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:divide-white/10">
          {displayedServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="py-8 sm:py-12 group flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.015] px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-6 sm:gap-10 flex-1">
                <span className="text-sm sm:text-base font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pt-1">
                  0{i + 1}
                </span>
                <div className="space-y-3 max-w-3xl">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end lg:self-start lg:pt-1 shrink-0">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                  [EXPERTISE]
                </span>
                <span className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-xs text-neutral-600 dark:text-neutral-400 group-hover:border-black/30 dark:group-hover:border-white/30 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA EN BAS POUR ACCÉDER À LA PAGE SERVICES COMPLÈTE */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-10 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-display font-black text-lg sm:text-2xl text-neutral-900 dark:text-white uppercase tracking-tight">
                {locale === "fr" ? "Consulter toutes les prestations" : "Explore full service catalogue"}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans max-w-xl">
                {locale === "fr"
                  ? `Parcourez les ${services.length} services détaillés avec leurs méthodologies, technologies et livrables associés.`
                  : `Review all ${services.length} services with detailed workflows, frameworks, and engineering deliverables.`}
              </p>
            </div>

            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-display font-black text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 shrink-0 shadow-lg group"
            >
              <span>{locale === "fr" ? "Voir tous les services" : "View all services"}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/20 dark:bg-black/10">
                {services.length}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
