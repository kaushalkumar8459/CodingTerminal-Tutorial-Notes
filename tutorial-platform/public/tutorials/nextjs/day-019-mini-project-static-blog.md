---
title: Mini Project — Static Blog
slug: day-019-mini-project-static-blog
dayLabel: Day 19
level: Beginner
estimatedMinutes: 45
order: 19
track: nextjs
---
# Day 19 [Beginner]: Mini Project — Static Blog

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Visual Concept Map](#visual-concept-map)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 19 Outcome](#day-19-outcome)

## Goal

Build a complete static blog with markdown content, dynamic post pages, listing with categories, SEO metadata, and proper error handling, applying everything learned in Days 1–18.

## Prerequisites

- Completed Days 1–18 of the Next.js track
- Understanding of dynamic routes, layouts, metadata, and error handling

## Explanation

This mini project brings together the core concepts from the first 18 days into a real, working application. A static blog is the perfect first project because it exercises file-based routing, static generation, dynamic routes, metadata, loading states, and error handling — all without requiring authentication or a database.

The blog will read markdown files from the filesystem (or a data module), render them to HTML, and serve them as statically generated pages. Each post will have a title, date, category, and content. The listing page will support filtering by category. Every page will have proper SEO metadata, loading skeletons, and 404 handling.

By the end of this project, you'll have a deployable blog that demonstrates proficiency with the Next.js App Router fundamentals.

## Topic by Topic

### Topic 1: Project Structure

Theory:
Organise the blog with clear separation: data (posts), types, components, and route pages.

Practical:
Plan the folder structure before writing code — it saves time and avoids refactoring.

Code Example:

```
app/
  layout.tsx              ← Root layout with header/footer
  page.tsx                ← Homepage with latest posts
  not-found.tsx           ← Global 404 page
  blog/
    layout.tsx            ← Blog section layout
    page.tsx              ← Blog listing page
    [slug]/
      page.tsx            ← Individual post page
      not-found.tsx       ← Post not found
      loading.tsx         ← Post loading skeleton
lib/
  posts.ts               ← Post data and utilities
  markdown.ts            ← Markdown parsing
types/
  post.ts                ← TypeScript types
components/
  PostCard.tsx           ← Post preview card
  PostContent.tsx        ← Rendered post content
  CategoryFilter.tsx     ← Category filter (client)
  Header.tsx
  Footer.tsx
```
**Explanation:**
This topic explains Project Structure in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Project Structure.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Post Data Structure and Types

Theory:
Define TypeScript types for your post data upfront. This provides type safety throughout the application.

Practical:
Create a `types/post.ts` file with your post interface.

Code Example:

```tsx
// types/post.ts
export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
};

export type PostMeta = Omit<Post, "content">;
```
**Explanation:**
This topic explains Post Data Structure and Types in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Post Data Structure and Types.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: Post Data Module

Theory:
For a static blog, store posts as data in a TypeScript file or as markdown files. For simplicity, use a data module that returns post objects.

Practical:
Create `lib/posts.ts` with functions to get all posts, get a post by slug, and get categories.

Code Example:

```tsx
// lib/posts.ts
import type { Post, PostMeta } from "@/types/post";

const posts: Post[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    date: "2025-01-15",
    author: "Alice Chen",
    category: "Tutorial",
    excerpt: "Learn how to build your first Next.js application.",
    content: "
**Explanation:**
This topic explains Post Data Module in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Post Data Module.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Introduction\nNext.js is a powerful React framework...",
    tags: ["nextjs", "react", "beginner"],
  },
  {
    slug: "understanding-server-components",
    title: "Understanding Server Components",
    date: "2025-01-22",
    author: "Bob Kim",
    category: "Deep Dive",
    excerpt: "A deep dive into React Server Components.",
    content:
      "## What are Server Components?\nServer Components run on the server...",
    tags: ["react", "server-components", "advanced"],
  },
];

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getCategories(): string[] {
  return [...new Set(posts.map((p) => p.category))];
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllPostSlugs(): { slug: string }[] {
  return posts.map((p) => ({ slug: p.slug }));
}
```

### Topic 4: Blog Layout

Theory:
The blog layout wraps all blog pages with shared UI — a blog header and navigation between the listing and categories.

Practical:
Keep the blog layout focused on blog-specific navigation.

Code Example:

```tsx
// app/blog/layout.tsx
import Link from "next/link";
import { getCategories } from "@/lib/posts";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getCategories();
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          <Link href="/blog">The Blog</Link>
        </h1>
        <nav className="flex gap-2 flex-wrap">
          <Link
            href="/blog"
            className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              {cat}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
```
**Explanation:**
This topic explains Blog Layout in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Blog Layout.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Blog Listing Page

Theory:
The listing page shows all posts in a grid with filtering support. The filter is a URL query parameter so it works without JavaScript.

Practical:
Read the `category` query parameter in the server component and filter posts accordingly.

Code Example:

```tsx
// app/blog/page.tsx
import type { Metadata } from "next";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";

type Props = { searchParams: Promise<{ category?: string }> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category } = await searchParams;
  return {
    title: category ? `${category} Posts` : "Blog",
    description: "All blog posts and tutorials.",
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const posts = category ? getPostsByCategory(category) : getAllPosts();

  return (
    <div>
      {category && (
        <p className="text-gray-500 mb-6">
          Showing {posts.length} posts in "{category}"
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No posts found in this category.
        </p>
      )}
    </div>
  );
}
```
**Explanation:**
This topic explains Blog Listing Page in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Blog Listing Page.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Individual Post Page

Theory:
The post page uses `generateStaticParams` to pre-render all posts at build time. It reads the slug, fetches the post, and renders the content.

Practical:
Call `notFound()` for missing posts and add rich metadata for SEO.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl">
      <header className="mb-8">
        <span className="text-sm text-blue-600 font-medium">
          {post.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{post.author}</span>
          <span>·</span>
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>
      <div className="prose prose-gray max-w-none">
        {post.content.split("\n").map((line, i) =>
          line.startsWith("
**Explanation:**
This topic explains Individual Post Page in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Individual Post Page.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## ") ? (
            <h2 key={i} className="text-xl font-bold mt-6 mb-3">
              {line.slice(3)}
            </h2>
          ) : (
            <p key={i} className="mb-4 text-gray-700 leading-relaxed">
              {line}
            </p>
          ),
        )}
      </div>
      <footer className="mt-8 pt-8 border-t flex gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
          >
            #{tag}
          </span>
        ))}
      </footer>
    </article>
  );
}
```

### Topic 7: PostCard Component

Theory:
The PostCard component shows post metadata in a scannable format. It links to the full post.

Practical:
Display title, date, category, and excerpt clearly.

Code Example:

```tsx
// components/PostCard.tsx
import Link from "next/link";
import type { Post } from "@/types/post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {post.category}
        </span>
        <time className="text-xs text-gray-400">
          {new Date(post.date).toLocaleDateString()}
        </time>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <div className="mt-4 text-sm text-gray-400">{post.author}</div>
    </Link>
  );
}
```
**Explanation:**
This topic explains PostCard Component in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind PostCard Component.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 8: Root Layout and Home Page

Theory:
The root layout provides the global header and footer. The homepage shows the latest posts and links to the full blog.

Practical:
The homepage should load fast (SSG) and feature the most recent content.

Code Example:

```tsx
// app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center py-16 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-gray-500 mb-8">
          Thoughts on development, design, and building great software.
        </p>
        <Link
          href="/blog"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Read the Blog →
        </Link>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
```
**Explanation:**
This topic explains Root Layout and Home Page in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Root Layout and Home Page.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- **Static Blog**: A blog where all content is pre-rendered at build time for maximum performance.
- **Data Module**: A TypeScript file that exports post data and utility functions (no database needed for static sites).
- **generateStaticParams**: Pre-renders all dynamic blog post routes at build time.
- **Category Filtering**: Filtering posts via URL query parameters for SEO-friendly, shareable filter URLs.
- **PostCard Component**: A reusable component for displaying post previews in a listing.
- **Prose Content**: Rendering post content as HTML, either from markdown or plain text.
- **Blog Layout**: A nested layout that wraps all blog pages with blog-specific navigation.
- **Metadata per Post**: Individual SEO metadata for each blog post using `generateMetadata`.

## Visual Concept Map

```mermaid
flowchart TD
  A[Static Blog Project] --> B[app/ Routes]
  A --> C[lib/posts.ts Data Layer]
  A --> D[components/ UI Components]
  B --> E[/ Homepage]
  B --> F[/blog Listing]
  B --> G[/blog/slug Post Page]
  C --> H[getAllPosts]
  C --> I[getPostBySlug]
  C --> J[getCategories]
  D --> K[PostCard]
  D --> L[Header Footer]
  G --> M[generateStaticParams]
  G --> N[generateMetadata]
  G --> O[notFound for missing posts]
```

## End-to-End Practical

1. Create the project structure: `lib/posts.ts`, `types/post.ts`, components folder.
2. Add 5–6 mock blog posts with different categories and dates.
3. Build the blog listing page with category filter support.
4. Build the individual post page with `generateStaticParams` and `generateMetadata`.
5. Create the `PostCard` component.
6. Add `loading.tsx` and `not-found.tsx` to the blog segment.
7. Create the root layout with header and footer.
8. Run `npm run build` and verify all routes are statically generated.

## Hands-on Coding

### Example 1: Complete posts.ts Data Module

```tsx
// lib/posts.ts
import type { Post } from "@/types/post";

export const allPosts: Post[] = [
  {
    slug: "nextjs-app-router",
    title: "Next.js App Router: A Complete Guide",
    date: "2025-01-15",
    author: "Alice Chen",
    category: "Tutorial",
    excerpt:
      "Everything you need to know about the Next.js App Router, from basics to advanced patterns.",
    content: `## Introduction\nThe App Router is the modern way to build Next.js applications.\n\n## File-based Routing\nCreate a file at app/about/page.tsx and the route /about is created automatically.\n\n## Server Components\nAll components are Server Components by default, enabling powerful server-side rendering.`,
    tags: ["nextjs", "app-router", "react"],
    coverImage: "/blog/nextjs-app-router.jpg",
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices in 2025",
    date: "2025-01-22",
    author: "Bob Kim",
    category: "TypeScript",
    excerpt:
      "Practical TypeScript patterns that make your code more reliable and maintainable.",
    content: `## Use Strict Mode\nAlways enable strict mode in tsconfig.json.\n\n## Prefer Type over Interface\nUse type for most cases; use interface when you need declaration merging.\n\n## Avoid any\nUse unknown instead of any for better type safety.`,
    tags: ["typescript", "best-practices"],
  },
  {
    slug: "css-container-queries",
    title: "CSS Container Queries Explained",
    date: "2025-02-05",
    author: "Carol James",
    category: "CSS",
    excerpt:
      "Container queries let you style elements based on their container size, not the viewport.",
    content: `## What Are Container Queries?\nUnlike media queries that check viewport size, container queries check the parent container.\n\n## Syntax\nDefine a containment context with container-type: inline-size.`,
    tags: ["css", "responsive-design"],
  },
];

export function getAllPosts(): Post[] {
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  return allPosts.find((p) => p.slug === slug) ?? null;
}

export function getCategories(): string[] {
  return [...new Set(allPosts.map((p) => p.category))];
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllPostSlugs() {
  return allPosts.map((p) => ({ slug: p.slug }));
}
```

### Example 2: Blog Post Loading Skeleton

```tsx
// app/blog/[slug]/loading.tsx
export default function PostLoading() {
  return (
    <article className="max-w-2xl">
      <div className="mb-8">
        <div className="h-4 bg-gray-200 rounded w-20 mb-3 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-200 rounded animate-pulse ${i % 4 === 3 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </article>
  );
}
```

### Example 3: Root Layout with Navigation

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "My Blog", template: "%s | My Blog" },
  description: "Thoughts on web development and design.",
  metadataBase: new URL("https://myblog.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-gray-900">
              My Blog
            </Link>
            <nav className="flex gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
            </nav>
          </div>
        </header>
        <div className="min-h-[calc(100vh-64px)]">{children}</div>
        <footer className="bg-white border-t mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
            © 2025 My Blog — Built with Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}
```

## Mini Exercise

Scenario:
Add a tag filtering system to the blog. Tags are shown on each post and clicking a tag shows all posts with that tag.

Steps:

1. Add `getPostsByTag(tag: string)` to `lib/posts.ts`.
2. Add a `?tag=tagname` filter to the blog listing page.
3. Display tags on each `PostCard`.
4. Create a `TagBadge` component.
5. Make each tag clickable and link to `/blog?tag=tagname`.

Expected output:

- Tags are visible on each post card.
- Clicking a tag filters the listing to posts with that tag.
- The URL updates to include `?tag=tagname`.

## Assessment Quiz

### Quiz Questions

1. What function do you need to pre-render all dynamic blog post routes?
2. How do you read a query parameter (like `?category=Tutorial`) in a Server Component page?
3. What happens when `notFound()` is called in the post page?
4. How do you set individual page metadata for each blog post?
5. What advantage does a static blog have over a server-rendered blog?

### Quiz Answers

1. `generateStaticParams` — it returns an array of all slug values, telling Next.js to pre-render them at build time.
2. Read from `searchParams` prop: `const { category } = await searchParams`.
3. Next.js renders the nearest `not-found.tsx` file and returns an HTTP 404 status.
4. Use `generateMetadata` (an async function) to return a `Metadata` object with `title` and `description` based on the post data.
5. Static pages are pre-built as HTML files and served from a CDN — no server computation per request. This means faster load times, lower hosting costs, and unlimited scalability.

## Task

- Complete the static blog with at least 5 posts across 3 categories.
- Implement category filtering on the blog listing.
- Add a post detail page with full content, tags, and author.
- Add all special files: `loading.tsx`, `not-found.tsx`, and `error.tsx`.
- Run `npm run build` and verify the static generation report.
- Add at least two posts with different markdown structures.

## Self Check

- Does your blog have at least 5 posts with proper metadata?
- Does the listing page filter by category via URL params?
- Are post pages statically generated with `generateStaticParams`?
- Does calling `notFound()` show a proper blog post not found page?
- Is there a loading skeleton for the post page?

## Interview Questions and Answers

### Beginner

**Question:** How would you add a new blog post to a static Next.js blog?
**Answer:** Add a new object to the posts array in `lib/posts.ts` (or add a new markdown file if using the filesystem). Run `npm run build` to pre-render the new post. Deploy the build.

**Question:** Why use `generateStaticParams` for blog posts?
**Answer:** It tells Next.js to pre-render all blog posts as static HTML at build time. Without it, posts are rendered on demand (SSR) per request. Static rendering is faster and serves files from a CDN.

### Middle

**Question:** How would you implement pagination on the blog listing?
**Answer:** Read a `page` query parameter from `searchParams`. Slice the posts array: `posts.slice((page - 1) * perPage, page * perPage)`. Add prev/next links with updated `?page=` params. For static pagination, use `generateStaticParams` for each page number.

**Question:** How would you add reading time to each post?
**Answer:** Calculate it in `lib/posts.ts`: `Math.ceil(post.content.split(' ').length / 200)` (average reading speed is ~200 words/minute). Include it in the `Post` type and display it in the `PostCard` and post header.

### Advanced

**Question:** How would you migrate from a static data file to a headless CMS for the blog content?
**Answer:** Replace the functions in `lib/posts.ts` with API calls to the CMS (e.g., Contentful, Sanity). The component code stays the same — only the data layer changes. Add ISR (`revalidate = 3600`) so posts update from the CMS without a full rebuild.

**Question:** How would you implement full-text search for a static Next.js blog?
**Answer:** Pre-build a search index at build time (array of `{ slug, title, excerpt }`) and export it as a static JSON file. In a Client Component, load the index once and use a fuzzy-search library (Fuse.js) to filter client-side. For large sites, use Algolia or MeiliSearch.

## Day 19 Outcome

- You have built a complete static blog with Next.js App Router.
- You can organise a real project with proper file structure and data layers.
- You have applied routing, layouts, metadata, loading states, and error handling.
- Your blog is ready to be deployed to Vercel.
- You are ready to learn the Metadata API and SEO on Day 20.
