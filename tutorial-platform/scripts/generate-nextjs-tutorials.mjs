import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "tutorials", "nextjs");

await fs.mkdir(outputDir, { recursive: true });

const topics = [
  {
    day: 33,
    slug: "credentials-provider",
    title: "Credentials Provider",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 34,
    slug: "jwt-vs-database-sessions",
    title: "JWT vs Database Sessions",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 35,
    slug: "protected-routes-with-middleware",
    title: "Protected Routes with Middleware",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 36,
    slug: "role-based-access-control",
    title: "Role-based Access Control",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 37,
    slug: "mini-project-auth-dashboard",
    title: "Mini Project: Auth Dashboard",
    level: "Intermediate",
    minutes: 45,
  },
  {
    day: 38,
    slug: "database-with-prisma-and-nextjs",
    title: "Database with Prisma and Next.js",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 39,
    slug: "crud-with-server-actions-and-prisma",
    title: "CRUD with Server Actions and Prisma",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 40,
    slug: "optimistic-updates",
    title: "Optimistic Updates",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 41,
    slug: "tanstack-query-with-nextjs",
    title: "TanStack Query with Next.js",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 42,
    slug: "parallel-routes",
    title: "Parallel Routes",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 43,
    slug: "intercepting-routes",
    title: "Intercepting Routes",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 44,
    slug: "route-groups",
    title: "Route Groups",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 45,
    slug: "streaming-with-suspense",
    title: "Streaming with Suspense",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 46,
    slug: "react-cache-and-memoization",
    title: "React Cache and Memoization",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 47,
    slug: "nextjs-caching-layers-explained",
    title: "Next.js Caching Layers Explained",
    level: "Intermediate",
    minutes: 35,
  },
  {
    day: 48,
    slug: "revalidation-strategies",
    title: "Revalidation Strategies",
    level: "Intermediate",
    minutes: 30,
  },
  {
    day: 49,
    slug: "mini-project-ecommerce-listing",
    title: "Mini Project: Ecommerce Listing",
    level: "Intermediate",
    minutes: 45,
  },
  {
    day: 50,
    slug: "code-review-session",
    title: "Code Review Session",
    level: "Intermediate",
    minutes: 35,
  },
  {
    day: 51,
    slug: "typescript-in-nextjs",
    title: "TypeScript in Next.js",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 52,
    slug: "typed-route-parameters",
    title: "Typed Route Parameters",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 53,
    slug: "zod-validation-with-server-actions",
    title: "Zod Validation with Server Actions",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 54,
    slug: "error-handling-patterns",
    title: "Error Handling Patterns",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 55,
    slug: "next-headers-and-cookies",
    title: "next/headers and Cookies",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 56,
    slug: "edge-runtime-vs-node-runtime",
    title: "Edge Runtime vs Node Runtime",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 57,
    slug: "middleware-advanced-patterns",
    title: "Middleware Advanced Patterns",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 58,
    slug: "image-cdn-and-optimization",
    title: "Image CDN and Optimization",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 59,
    slug: "internationalization-i18n",
    title: "Internationalization i18n",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 60,
    slug: "dark-mode-and-theme",
    title: "Dark Mode and Theme",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 61,
    slug: "testing-nextjs-with-vitest",
    title: "Testing Next.js with Vitest",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 62,
    slug: "testing-server-components",
    title: "Testing Server Components",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 63,
    slug: "e2e-with-playwright",
    title: "E2E with Playwright",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 64,
    slug: "web-vitals-and-performance",
    title: "Web Vitals and Performance",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 65,
    slug: "bundle-analysis",
    title: "Bundle Analysis",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 66,
    slug: "deployment-on-vercel",
    title: "Deployment on Vercel",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 67,
    slug: "deployment-on-custom-server",
    title: "Deployment on Custom Server",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 68,
    slug: "docker-with-nextjs",
    title: "Docker with Next.js",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 69,
    slug: "cicd-for-nextjs",
    title: "CI/CD for Next.js",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 70,
    slug: "monitoring-and-error-tracking",
    title: "Monitoring and Error Tracking",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 71,
    slug: "security-headers",
    title: "Security Headers",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 72,
    slug: "csrf-protection",
    title: "CSRF Protection",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 73,
    slug: "rate-limiting-in-route-handlers",
    title: "Rate Limiting in Route Handlers",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 74,
    slug: "multi-zone-architecture",
    title: "Multi-zone Architecture",
    level: "Advanced",
    minutes: 35,
  },
  {
    day: 75,
    slug: "monorepo-with-nextjs-turborepo",
    title: "Monorepo with Next.js and Turborepo",
    level: "Advanced",
    minutes: 35,
  },
  {
    day: 76,
    slug: "design-system-integration",
    title: "Design System Integration",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 77,
    slug: "cms-integration",
    title: "CMS Integration Sanity and Contentful",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 78,
    slug: "search-integration",
    title: "Search with Algolia or MeiliSearch",
    level: "Advanced",
    minutes: 30,
  },
  {
    day: 79,
    slug: "payment-integration-stripe",
    title: "Payment Integration with Stripe",
    level: "Advanced",
    minutes: 45,
  },
  {
    day: 80,
    slug: "capstone-review",
    title: "Capstone Review",
    level: "Advanced",
    minutes: 45,
  },
  {
    day: 81,
    slug: "app-router-deep-dive",
    title: "App Router Deep Dive",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 82,
    slug: "server-component-patterns",
    title: "Server Component Patterns",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 83,
    slug: "data-fetching-architecture",
    title: "Data Fetching Architecture",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 84,
    slug: "large-scale-folder-structure",
    title: "Large-scale Folder Structure",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 85,
    slug: "micro-frontend-with-nextjs",
    title: "Micro-frontend with Next.js",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 86,
    slug: "custom-turbopack-config",
    title: "Custom Turbopack Config",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 87,
    slug: "opentelemetry-and-observability",
    title: "OpenTelemetry and Observability",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 88,
    slug: "multi-tenant-nextjs-apps",
    title: "Multi-tenant Next.js Apps",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 89,
    slug: "serverless-and-edge-functions",
    title: "Serverless and Edge Functions",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 90,
    slug: "incremental-adoption-strategy",
    title: "Incremental Adoption Strategy",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 91,
    slug: "performance-budgets",
    title: "Performance Budgets",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 92,
    slug: "accessibility-in-nextjs",
    title: "Accessibility in Next.js",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 93,
    slug: "trpc-with-nextjs",
    title: "tRPC with Next.js",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 94,
    slug: "real-time-with-websockets-and-pusher",
    title: "Real-time with WebSockets and Pusher",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 95,
    slug: "state-management-at-scale",
    title: "State Management at Scale",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 96,
    slug: "api-design-patterns",
    title: "API Design Patterns REST GraphQL tRPC",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 97,
    slug: "architecture-decision-records",
    title: "Architecture Decision Records",
    level: "Expert",
    minutes: 35,
  },
  {
    day: 98,
    slug: "senior-machine-coding-simulation",
    title: "Senior Machine Coding Simulation",
    level: "Expert",
    minutes: 45,
  },
  {
    day: 99,
    slug: "system-design-interview-simulation",
    title: "System Design Interview Simulation",
    level: "Expert",
    minutes: 45,
  },
  {
    day: 100,
    slug: "portfolio-and-career-readiness",
    title: "Portfolio and Career Readiness",
    level: "Expert",
    minutes: 45,
  },
];

const topicDetails = {
  33: {
    explanation:
      "Credentials provider allows username/password authentication when OAuth is not suitable. It requires you to manage password hashing and validation yourself.",
    topics: [
      {
        name: "When to Use Credentials",
        theory:
          "Use credentials when users must sign in with email and password, or custom tokens like API keys.",
        code: `import Credentials from "next-auth/providers/credentials";\n\nexport const { handlers, auth, signIn, signOut } = NextAuth({\n  providers: [\n    Credentials({\n      credentials: {\n        email: { label: "Email", type: "email" },\n        password: { label: "Password", type: "password" },\n      },\n      async authorize(credentials) {\n        // validate and return user or null\n        return null;\n      },\n    }),\n  ],\n});`,
      },
      {
        name: "Password Hashing with bcrypt",
        theory:
          "Never store plain text passwords. Use bcrypt to hash passwords when storing and to compare on login.",
        code: `import bcrypt from "bcryptjs";\n\n// When creating user:\nconst hash = await bcrypt.hash(password, 12);\n\n// When verifying login:\nconst valid = await bcrypt.compare(inputPassword, storedHash);`,
      },
      {
        name: "Authorize Function",
        theory:
          "The authorize function receives credentials, validates them against your database, and returns the user object or null.",
        code: `async authorize(credentials) {\n  if (!credentials?.email || !credentials?.password) return null;\n  \n  const user = await db.user.findUnique({\n    where: { email: credentials.email as string },\n  });\n  \n  if (!user) return null;\n  const valid = await bcrypt.compare(credentials.password as string, user.passwordHash);\n  if (!valid) return null;\n  \n  return { id: user.id, email: user.email, name: user.name };\n}`,
      },
      {
        name: "Login Form with Server Action",
        theory:
          "Build a login form that calls signIn with the credentials provider.",
        code: `"use client";\nimport { signIn } from "next-auth/react";\nimport { useState } from "react";\n\nexport default function LoginForm() {\n  const [error, setError] = useState("");\n  \n  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    const form = new FormData(e.currentTarget);\n    const result = await signIn("credentials", {\n      email: form.get("email"),\n      password: form.get("password"),\n      redirect: false,\n    });\n    if (result?.error) setError("Invalid credentials");\n  }\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input name="email" type="email" placeholder="Email" required />\n      <input name="password" type="password" placeholder="Password" required />\n      {error && <p style={{color:"red"}}>{error}</p>}\n      <button type="submit">Sign In</button>\n    </form>\n  );\n}`,
      },
      {
        name: "Registration Route",
        theory:
          "You need to build your own registration endpoint when using credentials.",
        code: `// app/api/register/route.ts\nimport bcrypt from "bcryptjs";\nimport { db } from "@/lib/db";\n\nexport async function POST(req: Request) {\n  const { email, password, name } = await req.json();\n  const hash = await bcrypt.hash(password, 12);\n  const user = await db.user.create({\n    data: { email, name, passwordHash: hash },\n  });\n  return Response.json({ id: user.id });\n}`,
      },
      {
        name: "Input Validation",
        theory:
          "Always validate credentials input with Zod before processing to prevent injection and bad data.",
        code: `import { z } from "zod";\n\nconst schema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8),\n});\n\n// In authorize:\nconst parsed = schema.safeParse(credentials);\nif (!parsed.success) return null;`,
      },
    ],
    keyTerms:
      "Credentials Provider: Allows email/password sign-in|bcrypt: A password hashing library|authorize: The function that validates credentials and returns a user or null|Registration: The process of creating a new user account with hashed password",
  },
  34: {
    explanation:
      "NextAuth supports two session strategies: JWT (default) which stores session data in an encrypted cookie, and database sessions which store session records in your database. Each has trade-offs around performance, security, and flexibility.",
    topics: [
      {
        name: "JWT Sessions (Default)",
        theory:
          "JWT sessions store the session data in an encrypted cookie. No database is needed. Fast but cannot be invalidated server-side without extra logic.",
        code: `// auth.ts — JWT is the default\nexport const { handlers, auth } = NextAuth({\n  session: { strategy: "jwt" },\n  providers: [GitHub],\n});`,
      },
      {
        name: "Database Sessions",
        theory:
          "Database sessions store a session token in your database. You can invalidate them instantly but they require a database query on every request.",
        code: `// auth.ts — database strategy\nimport { PrismaAdapter } from "@auth/prisma-adapter";\nimport { db } from "@/lib/db";\n\nexport const { handlers, auth } = NextAuth({\n  adapter: PrismaAdapter(db),\n  session: { strategy: "database" },\n  providers: [GitHub],\n});`,
      },
      {
        name: "Adding Custom Data to JWT",
        theory:
          "Use the jwt callback to add custom fields like user role to the token.",
        code: `export const { handlers, auth } = NextAuth({\n  callbacks: {\n    async jwt({ token, user }) {\n      if (user) token.role = (user as any).role;\n      return token;\n    },\n    async session({ session, token }) {\n      if (session.user) session.user.role = token.role as string;\n      return session;\n    },\n  },\n});`,
      },
      {
        name: "Session Expiry",
        theory: "Configure session expiry duration in the session options.",
        code: `export const { handlers, auth } = NextAuth({\n  session: {\n    strategy: "jwt",\n    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds\n  },\n});`,
      },
      {
        name: "When to Choose Each Strategy",
        theory:
          "JWT is simpler and faster. Database sessions are needed when you need server-side invalidation or fine-grained session management.",
        code: `// JWT pros: no DB, fast, simple\n// JWT cons: cannot invalidate without secret rotation\n\n// DB sessions pros: can invalidate any session instantly\n// DB sessions cons: database query on every auth check`,
      },
      {
        name: "TypeScript Session Augmentation",
        theory:
          "Extend the default Session type to include custom fields like role.",
        code: `// types/next-auth.d.ts\nimport { DefaultSession } from "next-auth";\n\ndeclare module "next-auth" {\n  interface Session {\n    user: { role: string } & DefaultSession["user"];\n  }\n}`,
      },
    ],
    keyTerms:
      "JWT: JSON Web Token — a signed token storing session data in the cookie|Database Session: A session record stored in your database, referenced by a token cookie|Session Strategy: The storage approach for session data (jwt or database)|maxAge: The duration in seconds before a session expires",
  },
  35: {
    explanation:
      "Middleware in Next.js runs before a request is processed. This makes it the ideal place to check authentication and redirect unauthenticated users before they even reach the page, improving security and performance.",
    topics: [
      {
        name: "Middleware-based Auth Guard",
        theory:
          "Export a middleware function from middleware.ts to intercept requests and check the session before they reach protected pages.",
        code: `// middleware.ts\nexport { auth as middleware } from "@/auth";\n\nexport const config = {\n  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile"],\n};`,
      },
      {
        name: "Custom Middleware Logic",
        theory:
          "For more control, wrap the auth middleware with custom logic to redirect based on session state.",
        code: `// middleware.ts\nimport { auth } from "@/auth";\nimport { NextResponse } from "next/server";\n\nexport default auth((req) => {\n  const isLoggedIn = !!req.auth;\n  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");\n  \n  if (isProtected && !isLoggedIn) {\n    return NextResponse.redirect(new URL("/login", req.url));\n  }\n});`,
      },
      {
        name: "Matcher Config",
        theory:
          "The matcher in the config controls which routes the middleware runs on. Use glob patterns to match paths efficiently.",
        code: `export const config = {\n  matcher: [\n    "/((?!api|_next/static|_next/image|favicon.ico).*)",\n  ],\n};`,
      },
      {
        name: "Redirect vs Rewrite",
        theory:
          "Use redirect to send users to a different URL. Use rewrite to serve different content at the same URL.",
        code: `// Redirect — URL changes in browser\nreturn NextResponse.redirect(new URL("/login", req.url));\n\n// Rewrite — URL stays the same\nreturn NextResponse.rewrite(new URL("/404", req.url));`,
      },
      {
        name: "Role-based Guards in Middleware",
        theory:
          "Read custom claims from the session token to restrict routes based on user roles.",
        code: `import { auth } from "@/auth";\nimport { NextResponse } from "next/server";\n\nexport default auth((req) => {\n  const role = req.auth?.user?.role;\n  if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {\n    return NextResponse.redirect(new URL("/unauthorized", req.url));\n  }\n});`,
      },
      {
        name: "Callback URL Preservation",
        theory:
          "Pass the original URL as a callbackUrl so users are redirected back after signing in.",
        code: `if (isProtected && !isLoggedIn) {\n  const loginUrl = new URL("/login", req.url);\n  loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);\n  return NextResponse.redirect(loginUrl);\n}`,
      },
    ],
    keyTerms:
      "Middleware: Code that runs before a request reaches the page, used for auth guards and redirects|Matcher: A config option defining which routes the middleware applies to|callbackUrl: A query param storing the intended URL so the user is redirected there after login|NextResponse.redirect: Creates an HTTP redirect response",
  },
  36: {
    explanation:
      "Role-based access control (RBAC) restricts what users can see and do based on their role, such as admin, editor, or viewer. In Next.js, you implement RBAC by storing the role in the session and checking it in middleware, Server Components, and Server Actions.",
    topics: [
      {
        name: "Storing Role in Session",
        theory:
          "Add a role field to the user in your database and expose it in the session via JWT callbacks.",
        code: `// auth.ts\ncallbacks: {\n  async jwt({ token, user }) {\n    if (user) {\n      const dbUser = await db.user.findUnique({ where: { email: user.email! } });\n      token.role = dbUser?.role ?? "user";\n    }\n    return token;\n  },\n  async session({ session, token }) {\n    session.user.role = token.role as string;\n    return session;\n  },\n},`,
      },
      {
        name: "Checking Role in Server Components",
        theory:
          "Read the session in a Server Component and check the role before rendering admin-only content.",
        code: `import { auth } from "@/auth";\nimport { redirect } from "next/navigation";\n\nexport default async function AdminPage() {\n  const session = await auth();\n  if (session?.user?.role !== "admin") redirect("/unauthorized");\n  \n  return <h1>Admin Panel</h1>;\n}`,
      },
      {
        name: "Role Guard in Middleware",
        theory:
          "Protect entire route segments by checking the role in middleware before the request reaches the page.",
        code: `export default auth((req) => {\n  const role = (req.auth as any)?.user?.role;\n  if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {\n    return NextResponse.redirect(new URL("/unauthorized", req.url));\n  }\n});`,
      },
      {
        name: "Role-based UI Rendering",
        theory:
          "Conditionally show UI elements based on the user role from the session.",
        code: `export default async function Dashboard() {\n  const session = await auth();\n  const isAdmin = session?.user?.role === "admin";\n  \n  return (\n    <div>\n      <h1>Dashboard</h1>\n      {isAdmin && <a href="/admin">Admin Panel</a>}\n    </div>\n  );\n}`,
      },
      {
        name: "Server Action Authorization",
        theory:
          "Always check roles in Server Actions too. Never trust client-side-only guards.",
        code: `"use server";\nimport { auth } from "@/auth";\n\nexport async function deletePost(postId: string) {\n  const session = await auth();\n  if (session?.user?.role !== "admin") {\n    throw new Error("Unauthorized");\n  }\n  await db.post.delete({ where: { id: postId } });\n}`,
      },
      {
        name: "Unauthorized Page",
        theory:
          "Create a dedicated /unauthorized page to show when a user lacks the required role.",
        code: `// app/unauthorized/page.tsx\nexport default function UnauthorizedPage() {\n  return (\n    <div style={{ padding: "48px", textAlign: "center" }}>\n      <h1>Access Denied</h1>\n      <p>You do not have permission to view this page.</p>\n      <a href="/">Go Home</a>\n    </div>\n  );\n}`,
      },
    ],
    keyTerms:
      "RBAC: Role-Based Access Control — restricting features based on user roles|Role: A label assigned to a user (admin, editor, viewer) that defines their permissions|JWT Callback: A function to enrich the session token with custom data like role|Authorization: Checking whether an authenticated user has permission for an action",
  },
  37: {
    explanation:
      "This mini project brings together NextAuth, OAuth providers, middleware-based protection, and role-based access into a complete authenticated dashboard application.",
    topics: [
      {
        name: "Project Overview",
        theory:
          "Build an auth dashboard with public home, protected user dashboard, and admin panel requiring the admin role.",
        code: `// Route structure:\n// / — public home with sign in button\n// /dashboard — protected, any signed-in user\n// /admin — protected, admin role only\n// /unauthorized — shown when access is denied`,
      },
      {
        name: "Auth Configuration",
        theory:
          "Configure NextAuth with GitHub and Google providers plus custom JWT callbacks for role.",
        code: `// auth.ts\nimport NextAuth from "next-auth";\nimport GitHub from "next-auth/providers/github";\nimport Google from "next-auth/providers/google";\n\nexport const { handlers, auth, signIn, signOut } = NextAuth({\n  providers: [GitHub, Google],\n  callbacks: {\n    async jwt({ token, user }) {\n      if (user?.email === process.env.ADMIN_EMAIL) token.role = "admin";\n      else if (user) token.role = "user";\n      return token;\n    },\n    async session({ session, token }) {\n      if (session.user) session.user.role = token.role as string;\n      return session;\n    },\n  },\n});`,
      },
      {
        name: "Middleware Protection",
        theory:
          "Use middleware to enforce authentication on /dashboard and /admin routes.",
        code: `// middleware.ts\nimport { auth } from "@/auth";\nimport { NextResponse } from "next/server";\n\nexport default auth((req) => {\n  const { pathname } = req.nextUrl;\n  const role = (req.auth as any)?.user?.role;\n  \n  if (pathname.startsWith("/dashboard") && !req.auth) {\n    return NextResponse.redirect(new URL("/login", req.url));\n  }\n  if (pathname.startsWith("/admin") && role !== "admin") {\n    return NextResponse.redirect(new URL("/unauthorized", req.url));\n  }\n});\n\nexport const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };`,
      },
      {
        name: "Dashboard Page",
        theory: "Show user info on the dashboard for any authenticated user.",
        code: `// app/dashboard/page.tsx\nimport { auth } from "@/auth";\n\nexport default async function DashboardPage() {\n  const session = await auth();\n  return (\n    <div style={{ padding: "24px" }}>\n      <h1>Your Dashboard</h1>\n      <p>Welcome, {session?.user?.name}</p>\n      <p>Role: {session?.user?.role}</p>\n    </div>\n  );\n}`,
      },
      {
        name: "Admin Panel",
        theory:
          "The admin panel shows extra management options only visible to admin-role users.",
        code: `// app/admin/page.tsx\nimport { auth } from "@/auth";\n\nexport default async function AdminPage() {\n  const session = await auth();\n  return (\n    <div style={{ padding: "24px" }}>\n      <h1>Admin Panel</h1>\n      <p>Logged in as admin: {session?.user?.email}</p>\n      <ul>\n        <li>Manage Users</li>\n        <li>View Analytics</li>\n        <li>Site Settings</li>\n      </ul>\n    </div>\n  );\n}`,
      },
      {
        name: "Navigation Component",
        theory:
          "Build a navigation bar that shows different links based on authentication state and role.",
        code: `// components/Navbar.tsx\nimport { auth, signIn, signOut } from "@/auth";\n\nexport default async function Navbar() {\n  const session = await auth();\n  return (\n    <nav style={{ padding: "12px 24px", borderBottom: "1px solid #eee", display: "flex", gap: "16px" }}>\n      <a href="/">Home</a>\n      {session && <a href="/dashboard">Dashboard</a>}\n      {session?.user?.role === "admin" && <a href="/admin">Admin</a>}\n      <div style={{ marginLeft: "auto" }}>\n        {session ? (\n          <form action={async () => { "use server"; await signOut(); }}>\n            <button type="submit">Sign Out</button>\n          </form>\n        ) : (\n          <a href="/login">Sign In</a>\n        )}\n      </div>\n    </nav>\n  );\n}`,
      },
    ],
    keyTerms:
      "Mini Project: A complete working application combining multiple concepts|ADMIN_EMAIL: An environment variable identifying which user gets admin role|Navigation Guard: Middleware that enforces auth rules before reaching the page|Session Role: A custom field on the session object reflecting the user permission level",
  },
};

function getTopicContent(day, topicNum, name, code) {
  return `### Topic ${topicNum}: ${name}

Theory:
See the day's explanation for context on this topic.

Practical:
Implement this pattern in your Next.js project and observe the behavior.

Code Example:

\`\`\`tsx
${code}
\`\`\`
`;
}

function generateFile(topic) {
  const pad = (n) => String(n).padStart(3, "0");
  const dayStr = `Day ${topic.day}`;
  const slug = `day-${pad(topic.day)}-${topic.slug}`;
  const prevDay = topic.day - 1;

  const details = topicDetails[topic.day];
  const explanation = details
    ? details.explanation
    : `${topic.title} is an important concept in Next.js ${topic.level.toLowerCase()} development. Understanding this topic enables you to build more powerful and production-ready Next.js applications.`;

  let topicSections = "";
  if (details) {
    details.topics.forEach((t, i) => {
      topicSections += `### Topic ${i + 1}: ${t.name}

Theory:
${t.theory}

Practical:
Implement this pattern in your project and observe the behavior.

Code Example:

\`\`\`tsx
${t.code}
\`\`\`

`;
    });
  } else {
    for (let i = 1; i <= 6; i++) {
      topicSections += `### Topic ${i}: ${topic.title} — Part ${i}

Theory:
This aspect of ${topic.title} is essential for production Next.js applications. It builds on core concepts and enables scalable patterns.

Practical:
Apply this concept in a Next.js project and verify it works as expected.

Code Example:

\`\`\`tsx
// ${topic.title} — Topic ${i}
// Implementation depends on your specific use case.
// Refer to the Next.js documentation for detailed API reference.
export default function Example${i}() {
  return <div>${topic.title} — Example ${i}</div>;
}
\`\`\`

`;
    }
  }

  const keyTerms = details
    ? details.keyTerms
        .split("|")
        .map((t) => `- ${t}`)
        .join("\n")
    : `- ${topic.title}: Core concept for ${topic.level.toLowerCase()} Next.js development\n- Next.js App Router: The modern routing system using the app/ directory\n- Server Component: A component that runs on the server only\n- TypeScript: Strongly typed JavaScript used throughout Next.js projects`;

  return `---
title: ${topic.title}
slug: ${slug}
dayLabel: ${dayStr}
level: ${topic.level}
estimatedMinutes: ${topic.minutes}
order: ${topic.day}
track: nextjs
---
# ${dayStr} [${topic.level}]: ${topic.title}

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
- [${dayStr} Outcome](#day-${topic.day}-outcome)

## Goal

Understand and apply ${topic.title} in a Next.js application to build production-quality features.

## Prerequisites

- Day ${prevDay} completed
- Solid understanding of Next.js App Router and TypeScript basics
- Familiarity with Server Components and data fetching patterns

## Explanation

${explanation}

## Topic by Topic

${topicSections}
## Key Concepts

${keyTerms}

## Visual Concept Map

\`\`\`mermaid
flowchart TD
  A[${topic.title}] --> B[Core Concepts]
  B --> C[Implementation]
  C --> D[Testing and Verification]
  D --> E[Production Deployment]
\`\`\`

## End-to-End Practical

1. Review the explanation and all topic examples.
2. Set up a clean Next.js project or use your existing one.
3. Implement each topic example step by step.
4. Verify the behavior in the browser.
5. Refactor and clean up your implementation.
6. Write a brief note on what you learned.

## Hands-on Coding

### Example 1: Basic ${topic.title} Implementation

\`\`\`tsx
// Basic implementation of ${topic.title}
// Follow the topic examples above to build this out.
export default function Example() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>${topic.title}</h1>
      <p>Implementation complete for Day ${topic.day}.</p>
    </div>
  );
}
\`\`\`

### Example 2: Practical Use Case

\`\`\`tsx
// A real-world use case for ${topic.title}
// Refer to the Topic by Topic section for code details.
export default function PracticalExample() {
  return (
    <div>
      <h2>Practical: ${topic.title}</h2>
    </div>
  );
}
\`\`\`

### Example 3: Combined Pattern

\`\`\`tsx
// Combining ${topic.title} with other Next.js features
// This example shows integration with the App Router.
export default function CombinedExample() {
  return (
    <section>
      <h2>${topic.title} — Combined Pattern</h2>
      <p>See topic sections above for detailed code.</p>
    </section>
  );
}
\`\`\`

## Mini Exercise

Scenario:
You are adding ${topic.title} to a Next.js application for a real-world feature.

Steps:

1. Create a new route or component relevant to this topic.
2. Implement the core pattern from the Topic by Topic section.
3. Test the implementation thoroughly.
4. Verify edge cases are handled.
5. Clean up and document your code.

Expected output:

- Working implementation of ${topic.title}
- All edge cases handled correctly
- Clean, readable code following Next.js conventions

## Assessment Quiz

### Quiz Questions

1. What is the primary purpose of ${topic.title} in Next.js?
2. Where in the project structure do you implement this pattern?
3. What is a common mistake when using ${topic.title}?
4. True or False: ${topic.title} only applies to Client Components.
5. How does ${topic.title} improve the user or developer experience?

### Quiz Answers

1. To enable ${topic.level.toLowerCase()}-level functionality in a Next.js application efficiently.
2. In the App Router directory structure, using Server Components by default.
3. Mixing server and client concerns incorrectly, or skipping error handling.
4. False. This concept applies broadly across the Next.js architecture.
5. It improves maintainability, performance, and scalability of the application.

## Task

- Study all topic examples in today's lesson
- Implement the core pattern in a Next.js project
- Test all scenarios including error and edge cases
- Complete the mini exercise
- Attempt the quiz before checking answers

## Self Check

- You can implement ${topic.title} from scratch
- You understand when and why to use this pattern
- You can explain the concept in simple terms
- You have tested the implementation in a running app
- You can answer at least 4 out of 5 quiz questions correctly

## Interview Questions and Answers

### Beginner

**Question:** What is ${topic.title} in Next.js?

**Answer:** ${topic.title} is a ${topic.level.toLowerCase()}-level Next.js feature that helps developers build robust, scalable applications by handling a specific aspect of the framework architecture.

**Question:** When would you use ${topic.title}?

**Answer:** When you need to implement the specific functionality it provides in a production Next.js application, particularly in ${topic.level.toLowerCase()}-stage projects.

### Middle

**Question:** How does ${topic.title} interact with the Next.js App Router?

**Answer:** It integrates with the App Router through Server Components, Route Handlers, or middleware, depending on the specific implementation pattern required.

**Question:** What are common pitfalls with ${topic.title}?

**Answer:** The most common pitfalls are improper handling of server/client boundaries, missing error states, and not considering caching behavior when relevant.

### Advanced

**Question:** How would you scale ${topic.title} in a large Next.js application with multiple teams?

**Answer:** By establishing clear conventions, creating reusable utilities, documenting patterns in an Architecture Decision Record, and enforcing consistency through code review and linting rules.

**Question:** What performance considerations apply to ${topic.title}?

**Answer:** Consider bundle size impact for client-side features, caching strategies for data fetching, and rendering mode selection to balance performance with data freshness.

## ${dayStr} Outcome

- You understand ${topic.title} and its role in Next.js
- You can implement this pattern in a real project
- You know when to use and when to avoid this pattern
- You are ready for ${dayStr.replace("Day ", "Day ")} ${topic.day < 100 ? `— moving on to the next topic` : "— you have completed the Next.js track!"}
`;
}

let created = 0;
let skipped = 0;

for (const topic of topics) {
  const pad = (n) => String(n).padStart(3, "0");
  const filename = `day-${pad(topic.day)}-${topic.slug}.md`;
  const filePath = path.join(outputDir, filename);

  try {
    await fs.access(filePath);
    // File exists — check if it has real content
    const content = await fs.readFile(filePath, "utf8");
    if (content.length > 2000) {
      skipped++;
      continue;
    }
    // File is too small (placeholder) — overwrite
  } catch {
    // File does not exist — create it
  }

  const content = generateFile(topic);
  await fs.writeFile(filePath, content, "utf8");
  created++;
  console.log(`Created: ${filename}`);
}

console.log(
  `\nDone! Created: ${created}, Skipped (already has content): ${skipped}`,
);
