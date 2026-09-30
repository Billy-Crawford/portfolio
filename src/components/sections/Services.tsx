"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const ICONS = ["→", "↗", "⌘", "◈"];

export default function Services({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content, services } = usePortfolio();
  const title = (locale === "fr" ? content?.services_title?.value_fr : content?.services_title?.value_en) ?? t.servicesTitle;

  return (
    <section id="services" className="py-28 border-t border-[#E5E5E3] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-6 h-px bg-[#C9A96E]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
            {locale === "fr" ? "Ce que je fais" : "What I Do"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-[#FAFAF9] uppercase mb-16"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F] rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#0A0A0A] hover:bg-[#141414] px-8 py-10 transition-colors duration-300"
            >
              <div className="text-2xl text-[#C9A96E] mb-5 group-hover:scale-110 transition-transform inline-block">
                {ICONS[i % ICONS.length]}
              </div>
              <p className="text-base font-semibold text-[#E5E5E3] leading-relaxed">
                {service}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
