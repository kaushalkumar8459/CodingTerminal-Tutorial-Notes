---
title: Dynamic Routes
slug: day-006-dynamic-routes
dayLabel: Day 6
level: Beginner
estimatedMinutes: 30
order: 6
track: nextjs
---
# Day 6 [Beginner]: Dynamic Routes

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
- [Day 6 Outcome](#day-6-outcome)

## Goal

Create dynamic routes with square-bracket parameters, read params in page components, and generate static paths with `generateStaticParams`.

## Prerequisites

- Completed Day 5: Navigation with Link and useRouter
- Understanding of file-based routing basics

## Explanation

A dynamic route is a route where part of the URL is variable — like `/blog/nextjs-routing` or `/products/42`. In Next.js, you create a dynamic segment by naming a folder with square brackets: `[slug]` or `[id]`. The value inside the brackets becomes a route parameter you can read in your page component.

For example, the folder structure `app/blog/[slug]/page.tsx` matches any URL like `/blog/hello-world`, `/blog/typescript-tips`, etc. Inside the page component, you receive the `params` prop which is a Promise resolving to an object with the key `slug` (or whatever name you gave the bracket).

Dynamic routes can be combined with `generateStaticParams` to pre-render pages at build time. This gives you the performance of static generation for dynamic content — the best of both worlds. You tell Next.js all the possible values for your dynamic segments, and it pre-builds an HTML file for each one.

## Topic by Topic

### Topic 1: Creating a Dynamic Segment

Theory:
Create a folder with brackets around its name — e.g. `[slug]` — to make a dynamic route segment. The bracket name becomes the parameter key.

Practical:
`app/blog/[slug]/page.tsx` matches `/blog/any-value-here`.

Code Example:

```tsx
// File: app/blog/[slug]/page.tsx
// This creates /blog/:slug (matches /blog/hello, /blog/intro, etc.)

type Props = {
  params: Promise<{ slug: string }>; // slug is the dynamic part
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params; // Extract the slug from params

  return (
    <article>
      <h1>Post: {slug}</h1> {/* Display the dynamic value */}
    </article>
  );
}
```

**Explanation:** Square brackets `[slug]` in folder names make that segment dynamic. The value (e.g., "hello" from `/blog/hello`) is passed as `params.slug`. This pattern allows one page file to handle unlimited URLs.
**Key Points:**
- Understand the core concept behind Creating a Dynamic Segment.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Reading Route Parameters

Theory:
Route params are passed as a `params` prop (a Promise in Next.js 15+) to the page component. Await them to get the actual values.

Practical:
Always `await params` in async server components to get the latest API behaviour.

Code Example:

```tsx
// app/products/[id]/page.tsx
type Props = { params: Promise<{ id: string }> };

async function getProduct(id: string) {
  // In production, fetch from database or API
  return {
    id,
    name: `Product ${id}`,
    price: 29.99,
    description: "A great product.",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
```
**Explanation:**
This topic explains Reading Route Parameters in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Reading Route Parameters.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: generateStaticParams

Theory:
`generateStaticParams` is an async function exported from a dynamic page. It returns an array of param objects, telling Next.js which routes to pre-render at build time.

Practical:
Return all known slugs from your CMS or database so they are statically generated.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

async function getAllPosts() {
  return [
    { slug: "intro-to-nextjs" },
    { slug: "server-components" },
    { slug: "dynamic-routing" },
  ];
}
```
**Explanation:**
This topic explains generateStaticParams in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind generateStaticParams.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 4: Handling Not Found for Dynamic Routes

Theory:
If a dynamic segment value does not correspond to real data, call `notFound()` from `next/navigation` to render the 404 page instead of crashing.

Practical:
Always guard against missing data in dynamic pages.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  const posts: Record<string, { title: string }> = {
    hello: { title: "Hello World" },
    nextjs: { title: "Intro to Next.js" },
  };
  return posts[slug] ?? null;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <h1>{post.title}</h1>;
}
```
**Explanation:**
This topic explains Handling Not Found for Dynamic Routes in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Handling Not Found for Dynamic Routes.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Multiple Dynamic Segments

Theory:
You can have multiple dynamic segments in a route by nesting dynamic folders: `app/[category]/[id]/page.tsx` matches `/electronics/42`.

Practical:
Use this for nested resource URLs common in e-commerce and CMS structures.

Code Example:

```tsx
// app/shop/[category]/[productId]/page.tsx
type Props = {
  params: Promise<{ category: string; productId: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { category, productId } = await params;
  return (
    <div>
      <p>Category: {category}</p>
      <p>Product ID: {productId}</p>
    </div>
  );
}
```
**Explanation:**
This topic explains Multiple Dynamic Segments in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Multiple Dynamic Segments.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Dynamic Layout with Params

Theory:
Layouts in dynamic route segments also receive `params`. Use this to fetch section-level data (like a category name) for all pages within.

Practical:
Fetch a category object in the layout and display the category name in the section header.

Code Example:

```tsx
// app/shop/[category]/layout.tsx
type Props = {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
};

export default async function CategoryLayout({ children, params }: Props) {
  const { category } = await params;
  return (
    <div>
      <h2 style={{ textTransform: "capitalize" }}>{category}</h2>
      {children}
    </div>
  );
}
```
**Explanation:**
This topic explains Dynamic Layout with Params in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Dynamic Layout with Params.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 7: Linking to Dynamic Routes

Theory:
Generate `<Link href>` values dynamically using template literals or string interpolation with the actual parameter values.

Practical:
Map over a list of items and create a link to each dynamic route.

Code Example:

```tsx
import Link from "next/link";

const posts = [
  { slug: "hello-world", title: "Hello World" },
  { slug: "about-nextjs", title: "About Next.js" },
];

export default function PostList() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```
**Explanation:**
This topic explains Linking to Dynamic Routes in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Linking to Dynamic Routes.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 8: Static vs Dynamic at Runtime

Theory:
By default, dynamic routes are server-rendered (SSR) on every request. Exporting `generateStaticParams` makes them statically generated at build time. Set `dynamicParams = false` to return 404 for any param not listed by `generateStaticParams`.

Practical:
Use `generateStaticParams` for known content (blogs, docs) and SSR for user-generated or highly dynamic content.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
export const dynamicParams = false; // 404 for unknown slugs

export async function generateStaticParams() {
  return [{ slug: "post-1" }, { slug: "post-2" }];
}
```
**Explanation:**
This topic explains Static vs Dynamic at Runtime in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Static vs Dynamic at Runtime.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- **Dynamic Segment**: A route folder named with brackets like `[slug]` that matches any URL value for that segment.
- **params**: The prop passed to a dynamic page component containing the matched route parameter values.
- **generateStaticParams**: A function that returns all param combinations to pre-render at build time.
- **notFound()**: A function from `next/navigation` that triggers the nearest `not-found.tsx` page.
- **dynamicParams**: A page-level export that controls whether unknown params return a 404 or are rendered at runtime.
- **Multiple Dynamic Segments**: Nesting multiple bracket folders to create routes like `/[category]/[id]`.
- **SSR for Dynamic Routes**: By default, dynamic routes are rendered on the server per request.
- **SSG for Dynamic Routes**: Using `generateStaticParams` to pre-render dynamic routes at build time.

## Visual Concept Map

```mermaid
flowchart TD
  A[URL: /blog/hello-world] --> B[Match: app/blog/[slug]/page.tsx]
  B --> C{generateStaticParams?}
  C -->|Yes, slug in list| D[Serve Static HTML from CDN]
  C -->|No or slug not in list| E[SSR: Render on Server]
  B --> F[params.slug = 'hello-world']
  F --> G[Fetch post data by slug]
  G --> H{Post exists?}
  H -->|Yes| I[Render Post Page]
  H -->|No| J[notFound() → 404]
```

## End-to-End Practical

1. Create `app/blog/[slug]/page.tsx` that reads `params.slug`.
2. Create a mock data function that returns a post by slug.
3. Use `notFound()` when the post doesn't exist.
4. Add `generateStaticParams` to pre-render three blog posts.
5. Create a blog index at `app/blog/page.tsx` that links to each post.
6. Visit `/blog/valid-slug` (renders), `/blog/unknown-slug` (404).
7. Run `npm run build` and see the statically generated pages in the build output.

## Hands-on Coding

### Example 1: Blog Post Page with generateStaticParams

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts = [
  {
    slug: "intro-to-nextjs",
    title: "Intro to Next.js",
    content: "Next.js is a React framework...",
  },
  {
    slug: "server-components",
    title: "Server Components",
    content: "Server Components run on the server...",
  },
  {
    slug: "dynamic-routes",
    title: "Dynamic Routes",
    content: "Dynamic routes use [bracket] syntax...",
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Not Found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### Example 2: Product Page with Multiple Dynamic Segments

```tsx
// app/shop/[category]/[productId]/page.tsx
import { notFound } from "next/navigation";

const catalogue: Record<
  string,
  Record<string, { name: string; price: number }>
> = {
  electronics: {
    "1": { name: "Laptop", price: 999 },
    "2": { name: "Phone", price: 699 },
  },
  books: {
    "1": { name: "Clean Code", price: 35 },
  },
};

type Props = { params: Promise<{ category: string; productId: string }> };

export default async function ProductPage({ params }: Props) {
  const { category, productId } = await params;
  const product = catalogue[category]?.[productId];
  if (!product) notFound();
  return (
    <div>
      <p style={{ color: "#666", textTransform: "capitalize" }}>{category}</p>
      <h1>{product.name}</h1>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${product.price}</p>
    </div>
  );
}
```

### Example 3: Blog Index with Links to Dynamic Pages

```tsx
// app/blog/page.tsx
import Link from "next/link";

const posts = [
  { slug: "intro-to-nextjs", title: "Intro to Next.js", date: "2025-01-01" },
  { slug: "server-components", title: "Server Components", date: "2025-01-05" },
  { slug: "dynamic-routes", title: "Dynamic Routes", date: "2025-01-10" },
];

export default function BlogIndexPage() {
  return (
    <div>
      <h1>Blog</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "1.5rem",
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              style={{
                fontSize: "1.25rem",
                textDecoration: "none",
                color: "#0070f3",
              }}
            >
              {post.title}
            </Link>
            <p style={{ color: "#666", margin: "0.25rem 0 0" }}>{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Mini Exercise

Scenario:
Build a user profile page at `/users/[username]` that shows a user's profile information.

Steps:

1. Create `app/users/[username]/page.tsx`.
2. Create a mock `getUser(username)` function that returns user data for 3 known usernames and `null` for others.
3. Show the user's name, bio, and join date on the page.
4. Call `notFound()` if the user doesn't exist.
5. Add `generateStaticParams` to pre-render the 3 known users.

Expected output:

- `/users/alice` renders Alice's profile.
- `/users/bob` renders Bob's profile.
- `/users/unknown` renders the 404 page.

## Assessment Quiz

### Quiz Questions

1. How do you create a dynamic route segment in Next.js?
2. What prop receives the route parameters in a page component?
3. What does `generateStaticParams` do?
4. How do you show a 404 page when dynamic data is not found?
5. What does setting `dynamicParams = false` do?

### Quiz Answers

1. Name the folder with brackets: `[paramName]`. For example, `app/blog/[slug]/` creates a dynamic segment named `slug`.
2. The `params` prop (a Promise in Next.js 15+) receives the route parameters. You `await params` to get the values.
3. `generateStaticParams` returns an array of param objects that tell Next.js which routes to pre-render as static HTML at build time.
4. Call `notFound()` from `next/navigation` — it triggers the nearest `not-found.tsx` and returns a 404 response.
5. It makes Next.js return a 404 for any parameter value not included in the `generateStaticParams` result, preventing unknown routes from being server-rendered.

## Task

- Create a blog system with a listing page and dynamic post pages.
- Add `generateStaticParams` for the known posts.
- Handle missing posts with `notFound()`.
- Create a user profile page at `/users/[username]`.
- Add `generateMetadata` to set unique titles for each post.

## Self Check

- Can you create a dynamic route folder with brackets?
- Do you know how to read `params` in a page component?
- Can you use `generateStaticParams` to pre-render dynamic routes?
- Do you know how to show 404 for missing dynamic data?
- Have you built a blog listing that links to individual dynamic post pages?

## Interview Questions and Answers

### Beginner

**Question:** How do you make a route that matches `/products/123` in Next.js?
**Answer:** Create the folder `app/products/[id]/` with a `page.tsx` inside. The `[id]` folder is a dynamic segment that matches any value. The matched value is available as `params.id` in the component.

**Question:** What happens if a user visits a dynamic route URL that has no data?
**Answer:** By default, the page still renders (with potentially empty/undefined data). To handle it properly, call `notFound()` when the data lookup returns null — this renders the 404 page.

### Middle

**Question:** What is the difference between using `generateStaticParams` and not using it on a dynamic route?
**Answer:** Without `generateStaticParams`, the page is server-rendered on every request (SSR). With it, Next.js pre-renders those specific paths at build time into static HTML files served from a CDN — much faster and cheaper.

**Question:** How would you handle a URL like `/shop/electronics/laptops/99` with multiple dynamic segments?
**Answer:** Create nested dynamic folders: `app/shop/[category]/[subcategory]/[productId]/page.tsx`. Each bracket folder is a dynamic segment, and all matched values arrive in `params`.

### Advanced

**Question:** How does Next.js handle incremental static regeneration for dynamic routes?
**Answer:** You can add `export const revalidate = 60` to a dynamic page alongside `generateStaticParams`. This tells Next.js to serve the cached static version but regenerate it in the background after 60 seconds — so content stays fresh without sacrificing performance.

**Question:** Can `generateStaticParams` fetch data from a database or API?
**Answer:** Yes — it is an async function that runs at build time on the server. You can call any data source, including databases and APIs, to get all possible parameter values.

## Day 6 Outcome

- You can create dynamic route segments using bracket folder names.
- You know how to read route params in server components.
- You can pre-render dynamic routes using `generateStaticParams`.
- You handle missing data gracefully with `notFound()`.
- You are ready to learn catch-all routes on Day 7.
