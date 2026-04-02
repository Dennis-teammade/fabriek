import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  canonicalUrl?: string;
  html: string;
  content: string;
  sourcePath: string;
};

const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true });

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function normalizePost(raw: Record<string, unknown>, content: string, sourcePath: string): BlogPost {
  const title = String(raw.title || "Untitled");
  const slug = String(raw.slug || "").trim();
  const description = String(raw.description || "").trim();

  if (!slug) {
    throw new Error(`Missing slug in ${sourcePath}`);
  }

  if (!description) {
    throw new Error(`Missing description in ${sourcePath}`);
  }

  return {
    title,
    slug,
    description,
    metaTitle: raw.meta_title ? String(raw.meta_title) : undefined,
    metaDescription: raw.meta_description ? String(raw.meta_description) : undefined,
    metaImage: raw.meta_image ? String(raw.meta_image) : undefined,
    canonicalUrl: raw.canonical_url ? String(raw.canonical_url) : undefined,
    html: markdown.render(content),
    content,
    sourcePath
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;

    const sourcePath = path.join(BLOG_DIR, entry);
    const file = await fs.readFile(sourcePath, "utf8");
    const parsed = matter(file);
    const post = normalizePost(parsed.data, parsed.content, sourcePath);
    posts.push(post);
  }

  return posts.sort((a, b) => a.title.localeCompare(b.title, "nl"));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
