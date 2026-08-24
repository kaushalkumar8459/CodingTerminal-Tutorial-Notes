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

## Goal

Create dynamic routes with square-bracket parameters, read route parameters in page components, handle missing resources, generate known paths with `generateStaticParams`, and understand how dynamic URL segments relate to rendering and data freshness.

## Prerequisites

- Completed Day 5: Navigation with Link and useRouter
- Understanding of file-based routing basics

## Explanation

A dynamic route is a route where part of the URL is variable — like `/blog/nextjs-routing` or `/products/42`. In the Next.js App Router, you create a dynamic segment by naming a folder with square brackets: `[slug]` or `[id]`. The value inside the brackets becomes a route parameter you can read in your page component.

For example, `app/blog/[slug]/page.tsx` matches URLs such as `/blog/hello-world` and `/blog/typescript-tips`. In current App Router page APIs, `params` is asynchronous, so examples use `params: Promise<...>` and `await params`.

A dynamic URL segment does **not automatically mean SSR on every request**. The route's rendering behavior depends on the route, its data access, caching/revalidation configuration, runtime requirements, and other Next.js behavior. URL dynamism, rendering strategy, and data freshness are related but distinct concepts.

`generateStaticParams` is useful when you know a set of parameter values ahead of time. It provides known paths that Next.js can generate during the build process. It is not a universal definition of SSG, and it does not mean every request to a dynamic route must always be served as a static HTML file. Parameters not returned by `generateStaticParams` are handled according to the route's `dynamicParams` setting and overall rendering behavior.

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
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <article>
      <h1>Post: {slug}</h1>
    </article>
  );
}
```

**Explanation:** Square brackets `[slug]` in folder names make that segment dynamic. The value from a URL such as `/blog/hello` is available as `params.slug`. One page file can therefore handle many URLs that follow the same route pattern.

**Key Points:**
- Dynamic segments use square brackets.
- The folder name becomes the parameter key.
- A dynamic URL does not by itself determine the rendering strategy.

### Topic 2: Reading Route Parameters

Theory:
In current Next.js App Router page APIs, route params are provided through a `params` prop that is asynchronous. Await it to access the actual values.

Practical:
Use `await params` in an async page component before using the route values.

Code Example:

```tsx
// app/products/[id]/page.tsx
type Props = { params: Promise<{ id: string }> };

async function getProduct(id: string) {
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

**Explanation:** `params` contains values captured by dynamic route segments. Route parameters arrive as strings, so convert them explicitly when your application expects a number or another type.

**Key Points:**
- Read route parameters from `params`.
- Await `params` in current App Router page examples.
- Validate or convert parameter values before using them as application data.

### Topic 3: generateStaticParams

Theory:
`generateStaticParams` is an async function exported from a dynamic route. It returns parameter objects for known paths that Next.js can generate ahead of time.

Practical:
Return known slugs from a CMS, database, or other server-side source when those paths can be prepared during the build.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getAllPosts() {
  return [
    { slug: "intro-to-nextjs" },
    { slug: "server-components" },
    { slug: "dynamic-routing" },
  ];
}
```

**Explanation:** The returned values tell Next.js which dynamic parameter combinations are known during the build. `generateStaticParams` is a path-generation mechanism; it should not be presented as the definition of all static rendering or caching behavior.

**Key Points:**
- Return objects whose keys match the dynamic segment names.
- Use it for known paths that can be generated ahead of time.
- Keep rendering strategy and data freshness as separate concepts.

### Topic 4: Handling Not Found for Dynamic Routes

Theory:
If a dynamic segment value does not correspond to real data, call `notFound()` from `next/navigation` to stop rendering the current route segment and show the relevant not-found UI.

Practical:
Guard the result of a data lookup and call `notFound()` when the resource does not exist.

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

  if (!post) {
    notFound();
  }

  return <h1>{post.title}</h1>;
}
```

**Explanation:** `notFound()` is appropriate when the requested resource does not exist. Protected resources should also be checked for authentication and authorization on the server; a dynamic URL is not a security boundary.

**Key Points:**
- Handle missing resources explicitly.
- Use `notFound()` for missing content.
- Enforce authorization on the server for protected resources.

### Topic 5: Multiple Dynamic Segments

Theory:
You can have multiple dynamic segments in a route by nesting dynamic folders: `app/[category]/[id]/page.tsx` matches `/electronics/42`.

Practical:
Use multiple parameters for nested resource URLs common in e-commerce, documentation, and CMS applications.

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

**Explanation:** Each bracketed folder contributes a property to `params`. The property names correspond to the dynamic folder names.

**Key Points:**
- Multiple dynamic segments are supported.
- Parameter names come from folder names.
- Type every expected parameter explicitly.

### Topic 6: Dynamic Layout with Params

Theory:
A layout inside a dynamic route segment can also receive the route params. This can be useful for section-level UI, such as displaying a category name across pages under that segment.

Practical:
Read the category parameter in the layout and use it in the section header.

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

**Explanation:** Dynamic layouts can use the route parameters associated with their dynamic segment. Keep data access in the appropriate server boundary and do not expose protected information merely because the value came from a URL.

**Key Points:**
- Dynamic layouts can receive params.
- Use layouts for shared UI and section-level concerns.
- Server-side authorization is still required for protected data.

### Topic 7: Linking to Dynamic Routes

Theory:
Generate `Link` destinations dynamically using the actual parameter values.

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

**Explanation:** `Link` is the preferred choice for normal internal navigation. Prefetching can improve navigation performance, but it is an optimization rather than a guarantee that every destination request or piece of data is already cached.

**Key Points:**
- Prefer `Link` for internal navigation.
- Use stable keys for mapped lists.
- Do not treat navigation as an authorization mechanism.

### Topic 8: Static vs Dynamic at Runtime

Theory:
A dynamic route segment describes the URL shape; it does **not** automatically mean that the page is server-rendered on every request. Rendering behavior depends on the route and its data/runtime characteristics. `generateStaticParams` provides known parameter values that can be generated ahead of time, while `dynamicParams = false` controls what happens for parameter values that were not returned by `generateStaticParams`.

Practical:
Use `generateStaticParams` when a known set of paths can be prepared ahead of time. For content that changes frequently, choose an appropriate data-fetching, caching, and revalidation strategy rather than assuming that a dynamic URL requires SSR.

Code Example:

```tsx
// app/blog/[slug]/page.tsx
export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { slug: "post-1" },
    { slug: "post-2" },
  ];
}
```

**Explanation:** With `dynamicParams = false`, a parameter not returned by `generateStaticParams` is treated as not found. Without that setting, parameters outside the generated set can be handled according to the route's dynamic rendering behavior. This setting should not be described as a general SSR/SSG switch.

**Key Points:**
- Dynamic URL segments and SSR are different concepts.
- `generateStaticParams` provides known route parameters.
- `dynamicParams = false` rejects parameters outside the generated set.
- Rendering, caching, and revalidation should be chosen based on application requirements.

## Key Concepts

- **Dynamic Segment**: A route folder named with brackets like `[slug]` that captures one URL segment.
- **params**: The route parameter values supplied to a page or layout for dynamic segments.
- **generateStaticParams**: Provides known parameter values for routes that can be generated ahead of time.
- **notFound()**: Stops rendering the current route segment and displays the relevant not-found UI.
- **dynamicParams**: Controls handling of parameter values not returned by `generateStaticParams`.
- **Multiple Dynamic Segments**: Nesting multiple bracket folders to create routes such as `/[category]/[id]`.
- **Rendering Strategy**: Determines how and when a route is rendered; a dynamic URL does not by itself select SSR.
- **Caching/Revalidation**: Controls data reuse and freshness and should be considered separately from the route's URL shape.

## Visual Concept Map

```mermaid
flowchart TD
  A[URL: /blog/hello-world] --> B[Match: app/blog/[slug]/page.tsx]
  B --> C[params.slug = hello-world]
  C --> D[Load post data]
  D --> E{Post exists?}
  E -->|Yes| F[Render Post Page]
  E -->|No| G[notFound() → 404]
  B --> H[generateStaticParams]
  H --> I[Known parameter values]
  I --> J[Can be generated ahead of time]
  K[dynamicParams = false] --> L[Params outside generated set → not found]
  M[Rendering + caching + revalidation] --> F
```

## End-to-End Practical

1. Create `app/blog/[slug]/page.tsx` that reads `params.slug`.
2. Create a mock data function that returns a post by slug.
3. Use `notFound()` when the post does not exist.
4. Add `generateStaticParams` for three known blog posts.
5. Create a blog index at `app/blog/page.tsx` that links to each post.
6. Visit `/blog/valid-slug` and `/blog/unknown-slug` and observe the different outcomes.
7. Run `npm run build` and inspect the build output without assuming that every dynamic URL is therefore permanently static.
8. Experiment with `dynamicParams = false` and document how unknown parameter values behave.
9. If the data changes frequently, consider an appropriate caching/revalidation strategy rather than equating dynamic routing with SSR.

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

  return {
    title: post?.title ?? "Post Not Found",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

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

type Props = {
  params: Promise<{ category: string; productId: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { category, productId } = await params;
  const product = catalogue[category]?.[productId];

  if (!product) {
    notFound();
  }

  return (
    <div>
      <p style={{ textTransform: "capitalize" }}>{category}</p>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
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
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            <p>{post.date}</p>
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
2. Create a mock `getUser(username)` function that returns user data for three known usernames and `null` for others.
3. Show the user's name, bio, and join date on the page.
4. Call `notFound()` if the user doesn't exist.
5. Add `generateStaticParams` for the three known users.
6. Explain why `generateStaticParams` does not by itself mean every future request is SSR or every path is permanently static.

Expected output:

- `/users/alice` renders Alice's profile.
- `/users/bob` renders Bob's profile.
- `/users/unknown` renders the 404 page.

## Assessment Quiz

### Quiz Questions

1. How do you create a dynamic route segment in Next.js?
2. What prop receives the route parameters in a page component?
3. What does `generateStaticParams` do?
4. Does a dynamic route automatically mean SSR on every request?
5. What does setting `dynamicParams = false` do?

### Quiz Answers

1. Name the folder with brackets: `[paramName]`. For example, `app/blog/[slug]/` creates a dynamic segment named `slug`.
2. The `params` prop receives the route parameters; in current App Router page APIs, it is awaited before reading the values.
3. `generateStaticParams` returns known parameter objects that Next.js can use to generate dynamic paths ahead of time.
4. No. A dynamic URL segment does not by itself determine the rendering strategy.
5. It causes parameter values not returned by `generateStaticParams` to be treated as not found for that route.

## Task

- Create a blog system with a listing page and dynamic post pages.
- Add `generateStaticParams` for the known posts.
- Handle missing posts with `notFound()`.
- Create a user profile page at `/users/[username]`.
- Add `generateMetadata` to set unique titles for each post.
- Document how your chosen caching/revalidation strategy affects data freshness.

## Self Check

- Can you create a dynamic route folder with brackets?
- Do you know how to read `params` in a current App Router page component?
- Can you explain what `generateStaticParams` does without equating it to every form of SSG?
- Do you understand why a dynamic URL does not automatically mean SSR?
- Do you know how to show a 404 for missing dynamic data?
- Have you built a blog listing that links to individual dynamic post pages?

## Interview Questions and Answers

### Beginner

**Question:** How do you make a route that matches `/products/123` in Next.js?
**Answer:** Create `app/products/[id]/page.tsx`. The `[id]` folder is a dynamic segment, and the matched value is available through `params`.

**Question:** What happens if a user visits a dynamic route URL that has no data?
**Answer:** The application should explicitly handle the missing resource. After a lookup returns no record, call `notFound()` to render the appropriate not-found UI.

### Middle

**Question:** What is the difference between using `generateStaticParams` and not using it on a dynamic route?
**Answer:** `generateStaticParams` supplies known parameter values that can be generated ahead of time. Not using it does not simply mean “SSR on every request”; the route's rendering and data behavior depends on its configuration and runtime characteristics.

**Question:** How would you handle a URL like `/shop/electronics/laptops/99` with multiple dynamic segments?
**Answer:** Create nested dynamic folders such as `app/shop/[category]/[subcategory]/[productId]/page.tsx`. Each bracketed folder contributes a property to `params`.

### Advanced

**Question:** How should you think about revalidation for dynamic routes?
**Answer:** Revalidation controls data freshness and when cached content can be regenerated or refreshed. It should be chosen based on the application's freshness requirements; it should not be described as a synonym for SSR or as a property of the URL's dynamic segment.

**Question:** Can `generateStaticParams` fetch data from a database or API?
**Answer:** Yes. It runs in the server/build context and can obtain known parameter values from an appropriate data source. The build must have access to that data source, and applications should consider the size and freshness of the generated path set.

## Day 6 Outcome

- You can create dynamic route segments using bracket folder names.
- You know how to read route params in current App Router page components.
- You can use `generateStaticParams` for known paths.
- You can handle missing data with `notFound()`.
- You understand `dynamicParams` and multiple dynamic segments.
- You understand that dynamic URLs, rendering strategy, caching, and data freshness are related but distinct concepts.
- You are ready to learn catch-all routes on Day 7.
