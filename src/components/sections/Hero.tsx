// billy-portfolio/src/components/sections/Hero.tsx

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Props = { locale: string };

export default function Hero({ locale }: Props) {
  const t = locale === "fr" ? fr : en;

  return (
    <section className="min-h-screen flex items-center">
      <div className="space-y-8">
        <p className="inline-block px-4 py-1 rounded-full bg-[var(--muted)] text-sm">
          {t.heroBadge}
        </p>
        <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed">
          {t.heroSubtitle}
        </p>
      </div>
    </section>
  );
}
