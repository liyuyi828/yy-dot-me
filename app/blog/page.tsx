import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on investing, software & AI, and personal growth.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-foreground/70">
          {posts.length} {posts.length === 1 ? "post" : "posts"}.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-foreground/60">No posts yet — check back soon.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
