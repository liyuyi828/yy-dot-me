import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";

export default async function HomePage() {
  const [featured, recent] = await Promise.all([
    getFeaturedPosts(3),
    getAllPosts().then((posts) => posts.slice(0, 5)),
  ]);

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {SITE_CONFIG.title}
        </h1>
        <p className="text-foreground/70">{SITE_CONFIG.description}</p>
      </section>

      {featured.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Featured
          </h2>
          <div>
            {featured.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Recent posts
          </h2>
          <Link href="/blog" className="text-sm text-foreground/60 hover:text-foreground">
            All posts →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-foreground/60">No posts yet.</p>
        ) : (
          <div>
            {recent.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
