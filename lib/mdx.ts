import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
};

export const mdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
};
