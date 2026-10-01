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
    <section
      id="services"
      className="relative w-full bg-[#0c0c0c] text-white py-36 sm:py-44 border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.015] tracking-tighter leading-none pointer-events-none whitespace-nowrap">
        SERVICES
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-12">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500">
            {locale === "fr" ? "05 \u2014 OFFRE" : "05 \u2014 WHAT I DO"}
          </span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-neutral-500 text-xs sm:text-sm uppercase tracking-widest max-w-xs font-mono"
          >
            {locale === "fr"
              ? "// Accompagnement technique de l\u2019idee au deploiement."
              : "// End-to-end engineering from concept to scale."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="group bg-[#141414] border border-neutral-800/80 hover:border-white/50 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex items-center justify-between mb-10 pb-5 border-b border-neutral-800/80">
                <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-white transition-colors">
                  SERVICE // 0{i + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-white transition-colors" />
              </div>

              <p className="text-base sm:text-lg font-bold text-neutral-300 group-hover:text-white transition-colors leading-relaxed tracking-tight">
                {service}
              </p>

              <div className="mt-10 pt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                <span>[AVAILABLE FOR HIRE]</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
