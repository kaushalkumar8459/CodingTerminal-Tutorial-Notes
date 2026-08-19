---
title: Metadata API and SEO Basics
slug: day-020-metadata-api-and-seo-basics
dayLabel: Day 20
level: Beginner
estimatedMinutes: 30
order: 20
track: nextjs
---
# Day 20 [Beginner]: Metadata API and SEO Basics

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
- [Day 20 Outcome](#day-20-outcome)

## Goal

Use the Next.js Metadata API to add comprehensive SEO metadata, Open Graph tags, Twitter cards, sitemaps, and robots.txt to your application.

## Prerequisites

- Completed Day 19: Mini Project Static Blog
- Understanding of layouts, pages, and `generateMetadata`

## Explanation

SEO (Search Engine Optimisation) is critical for public-facing websites. It involves providing search engines and social media platforms with structured information about your pages — their title, description, canonical URL, language, and preview images. Next.js's Metadata API makes this straightforward through the `metadata` export and `generateMetadata` function.

Good SEO metadata has three main audiences: search engines (Google, Bing), social media platforms (Facebook/Open Graph, Twitter/X), and screen readers. Each has slightly different requirements. The Next.js Metadata API handles all three with a single, unified object.

Beyond per-page metadata, you also need a sitemap (a list of all your URLs for search engine crawlers) and a robots.txt (instructions for which pages crawlers can or cannot visit). Next.js can generate both of these dynamically using special files in the `app/` directory.

## Topic by Topic

### Topic 1: Static Metadata Object

Theory:
Export a `metadata` object from any `layout.tsx` or `page.tsx`. Next.js merges metadata through the layout tree.

Practical:
Set up a root layout metadata with site-wide defaults and override specific fields per page.

Code Example:

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "My App", // Shown when no page-level title
    template: "%s | My App", // Pattern: "Page Title | My App"
  },
  description: "Build amazing things with Next.js.",
  keywords: ["Next.js", "React", "TypeScript"],
  authors: [{ name: "Alice Chen", url: "https://alice.dev" }],
  metadataBase: new URL("https://myapp.com"), // Required for absolute URLs
  alternates: {
    canonical: "/",
  },
};

// app/about/page.tsx
export const metadata: Metadata = {
  title: "About", // Becomes "About | My App" via template
  description: "Learn about our team and mission.",
};
```
**Explanation:**
This topic explains Static Metadata Object in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Static Metadata Object.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Open Graph Metadata

Theory:
Open Graph (OG) tags control how your pages appear when shared on Facebook, LinkedIn, Slack, and other platforms. Set `openGraph` in your metadata object.

Practical:
Every page should have an OG title, description, and image for good social sharing.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://myapp.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage ?? "/og-default.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function getPostBySlug(slug: string) {
  return {
    title: `Post: ${slug}`,
    excerpt: "A post.",
    coverImage: "/og.png",
    slug,
    date: "2025-01-01",
    author: "Alice",
  };
}
```
**Explanation:**
This topic explains Open Graph Metadata in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Open Graph Metadata.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: Twitter Cards

Theory:
Twitter/X uses its own card format. Set `twitter` in the metadata to control how pages appear in tweets.

Practical:
Use `summary_large_image` for blog posts and `summary` for smaller previews.

Code Example:

```tsx
export const metadata: Metadata = {
  twitter: {
    card: "summary_large_image",
    title: "My Awesome Blog Post",
    description: "An in-depth look at Next.js SEO features.",
    creator: "@myhandle",
    images: ["https://myapp.com/og-image.png"],
  },
};
```
**Explanation:**
This topic explains Twitter Cards in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Twitter Cards.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 4: generateMetadata for Dynamic Pages

Theory:
`generateMetadata` is an async function that can fetch data to build metadata. It runs on the server before rendering.

Practical:
Fetch a blog post or product name to create accurate page titles and descriptions for search engines.

Code Example:

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

async function getProduct(id: string) {
  return {
    name: `Product ${id}`,
    description: "A great product.",
    price: 49.99,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: `Buy ${product.name} for $${product.price}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <h1>
      {product.name} — ${product.price}
    </h1>
  );
}
```
**Explanation:**
This topic explains generateMetadata for Dynamic Pages in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind generateMetadata for Dynamic Pages.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Robots.txt Generation

Theory:
Create `app/robots.ts` and export a function returning a `MetadataRoute.Robots` object. Next.js generates `robots.txt` at build time.

Practical:
Allow all crawlers to index public content, disallow admin and API routes.

Code Example:

```tsx
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: "https://myapp.com/sitemap.xml",
  };
}
```
**Explanation:**
This topic explains Robots.txt Generation in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Robots.txt Generation.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Sitemap Generation

Theory:
Create `app/sitemap.ts` and export an async function returning a `MetadataRoute.Sitemap` array. Include all public URLs, their last modified date, change frequency, and priority.

Practical:
Generate a comprehensive sitemap including static pages and all blog post URLs.

Code Example:

```tsx
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const baseUrl = "https://myapp.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}
```
**Explanation:**
This topic explains Sitemap Generation in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Sitemap Generation.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 7: metadataBase

Theory:
Set `metadataBase` in the root layout metadata to the production domain. This allows Next.js to resolve relative image URLs in OG tags to absolute URLs.

Practical:
Without `metadataBase`, relative image paths like `/og-image.png` in OG metadata won't resolve to full URLs — social platforms won't be able to load them.

Code Example:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: "My App", template: "%s | My App" },
  openGraph: {
    siteName: "My App",
    type: "website",
    images: ["/og-default.png"], // Resolved to https://myapp.com/og-default.png
  },
};
```
**Explanation:**
This topic explains metadataBase in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind metadataBase.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 8: Canonical URLs and Alternates

Theory:
Canonical URLs tell search engines the preferred URL when content is accessible at multiple URLs (e.g., with and without trailing slash). Set `alternates.canonical` to prevent duplicate content penalties.

Practical:
Set a canonical URL for each page to ensure search engines index the correct version.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Blog Post: ${slug}`,
    alternates: {
      canonical: `https://myapp.com/blog/${slug}`,
      languages: {
        "en-US": `https://myapp.com/en-US/blog/${slug}`,
        "fr-FR": `https://myapp.fr/blog/${slug}`,
      },
    },
  };
}
```
**Explanation:**
This topic explains Canonical URLs and Alternates in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Canonical URLs and Alternates.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- **Metadata API**: Next.js's built-in system for setting HTML `<head>` metadata via `metadata` exports and `generateMetadata`.
- **Title Template**: A pattern like `'%s | My App'` where `%s` is replaced with the page-specific title.
- **Open Graph (OG)**: A metadata protocol used by Facebook, LinkedIn, and Slack for link previews.
- **Twitter Cards**: Twitter/X's link preview format using `twitter` metadata keys.
- **metadataBase**: The site's base URL used to resolve relative paths in OG images and other metadata.
- **Sitemap**: An XML file listing all public URLs, helping search engines discover and index pages.
- **robots.txt**: A file that tells web crawlers which URLs they can and cannot access.
- **Canonical URL**: The preferred URL for a page when it's accessible at multiple addresses.

## Visual Concept Map

```mermaid
flowchart TD
  A[Metadata API] --> B[Static metadata object]
  A --> C[generateMetadata async function]
  B --> D[Root layout defaults]
  C --> E[Per-page dynamic metadata]
  D --> F[Title template]
  E --> G[Fetched post title/description]
  H[Open Graph] --> I[Social share preview]
  J[Twitter Card] --> K[Tweet link preview]
  L[robots.ts] --> M[/robots.txt]
  N[sitemap.ts] --> O[/sitemap.xml]
  P[metadataBase] --> Q[Resolves relative OG image URLs]
```

## End-to-End Practical

1. Update `app/layout.tsx` with complete root metadata including title template, description, OG defaults, and `metadataBase`.
2. Add unique metadata to 5 different pages.
3. Create a blog post with full OG and Twitter metadata using `generateMetadata`.
4. Create `app/robots.ts` with appropriate rules.
5. Create `app/sitemap.ts` that includes static pages and all blog posts.
6. Test OG metadata using the Facebook Debugger or opengraph.xyz.
7. Visit `/robots.txt` and `/sitemap.xml` to verify they are generated correctly.

## Hands-on Coding

### Example 1: Complete Root Metadata

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "MyApp — Build Something Great",
    template: "%s | MyApp",
  },
  description: "A platform for developers to learn and grow.",
  keywords: ["web development", "Next.js", "React", "TypeScript"],
  authors: [{ name: "MyApp Team" }],
  creator: "MyApp",
  publisher: "MyApp Inc.",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MyApp",
    title: "MyApp — Build Something Great",
    description: "A platform for developers to learn and grow.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "MyApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@myapp",
    creator: "@myapp",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### Example 2: Full Sitemap for a Blog

```tsx
// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://myapp.com";

// Mock posts data
const posts = [
  { slug: "nextjs-guide", updatedAt: "2025-01-15" },
  { slug: "typescript-tips", updatedAt: "2025-01-22" },
  { slug: "react-patterns", updatedAt: "2025-02-01" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
```

### Example 3: Blog Post with Full SEO

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";

type Post = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
  content: string;
};
type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string): Promise<Post> {
  return {
    title: `Understanding ${slug.replace(/-/g, " ")}`,
    excerpt: "A deep dive into this important topic.",
    date: "2025-01-15",
    author: "Alice Chen",
    coverImage: `/blog/${slug}.jpg`,
    content: "Full post content here...",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const url = `https://myapp.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        { url: post.coverImage, width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

## Mini Exercise

Scenario:
Set up complete SEO metadata for an e-commerce product listing page and individual product pages.

Steps:

1. Add root layout metadata with `metadataBase` pointing to `https://myshop.com`.
2. Set metadata for the `/products` listing page with title "All Products" and a description.
3. Create `generateMetadata` for `/products/[id]` that generates title and description from product data.
4. Add OG image to the product page metadata.
5. Create a `sitemap.ts` that includes the products listing and all individual product URLs.

Expected output:

- Product pages have unique `<title>` tags in the page source.
- OG title and description are visible when sharing product links.
- `/sitemap.xml` includes all product URLs.

## Assessment Quiz

### Quiz Questions

1. What is the `title.template` property in metadata used for?
2. Why do you need `metadataBase` in the root layout?
3. What is the difference between `openGraph` and `twitter` metadata?
4. How do you generate a sitemap dynamically in Next.js?
5. What is a canonical URL?

### Quiz Answers

1. `title.template` defines a pattern like `'%s | My App'`. When a child page sets `title: 'About'`, it becomes "About | My App" in the browser tab.
2. `metadataBase` sets the base URL for resolving relative paths (e.g. `/og-image.png`) to full absolute URLs. Social platforms require absolute URLs to load preview images.
3. `openGraph` controls previews on Facebook, LinkedIn, Slack, etc. `twitter` controls previews specifically on Twitter/X. Many properties overlap but Twitter has some specific fields like `card` type and `creator`.
4. Create `app/sitemap.ts` and export an async default function returning an array of `{ url, lastModified, changeFrequency, priority }` objects. Next.js serves it at `/sitemap.xml`.
5. A canonical URL is the preferred version of a URL when content is accessible at multiple addresses. Setting it prevents search engines from treating them as duplicate pages.

## Task

- Add comprehensive metadata to every page in your blog project.
- Create a `sitemap.ts` with all static and dynamic routes.
- Create a `robots.ts` with appropriate allow/disallow rules.
- Add OG images and Twitter cards to blog posts.
- Test metadata with a social preview tool.

## Self Check

- Have you set a title template in the root layout?
- Did you set `metadataBase` with the production URL?
- Do all pages have unique titles and descriptions?
- Have you created `robots.ts` and `sitemap.ts`?
- Have you tested OG metadata using a preview tool?

## Interview Questions and Answers

### Beginner

**Question:** How do you set a page title in Next.js that includes both the page name and the site name?
**Answer:** In the root layout, set `title: { template: '%s | Site Name' }`. In each page, set `title: 'Page Name'`. The template combines them: "Page Name | Site Name".

**Question:** What is the purpose of `metadataBase`?
**Answer:** It provides the base URL for resolving relative paths in metadata (especially OG images). Without it, `/og-image.png` won't resolve to a full URL, and social platforms can't load the image.

### Middle

**Question:** How does Next.js merge metadata through the layout hierarchy?
**Answer:** Child metadata overrides parent metadata for the same properties. Properties not set by the child are inherited from the parent. This allows root-level defaults to cascade down while individual pages override specific fields.

**Question:** What is the difference between setting metadata in `page.tsx` vs `layout.tsx`?
**Answer:** Metadata in `layout.tsx` applies to all pages in that segment. Metadata in `page.tsx` applies only to that specific page and overrides the layout's values. Use layouts for section-wide defaults.

### Advanced

**Question:** How would you implement dynamic OG images (generated images) for each blog post?
**Answer:** Create `app/blog/[slug]/opengraph-image.tsx` (or `.png`) and export an `ImageResponse` from `next/og`. This generates a custom OG image with the post title, author, and design rendered as an image for each post dynamically.

**Question:** How do you handle SEO for paginated content like `/blog?page=2`?
**Answer:** Set `alternates.canonical` to the first page (`/blog`) for paginated pages, or use a `rel=canonical` pointing to the canonical first page. Alternatively, use `rel=prev/next` with `alternates.previous` and `alternates.next` to help search engines understand the pagination structure.

## Day 20 Outcome

- You can configure comprehensive SEO metadata for all pages.
- You know how to set up Open Graph and Twitter Card metadata.
- You can generate dynamic sitemaps and robots.txt.
- You understand `metadataBase` and canonical URLs.
- You have completed the Beginner tier and are ready for Intermediate topics on Day 21.
