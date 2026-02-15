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
    <html lang="en">
      <body className="bg-[var(--background)] text-white">
        {children}
      </body>
    </html>
  );
}
