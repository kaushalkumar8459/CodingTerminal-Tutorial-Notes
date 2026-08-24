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

## Goal

Understand how Next.js serves public static files such as images, icons, fonts, and downloadable documents, how `public/` maps to URL paths, and when to prefer imported assets or Next.js features such as `next/image`, `next/font`, and App Router metadata file conventions.

## Prerequisites

- Completed Day 7: Catch-all Routes
- A working Next.js project

## Explanation

Static assets are files that an application serves as files rather than generating them as part of a page response. They can include images, icons, fonts, PDFs, and other public resources. A file placed in the root-level `public/` directory is served from a URL based on its path relative to `public/`.

For example, `public/logo.png` is available at `/logo.png`, and `public/images/hero.jpg` is available at `/images/hero.jpg`. The word `public` is not part of the URL.

A file being called a "static asset" does not mean its contents can never change. It means the file is served as an asset. If an asset changes, deployment and caching behavior should be considered separately.

Use `public/` when you need a stable public URL or when the file does not need to be processed as a module asset. For images that benefit from responsive sizing and optimization, use `next/image` where appropriate. For fonts, `next/font` is usually preferred when it supports the font source. App Router also provides file-based conventions such as `app/icon.png`, `app/robots.ts`, and `app/sitemap.ts` for supported metadata resources.

## Topic by Topic

### Topic 1: The public/ Directory

Theory:
Files in `public/` are served at the root URL. The folder itself is not part of the URL; only the file path relative to `public/` matters.

Practical:
Place `public/logo.svg` and reference it as `/logo.svg` in your code.

Code Example:

```tsx
// public/logo.svg exists → accessible at /logo.svg

export default function Header() {
  return (
    <header>
      {/* Reference with a root-relative URL; do not use /public/logo.svg */}
      <img src="/logo.svg" alt="Company Logo" width={120} height={40} />
    </header>
  );
}
```

**Explanation:** `/logo.svg` maps to `public/logo.svg`. A URL such as `/public/logo.svg` would look for a different public path and is not how files in `public/` are referenced.

**Key Points:**
- `public/` provides files at root-relative URLs.
- The filesystem path and browser URL are different concepts.
- Use a leading `/` when referencing a file from `public/`.

### Topic 2: Favicon and Site Icons

Theory:
The App Router supports file-based icons such as `app/icon.png`, `app/icon.jpg`, `app/icon.svg`, and `app/apple-icon.png`. A `public/favicon.ico` file is also a valid conventional static asset, but the App Router metadata file conventions are usually the clearer choice for a new App Router application.

Practical:
For an App Router project, place the site's icon in `app/icon.png` or another supported `app/icon.*` file. Use `public/favicon.ico` when you specifically need a conventional public favicon file.

Code Example:

```text
public/
  favicon.ico        ← Conventional public favicon URL

app/
  icon.png           ← App Router metadata file convention
  apple-icon.png     ← App Router Apple icon convention
```

**Explanation:** App Router recognizes supported icon filenames in the `app/` directory and uses them for generated metadata. These conventions avoid manually maintaining the corresponding `<link>` tags in the document head.

**Key Points:**
- App Router supports file-based icon conventions.
- `public/favicon.ico` remains useful when a public favicon URL is desired.
- Do not confuse a filesystem path with the URL delivered to the browser.

### Topic 3: robots.txt and sitemap.xml

Theory:
A static `public/robots.txt` is available at `/robots.txt`, and a static `public/sitemap.xml` is available at `/sitemap.xml`. In the App Router, `app/robots.ts` and `app/sitemap.ts` are useful when these resources should be generated from application configuration or data.

Practical:
Use a static file when the rules or URLs are fixed. Use the App Router metadata conventions when the content needs to be generated or maintained from code.

Code Example:

```text
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://www.example.com/sitemap.xml
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/private/"],
    },
    sitemap: "https://www.example.com/sitemap.xml",
  };
}
```

**Explanation:** `robots.txt` gives crawlers instructions; it is not an authorization mechanism. A `Disallow` rule does not protect private data. Access control must still be enforced by the application or server.

**Key Points:**
- `public/robots.txt` provides a fixed `/robots.txt` resource.
- `app/robots.ts` can generate the robots response using App Router conventions.
- Robots rules do not secure private routes.

### Topic 4: OG Images and Social Assets

Theory:
Open Graph and social preview images can be stored in `public/` and referenced by metadata. When relative URLs are used in metadata, configure `metadataBase` so Next.js can resolve them against the site's canonical origin.

Practical:
Create `public/og-image.png` and reference it from the root layout metadata.

Code Example:

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.example.com"),
  openGraph: {
    type: "website",
    siteName: "My App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My App preview",
      },
    ],
  },
};
```

**Explanation:** `metadataBase` provides the base origin used when resolving relative metadata URLs. In a real deployment, replace the example origin with the site's actual canonical origin.

**Key Points:**
- Public images can be used by social metadata.
- `metadataBase` helps resolve relative metadata URLs.
- Social crawlers need a publicly reachable URL; localhost is not a production social preview URL.

### Topic 5: Downloadable Files

Theory:
PDFs, spreadsheets, ZIP files, and other public downloads can be placed in `public/` and linked from pages. A file in `public/` is publicly reachable, so protected or user-specific downloads should normally be delivered through an authenticated server-side mechanism instead.

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

**Explanation:** The `download` attribute asks the browser to download the resource, although final behavior can depend on browser and response headers. For sensitive files, do not expose the file through `public/` because the URL is public.

**Key Points:**
- `public/` is suitable for intentionally public downloads.
- Use server-side authorization for protected downloads.
- `download` is a browser hint, not an access-control mechanism.

### Topic 6: Fonts in public/

Theory:
A custom font can be placed in `public/fonts/` and loaded with CSS `@font-face`. For supported Google Fonts and local fonts, `next/font` is generally preferred because Next.js can manage font loading and optimization more effectively. Use a public font file when a stable public URL and manual CSS loading are specifically required.

Practical:
Use `public/fonts/` for a custom font when manual `@font-face` loading is appropriate.

Code Example:

```css
/* app/globals.css */
@font-face {
  font-family: "MyBrandFont";
  src: url("/fonts/MyBrandFont-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "MyBrandFont", sans-serif;
}
```

**Explanation:** The URL `/fonts/MyBrandFont-Regular.woff2` maps to `public/fonts/MyBrandFont-Regular.woff2`. `font-display: swap` allows fallback text to render while the font loads.

**Key Points:**
- `@font-face` can load fonts from `public/`.
- `next/font` is usually preferred when applicable.
- Correct font formats, weights, and `font-display` behavior matter for performance.

### Topic 7: Versioning and Cache Busting

Theory:
Do not assume that every file in `public/` receives the same long-lived cache policy. Caching is influenced by the deployment platform and HTTP response headers. If a public asset can change while keeping the same URL, use an appropriate cache policy or a versioned/content-hashed URL so clients can reliably receive the intended version.

Practical:
For a manually managed public asset, a changed filename such as `logo-v2.svg` is a simple cache-busting technique. Query-string versioning can also be used when the hosting/CDN cache policy treats the query string as part of the cache key, but it is less explicit than changing the asset URL.

Code Example:

```tsx
// Version the URL when the asset contents change:
<img src="/logo-v2.svg" alt="Logo" />

// Query-string versioning can work with suitable cache infrastructure:
<img src="/logo.svg?v=2" alt="Logo" />
```

**Explanation:** Cache busting changes the URL that clients request. Renaming the file is simple and explicit. For frequently changing build-managed assets, imported module assets can provide content-based build output and are often a better fit.

**Key Points:**
- `public/` caching is not a universal fixed policy.
- Changing the URL is a reliable way to distinguish asset versions.
- Choose cache headers and versioning together with your deployment/CDN strategy.

### Topic 8: What NOT to Put in public/

Theory:
Never put secrets, credentials, private documents, database exports, or other sensitive information in `public/`. Everything served from `public/` is intended to be reachable through a public URL. Also, do not assume that a `.env` file is safe merely because of its filename; secret handling depends on your deployment configuration and whether a value is exposed to the client.

Practical:
Keep server secrets in environment variables or a server-side secret manager. Do not expose secret values through `NEXT_PUBLIC_*`, Client Components, or public files. Use imported assets when you need build-time module processing rather than a stable public URL.

Code Example:

```text
// WRONG — these must never be public
public/
  database-credentials.json
  private-customer-data.csv
  production-secrets.txt

// Example server-side configuration
.env.local

// Client-exposed variables must be intentionally prefixed:
NEXT_PUBLIC_APP_NAME=My App
```

**Explanation:** A secret stored in `public/` can be requested directly by anyone who knows or discovers its URL. `.env` files should also be protected from source control and deployment exposure according to the hosting setup. Never treat a client-exposed environment variable as secret.

**Key Points:**
- Anything in `public/` should be considered public.
- Secrets belong in server-side configuration or a secret manager.
- `NEXT_PUBLIC_*` values are intentionally exposed to browser code.

## Key Concepts

- **public/ Directory**: A root-level directory whose files are exposed through root-relative public URLs.
- **Static Asset**: A file served as an asset; it may still be replaced or updated by a later deployment.
- **URL Path**: `public/logo.svg` is referenced as `/logo.svg`.
- **App Router Icons**: Supported files such as `app/icon.png` can provide application icons through file-based metadata conventions.
- **robots.txt**: A crawler instruction resource, not a security mechanism.
- **Open Graph**: Social sharing metadata that can reference publicly reachable images.
- **Cache Busting**: Changing an asset URL so clients and caches can distinguish a new version.
- **Security**: Never put sensitive information in `public/` because it is intentionally public.

## Visual Concept Map

```mermaid
flowchart TD
  A[public/ folder] --> B[Public URL]
  A --> C[logo.svg]
  A --> D[reports/]
  A --> E[fonts/]
  A --> F[og-image.png]
  C --> G[/logo.svg]
  D --> H[Download URL]
  E --> I[CSS @font-face]
  F --> J[Open Graph Metadata]
  K[app/icon.png] --> L[App Router Icon Metadata]
  M[app/robots.ts] --> N[/robots.txt]
  O[app/sitemap.ts] --> P[/sitemap.xml]
```

## End-to-End Practical

1. Add a `logo.svg` to your `public/` folder and display it in the navigation.
2. Create a simple `robots.txt` in `public/` that disallows `/admin/` from being crawled, or compare it with `app/robots.ts`.
3. Add an `og-image.png` to `public/` and reference it in the root layout metadata with an appropriate `metadataBase`.
4. Create `public/docs/sample.pdf` and link to it from a resources page.
5. Run `npm run build` and understand the difference between the normal `.next/` build output and an `out/` directory produced by a static export configuration.
6. Test each public file directly in the browser at its expected URL.
7. Confirm that no secrets or private data are present in `public/`.

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

```text
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://myapp.com/sitemap.xml
```

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://myapp.com"),
  title: { default: "My App", template: "%s | My App" },
  openGraph: {
    type: "website",
    siteName: "My App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My App Preview",
      },
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
6. Confirm that the same public URLs do not contain secrets or private documents.

Expected output:

- The logo displays in the navbar.
- The `robots.txt` is accessible at `http://localhost:3000/robots.txt`.
- The OG image URL is included in the generated metadata.
- Public files are reachable without exposing private configuration.

## Assessment Quiz

### Quiz Questions

1. If you place a file at `public/images/hero.jpg`, what URL can you access it at?
2. What are the App Router conventions for generating `robots.txt` and `sitemap.xml`?
3. Why should you never put environment variables or credentials in the `public/` folder?
4. How do you reference a font file from `public/fonts/` in CSS?
5. What is cache busting and why should you not assume a universal cache policy for `public/` files?

### Quiz Answers

1. `/images/hero.jpg` — the `public/` prefix is not included in the URL.
2. `app/robots.ts` and `app/sitemap.ts` can generate those resources using App Router metadata conventions; static `public/robots.txt` and `public/sitemap.xml` are also possible.
3. Everything in `public/` is intentionally publicly accessible through a URL, so credentials or secrets placed there can be exposed.
4. Use CSS `@font-face` with a URL such as `/fonts/YourFont.woff2`.
5. Cache busting changes the asset URL so caches can distinguish versions. Actual cache behavior depends on HTTP response headers and the hosting/CDN configuration.

## Task

- Set up the `public/` folder with a logo, favicon, OG image, and robots.txt for a project.
- Display the logo in the root layout's header.
- Add OG metadata to the root layout and configure `metadataBase` with a real deployment origin for production.
- Create a downloads page with links to files in `public/docs/`.
- Compare a static `public/robots.txt` with `app/robots.ts`.
- Verify all assets are accessible at their expected URLs.
- Verify that no credentials or private data are present in `public/`.

## Self Check

- Do you know how the `public/` directory maps to URL paths?
- Can you add a favicon, logo, and OG image to a Next.js project?
- Do you understand why sensitive files must never go in `public/`?
- Can you write a basic `robots.txt` file?
- Do you know when `app/robots.ts` or `app/sitemap.ts` is useful?
- Can you explain why caching is separate from the meaning of the `public/` directory?
- Have you verified static assets work by accessing them in the browser?

## Interview Questions and Answers

### Beginner

**Question:** Where do you put static files in Next.js and how do you reference them?
**Answer:** Public files can go in the `public/` directory. A file such as `public/logo.svg` is referenced with `/logo.svg` because the `public/` directory is mapped to the site's root URL.

**Question:** What types of files should go in the `public/` directory?
**Answer:** Files that are intentionally public and need a stable URL, such as public images, icons, PDFs, and other downloadable assets. It is not a place for secrets or private user data.

### Middle

**Question:** What is the difference between putting an image in `public/` vs importing it as a module?
**Answer:** A `public/` file is addressed by a stable URL and is served as a public file. An imported image participates in the application's build/module pipeline and can provide metadata to tools such as `next/image`. Choose based on whether you need a public URL or module/build processing rather than assuming one is always faster.

**Question:** How do you handle cache busting for files in `public/` after an update?
**Answer:** Use a new URL, such as `logo-v2.svg`, or use another versioning strategy supported by the deployment/CDN cache. Query-string versioning can work, but its effectiveness depends on the cache configuration. For build-managed assets, imported assets can provide content-based output suitable for cacheable deployments.

### Advanced

**Question:** What is `metadataBase` in Next.js metadata and when is it useful?
**Answer:** `metadataBase` establishes the base URL used to resolve relative metadata URLs. It is useful when metadata contains relative URLs such as `/og-image.png` and Next.js needs the site's canonical origin to resolve them.

**Question:** How can you dynamically generate `robots.txt` or `sitemap.xml` in Next.js instead of using static files?
**Answer:** In the App Router, create `app/robots.ts` and `app/sitemap.ts` using the `MetadataRoute` types and return the appropriate data. This is useful when crawler rules or sitemap entries are derived from application configuration or content. Static files in `public/` remain appropriate when the content is fixed.

## Day 8 Outcome

- You understand the purpose and URL mapping of the `public/` directory.
- You can reference public assets using root-relative URL paths.
- You understand App Router icon, robots, and sitemap conventions.
- You can use public assets for social metadata and downloads appropriately.
- You understand why public assets, caching, and rendering are separate concerns.
- You understand the security implications of exposing files through `public/`.
- You are ready to learn CSS Modules and Tailwind CSS on Day 9.
