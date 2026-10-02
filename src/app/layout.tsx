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
    <html lang="en" className="scroll-smooth bg-[#080809]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#080809] text-[#f4f4f5] antialiased selection:bg-[#f4f4f5] selection:text-[#080809]">
        {children}
      </body>
    </html>
  );
}
