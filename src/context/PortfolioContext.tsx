"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export type Project = {
  id?: number;
  name: string;
  description: string;
  stack: string[];
  link: string;
};

export type Skill = {
  id?: number;
  name: string;
  level: number;
  tooltip?: string;
};

export type Content = Record<string, { value_fr: string; value_en: string }>;

type PortfolioData = {
  content: Content | null;
  projects: Project[];
  skills: Skill[];
  services: string[];
  loading: boolean;
};

const PortfolioContext = createContext<PortfolioData | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export function PortfolioProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const t = locale === "fr" ? fr : en;
  const [data, setData] = useState<PortfolioData>({
    content: null,
    projects: [],
    skills: [],
    services: [],
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetch(`${API_URL}/api/content`).then((r) => r.json()).catch(() => null),
      fetch(`${API_URL}/api/projects`).then((r) => r.json()).catch(() => null),
      fetch(`${API_URL}/api/skills`).then((r) => r.json()).catch(() => null),
      fetch(`${API_URL}/api/services`).then((r) => r.json()).catch(() => null),
    ]).then(([contentData, projectsData, skillsData, servicesData]) => {
      if (!isMounted) return;

      const projects =
        projectsData && !projectsData.error
          ? projectsData.map((p: any) => ({
              ...p,
              name: locale === "fr" ? p.name_fr || p.name : p.name_en || p.name,
              description:
                locale === "fr"
                  ? p.description_fr || p.description
                  : p.description_en || p.description,
            }))
          : [
              {
                name: t.project1Name,
                description: t.project1Desc,
                stack: ["Next.js", "Django", "Tailwind", "TypeScript"],
                link: "#",
              },
              {
                name: t.project2Name,
                description: t.project2Desc,
                stack: ["Next.js", "Flutter", "Django", "Tailwind"],
                link: "#",
              },
              {
                name: t.project3Name,
                description: t.project3Desc,
                stack: ["Next.js", "Django", "Tailwind"],
                link: "#",
              },
              {
                name: t.project4Name,
                description: t.project4Desc,
                stack: ["React", "Laravel", "Tailwind"],
                link: "#",
              },
              {
                name: t.project5Name,
                description: t.project5Desc,
                stack: ["Python", "AI", "NLP"],
                link: "#",
              },
            ];

      const skills =
        skillsData && !skillsData.error
          ? skillsData.map((s: any) => ({
              ...s,
              tooltip: locale === "fr" ? s.tooltip_fr : s.tooltip_en,
            }))
          : (t.skillsList as Skill[]);

      const services =
        servicesData && !servicesData.error
          ? servicesData.map((s: any) =>
              locale === "fr" ? s.text_fr : s.text_en
            )
          : t.servicesList;

      setData({
        content: contentData && !contentData.error ? contentData : null,
        projects,
        skills,
        services,
        loading: false,
      });
    });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  return (
    <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

