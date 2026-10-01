"use client";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const footerText = locale === "fr"
    ? (content?.footer_text?.value_fr ?? t.footerText)
    : (content?.footer_text?.value_en ?? t.footerText);

  return (
    <footer className="w-full bg-[#080808] border-t border-neutral-800/60">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-black text-lg">OB.</span>
          <span className="text-neutral-600 text-xs">{footerText}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-white transition-colors">LinkedIn</a>
          <a href="/admin"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-800 hover:text-neutral-500 transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  );
}
