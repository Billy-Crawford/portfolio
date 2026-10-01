// src/app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "BILLY — AI Engineer & Fullstack Developer",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0c0c0c]">
      <body className="min-h-screen bg-[#0c0c0c] text-neutral-100 antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}