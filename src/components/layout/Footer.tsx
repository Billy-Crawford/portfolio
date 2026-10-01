"use client";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const footerText = locale === "fr"
    ? content?.footer_text?.value_fr ?? t.footerText
    : content?.footer_text?.value_en ?? t.footerText;

  return (
    <footer className="border-t border-[#1f1f1f] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#10b981] font-black text-lg">OB</span>
          <span className="text-[#4a4a4a] text-xs">{footerText}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold text-[#4a4a4a] hover:text-white transition-colors uppercase tracking-widest">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-semibold text-[#4a4a4a] hover:text-white transition-colors uppercase tracking-widest">LinkedIn</a>
          <a href="/admin"
            className="text-xs font-semibold text-[#2a2a2a] hover:text-[#4a4a4a] transition-colors uppercase tracking-widest">Admin</a>
        </div>
      </div>
    </footer>
  );
}
