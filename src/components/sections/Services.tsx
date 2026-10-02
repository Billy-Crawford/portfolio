"use client";

import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const ICONS = ["🌐", "⚡", "🤖", "🎯", "📱", "🔒"];

export default function Services({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content, services } = usePortfolio();
  const title =
    locale === "fr"
      ? (content?.services_title?.value_fr ?? t.servicesTitle)
      : (content?.services_title?.value_en ?? t.servicesTitle);

  return (
    <section id="services" className="py-28 bg-[#0a0a0a] border-t border-neutral-900/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Services</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-14"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-neutral-900/50 border border-neutral-800/80 hover:border-emerald-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-5">{ICONS[i % ICONS.length]}</div>
              <p className="text-base font-semibold text-neutral-300 leading-relaxed">
                {service}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
