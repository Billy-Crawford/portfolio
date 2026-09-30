"use client";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  const footerText = (locale === "fr" ? content?.footer_text?.value_fr : content?.footer_text?.value_en) ?? t.footerText;

  return (
    <footer className="border-t border-[#E5E5E3] bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#9CA3AF] font-medium">{footerText}</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
            LinkedIn
          </a>
          <a href="/admin"
            className="text-xs font-bold uppercase tracking-widest text-[#D1D5DB] hover:text-[#6B7280] transition-colors">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
