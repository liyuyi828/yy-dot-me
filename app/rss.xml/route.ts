import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const posts = await getAllPosts();
  const base = SITE_CONFIG.url.replace(/\/$/, "");

  const items = posts
    .map(
      (post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <description>${escapeXml(post.description)}</description>
        <link>${base}/blog/${post.slug}</link>
        <guid isPermaLink="true">${base}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <link>${base}</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
