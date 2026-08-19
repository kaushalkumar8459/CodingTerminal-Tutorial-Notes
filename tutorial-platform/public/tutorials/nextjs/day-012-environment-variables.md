---
title: Environment Variables
slug: day-012-environment-variables
dayLabel: Day 12
level: Beginner
estimatedMinutes: 30
order: 12
track: nextjs
---
# Day 12 [Beginner]: Environment Variables

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
- [Day 12 Outcome](#day-12-outcome)

## Goal

Store and access configuration values using environment variables in Next.js, understanding the difference between server-only and browser-exposed variables.

## Prerequisites

- Completed Day 11: next/font Optimization
- Basic understanding of key-value configuration concepts

## Explanation

Environment variables let you store configuration values outside your code — things like API keys, database URLs, and feature flags. This is important for two reasons: security (you don't commit secrets to source control) and flexibility (you can have different values for development, staging, and production without changing code).

Next.js supports several `.env` files and has a critical rule: environment variables are server-side only by default. To expose a variable to the browser (client-side), you must prefix it with `NEXT_PUBLIC_`. Variables without this prefix are only available in Server Components, API Routes, and middleware. If a client component tries to access a non-public variable, it gets `undefined` — the variable is simply not sent to the browser.

This design is a security feature. Secrets like database passwords and API keys should never reach the browser. The `NEXT_PUBLIC_` prefix is a deliberate signal that you intend this value to be public.

## Topic by Topic

### Topic 1: .env Files

Theory:
Next.js loads environment variables from `.env.local` (never committed), `.env.development`, `.env.production`, and `.env` (fallback). `.env.local` always overrides others.

Practical:
Create `.env.local` for your local development secrets. Add it to `.gitignore`.

Code Example:

```bash
# .env.local (NEVER commit this file)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=super-secret-jwt-key-change-in-production
API_KEY=sk_live_abc123xyz

# .env (safe to commit — no secrets)
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```
**Explanation:**
This topic explains .env Files in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind .env Files.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Server-only Variables

Theory:
Variables without the `NEXT_PUBLIC_` prefix are only available on the server. They can be used in Server Components, Route Handlers, middleware, and `generateStaticParams`.

Practical:
Use server-only variables for database connections, payment keys, and any sensitive API credentials.

Code Example:

```tsx
// app/api/data/route.ts — Server-side only
import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL; // Server-only env var
  const apiKey = process.env.STRIPE_SECRET_KEY; // Never exposed to browser

  // Use them server-side only
  console.log("Database URL:", dbUrl ? "set" : "NOT SET");
  return NextResponse.json({ status: "ok" });
}
```
**Explanation:**
This topic explains Server-only Variables in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Server-only Variables.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: Client-side Variables (NEXT*PUBLIC*)

Theory:
Prefix a variable with `NEXT_PUBLIC_` to expose it to the browser. Next.js inlines the value at build time — it is not dynamic; it is baked into the JavaScript bundle.

Practical:
Use `NEXT_PUBLIC_` for API base URLs, feature flags, analytics IDs, and other non-secret config.

Code Example:

```tsx
"use client";
// .env.local: NEXT_PUBLIC_API_URL=https://api.myapp.com
// .env.local: NEXT_PUBLIC_ANALYTICS_ID=UA-123456

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  async function fetchData() {
    const res = await fetch(`${apiUrl}/posts`);
    return res.json();
  }

  return (
    <div>
      <p>API: {apiUrl}</p>
      <p>Analytics: {analyticsId}</p>
    </div>
  );
}
```
**Explanation:**
This topic explains Client-side Variables (NEXT*PUBLIC*) in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Client-side Variables (NEXT*PUBLIC*).
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 4: Environment-specific Files

Theory:
Next.js loads different files per environment: `.env.development` is loaded in development, `.env.production` in production. `.env.local` overrides both.

Practical:
Set `NEXT_PUBLIC_API_URL` differently in development vs production via separate `.env` files.

Code Example:

```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENV=development
LOG_LEVEL=debug

# .env.production
NEXT_PUBLIC_API_URL=https://api.myapp.com
NEXT_PUBLIC_ENV=production
LOG_LEVEL=error
```
**Explanation:**
This topic explains Environment-specific Files in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Environment-specific Files.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Validating Required Environment Variables

Theory:
Access `process.env` at the top of configuration files and throw clear errors if required variables are missing. This prevents cryptic runtime errors.

Practical:
Create a `lib/env.ts` file that validates and exports typed environment variables.

Code Example:

```tsx
// lib/env.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  databaseUrl: requireEnv("DATABASE_URL"),
  jwtSecret: requireEnv("JWT_SECRET"),
  stripeKey: requireEnv("STRIPE_SECRET_KEY"),
  // Public vars
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
};
```
**Explanation:**
This topic explains Validating Required Environment Variables in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Validating Required Environment Variables.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Using env Variables in next.config.ts

Theory:
You can expose additional variables to the browser via `next.config.ts`'s `env` key. However, these are build-time static values — prefer `.env` files with `NEXT_PUBLIC_` for clarity.

Practical:
Use `env` in `next.config.ts` for computed values or values derived from other env vars.

Code Example:

```tsx
// next.config.ts
const nextConfig = {
  env: {
    APP_VERSION: process.env.npm_package_version ?? "0.0.0",
    BUILD_DATE: new Date().toISOString().split("T")[0],
  },
};
export default nextConfig;

// Usage in any component (server or client)
// process.env.APP_VERSION — available everywhere
```
**Explanation:**
This topic explains Using env Variables in next.config.ts in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Using env Variables in next.config.ts.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 7: TypeScript Types for env

Theory:
By default, TypeScript types `process.env` as `Record<string, string | undefined>`. Use a type augmentation or validation library like `zod` to get typed, validated env vars.

Practical:
Use `@t3-oss/env-nextjs` or manual Zod validation for type-safe environment variables.

Code Example:

```tsx
// lib/env.ts — Using Zod for validation
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().default("My App"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});
```
**Explanation:**
This topic explains TypeScript Types for env in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind TypeScript Types for env.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 8: Secrets in Production Deployment

Theory:
In production (Vercel, Docker, etc.), environment variables are set on the platform/server — never in committed files. `.env.local` is for local development only.

Practical:
On Vercel, add production env vars in the project settings dashboard. On Docker, pass them via `--env-file` or orchestration secrets.

Code Example:

```bash
# .gitignore — MUST include all .env.local files
.env.local
.env.*.local

# docker-compose.yml
services:
  app:
    build: .
    env_file:
      - .env.production  # Or use Docker secrets for sensitive values
    environment:
      - NODE_ENV=production
```
**Explanation:**
This topic explains Secrets in Production Deployment in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Secrets in Production Deployment.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- **Environment Variable**: A named value stored outside the code that configures behaviour at runtime or build time.
- **NEXT*PUBLIC* prefix**: Variables with this prefix are inlined into the browser JavaScript bundle at build time.
- **Server-only Variable**: A variable without `NEXT_PUBLIC_` that is only accessible on the server.
- **.env.local**: The local-only override file that is never committed to source control.
- **Build-time inlining**: `NEXT_PUBLIC_` variables are replaced with their literal values during the build — they are not dynamic at runtime.
- **Validation**: Checking that required env vars are set at startup to fail fast with a clear error.
- **TypeScript env types**: Augmenting `process.env` types or using Zod to get typed, validated configuration.
- **Platform secrets**: Production credentials stored in the hosting platform's settings, not in committed files.

## Visual Concept Map

```mermaid
flowchart TD
  A[Environment Variables] --> B[Server-only no prefix]
  A --> C[Client-exposed NEXT_PUBLIC_]
  B --> D[Server Components]
  B --> E[Route Handlers]
  B --> F[Middleware]
  C --> G[Browser JavaScript Bundle]
  C --> H[Client Components]
  I[.env.local] --> J[Local Dev Only]
  K[.env.production] --> L[Production Config]
  M[Platform Dashboard Vercel] --> N[Production Secrets]
  B --> O[DB URLs, API Secrets]
  C --> P[API Base URLs, Analytics IDs]
```

## End-to-End Practical

1. Create `.env.local` with `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`, and `NEXT_PUBLIC_APP_NAME`.
2. Create a Server Component that logs `process.env.DATABASE_URL` (server only).
3. Create a Client Component that reads `process.env.NEXT_PUBLIC_API_URL`.
4. Try reading `DATABASE_URL` in a Client Component — observe it is `undefined`.
5. Create `lib/env.ts` with a validation function.
6. Add `.env.local` to `.gitignore`.
7. Create `.env.development` with a local API URL and `.env.production` with a production URL.

## Hands-on Coding

### Example 1: Server Component Using Secrets

```tsx
// app/dashboard/page.tsx — Server Component
async function fetchUserData() {
  const apiKey = process.env.INTERNAL_API_KEY; // Server-only
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Public

  const res = await fetch(`${baseUrl}/users`, {
    headers: { "X-API-Key": apiKey ?? "" },
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const users = await fetchUserData();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Loaded {users.length} users from API</p>
    </div>
  );
}
```

### Example 2: Typed Environment Configuration

```tsx
// lib/config.ts
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "My App",
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  },
  // Server-only
  db: {
    url: process.env.DATABASE_URL ?? "",
  },
  auth: {
    secret: process.env.JWT_SECRET ?? "",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  },
};

// Validate on startup
if (typeof window === "undefined") {
  if (!config.db.url) throw new Error("DATABASE_URL is required");
  if (!config.auth.secret) throw new Error("JWT_SECRET is required");
}
```

### Example 3: Environment Indicator Component

```tsx
// app/components/EnvBadge.tsx
export default function EnvBadge() {
  const env = process.env.NEXT_PUBLIC_ENV ?? "production";
  if (env === "production") return null;

  const colours: Record<string, string> = {
    development: "#22c55e",
    staging: "#f59e0b",
    test: "#6366f1",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: colours[env] ?? "#6b7280",
        color: "#fff",
        padding: "0.25rem 0.75rem",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        zIndex: 9999,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {env}
    </div>
  );
}
```

## Mini Exercise

Scenario:
Set up environment variables for a feature flag system that toggles a "New Dashboard" feature on or off.

Steps:

1. Add `NEXT_PUBLIC_FEATURE_NEW_DASHBOARD=true` to `.env.local`.
2. Add `NEXT_PUBLIC_FEATURE_NEW_DASHBOARD=false` to `.env.production`.
3. Create a `lib/features.ts` file that exports `const features = { newDashboard: process.env.NEXT_PUBLIC_FEATURE_NEW_DASHBOARD === 'true' }`.
4. In `app/dashboard/page.tsx`, conditionally render the new or old dashboard based on the feature flag.
5. Toggle the feature flag and confirm the UI changes.

Expected output:

- In development (`.env.local`), the new dashboard renders.
- The feature can be disabled by setting the env var to `false`.

## Assessment Quiz

### Quiz Questions

1. What prefix makes an environment variable accessible in the browser?
2. What is the difference between `.env` and `.env.local`?
3. Why should you never commit `.env.local` to source control?
4. What happens when a Client Component accesses a variable without `NEXT_PUBLIC_`?
5. How are `NEXT_PUBLIC_` variables different from regular env vars at runtime?

### Quiz Answers

1. `NEXT_PUBLIC_` — variables with this prefix are inlined into the browser bundle.
2. `.env` is committed and applies to all environments. `.env.local` is local-only and never committed — it overrides `.env`.
3. `.env.local` typically contains secrets (database passwords, API keys). Committing it would expose credentials to anyone with repo access.
4. The component gets `undefined` — server-only variables are not sent to the browser.
5. `NEXT_PUBLIC_` variables are replaced with their literal values at build time (static string replacement). Regular env vars are only available at runtime on the server.

## Task

- Create `.env.local` with both server-only and public variables.
- Build a `lib/env.ts` that validates required server-side variables.
- Create a server component that uses a secret API key.
- Create a client component that reads a public API base URL.
- Add `.env.local` to `.gitignore`.

## Self Check

- Do you understand why `NEXT_PUBLIC_` is required for browser-accessible variables?
- Can you explain what happens if a client component reads a non-public variable?
- Have you created and used `.env.local` for local development?
- Do you know how to validate required environment variables?
- Have you confirmed `.env.local` is in your `.gitignore`?

## Interview Questions and Answers

### Beginner

**Question:** How do you make an environment variable available in a React client component in Next.js?
**Answer:** Prefix the variable name with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_API_URL`). Next.js inlines it into the browser bundle at build time.

**Question:** Where should production secrets like database passwords be stored?
**Answer:** In the hosting platform's environment variable settings (e.g. Vercel project settings), never in committed files. Locally, use `.env.local` which is gitignored.

### Middle

**Question:** What is build-time inlining and why does it matter for NEXT*PUBLIC* variables?
**Answer:** At build time, Next.js replaces occurrences of `process.env.NEXT_PUBLIC_FOO` with the literal string value. This means the value is baked into the JavaScript bundle — changing it requires a rebuild, not just a server restart.

**Question:** How do you have different API URLs for development and production without code changes?
**Answer:** Create `.env.development` with `NEXT_PUBLIC_API_URL=http://localhost:4000` and `.env.production` with `NEXT_PUBLIC_API_URL=https://api.prod.com`. Next.js automatically loads the right file based on `NODE_ENV`.

### Advanced

**Question:** How would you implement type-safe environment variable validation at build time?
**Answer:** Create a `lib/env.ts` that uses Zod to parse `process.env`, export the validated `env` object, and import it throughout the app. For Next.js, use `@t3-oss/env-nextjs` which integrates with Next.js build validation and gives TypeScript types for all variables.

**Question:** What are the security implications of using NEXT*PUBLIC* variables?
**Answer:** They are visible in the browser source code and network responses. Never use `NEXT_PUBLIC_` for secrets. Use it only for values intentionally public: API base URLs, analytics IDs, feature flags, and app names.

## Day 12 Outcome

- You understand the difference between server-only and client-exposed environment variables.
- You can create and use `.env.local`, `.env.development`, and `.env.production` files.
- You know how to validate required environment variables at startup.
- You understand the security model and why `NEXT_PUBLIC_` is explicit.
- You are ready to build API Route Handlers on Day 13.
