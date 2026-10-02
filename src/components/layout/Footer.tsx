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
    <footer className="w-full bg-[#080809] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <span className="font-display font-black text-xl text-white">OB.</span>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest border-l border-white/10 pl-4">
            {footerText}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/admin"
            className="text-xs font-mono uppercase tracking-widest text-neutral-600 hover:text-neutral-300 transition-colors"
          >
            [Admin]
          </a>
        </div>

      </div>
    </footer>
  );
}
