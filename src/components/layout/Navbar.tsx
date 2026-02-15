// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  locale: "en" | "fr";
};

export default function Navbar({ locale }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 px-6 py-4 flex justify-between items-center transition-colors ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="text-[var(--accent)] font-bold text-xl">OUMAROU BILLY N.</div>

      <Link href={`/${otherLocale}`}>
        <button className="px-3 py-1 rounded-xl border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition">
          {otherLocale.toUpperCase()}
        </button>
      </Link>
    </nav>
  );
}
