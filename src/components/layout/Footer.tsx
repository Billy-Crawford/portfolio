"use client";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const footerText =
    locale === "fr"
      ? (content?.footer_text?.value_fr ?? t.footerText)
      : (content?.footer_text?.value_en ?? t.footerText);

  return (
    <footer className="w-full bg-[#080808] border-t border-neutral-900 select-none">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LOGO & MENTIONS ÉDITORIALES */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-black text-lg tracking-tighter text-white uppercase">
            OB.
          </span>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
            {footerText}
          </span>
        </div>

        {/* LIENS & ADMINISTRATION */}
        <div className="flex items-center gap-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/admin"
            className="text-[11px] font-mono tracking-widest text-neutral-700 hover:text-neutral-400 transition-colors"
          >
            [ADMIN]
          </a>
        </div>

      </div>
    </footer>
  );
}
