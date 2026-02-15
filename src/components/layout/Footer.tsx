"use client";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;

  return (
    <footer className="py-10 text-center text-gray-400">
      <p>{t.footerText}</p>
    </footer>
  );
}
