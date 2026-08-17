---
title: Static Assets and Public Folder
slug: day-008-static-assets-and-public-folder
dayLabel: Day 8
level: Beginner
estimatedMinutes: 30
order: 8
track: nextjs
---
# Day 8 [Beginner]: Static Assets and Public Folder

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
- [Day 8 Outcome](#day-8-outcome)

## Goal

Understand how to serve static files (images, fonts, icons, documents) using the `public/` directory and how to reference them in your Next.js application.

## Prerequisites

- Completed Day 7: Catch-all Routes
- A working Next.js project

## Explanation

Static assets are files that do not change and are served directly to the browser — images, fonts, favicons, `robots.txt`, `sitemap.xml`, and downloadable documents. In Next.js, you place these files in the `public/` directory at the root of your project. Everything in `public/` is accessible at the root URL path.

For example, if you place an image at `public/logo.png`, it is accessible at `http://localhost:3000/logo.png`. You reference it in your code with the path `/logo.png` (no mention of "public/"). This is a convention that keeps your code clean — you always refer to assets by their URL path, not their filesystem path.

The `public/` folder is the right place for truly static, unchanging content. For images that you want Next.js to optimise (resize, compress, convert to WebP), use the `<Image>` component from `next/image` — that is covered in Day 10. For now, learn the basics of how `public/` works and what belongs there.

## Topic by Topic

### Topic 1: The public/ Directory

Theory:
Files in `public/` are served at the root URL. The folder itself is not part of the URL — only the file path relative to `public/` matters.

Practical:
Place `public/logo.svg` and reference it as `/logo.svg` in your code.

Code Example:

```tsx
// public/logo.svg exists → accessible at /logo.svg

export default function Header() {
  return (
    <header>
      {/* Reference with leading slash, no 'public/' prefix */}
      <img src="/logo.svg" alt="Company Logo" width={120} height={40} />
      {/* File at public/logo.svg is accessed as /logo.svg */}
    </header>
  );
}
```

**Explanation:** Files in `public/` are accessible directly at the root URL path. `/logo.svg` maps to `public/logo.svg`. Always use the leading slash and never include "public/" in your path.
**Key Points:**
- Understand the core concept behind The public/ Directory.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Favicon and Site Icons

Theory:
Place your favicon at `public/favicon.ico` to show it in browser tabs. Next.js App Router also supports placing icon files directly in `app/` for more control.

Practical:
The simplest approach: replace `public/favicon.ico` with your own icon file.

Code Example:

```
public/
  favicon.ico        ← Browser tab icon (classic approach)

app/
  icon.png           ← App Router icon (preferred modern approach)
  apple-icon.png     ← iOS home screen icon
```
**Explanation:**
This topic explains Favicon and Site Icons in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Favicon and Site Icons.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: robots.txt and sitemap.xml

Theory:
Place `robots.txt` and `sitemap.xml` directly in `public/` to make them accessible at their conventional URLs. Alternatively, generate them dynamically using App Router conventions.

Practical:
A simple static `robots.txt` prevents search engines from indexing certain paths.

Code Example:

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.example.com/sitemap.xml
```
**Explanation:**
This topic explains robots.txt and sitemap.xml in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind robots.txt and sitemap.xml.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 4: OG Images and Social Assets

Theory:
Open Graph images, Twitter cards, and social share images can be placed in `public/` and referenced in your `metadata` object.

Practical:
Create a `/og-image.png` in `public/` and set it as the default Open Graph image.

Code Example:

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: "/og-image.png", // from public/og-image.png
        width: 1200,
        height: 630,
      },
    ],
  },
};
```
**Explanation:**
This topic explains OG Images and Social Assets in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind OG Images and Social Assets.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Downloadable Files

Theory:
PDFs, Excel files, and other downloadable documents can be placed in `public/` and linked from your pages.

Practical:
Place `public/reports/annual-report-2024.pdf` and link to `/reports/annual-report-2024.pdf`.

Code Example:

```tsx
export default function ResourcesPage() {
  return (
    <div>
      <h1>Resources</h1>
      <ul>
        <li>
          <a href="/reports/annual-report-2024.pdf" download>
            Download Annual Report 2024 (PDF)
          </a>
        </li>
        <li>
          <a href="/templates/invoice-template.xlsx" download>
            Download Invoice Template
          </a>
        </li>
      </ul>
    </div>
  );
}
```
**Explanation:**
This topic explains Downloadable Files in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Downloadable Files.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Fonts in public/

Theory:
Self-hosted fonts can be placed in `public/fonts/` and loaded via CSS `@font-face`. However, for Google Fonts and performance-optimised font loading, use `next/font` (Day 11).

Practical:
Use `public/fonts/` for custom/proprietary fonts that are not available through `next/font`.

Code Example:

```css
/* app/globals.css */
@font-face {
  font-family: "MyBrandFont";
  src: url("/fonts/MyBrandFont-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

body {
  font-family: "MyBrandFont", sans-serif;
}
```
**Explanation:**
This topic explains Fonts in public/ in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Fonts in public/.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 7: Versioning and Cache Busting

Theory:
Static files in `public/` are served with long cache headers in production. If you update a file with the same name, browsers may serve the old cached version.

Practical:
Include a version number in the filename when you update static assets: `logo-v2.svg`.

Code Example:

```tsx
// Instead of overwriting logo.svg with a new version,
// create logo-v2.svg and update the reference:
<img src="/logo-v2.svg" alt="Logo" />

// Or use a timestamp/hash in the query string (less ideal)
<img src="/logo.svg?v=2" alt="Logo" />
```
**Explanation:**
This topic explains Versioning and Cache Busting in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Versioning and Cache Busting.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 8: What NOT to Put in public/

Theory:
Do not put secret files, environment configs, or sensitive data in `public/` — everything there is publicly accessible. Also avoid importing assets from `public/` in JavaScript — use the `app/` directory or module imports instead.

Practical:
Keep private configuration in `.env` files (which are never deployed) and use the `src/assets/` convention for module-imported images.

Code Example:

```
// WRONG — never put these in public/
public/
  .env.production        ← NEVER — publicly accessible!
  database-credentials.json  ← NEVER — exposed to the world!

// CORRECT — put secret config here
.env.local              ← Gitignored, not deployed
.env.production.local   ← Server-side only
```
**Explanation:**
This topic explains What NOT to Put in public/ in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind What NOT to Put in public/.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- **public/ Directory**: The folder for static assets that are served directly at the root URL path.
- **Static Asset**: A file that does not change and is served directly to the browser (images, fonts, documents).
- **URL Path**: Files in `public/logo.svg` are referenced as `/logo.svg` — the "public" folder is never part of the URL.
- **favicon.ico**: The browser tab icon placed in `public/` or as `app/icon.png`.
- **robots.txt**: A standard file that tells search engine crawlers which URLs to index or ignore.
- **Open Graph**: Social sharing metadata that references images from `public/`.
- **Cache Busting**: A technique to force browsers to fetch a new version of a cached file, often by changing the filename.
- **Security**: Never put sensitive files or credentials in `public/` — everything is world-readable.

## Visual Concept Map

```mermaid
flowchart TD
  A[public/ folder] --> B[favicon.ico]
  A --> C[logo.svg]
  A --> D[robots.txt]
  A --> E[og-image.png]
  A --> F[fonts/]
  A --> G[reports/]
  B --> H[Browser Tab Icon]
  C --> I[/logo.svg URL]
  D --> J[Search Engine Crawlers]
  E --> K[Social Share Preview]
  F --> L[CSS @font-face]
  G --> M[Download Links]
  I --> N[img src or next/image]
```

## End-to-End Practical

1. Add a `logo.svg` to your `public/` folder and display it in the navigation.
2. Create a simple `robots.txt` that disallows `/admin/` from being crawled.
3. Add an `og-image.png` to `public/` and reference it in the root layout metadata.
4. Create `public/docs/sample.pdf` and link to it from a resources page.
5. Run `npm run build` and inspect the `out/` or `.next/static/` folder to see how static assets are handled.
6. Test accessing each file directly in the browser at its URL.

## Hands-on Coding

### Example 1: Navigation with Logo from public/

```tsx
// app/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        height: 64,
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        {/* img from public/logo.svg */}
        <img src="/logo.svg" alt="My App" width={32} height={32} />
        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>My App</span>
      </Link>
      <nav style={{ marginLeft: "auto", display: "flex", gap: "1.5rem" }}>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
```

### Example 2: robots.txt and Metadata with OG Image

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://myapp.com/sitemap.xml
```

```tsx
// app/layout.tsx (metadata section)
export const metadata = {
  metadataBase: new URL("https://myapp.com"),
  title: { default: "My App", template: "%s | My App" },
  openGraph: {
    type: "website",
    siteName: "My App",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "My App Preview" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};
```

### Example 3: Downloads Page

```tsx
// app/downloads/page.tsx
const resources = [
  { name: "Product Brochure", file: "/docs/brochure.pdf", size: "2.4 MB" },
  { name: "Technical Specs", file: "/docs/specs.pdf", size: "1.1 MB" },
  { name: "Logo Pack", file: "/assets/logo-pack.zip", size: "4.8 MB" },
];

export default function DownloadsPage() {
  return (
    <div>
      <h1>Downloads</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {resources.map((r) => (
          <li
            key={r.file}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{r.name}</span>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ color: "#999", fontSize: "0.875rem" }}>
                {r.size}
              </span>
              <a href={r.file} download style={{ color: "#0070f3" }}>
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Mini Exercise

Scenario:
Set up the static asset infrastructure for a company website: logo, favicon, robots.txt, and OG image.

Steps:

1. Create a simple SVG logo file and place it in `public/logo.svg`.
2. Create a `robots.txt` in `public/` that allows all crawlers but disallows `/admin/`.
3. Create a placeholder `og-image.png` in `public/`.
4. Reference the logo in the navbar and the OG image in the root layout metadata.
5. Visit `/logo.svg`, `/robots.txt`, and `/og-image.png` directly in the browser to confirm they are accessible.

Expected output:

- The logo displays in the navbar.
- The `robots.txt` is accessible at `http://localhost:3000/robots.txt`.
- The OG image URL is set in the page metadata.

## Assessment Quiz

### Quiz Questions

1. If you place a file at `public/images/hero.jpg`, what URL can you access it at?
2. Where should you put `robots.txt` in a Next.js project?
3. Why should you never put environment variables or credentials in the `public/` folder?
4. How do you reference a font file from `public/fonts/` in CSS?
5. What is cache busting and when do you need it for static assets?

### Quiz Answers

1. `/images/hero.jpg` — the `public/` prefix is not included in the URL.
2. In `public/robots.txt` — it will be accessible at `https://yourdomain.com/robots.txt`.
3. Everything in `public/` is publicly accessible via a URL. Credentials or secrets placed there would be exposed to anyone on the internet.
4. Use a CSS `@font-face` rule with the URL `/fonts/YourFont.woff2` — the leading slash refers to the `public/` directory root.
5. Cache busting forces browsers to fetch a new file version instead of serving the old cached one. You need it when you update a static file but keep the same filename — fix by renaming the file or adding a version query string.

## Task

- Set up the `public/` folder with a logo, favicon, OG image, and robots.txt for a project.
- Display the logo in the root layout's header.
- Add OG metadata to the root layout.
- Create a downloads page with links to files in `public/docs/`.
- Verify all assets are accessible at their expected URLs.

## Self Check

- Do you know how the `public/` directory maps to URL paths?
- Can you add a favicon, logo, and OG image to a Next.js project?
- Do you understand why sensitive files must never go in `public/`?
- Can you write a basic `robots.txt` file?
- Have you verified static assets work by accessing them in the browser?

## Interview Questions and Answers

### Beginner

**Question:** Where do you put static files in Next.js and how do you reference them?
**Answer:** Static files go in the `public/` directory. You reference them with a leading slash and the path relative to `public/` — e.g. `public/logo.svg` is referenced as `/logo.svg`.

**Question:** What types of files should go in the `public/` directory?
**Answer:** Truly static, public files: images, fonts, icons, favicons, PDFs, `robots.txt`, `sitemap.xml`, and other downloadable assets.

### Middle

**Question:** What is the difference between putting an image in `public/` vs importing it as a module?
**Answer:** Files in `public/` are served as-is with no processing. Imported images (e.g. `import logo from './logo.svg'`) go through the build pipeline, are content-hashed for cache busting, and can be used with `next/image` for automatic optimisation.

**Question:** How do you handle cache busting for files in `public/` after an update?
**Answer:** Rename the file (e.g. `logo-v2.svg`) or add a version query string (`/logo.svg?v=2`). Since Next.js doesn't process `public/` files, it can't add content hashes automatically.

### Advanced

**Question:** What is `metadataBase` in Next.js metadata and when do you need it?
**Answer:** `metadataBase` sets the base URL for resolving relative Open Graph image paths. Without it, Next.js doesn't know the full URL to construct absolute image URLs (required by social media crawlers). Set it to `new URL('https://yourdomain.com')` in the root layout.

**Question:** How can you dynamically generate `robots.txt` or `sitemap.xml` in Next.js instead of static files?
**Answer:** Create `app/robots.ts` and `app/sitemap.ts` files and export a function returning the data. Next.js generates the files at build time (or on request for dynamic sitemaps) and serves them at their conventional URLs.

## Day 8 Outcome

- You understand the purpose and conventions of the `public/` directory.
- You can reference static assets using root-relative URL paths.
- You know how to set up favicons, OG images, and robots.txt.
- You understand security implications of the `public/` folder.
- You are ready to learn CSS Modules and Tailwind CSS on Day 9.
