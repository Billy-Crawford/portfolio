// src/components/layout/Footer.tsx
"use client";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { usePortfolio } from "@/context/PortfolioContext";

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const { content } = usePortfolio();
  
  const footerText = content?.footer_text ? (locale === "fr" ? content.footer_text.value_fr : content.footer_text.value_en) : t.footerText;

  return (
    <footer className="py-10 text-center text-gray-400">
      <p>{footerText}</p>
      <p className="mt-2 text-xs text-gray-600">
        <a href="/admin" className="hover:text-gray-400 transition">🔒 Admin</a>
      </p>
    </footer>
  );
}
