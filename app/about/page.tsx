import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_CONFIG.name}.`,
};

export default function AboutPage() {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      <h1>About</h1>
      <p>
        {/* TODO: write a real bio */}
        Hi, I&rsquo;m <strong>yy-tell-me-why</strong>. I write here about three
        things that occupy most of my thinking:
      </p>
      <ul>
        <li>Investing &amp; personal finance</li>
        <li>Software engineering, AI, and technology</li>
        <li>Self-improvement &amp; philosophy</li>
      </ul>
      <p>
        {/* TODO: replace with a real paragraph about background, role, and what you write */}
        TODO &mdash; a short paragraph about your background, what you&rsquo;re
        working on, and why you write.
      </p>
      <h2>Elsewhere</h2>
      <ul>
        {SITE_CONFIG.socialLinks.github && (
          <li>
            <a href={SITE_CONFIG.socialLinks.github}>GitHub</a>
          </li>
        )}
        {SITE_CONFIG.socialLinks.linkedin && (
          <li>
            <a href={SITE_CONFIG.socialLinks.linkedin}>LinkedIn</a>
          </li>
        )}
      </ul>
    </div>
  );
}
