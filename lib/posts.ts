import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMetadata } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function readPostFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

function parseFile(slug: string, raw: string): Post {
  const { data, content } = matter(raw);

  if (!data.title || !data.date) {
    throw new Error(`Post "${slug}" is missing required frontmatter (title, date)`);
  }

  return {
    slug,
    title: data.title,
    description: data.description ?? "",
    date: data.date instanceof Date ? data.date.toISOString() : String(data.date),
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    coverImage: data.coverImage,
    readingTime: readingTime(content).text,
    content,
  };
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const files = await readPostFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      return parseFile(slug, raw);
    })
  );

  const visible = posts.filter(
    (p) => !(p.draft && process.env.NODE_ENV === "production")
  );

  return visible
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export async function getPost(slug: string): Promise<Post> {
  const raw = await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  return parseFile(slug, raw);
}

export async function getFeaturedPosts(limit = 3): Promise<PostMetadata[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.tags.includes(tag));
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await getAllPosts();
  const counts = new Map<string, number>();
  for (const post of all) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
