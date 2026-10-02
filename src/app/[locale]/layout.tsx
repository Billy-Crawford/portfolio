import Navbar from "@/components/layout/Navbar";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { ThemeProvider } from "@/context/ThemeContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";

  return (
    <ThemeProvider>
      <PortfolioProvider locale={safeLocale}>
        <div className="relative w-full min-h-screen bg-[#fafaf9] dark:bg-[#080809] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
          <Navbar locale={safeLocale} />
          {children}
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
