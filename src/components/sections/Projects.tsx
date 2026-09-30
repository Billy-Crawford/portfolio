"use client";
import { motion } from "framer-motion";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

const SKELETON = Array.from({ length: 3 });

export default function Projects({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { projects, loading } = usePortfolio();

  return (
    <section id="projects" className="py-28 border-t border-[#E5E5E3] bg-[#F0EFED]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
                {locale === "fr" ? "Travaux sélectionnés" : "Selected Work"}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[0.9] tracking-tighter text-[#0A0A0A] uppercase">
              {t.projectsTitle}
            </h2>
          </div>
          <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
            {locale === "fr"
              ? "Une sélection de mes réalisations techniques récentes."
              : "A selection of my recent technical work."}
          </p>
        </div>

        {/* Liste projets */}
        {loading ? (
          <div className="space-y-px">
            {SKELETON.map((_, i) => (
              <div key={i} className="h-24 bg-white animate-pulse rounded-none first:rounded-t-2xl last:rounded-b-2xl" />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#E5E5E3] border border-[#E5E5E3] rounded-2xl overflow-hidden bg-white">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link || "#"}
                target={project.link && project.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-6 px-8 py-6 hover:bg-[#0A0A0A] transition-colors duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                viewport={{ once: true }}
              >
                {/* Numéro */}
                <span className="text-xs font-black tabular-nums text-[#D1D5DB] group-hover:text-[#6B7280] w-8 shrink-0 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Nom */}
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#0A0A0A] group-hover:text-[#FAFAF9] flex-1 transition-colors">
                  {project.name}
                </h3>

                {/* Description (caché en mobile) */}
                <p className="hidden md:block text-sm text-[#6B7280] group-hover:text-[#9CA3AF] line-clamp-1 flex-1 transition-colors">
                  {project.description}
                </p>

                {/* Stack badges */}
                <div className="hidden lg:flex gap-2 shrink-0">
                  {(project.stack || []).slice(0, 3).map((tech, ti) => (
                    <span
                      key={ti}
                      className="text-xs font-semibold px-3 py-1 rounded-full border border-[#E5E5E3] text-[#6B7280] group-hover:border-white/20 group-hover:text-white/70 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Flèche */}
                <svg
                  className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#FAFAF9] shrink-0 transition-all duration-300 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
