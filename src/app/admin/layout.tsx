import { ReactNode } from "react";

export const metadata = {
  title: "Admin — Gestion Portfolio BILLY",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
