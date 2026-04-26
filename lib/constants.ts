import type { Metadata } from "next";
import type { SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "yyTellMeWhy",
  title: "yyTellMeWhy",
  description:
    "Notes on investing and personal finance, software & AI, and self-improvement.",
  url: "https://yy-dot-me.vercel.app",
  author: {
    name: "Yuyi Li",
    github: "liyuyi828",
    linkedin: "liyuyi",
  },
  socialLinks: {
    github: "https://github.com/liyuyi828",
    linkedin: "https://www.linkedin.com/in/liyuyi/",
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
