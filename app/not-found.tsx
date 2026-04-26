import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-foreground/70">
        That page doesn&rsquo;t exist (or moved).
      </p>
      <div className="flex gap-3 text-sm">
        <Link href="/" className="rounded-md border border-border px-3 py-1.5 hover:bg-foreground/5">
          Home
        </Link>
        <Link href="/blog" className="rounded-md border border-border px-3 py-1.5 hover:bg-foreground/5">
          Blog
        </Link>
      </div>
    </div>
  );
}
