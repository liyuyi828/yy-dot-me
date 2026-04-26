import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMetadata } from "@/types";

export function BlogCard({ post }: { post: PostMetadata }) {
  return (
    <article className="group border-b border-border py-6 last:border-b-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold tracking-tight transition group-hover:text-accent">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-2 text-foreground/70">{post.description}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded bg-foreground/5 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>
      </Link>
    </article>
  );
}
