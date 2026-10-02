import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Services from "@/components/sections/Services";
import AiFocus from "@/components/sections/AiFocus";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Methodology from "@/components/sections/Methodology";
import ResumeDownload from "@/components/sections/ResumeDownload";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const safeLocale: "en" | "fr" = locale === "fr" ? "fr" : "en";

  return (
    <PageTransition>
      <main className="w-full bg-[#fafaf9] dark:bg-[#080809] text-neutral-900 dark:text-white flex flex-col transition-colors duration-300">
        <Container>
          <Hero locale={safeLocale} />
          <About locale={safeLocale} />
          <Education locale={safeLocale} />
          <Services locale={safeLocale} />
          <AiFocus locale={safeLocale} />
          <Skills locale={safeLocale} />
          <Projects locale={safeLocale} />
          <Methodology locale={safeLocale} />
          <ResumeDownload locale={safeLocale} />
          <Contact locale={safeLocale} />
          <Footer locale={safeLocale} />
        </Container>
      </main>
    </PageTransition>
  );
}
