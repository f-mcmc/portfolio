import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/components/metadata";
import "../globals.css";

export const metadata: Metadata = buildMetadata("uz");

export const viewport: Viewport = {
  themeColor: "#060b1d",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
