import { ReactNode } from "react";

export const metadata = {
  title: "Admin — Gestion Portfolio BILLY",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-neutral-100 antialiased selection:bg-white selection:text-black">
      {children}
    </section>
  );
}
