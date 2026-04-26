Perfect! Let me create a comprehensive implementation plan specifically formatted for Claude Code. This will be a complete specification that Claude Code can execute step-by-step.

---

# Next.js Blog Implementation Plan for Claude Code

## Project Overview

Build a high-performance personal blog using Next.js 14, MDX, and Tailwind CSS. Deploy to Vercel with full SEO optimization, dark mode, and modern developer experience.

---

## Phase 1: Core Setup & Foundation

### Step 1: Project Initialization

**Claude Code Task:**
```
Create a new Next.js 14 project with the following setup:

PROJECT NAME: personal-blog

TECH STACK:
- Next.js 14.2+ (App Router)
- TypeScript
- Tailwind CSS
- MDX support
- ESLint + Prettier

STRUCTURE:
personal-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── api/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BlogCard.tsx
│   ├── MDXComponents.tsx
│   └── ThemeToggle.tsx
├── content/
│   └── posts/
│       └── .gitkeep
├── lib/
│   ├── posts.ts
│   ├── utils.ts
│   └── constants.ts
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── mdx.css
├── types/
│   └── index.ts
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

DEPENDENCIES TO INSTALL:
- next-mdx-remote (for MDX rendering)
- gray-matter (for frontmatter parsing)
- reading-time (for reading time calculation)
- date-fns (for date formatting)
- shiki or rehype-pretty-code (for syntax highlighting)
- rehype-slug (for heading IDs)
- rehype-autolink-headings (for heading links)
- @tailwindcss/typography (for prose styling)

DEV DEPENDENCIES:
- @types/node
- @types/react
- @types/react-dom
- prettier
- prettier-plugin-tailwindcss
- eslint-config-prettier

Initialize with:
- TypeScript strict mode
- ESLint configuration
- Prettier configuration with Tailwind plugin
- Git repository

CREATE FILES:
- .prettierrc (with tailwind plugin)
- .eslintrc.json (Next.js + TypeScript + Prettier)
- .gitignore (standard Next.js)
```

---

### Step 2: TypeScript Types & Interfaces

**Claude Code Task:**
```
CREATE FILE: types/index.ts

Define TypeScript interfaces for:

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO format
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readingTime: string;
  content: string;
}

interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  readingTime: string;
}

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

Export all interfaces
```

---

### Step 3: Site Configuration

**Claude Code Task:**
```
CREATE FILE: lib/constants.ts

Define site-wide constants:

export const SITE_CONFIG: SiteConfig = {
  name: '[YOUR NAME]',
  description: 'Software engineer writing about [YOUR TOPICS]',
  url: 'https://yourdomain.com', // Update later
  author: {
    name: '[YOUR NAME]',
    email: 'your@email.com',
    twitter: '@yourhandle',
    github: 'yourusername',
    linkedin: 'yourprofile',
  },
  socialLinks: {
    twitter: 'https://twitter.com/yourhandle',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    email: 'mailto:your@email.com',
  },
};

export const POSTS_PER_PAGE = 10;

export const SITE_METADATA = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['blog', 'software engineering', 'web development', 'next.js'],
  authors: [{ name: SITE_CONFIG.author.name }],
  creator: SITE_CONFIG.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.author.twitter,
  },
};
```

---

### Step 4: MDX Post Processing Library

**Claude Code Task:**
```
CREATE FILE: lib/posts.ts

Implement functions to:

1. getAllPosts(): Promise<PostMetadata[]>
   - Read all .mdx files from content/posts/
   - Parse frontmatter with gray-matter
   - Calculate reading time with reading-time package
   - Sort by date (newest first)
   - Filter out drafts in production (process.env.NODE_ENV === 'production')
   - Return array of PostMetadata

2. getPost(slug: string): Promise<Post>
   - Read specific .mdx file by slug
   - Parse frontmatter
   - Calculate reading time
   - Return full Post object with content

3. getPostsByTag(tag: string): Promise<PostMetadata[]>
   - Get all posts with specific tag
   - Return sorted array

4. getFeaturedPosts(): Promise<PostMetadata[]>
   - Get posts where featured: true
   - Limit to 3 most recent
   - Return array

5. getAllTags(): Promise<{ tag: string; count: number }[]>
   - Extract all unique tags from posts
   - Count posts per tag
   - Sort by count (descending)
   - Return array of {tag, count}

ERROR HANDLING:
- Throw descriptive errors if file not found
- Validate frontmatter fields
- Handle missing optional fields gracefully

CACHING:
- Consider using Next.js cache() function for production builds
- Use unstable_cache for getAllPosts()

Include proper TypeScript types for all functions
```

---

### Step 5: Utility Functions

**Claude Code Task:**
```
CREATE FILE: lib/utils.ts

Implement utility functions:

1. cn(...inputs: ClassValue[]): string
   - Merge Tailwind classes using clsx and tailwind-merge
   - Handle conditional classes
   - Remove duplicates and conflicts

2. formatDate(date: string, format?: string): string
   - Use date-fns to format dates
   - Default format: "MMMM dd, yyyy" (e.g., "January 15, 2026")
   - Support custom formats

3. slugify(text: string): string
   - Convert text to URL-friendly slug
   - Lowercase, replace spaces with hyphens
   - Remove special characters

4. getReadingTime(content: string): string
   - Use reading-time package
   - Return formatted string like "5 min read"

5. generateOGImage(title: string, description?: string): string
   - Generate URL for Open Graph image
   - Can use Vercel OG Image generation later
   - For now, return placeholder or static image

Install dependencies:
- clsx
- tailwind-merge
- date-fns

Include proper TypeScript types
```

---

### Step 6: Tailwind Configuration

**Claude Code Task:**
```
UPDATE FILE: tailwind.config.ts

Configure Tailwind with:

CONTENT:
- './app/**/*.{js,ts,jsx,tsx,mdx}'
- './components/**/*.{js,ts,jsx,tsx,mdx}'
- './content/**/*.mdx'

THEME EXTENSIONS:
- typography plugin configuration for prose
- Custom colors for dark mode
- Custom font families (if using custom fonts)
- Extended spacing/sizing for blog layout

DARK MODE:
- mode: 'class'
- Configure dark: variant

PLUGINS:
- @tailwindcss/typography
- Custom plugin for prose styling in dark mode

EXAMPLE CUSTOM COLORS:
colors: {
  border: 'hsl(var(--border))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  // etc.
}

TYPOGRAPHY CUSTOMIZATION:
Customize prose classes for:
- Code blocks
- Inline code
- Links
- Headings
- Blockquotes
- Lists
```

---

### Step 7: Global Styles & CSS Variables

**Claude Code Task:**
```
UPDATE FILE: app/globals.css

Add Tailwind directives:
@tailwind base;
@tailwind components;
@tailwind utilities;

Add CSS variables for theming:
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
  }
}

Add base styles:
* {
  @apply border-border;
}

body {
  @apply bg-background text-foreground;
  font-feature-settings: "rlig" 1, "calt" 1;
}

CREATE FILE: styles/mdx.css

Add MDX-specific styles:
- Custom code block styling
- Syntax highlighting theme
- Callout box styles
- Image styling
- Table styling
```

---

### Step 8: MDX Components

**Claude Code Task:**
```
CREATE FILE: components/MDXComponents.tsx

Create custom MDX components to replace default HTML elements:

const MDXComponents = {
  // Headings with anchor links
  h1: ({ children, ...props }) => (
    <h1 className="..." {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="..." {...props}>
      <a href={`#${id}`} className="...">
        {children}
      </a>
    </h2>
  ),
  // ... h3, h4, h5, h6

  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    return (
      
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="..."
        {...props}
      >
        {children}
      </a>
    );
  },

  // Code blocks
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return <code className="..." {...props}>{children}</code>;
    }
    return <code className="..." {...props}>{children}</code>;
  },

  // Pre (code blocks wrapper)
  pre: ({ children, ...props }) => (
    <pre className="..." {...props}>
      {children}
    </pre>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote className="..." {...props}>
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto">
      <table className="..." {...props}>
        {children}
      </table>
    </div>
  ),

  // Images
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      className="..."
      loading="lazy"
      {...props}
    />
  ),

  // Custom components
  Callout: ({ type, children }) => {
    // info, warning, error, success
    return <div className="...">{children}</div>;
  },
};

export default MDXComponents;

STYLING GUIDELINES:
- Use Tailwind utility classes
- Support dark mode with dark: variants
- Ensure good typography with prose classes
- Add smooth scroll behavior for anchor links
- Style inline code distinctly from code blocks
```

---

### Step 9: Layout Components

**Claude Code Task:**
```
CREATE FILE: components/Header.tsx

Create site header with:
- Logo/site name (link to home)
- Navigation links:
  - Home (/)
  - Blog (/blog)
  - About (/about)
- Theme toggle button (sun/moon icons)
- Responsive mobile menu (hamburger)
- Sticky header with backdrop blur
- Active link highlighting

Use Tailwind for styling
Support dark mode
Smooth transitions
Mobile-first responsive

---

CREATE FILE: components/Footer.tsx

Create site footer with:
- Copyright notice with current year
- Social links (GitHub, Twitter, LinkedIn, Email)
- RSS feed link
- "Built with Next.js" badge (optional)
- Centered layout
- Dark mode support

---

CREATE FILE: components/ThemeToggle.tsx

Create theme toggle component:
- Sun icon for light mode
- Moon icon for dark mode
- Use next-themes package for theme management
- Smooth transition
- Accessible (keyboard nav, aria labels)
- Button with hover/focus states

Install: next-themes

---

CREATE FILE: components/BlogCard.tsx

Create blog post card component:
- Props: PostMetadata
- Display:
  - Title (link to post)
  - Description
  - Date (formatted)
  - Reading time
  - Tags (as badges)
  - Featured badge (if featured)
- Hover effect (scale, shadow)
- Responsive layout
- Dark mode support
- Truncate description if too long

Include TypeScript types
```

---

### Step 10: Root Layout

**Claude Code Task:**
```
UPDATE FILE: app/layout.tsx

Create root layout with:

IMPORTS:
- Header component
- Footer component
- ThemeProvider from next-themes
- SITE_METADATA from constants
- fonts (if using custom fonts)

METADATA:
export const metadata = SITE_METADATA;

LAYOUT COMPONENT:
- Wrap with ThemeProvider (attribute="class", defaultTheme="system")
- Include <Header />
- Main content area with proper padding/max-width
- Include <Footer />
- Proper semantic HTML (header, main, footer)

HTML STRUCTURE:
<html lang="en" suppressHydrationWarning>
  <body className={...}>
    <ThemeProvider>
      <Header />
      <main className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  </body>
</html>

FONTS (optional):
- Use next/font for optimized font loading
- Example: Inter or system fonts

Ensure proper dark mode support throughout
```

---

## Phase 2: Core Pages

### Step 11: Homepage

**Claude Code Task:**
```
UPDATE FILE: app/page.tsx

Create homepage with:

SECTIONS:
1. Hero Section
   - Welcome message / tagline
   - Brief introduction (2-3 sentences)
   - CTA buttons (View Blog, About Me)
   - Eye-catching gradient or design element

2. Featured Posts
   - Fetch using getFeaturedPosts()
   - Display 3 featured posts in grid
   - Use BlogCard component
   - "View All Posts" link to /blog

3. Recent Posts (Optional)
   - Show 5 most recent posts
   - Simple list view
   - Link to full blog

4. Newsletter Signup (Optional - Phase 3)
   - Simple email input + subscribe button
   - To be connected to ConvertKit/Beehiiv later

IMPLEMENTATION:
- Use async Server Component
- Fetch posts at build time
- Static generation for performance
- Responsive grid layout (1 col mobile, 3 col desktop)
- Smooth animations on scroll (optional, use Framer Motion if desired)

METADATA:
- Set custom page title and description
- Generate metadata function

TypeScript types for all props and data
```

---

### Step 12: Blog Index Page

**Claude Code Task:**
```
CREATE FILE: app/blog/page.tsx

Create blog listing page with:

FEATURES:
1. Page Title & Description
   - "Blog" heading
   - Optional subtitle/description

2. All Posts List
   - Fetch using getAllPosts()
   - Display all posts (not drafts in production)
   - Use BlogCard component
   - Grid layout (1 col mobile, 2 col desktop)

3. Pagination (Phase 3 feature, start simple)
   - For now, show all posts
   - Add pagination later if > 50 posts

4. Tag Filter (Optional for Phase 3)
   - Show all tags with post counts
   - Filter posts by tag
   - For now, link to individual tag pages

IMPLEMENTATION:
- Async Server Component
- Static generation
- Sort by date (newest first)
- Show post count ("Showing X posts")

METADATA:
export const metadata = {
  title: 'Blog',
  description: 'Articles about software engineering, web development, and more.',
};

Include proper TypeScript types
```

---

### Step 13: Individual Blog Post Page

**Claude Code Task:**
```
CREATE FILE: app/blog/[slug]/page.tsx

Create individual blog post page with:

FEATURES:
1. Post Header
   - Title (h1)
   - Description
   - Metadata row: date, reading time, tags
   - Featured image (if exists)

2. Article Content
   - Render MDX with next-mdx-remote
   - Use MDXComponents for custom styling
   - Proper typography with prose classes

3. Post Footer
   - Share buttons (Twitter, LinkedIn, copy link)
   - Tags
   - Author info (optional)

4. Related Posts (Phase 3)
   - Show 3 related posts based on tags

IMPLEMENTATION:
- generateStaticParams() for all posts
- generateMetadata() for dynamic SEO
- Use getPost(slug) to fetch post data
- MDX rendering with custom components
- Proper error handling (404 if post not found)

MDX CONFIGURATION:
- Use next-mdx-remote or @next/mdx
- Configure rehype plugins:
  - rehype-slug (heading IDs)
  - rehype-autolink-headings (anchor links)
  - rehype-pretty-code or shiki (syntax highlighting)
- Configure remark plugins if needed

METADATA:
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

STATIC GENERATION:
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

Include proper error boundaries and loading states
Full TypeScript typing
```

---

### Step 14: About Page

**Claude Code Task:**
```
CREATE FILE: app/about/page.tsx

Create about page with:

CONTENT:
1. Page title: "About Me"
2. Bio section (customize this placeholder):
   - Your name
   - Your background
   - What you do
   - What you write about
   - Your interests

3. Professional info:
   - Current role/company
   - Technologies you work with
   - Years of experience

4. Contact/Social links:
   - Email
   - GitHub
   - Twitter/X
   - LinkedIn
   - Resume/CV link (optional)

5. Optional sections:
   - Projects showcase
   - Speaking/writing elsewhere
   - Certifications

LAYOUT:
- Single column, max-width prose
- Profile image (optional, add later)
- Proper typography
- Responsive
- Dark mode support

METADATA:
export const metadata = {
  title: 'About',
  description: 'Learn more about [Your Name] and this blog.',
};

Use semantic HTML
Include proper heading hierarchy
```

---

### Step 15: 404 Page

**Claude Code Task:**
```
CREATE FILE: app/not-found.tsx

Create custom 404 page with:

CONTENT:
- Large "404" display
- Message: "Page not found"
- Description: "The page you're looking for doesn't exist."
- Link back to home page
- Link to blog page
- Optional: search functionality

DESIGN:
- Centered content
- Friendly tone
- Maintain site navigation (Header/Footer)
- Dark mode support
- Optional: animated 404 illustration or SVG

Keep it simple and user-friendly
Include proper TypeScript types
```

---

## Phase 3: Sample Content

### Step 16: Create Sample Blog Posts

**Claude Code Task:**
```
CREATE 3 SAMPLE MDX BLOG POSTS in content/posts/:

POST 1: content/posts/first-post.mdx
---
title: "Building a Blog with Next.js and MDX"
description: "How I built this blog using Next.js 14, MDX, and Tailwind CSS"
date: "2026-01-15"
tags: ["nextjs", "mdx", "web development"]
featured: true
---

Write a post about:
- Why you chose Next.js
- Benefits of MDX for technical blogging
- The tech stack
- Deployment process
- What's next

Include:
- Code examples with syntax highlighting
- Headings (h2, h3)
- Lists
- Links
- Inline code
- Code blocks

Minimum 800 words

---

POST 2: content/posts/typescript-tips.mdx
---
title: "5 TypeScript Tips for Better Code"
description: "Practical TypeScript patterns that improve code quality"
date: "2026-01-10"
tags: ["typescript", "programming", "best practices"]
featured: true
---

Write about:
- 5 practical TypeScript tips
- Each with code examples
- Why each tip matters
- Common mistakes to avoid

Include:
- Multiple code blocks
- Before/after examples
- Proper explanations

Minimum 1000 words

---

POST 3: content/posts/getting-started-with-react.mdx
---
title: "React Fundamentals: A Practical Guide"
description: "Understanding the core concepts of React through examples"
date: "2026-01-05"
tags: ["react", "javascript", "tutorial"]
---

Write about:
- Component basics
- Props and state
- Hooks overview
- Common patterns

Include:
- Code examples
- Interactive concepts
- Links to docs

Minimum 800 words

ENSURE:
- Valid frontmatter
- Proper markdown formatting
- Code blocks with language specified
- Headings for structure
- Real, useful content (not Lorem ipsum)
```

---

## Phase 4: MDX Configuration

### Step 17: Next.js Configuration for MDX

**Claude Code Task:**
```
UPDATE FILE: next.config.js

Configure Next.js for MDX:

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // Experimental features if needed
  experimental: {
    mdxRs: true, // Use Rust-based MDX compiler (faster)
  },

  // Image optimization
  images: {
    domains: ['yourdomain.com'], // Add your domain
    formats: ['image/avif', 'image/webp'],
  },

  // Redirects if needed
  async redirects() {
    return [];
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

### Step 18: MDX Plugins Configuration

**Claude Code Task:**
```
UPDATE lib/posts.ts to include MDX processing:

Add MDX compilation with plugins:

import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import MDXComponents from '@/components/MDXComponents';

const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
};

Update getPost() function to compile MDX:

export async function getPost(slug: string): Promise<Post> {
  // ... read file
  
  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
  });

  // ... rest of function
}

Install required packages:
- next-mdx-remote
- rehype-pretty-code
- rehype-slug
- rehype-autolink-headings
- remark-gfm
- shiki (peer dependency for rehype-pretty-code)
```

---

## Phase 5: SEO & Performance

### Step 19: Sitemap Generation

**Claude Code Task:**
```
CREATE FILE: app/sitemap.ts

Generate dynamic sitemap:

import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SITE_CONFIG } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const postUrls = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...postUrls];
}

This will auto-generate sitemap.xml at build time
```

---

### Step 20: RSS Feed

**Claude Code Task:**
```
CREATE FILE: app/rss.xml/route.ts

Generate RSS feed:

import { getAllPosts } from '@/lib/posts';
import { SITE_CONFIG } from '@/lib/constants';

export async function GET() {
  const posts = await getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${SITE_CONFIG.name}</title>
        <description>${SITE_CONFIG.description}</description>
        <link>${SITE_CONFIG.url}</link>
        <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en-US</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${posts
          .map(
            (post) => `
          <item>
            <title>${post.title}</title>
            <description>${post.description}</description>
            <link>${SITE_CONFIG.url}/blog/${post.slug}</link>
            <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          </item>
        `
          )
          .join('')}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

This creates /rss.xml endpoint
```

---

### Step 21: robots.txt

**Claude Code Task:**
```
CREATE FILE: app/robots.ts

Generate robots.txt:

import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Add admin if you create one later
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}

This auto-generates robots.txt
```

---

## Phase 6: Deployment Setup

### Step 22: Environment Variables

**Claude Code Task:**
```
CREATE FILE: .env.local

Add environment variables (Git ignored):

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

---

CREATE FILE: .env.example

Add template for others:

NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production

Add note in README about copying .env.example to .env.local
```

---

### Step 23: README Documentation

**Claude Code Task:**
```
UPDATE FILE: README.md

Create comprehensive README:

# [Your Name]'s Blog

Personal blog built with Next.js 14, MDX, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Content:** MDX (Markdown + React)
- **Styling:** Tailwind CSS
- **Typography:** @tailwindcss/typography
- **Code Highlighting:** Rehype Pretty Code with Shiki
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-blog.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Writing Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter:
```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2026-01-15"
tags: ["tag1", "tag2"]
featured: false
draft: false
---

Your content here...
```

3. Write your post in Markdown
4. Save and it will appear automatically

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── content/posts/    # Blog posts (MDX)
├── lib/              # Utilities and helpers
├── public/           # Static assets
├── styles/           # Global styles
└── types/            # TypeScript types
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (automatic)

### Environment Variables

Set in Vercel dashboard:
- `NEXT_PUBLIC_SITE_URL`: Your production URL

## Features

- ✅ MDX blog posts
- ✅ Syntax highlighting
- ✅ Dark mode
- ✅ SEO optimized
- ✅ RSS feed
- ✅ Sitemap
- ✅ Reading time
- ✅ Tags
- ✅ Responsive design

## License

MIT

## Author

[Your Name] - [@yourhandle](https://twitter.com/yourhandle)
```

---

### Step 24: Git Setup

**Claude Code Task:**
```
ENSURE .gitignore includes:

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

Initialize git if not already:
git init
git add .
git commit -m "Initial commit: Next.js blog with MDX"
```

---

## Phase 7: Testing & Quality

### Step 25: Package.json Scripts

**Claude Code Task:**
```
UPDATE FILE: package.json

Add useful scripts:

{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next out",
    "analyze": "ANALYZE=true next build"
  }
}

Add dependencies for bundle analysis if wanted:
@next/bundle-analyzer
```

---

### Step 26: Pre-deployment Checklist

**Claude Code Task:**
```
CREATE FILE: DEPLOYMENT_CHECKLIST.md

Pre-deployment checklist:

## Before Deploying

### Configuration
- [ ] Update SITE_CONFIG in lib/constants.ts with real values
- [ ] Update author info (name, email, social links)
- [ ] Add real domain URL
- [ ] Verify all environment variables

### Content
- [ ] Replace sample blog posts with real content
- [ ] Update About page with real bio
- [ ] Add profile picture (optional)
- [ ] Write at least 3-5 real posts

### Code Quality
- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm run type-check` (no errors)
- [ ] Run `npm run build` (successful)
- [ ] Test locally with `npm run start`
- [ ] Test dark mode
- [ ] Test mobile responsive
- [ ] Test all links work

### Performance
- [ ] Optimize images (use next/image)
- [ ] Check bundle size
- [ ] Verify lighthouse score (local)

### SEO
- [ ] Verify sitemap.xml generates
- [ ] Verify robots.txt generates
- [ ] Test RSS feed
- [ ] Check meta tags in browser
- [ ] Verify Open Graph images

### Git
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Create repository if needed

## Deployment Steps

1. Go to vercel.com
2. Import GitHub repository
3. Configure:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
4. Add environment variables
5. Deploy

## Post-Deployment

- [ ] Verify production site loads
- [ ] Test all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Add custom domain (optional)
- [ ] Set up analytics (Phase 2)
```

---

## Phase 8: Vercel Deployment

### Step 27: Vercel Configuration

**Claude Code Task:**
```
CREATE FILE: vercel.json

Configure Vercel settings:

{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}

This optimizes deployment configuration
```

---

## Summary: Complete File Structure

After completing all steps, you should have:

```
personal-blog/
├── .env.example
├── .env.local (git-ignored)
├── .gitignore
├── .prettierrc
├── .eslintrc.json
├── DEPLOYMENT_CHECKLIST.md
├── README.md
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vercel.json
├── app/
│   ├── layout.tsx ✅
│   ├── page.tsx ✅
│   ├── globals.css ✅
│   ├── not-found.tsx ✅
│   ├── sitemap.ts ✅
│   ├── robots.ts ✅
│   ├── blog/
│   │   ├── page.tsx ✅
│   │   └── [slug]/
│   │       └── page.tsx ✅
│   ├── about/
│   │   └── page.tsx ✅
│   ├── rss.xml/
│   │   └── route.ts ✅
│   └── api/ (future)
├── components/
│   ├── Header.tsx ✅
│   ├── Footer.tsx ✅
│   ├── BlogCard.tsx ✅
│   ├── MDXComponents.tsx ✅
│   └── ThemeToggle.tsx ✅
├── content/
│   └── posts/
│       ├── first-post.mdx ✅
│       ├── typescript-tips.mdx ✅
│       └── getting-started-with-react.mdx ✅
├── lib/
│   ├── posts.ts ✅
│   ├── utils.ts ✅
│   └── constants.ts ✅
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── mdx.css ✅
└── types/
    └── index.ts ✅
```

---

## Next Steps After Core Blog is Built

**Phase 2 Features (Add Later):**
1. Full-text search (Flexsearch)
2. View counter (Vercel KV)
3. Newsletter integration (ConvertKit)
4. Comments (Giscus)
5. Reading progress bar
6. Table of contents
7. Related posts
8. Analytics (Vercel Analytics or Plausible)
9. Tag pages
10. Series/collections

**Phase 3 Features (Advanced):**
1. Admin panel for writing posts
2. Image optimization pipeline
3. Social share images (OG Image generation)
4. Bookmarking system
5. Search functionality
6. Code playgrounds (Sandpack)
7. Custom MDX components library
8. Draft preview mode

---

## Execution Instructions for Claude Code

**To execute this plan:**

1. **Copy this entire plan** to a new conversation with Claude Code

2. **Start with Phase 1** and execute each step sequentially

3. **For each step**, Claude Code will:
   - Create/update the specified files
   - Install necessary dependencies
   - Implement the described functionality
   - Follow TypeScript best practices
   - Apply Tailwind CSS styling
   - Ensure mobile responsiveness
   - Support dark mode throughout

4. **After each phase**, test the build:
   ```bash
   npm run dev
   ```

5. **Customize** the placeholder content:
   - Replace `[YOUR NAME]` with your actual name
   - Update social links
   - Modify color scheme if desired
   - Replace sample blog posts

6. **Deploy** after Phase 6 is complete

---

## Testing Commands

After Claude Code completes the implementation:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format

# Production build
npm run build

# Test production build locally
npm run start
```

---

## Success Criteria

Your blog is ready to deploy when:

✅ All TypeScript compilation passes (`npm run type-check`)  
✅ No ESLint errors (`npm run lint`)  
✅ Production build succeeds (`npm run build`)  
✅ All pages render correctly in browser  
✅ Dark mode works  
✅ Mobile responsive  
✅ Sample blog posts display with proper formatting  
✅ Code syntax highlighting works  
✅ Sitemap generates at `/sitemap.xml`  
✅ RSS feed available at `/rss.xml`  
✅ robots.txt generates  
✅ Meta tags present in page source  

---

This plan is **ready to execute with Claude Code**. Copy it into a new Claude Code conversation and Claude Code will build your entire blog step-by-step, creating all files, implementing all features, and configuring everything needed for deployment.

Want me to refine any specific section or add additional features to the plan?