// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  locale: "en" | "fr";
};

export default function Navbar({ locale }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  const otherLocale = locale === "fr" ? "en" : "fr";

  const labels =
    locale === "fr"
      ? {
          about: "À propos",
          skills: "Compétences",
          projects: "Projets",
          contact: "Contact",
        }
      : {
          about: "About",
          skills: "Skills",
          projects: "Projects",
          contact: "Contact",
        };

  // effet background navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["about", "skills", "projects", "contact"];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 px-6 py-4 flex justify-between items-center transition-all ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="text-[var(--accent)] font-bold text-xl">
        OUMAROU BILLY N.
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 text-sm">
        {Object.entries(labels).map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`transition ${
              active === id
                ? "text-[var(--accent)]"
                : "text-white hover:text-[var(--accent)]"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Language Switch */}
      <Link href={`/${otherLocale}`} scroll={false}>
        <button className="px-3 py-1 rounded-xl border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition">
          {otherLocale.toUpperCase()}
        </button>
      </Link>
    </nav>
  );
}
