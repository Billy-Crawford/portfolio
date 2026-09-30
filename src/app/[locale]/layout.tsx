// src/app/[locale]/layout.tsx
import Navbar from "@/components/layout/Navbar";
import { PortfolioProvider } from "@/context/PortfolioContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Next.js 16 → params est une Promise
  const { locale } = await params;

  // sécurité type
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";

  return (
    <>
      <PortfolioProvider locale={safeLocale}>
        <Navbar locale={safeLocale} />
        {children}
      </PortfolioProvider>
    </>
  );
}
