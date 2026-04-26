import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate } from "@/lib/utils";
import { mdxOptions } from "@/lib/mdx";
import { getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  if (post.draft && process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg text-foreground/70">{post.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
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
      </header>

      <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:bg-transparent prose-pre:p-0">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>
    </article>
  );
}
