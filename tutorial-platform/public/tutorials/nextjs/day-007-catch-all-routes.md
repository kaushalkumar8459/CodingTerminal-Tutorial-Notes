---
title: Catch-all Routes
slug: day-007-catch-all-routes
dayLabel: Day 7
level: Beginner
estimatedMinutes: 30
order: 7
track: nextjs
---
# Day 7 [Beginner]: Catch-all Routes

## Goal

Use catch-all routes (`[...slug]`) and optional catch-all routes (`[[...slug]]`) to match multiple URL segments with a single page file.

## Prerequisites

- Completed Day 6: Dynamic Routes
- Understanding of dynamic route segments with brackets

## Explanation

Sometimes a single page needs to handle URLs with a variable number of path segments. A documentation site, for example, might have `/docs/getting-started`, `/docs/guides/deployment`, and `/docs/guides/advanced/docker`. A catch-all route can match those nested paths without creating a separate route file for every depth.

A catch-all route uses three dots inside the brackets: `[...slug]`. It matches **one or more** segments after the parent path, and `params.slug` is an array of strings. For `/docs/guides/deployment`, `slug` is `['guides', 'deployment']`.

An optional catch-all route uses double brackets: `[[...slug]]`. It matches **zero or more** segments, so it can handle both `/docs` and `/docs/anything/here`. With the current App Router API, route `params` are asynchronous, so examples use `await params`.

Catch-all routing defines how URLs are matched. It does **not** by itself mean SSR, static rendering, or dynamic rendering. Rendering behavior, data fetching, caching, and revalidation are separate concerns that depend on the route and its data/runtime requirements.

These patterns are useful for documentation sites, wikis, CMS-driven pages, help centres, and other content trees with variable depth.

## Topic by Topic

### Topic 1: Catch-all Syntax [...slug]

Theory:
Name a folder with three dots inside brackets — `[...slug]` — to capture one or more URL segments. The matched segments arrive as an array in `params.slug`.

Practical:
Use this for documentation or wiki pages where the depth of nesting varies.

Code Example:

```tsx
// File: app/docs/[...slug]/page.tsx
// Matches: /docs/intro, /docs/guide/setup, /docs/guide/advanced/docker
// Does not match /docs by itself.

type Props = { params: Promise<{ slug: string[] }> };

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join(" / ");

  return (
    <div>
      <h1>Documentation</h1>
      <p>Path: {path}</p>
    </div>
  );
}
```

**Explanation:** The `[...slug]` syntax captures all remaining URL segments as an array. `/docs/guide/setup` results in `slug = ['guide', 'setup']`. The route can therefore represent arbitrary nesting depth without creating separate route files for every level.

**Key Points:**
- `[...slug]` requires at least one segment.
- `params.slug` is a `string[]`.
- `/docs` is not matched by this route; use `[[...slug]]` when the parent route must also match.

### Topic 2: Optional Catch-all [[...slug]]

Theory:
Double brackets `[[...slug]]` make the catch-all segment optional. The page matches the base route and nested routes, and `params.slug` is absent when no extra segments are present.

Practical:
Use this when the base route and nested routes should share one page component.

Code Example:

```tsx
// File: app/docs/[[...slug]]/page.tsx
// Matches: /docs, /docs/intro, /docs/guide/setup

type Props = { params: Promise<{ slug?: string[] }> };

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const segments = slug ?? [];

  if (segments.length === 0) {
    return <h1>Documentation Home</h1>;
  }

  return <h1>Doc: {segments.join(" → ")}</h1>;
}
```

**Explanation:** `[[...slug]]` differs from `[...slug]` because the captured segment can be absent. Normalizing `slug` to an empty array makes the rest of the component easier to work with.

**Key Points:**
- `[[...slug]]` matches zero or more segments.
- `params.slug` may be `undefined` for the parent route.
- Normalize optional parameters before using array methods.

### Topic 3: Building a Breadcrumb from slug Array

Theory:
Since `slug` is an array of path segments, you can build a breadcrumb trail by mapping over the array and constructing partial paths.

Practical:
Show a breadcrumb such as `Docs > Guide > Setup` at the top of each documentation page.

Code Example:

```tsx
// app/docs/[...slug]/page.tsx
import Link from "next/link";

type Props = { params: Promise<{ slug: string[] }> };

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/docs">Docs</Link>
          </li>

          {slug.map((segment, index) => {
            const href = `/docs/${slug.slice(0, index + 1).join("/")}`;
            const label = segment.replace(/-/g, " ");
            const isCurrent = index === slug.length - 1;

            return (
              <li key={href}>
                {isCurrent ? (
                  <span aria-current="page">{label}</span>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <h1>{slug[slug.length - 1].replace(/-/g, " ")}</h1>
    </div>
  );
}
```

**Explanation:** Each breadcrumb URL is created from the segments up to that point. The current page is marked with `aria-current="page"` instead of linking to itself, which gives screen readers useful context.

**Key Points:**
- Catch-all params naturally represent a path hierarchy.
- Use `Link` for internal navigation.
- Use semantic breadcrumb markup and identify the current page.

### Topic 4: Fetching Content for Catch-all Routes

Theory:
Use the `slug` array to construct a stable content key, file path, or CMS lookup path. The URL is an input to the lookup, not a security boundary, so protected content still needs server-side authorization.

Practical:
Map `['guide', 'setup']` to a documentation key such as `guide/setup`.

Code Example:

```tsx
// app/docs/[...slug]/page.tsx
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string[] }> };

type Page = { title: string; body: string };

const content: Record<string, Page> = {
  intro: { title: "Introduction", body: "Welcome to the docs." },
  "guide/setup": { title: "Setup Guide", body: "Install Node.js and Next.js." },
  "guide/deployment": { title: "Deployment", body: "Deploy the application." },
};

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = content[key];

  if (!page) {
    notFound();
  }

  return (
    <article>
      <h1>{page.title}</h1>
      <p>{page.body}</p>
    </article>
  );
}
```

**Explanation:** The route parameter can be transformed into a lookup key. In a real application the lookup might call a database, CMS, filesystem, or other server-side data source. Decide caching and revalidation according to how frequently that content changes; the catch-all route itself does not determine the rendering strategy.

**Key Points:**
- Convert the segment array into a predictable lookup key.
- Handle missing content with `notFound()`.
- Apply authentication/authorization on the server for protected content.
- Choose caching and revalidation separately from route matching.

### Topic 5: generateStaticParams for Catch-all Routes

Theory:
`generateStaticParams` returns known parameter combinations for a dynamic route. For a catch-all route, each `slug` value is an array of strings.

Practical:
Provide a known set of documentation paths that Next.js can use during build-time route generation.

Code Example:

```tsx
// app/docs/[...slug]/page.tsx
export async function generateStaticParams() {
  return [
    { slug: ["intro"] },
    { slug: ["guide", "setup"] },
    { slug: ["guide", "deployment"] },
    { slug: ["reference", "api", "routes"] },
  ];
}
```

**Explanation:** The shape of each returned object follows the route parameter shape. `generateStaticParams` is a way to enumerate known parameter values; it should not be treated as a synonym for all static rendering or caching behavior. For a large or changing content set, generating every possible path at build time may be undesirable.

**Key Points:**
- Catch-all values are returned as arrays.
- Each object represents one known parameter combination.
- Build-time path generation and data caching are separate concepts.
- Consider the number of paths and content freshness before generating a very large set.

### Topic 6: Combining Catch-all with Static Segments

Theory:
You can have a static route alongside a catch-all route. Static route segments are more specific than a catch-all match at the same path depth, so an exact static route can handle a special URL while the catch-all handles the remaining paths.

Practical:
`app/docs/changelog/page.tsx` can handle `/docs/changelog` while `app/docs/[...slug]/page.tsx` handles other nested documentation paths.

Code Example:

```tsx
// app/docs/changelog/page.tsx
export default function ChangelogPage() {
  return <h1>Changelog</h1>;
}

// app/docs/[...slug]/page.tsx
// Handles paths such as /docs/guide/setup.
```

**Explanation:** Route matching determines which route owns the URL. Keep special, well-known URLs as explicit static routes when that makes the application clearer, and use catch-all routing for genuinely variable-depth paths.

**Key Points:**
- Static routes can take precedence over a catch-all route for the same URL.
- Use explicit routes for special cases when appropriate.
- Route matching is separate from rendering and caching behavior.

### Topic 7: Error Handling in Catch-all Routes

Theory:
Treat a missing document and an unexpected application failure differently. Use `notFound()` when the requested content does not exist. Let unexpected exceptions reach the route segment's `error.tsx` boundary instead of converting every exception into a 404.

Practical:
Return a not-found UI for an unknown documentation key while allowing unexpected data-source failures to be handled by an error boundary.

Code Example:

```tsx
// app/docs/[...slug]/page.tsx
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string[] }> };
type Content = { title: string; body: string };

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const content = await loadDocContent(slug.join("/"));

  if (!content) {
    notFound();
  }

  return (
    <article>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </article>
  );
}

async function loadDocContent(path: string): Promise<Content | null> {
  const db: Record<string, Content> = {
    intro: { title: "Introduction", body: "Welcome." },
  };

  return db[path] ?? null;
}
```

**Explanation:** `notFound()` is for an expected missing resource. If `loadDocContent` unexpectedly throws because a service or database fails, that exception should not be turned into a 404; an appropriate `error.tsx` boundary can handle the unexpected failure.

**Key Points:**
- Missing content → `notFound()`.
- Unexpected runtime/data failures → error boundary.
- Do not catch every exception and turn it into a 404.

### Topic 8: When to Use Catch-all vs Dynamic Routes

Theory:
Use a regular dynamic segment `[id]` or `[slug]` when one URL level is variable. Use catch-all `[...slug]` when one or more variable segments need to be captured by the same route. Use optional catch-all `[[...slug]]` when the parent path should also be handled.

Practical:
Blog posts often use `[slug]` because the URL has one variable segment. Documentation systems often use `[...slug]` because nesting depth varies.

Code Example:

```text
// Fixed depth — use [slug]
app/blog/[slug]/page.tsx     → /blog/hello-world

// Variable depth — use [...slug]
app/docs/[...slug]/page.tsx  → /docs/a
                             → /docs/a/b
                             → /docs/a/b/c

// Zero or more segments — use [[...slug]]
app/wiki/[[...slug]]/page.tsx → /wiki
                              → /wiki/javascript
                              → /wiki/javascript/closures
```

**Explanation:** Choose the least flexible route pattern that accurately represents the URL model. A catch-all route is useful when the depth itself is part of the data model, but it should not be used merely because it is convenient.

**Key Points:**
- `[slug]` captures exactly one segment at that route level.
- `[...slug]` captures one or more segments.
- `[[...slug]]` captures zero or more segments.

## Key Concepts

- **Catch-all Route**: A route using `[...slug]` that matches one or more URL segments after the parent.
- **Optional Catch-all Route**: A route using `[[...slug]]` that also matches the parent path with no extra segments.
- **slug Array**: The `params.slug` value for a catch-all route is an array of matched URL segments.
- **Breadcrumb**: A navigation component built from the `slug` array to show the current path hierarchy.
- **Route Specificity**: More specific route patterns can take precedence over a catch-all match for the same URL.
- **generateStaticParams**: Returns known parameter combinations for dynamic route generation; for catch-all routes, `slug` is an array.
- **Content Lookup by Path**: Using the joined `slug` array as a key to locate CMS, database, or filesystem content.
- **notFound()**: Used when the requested catch-all path does not correspond to valid content.
- **Rendering Strategy**: Catch-all routing does not itself determine SSR, static rendering, dynamic rendering, caching, or revalidation.

## Visual Concept Map

```mermaid
flowchart TD
  A[URL Request] --> B{Route Matching}
  B -->|/docs/changelog| C[Static: app/docs/changelog/page.tsx]
  B -->|/docs/a/b/c| D[Catch-all: app/docs/[...slug]/page.tsx]
  B -->|/docs| E[Optional: app/docs/[[...slug]]/page.tsx]
  D --> F[params.slug = a, b, c]
  F --> G[Look up content]
  G --> H{Content Found?}
  H -->|Yes| I[Render Documentation Page]
  H -->|No| J[notFound 404]
  G -->|Unexpected failure| K[error.tsx boundary]
```

## End-to-End Practical

1. Create `app/docs/[...slug]/page.tsx` with a breadcrumb and content lookup.
2. Create a mock content database with entries at different depths.
3. Add `generateStaticParams` for the known documentation paths.
4. Visit each URL and confirm the breadcrumb and content render.
5. Visit an unknown URL and confirm the not-found UI appears.
6. Create `app/docs/[[...slug]]/page.tsx` if the same route should also handle `/docs`.
7. Create a static `app/docs/changelog/page.tsx` and confirm the explicit route handles `/docs/changelog`.
8. Add `error.tsx` for unexpected failures rather than treating every failure as a 404.
9. Decide caching/revalidation based on content freshness rather than the catch-all syntax itself.

## Hands-on Coding

### Example 1: Full Documentation System

```tsx
// app/docs/[...slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type DocPage = { title: string; content: string };

const docs: Record<string, DocPage> = {
  "getting-started": {
    title: "Getting Started",
    content: "Install a supported Node.js release and run npx create-next-app.",
  },
  "guides/routing": {
    title: "Routing Guide",
    content: "Next.js App Router uses file-system conventions for routes.",
  },
  "guides/data-fetching": {
    title: "Data Fetching",
    content: "Server Components can fetch data on the server.",
  },
  "reference/api": {
    title: "API Reference",
    content: "Reference for Next.js APIs.",
  },
  "reference/api/route-handlers": {
    title: "Route Handlers",
    content: "Create HTTP endpoints with route.ts files.",
  },
};

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return Object.keys(docs).map((key) => ({ slug: key.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = docs[slug.join("/")];

  return {
    title: page?.title ?? "Documentation",
    description: page ? `Documentation: ${page.title}` : "Documentation",
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = docs[key];

  if (!page) {
    notFound();
  }

  const crumbs = slug.map((segment, index) => ({
    label: segment.replace(/-/g, " "),
    href: `/docs/${slug.slice(0, index + 1).join("/")}`,
  }));

  return (
    <div>
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/docs">Docs</Link>
          </li>
          {crumbs.map((crumb, index) => {
            const isCurrent = index === crumbs.length - 1;

            return (
              <li key={crumb.href}>
                {isCurrent ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href}>{crumb.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
}
```

### Example 2: Optional Catch-all for Wiki

```tsx
// app/wiki/[[...slug]]/page.tsx
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug?: string[] }> };

type WikiPage = { title: string; body: string };

const wiki: Record<string, WikiPage> = {
  "": { title: "Wiki Home", body: "Welcome to the wiki." },
  javascript: { title: "JavaScript", body: "JS is a dynamic language." },
  "javascript/closures": {
    title: "Closures",
    body: "A closure is a function that remembers its outer scope.",
  },
};

export default async function WikiPage({ params }: Props) {
  const { slug } = await params;
  const key = slug?.join("/") ?? "";
  const page = wiki[key];

  if (!page) {
    notFound();
  }

  return (
    <article>
      <h1>{page.title}</h1>
      <p>{page.body}</p>
    </article>
  );
}
```

### Example 3: CMS-driven Page Builder

```tsx
// app/pages/[...slug]/page.tsx
import { notFound } from "next/navigation";

type CmsPage = { heading: string; sections: string[] };

async function fetchCmsPage(path: string): Promise<CmsPage | null> {
  const pages: Record<string, CmsPage> = {
    about: { heading: "About Us", sections: ["Our mission", "Our team"] },
    "about/culture": {
      heading: "Our Culture",
      sections: ["Values", "Work-life balance"],
    },
    "services/web": {
      heading: "Web Services",
      sections: ["Design", "Development", "SEO"],
    },
  };

  return pages[path] ?? null;
}

type Props = { params: Promise<{ slug: string[] }> };

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchCmsPage(slug.join("/"));

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h1>{page.heading}</h1>
      {page.sections.map((section) => (
        <p key={section}>{section}</p>
      ))}
    </div>
  );
}
```

## Mini Exercise

Scenario:
Build a simple help centre with catch-all routing for articles at different depths: `/help/account`, `/help/billing/payments`, `/help/billing/refunds`.

Steps:

1. Create `app/help/[...slug]/page.tsx`.
2. Create a content map with 4 articles at varying depths.
3. Display the article title and content.
4. Show breadcrumb navigation from the slug array.
5. Return the not-found UI for unrecognised paths.
6. Add an `error.tsx` boundary for unexpected failures.

Expected output:

- `/help/account` shows the account article.
- `/help/billing/payments` shows the payments article.
- `/help/billing/unknown` shows the not-found page.
- Breadcrumbs render correctly for each path.

## Assessment Quiz

### Quiz Questions

1. What folder name syntax creates a catch-all route?
2. What type is `params.slug` in a catch-all route?
3. What is the difference between `[...slug]` and `[[...slug]]`?
4. How do you provide known paths for catch-all routes with `generateStaticParams`?
5. What happens when both a static route and a catch-all route can match a URL?
6. Does a catch-all route automatically mean SSR?
7. When should `notFound()` be used instead of an error boundary?

### Quiz Answers

1. `[...slug]` — three dots inside brackets. For example, `app/docs/[...slug]/` creates a catch-all route.
2. `params.slug` is a `string[]` for a normal catch-all route.
3. `[...slug]` requires at least one extra segment. `[[...slug]]` is optional and can also match the base URL with no extra segments.
4. Return an array of objects where each `slug` value is an array, such as `[{ slug: ['a', 'b'] }, { slug: ['c'] }]`.
5. Next.js route matching uses route specificity, so an explicit static route can handle a URL instead of a catch-all route.
6. No. Catch-all routing defines URL matching. Rendering strategy, data access, caching, and revalidation are separate concerns.
7. Use `notFound()` for an expected missing resource. Let unexpected failures reach `error.tsx` or another appropriate error boundary.

## Task

- Build a documentation site with `[...slug]` routing for variable-depth pages.
- Add breadcrumb navigation built from the slug array.
- Provide known paths using `generateStaticParams`.
- Use a static route for `/docs/changelog` where appropriate.
- Show the not-found UI for unrecognised paths.
- Add an error boundary for unexpected failures.
- Explain separately how rendering and caching should be chosen for the documentation data.

## Self Check

- Can you write the folder name for a catch-all route?
- Do you understand the difference between `[...slug]` and `[[...slug]]`?
- Can you build a breadcrumb from the slug array?
- Do you know how to write `generateStaticParams` for catch-all routes?
- Can you distinguish `notFound()` from an unexpected application error?
- Can you explain why a catch-all route does not automatically mean SSR?
- Can you explain how caching/revalidation is separate from route matching?

## Interview Questions and Answers

### Beginner

**Question:** What is a catch-all route in Next.js and when would you use it?
**Answer:** A catch-all route (`[...slug]`) matches one or more URL segments with a single route file. It is useful for documentation, wikis, or content trees with variable depth.

**Question:** What value does `params.slug` have for a catch-all route matching `/docs/guide/setup`?
**Answer:** It is `['guide', 'setup']` — an array containing the segments after `/docs/`.

### Middle

**Question:** How does an optional catch-all differ from a regular catch-all?
**Answer:** `[[...slug]]` can match the parent route with no additional segments, while `[...slug]` requires at least one segment. With no segments, the optional catch-all parameter is absent.

**Question:** How do you handle deeply nested content in `generateStaticParams` for catch-all routes?
**Answer:** Return an array of objects where each `slug` value is an array representing the path segments, such as `{ slug: ['a', 'b', 'c'] }` for `/parent/a/b/c`.

### Advanced

**Question:** How would you implement a CMS-driven page builder with a catch-all route?
**Answer:** Capture the segment array, validate it, turn it into a safe content lookup key, fetch the CMS content on the server, enforce authorization where required, call `notFound()` for missing content, and render the CMS blocks using a controlled component mapping.

**Question:** What performance considerations exist for catch-all routes with many possible paths?
**Answer:** Generating thousands of known paths can increase build work. Consider the size and freshness of the content set, generate only useful known paths, and choose appropriate caching/revalidation or on-demand behavior rather than assuming every path should be generated at build time.

## Day 7 Outcome

- You understand when and why to use catch-all routes.
- You can create both required and optional catch-all segments.
- You can build breadcrumbs from the slug array.
- You know how to write `generateStaticParams` for catch-all paths.
- You can distinguish missing resources from unexpected application errors.
- You understand that catch-all routing does not itself determine SSR, static rendering, caching, or revalidation.
- You are ready to learn about static assets and the public folder on Day 8.
