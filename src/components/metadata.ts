import type { Metadata } from "next";
import { content, localePath, type Locale } from "@/content/site";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = productionHost ? `https://${productionHost}` : "http://localhost:3000";

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = content[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath[locale],
      languages: {
        uz: localePath.uz,
        ru: localePath.ru,
        en: localePath.en,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: localePath[locale],
      type: "website",
      locale,
    },
    icons: { icon: "/icon.svg" },
  };
}
