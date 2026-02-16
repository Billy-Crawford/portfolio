// src/app/[locale]/page.tsx

import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import Services from "@/components/sections/Services";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";

  return (
    <PageTransition>
      <main>
        <Container>
          <Hero locale={safeLocale} />
          <About locale={safeLocale} />
          <Services locale={safeLocale} />
          <Skills locale={safeLocale} />
          <Projects locale={safeLocale} />
          <Contact locale={safeLocale} />
          <Footer locale={safeLocale} />
        </Container>
      </main>
    </PageTransition>
  );
}
