"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Services({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content, services } = usePortfolio();
  const title =
    locale === "fr"
      ? (content?.services_title?.value_fr ?? t.servicesTitle)
      : (content?.services_title?.value_en ?? t.servicesTitle);

  return (
    <section id="services" className="py-36 bg-[#080809] border-t border-white/5 relative">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* EN-TÊTE ÉDITORIALE */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 font-bold">
            02 // {locale === "fr" ? "OFFRE & SERVICES" : "CAPABILITIES"}
          </span>
          <div className="h-px flex-1 bg-white/10 max-w-xs" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase mb-16"
        >
          {title}
        </motion.h2>

        {/* LISTE STYLE AWWWARDS ACCORDÉON / LIGNES ÉDITORIALES */}
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="py-10 group flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.015] px-4 -mx-4 rounded-xl transition-all duration-300"
            >
              <div className="flex items-baseline gap-8">
                <span className="text-sm font-mono text-neutral-500 group-hover:text-emerald-400 transition-colors">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                  {service}
                </h3>
              </div>

              <div className="flex items-center gap-4 self-end md:self-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  [EXPERTISE]
                </span>
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs text-neutral-400 group-hover:border-white/30 group-hover:text-white group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
