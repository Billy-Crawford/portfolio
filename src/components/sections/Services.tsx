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
  const title = locale === "fr"
    ? (content?.services_title?.value_fr ?? t.servicesTitle)
    : (content?.services_title?.value_en ?? t.servicesTitle);

  return (
    <section id="services" className="w-full bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Services</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }} viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }} viewport={{ once: true }}
              className="group bg-[#0f0f0f] border border-neutral-800 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{ICONS[i % ICONS.length]}</div>
              <p className="text-sm text-neutral-400 group-hover:text-white transition-colors leading-relaxed">
                {service}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
