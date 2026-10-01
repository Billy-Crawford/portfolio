"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };
const EMOJIS = ["🌐", "⚡", "🤖", "🎯", "📱", "🔒"];

export default function Services({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content, services } = usePortfolio();
  const title = locale === "fr"
    ? content?.services_title?.value_fr ?? t.servicesTitle
    : content?.services_title?.value_en ?? t.servicesTitle;

  return (
    <section id="services" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#10b981]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#10b981]" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#10b981]">
            {locale === "fr" ? "Services" : "Services"}
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-16"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group bg-[#0f0f0f] border border-[#1f1f1f] hover:border-[#10b981]/30 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{EMOJIS[i % EMOJIS.length]}</div>
              <p className="text-sm font-medium text-[#a3a3a3] group-hover:text-white transition-colors leading-relaxed">
                {service}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
