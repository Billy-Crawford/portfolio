"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ locale }: { locale: "en" | "fr" }) {
  const pathname = usePathname();
  const other = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`);

  const links = [
    { label: locale === "fr" ? "Projets" : "Projects", href: "#projects" },
    { label: locale === "fr" ? "Compétences" : "Skills",   href: "#skills"   },
    { label: locale === "fr" ? "À propos" : "About",      href: "#about"    },
    { label: "Contact",                                     href: "#contact"  },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-[#FAFAF9]/90 backdrop-blur-sm border-b border-[#E5E5E3]">
      {/* Logo */}
      <Link href={`/${locale}`} className="text-sm font-black tracking-tighter text-[#0A0A0A] uppercase">
        Oumarou Billy
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Langue */}
      <Link
        href={otherPath}
        className="text-xs font-black uppercase tracking-widest border border-[#0A0A0A] px-4 py-1.5 rounded-full hover:bg-[#0A0A0A] hover:text-[#FAFAF9] transition-colors duration-200"
      >
        {other}
      </Link>
    </header>
  );
}
