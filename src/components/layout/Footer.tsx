"use client";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { useState, useEffect } from "react";

type Props = { locale: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export default function Footer({ locale }: Props) {
  const t = locale === "fr" ? fr : en;
  const [footerText, setFooterText] = useState(t.footerText);

  useEffect(() => {
    fetch(`${API_URL}/api/content`)
      .then((res) => res.json())
      .then((data) => {
        if (data.footer_text) {
          setFooterText(locale === "fr" ? data.footer_text.value_fr : data.footer_text.value_en);
        }
      })
      .catch(() => {});
  }, [locale]);

  return (
    <footer className="py-10 text-center text-gray-400">
      <p>{footerText}</p>
      <p className="mt-2 text-xs text-gray-600">
        <a href="/admin" className="hover:text-gray-400 transition">🔒 Admin</a>
      </p>
    </footer>
  );
}
