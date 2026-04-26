import type { Metadata } from "next";
import type { SiteConfig } from "@/types";

// TODO: fill in real values before launch (name, domain, social handles)
export const SITE_CONFIG: SiteConfig = {
  name: "TODO Name",
  title: "TODO Site Title",
  description:
    "Notes on investing and personal finance, software & AI, and self-improvement.",
  url: "https://example.com",
  author: {
    name: "TODO Name",
    github: "TODO",
    linkedin: "TODO",
  },
  socialLinks: {
    github: "https://github.com/TODO",
    linkedin: "https://linkedin.com/in/TODO",
  },
};

export const TOPICS = [
  "investing",
  "personal finance",
  "software engineering",
  "ai",
  "technology",
  "self improvement",
  "philosophy",
] as const;

export const POSTS_PER_PAGE = 10;

export const SITE_METADATA: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...TOPICS],
  authors: [{ name: SITE_CONFIG.author.name }],
  creator: SITE_CONFIG.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};
