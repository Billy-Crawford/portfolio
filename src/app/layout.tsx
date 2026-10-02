import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "OUMAROU BILLY — AI Engineer & Full-Stack Architect",
  description: "Portfolio of Oumarou Billy, AI Master Student and Full-Stack Developer.",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fafaf9] dark:bg-[#080809] text-neutral-900 dark:text-[#f4f4f5] antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
