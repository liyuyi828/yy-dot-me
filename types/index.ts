export interface PostMetadata {
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

export interface Post extends PostMetadata {
  content: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    email?: string;
    github?: string;
    linkedin?: string;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}
