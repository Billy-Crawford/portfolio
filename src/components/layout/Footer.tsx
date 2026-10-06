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
    <footer className="w-full bg-[#fafaf9] dark:bg-[#080809] border-t border-black/5 dark:border-white/5 py-12 sm:py-14 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <span className="font-display font-black text-xl text-neutral-900 dark:text-white">OB.</span>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest border-l border-neutral-300 dark:border-white/10 pl-4">
            {footerText}
          </span>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="https://github.com/Billy-Crawford"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/oumarou-billy-n-a8107328a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/admin"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            [Admin]
          </a>
        </div>

      </div>
    </footer>
  );
}
