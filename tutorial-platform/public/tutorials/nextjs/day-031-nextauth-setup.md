---
title: NextAuth.js Setup
slug: day-031-nextauth-setup
dayLabel: Day 31
level: Intermediate
estimatedMinutes: 30
order: 31
track: nextjs
---
# Day 31 [Intermediate]: NextAuth.js Setup

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
- [Day 31 Outcome](#day-31-outcome)

## Goal

Set up NextAuth.js (Auth.js) in a Next.js application to handle user authentication with sessions, providers, and protected pages.

## Prerequisites

- Day 30 completed
- Understanding of middleware and route handlers
- Basic knowledge of environment variables

## Explanation

NextAuth.js (now called Auth.js) is the most popular authentication library for Next.js. It handles login, logout, sessions, and OAuth providers with minimal configuration. Instead of building authentication from scratch — which is complex and error-prone — NextAuth.js gives you a complete, secure system with just a few files.

Auth.js supports dozens of providers (Google, GitHub, Twitter, etc.), email/password credentials, and database session storage. It integrates deeply with the Next.js App Router.

## Topic by Topic

### Topic 1: Installing NextAuth.js

Theory:
NextAuth.js is installed as a package and configured through an `auth.ts` file at the root of your project.

Practical:
Install the package and create the basic auth configuration file.

Code Example:

```bash
npm install next-auth@beta
```
**Explanation:**
This topic explains Installing NextAuth.js in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Installing NextAuth.js.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Creating the Auth Configuration

Theory:
Create an `auth.ts` file that exports `handlers`, `auth`, `signIn`, and `signOut`. This is the central configuration for all authentication behavior.

Practical:
Set up a minimal auth config with one provider.

Code Example:

```tsx
// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
});
```
**Explanation:**
This topic explains Creating the Auth Configuration in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Creating the Auth Configuration.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: Setting Up the Route Handler

Theory:
NextAuth needs a catch-all API route to handle login, logout, and callback URLs from OAuth providers.

Practical:
Create the route handler file at `app/api/auth/[...nextauth]/route.ts`.

Code Example:

```tsx
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```
**Explanation:**
This topic explains Setting Up the Route Handler in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Setting Up the Route Handler.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 4: Environment Variables

Theory:
NextAuth requires a secret for encrypting sessions, plus OAuth credentials for each provider.

Practical:
Add the required environment variables to `.env.local`.

Code Example:

```bash
# .env.local
AUTH_SECRET=your-random-secret-here
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
```
**Explanation:**
This topic explains Environment Variables in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Environment Variables.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Reading the Session in Server Components

Theory:
Use the `auth()` function from your auth config to get the current session in Server Components. It returns the session object or null if the user is not signed in.

Practical:
Display the user's name and email on a profile page using the session.

Code Example:

```tsx
// app/profile/page.tsx
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) return <p>Please sign in.</p>;

  return (
    <div>
      <h1>Hello, {session.user?.name}</h1>
      <p>{session.user?.email}</p>
    </div>
  );
}
```
**Explanation:**
This topic explains Reading the Session in Server Components in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Reading the Session in Server Components.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Sign In and Sign Out Buttons

Theory:
Use the `signIn` and `signOut` functions inside Server Actions to trigger authentication flows from buttons.

Practical:
Create a simple auth button component that shows sign in or sign out based on session state.

Code Example:

```tsx
// components/AuthButton.tsx
import { auth, signIn, signOut } from "@/auth";

export default async function AuthButton() {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button type="submit">Sign In with GitHub</button>
    </form>
  );
}
```
**Explanation:**
This topic explains Sign In and Sign Out Buttons in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Sign In and Sign Out Buttons.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 7: SessionProvider for Client Components

Theory:
If you need session data in Client Components, wrap your app with `SessionProvider` and use `useSession()` hook.

Practical:
Add `SessionProvider` to the root layout and use `useSession` in a client component.

Code Example:

```tsx
// app/layout.tsx
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

// In a Client Component:
("use client");
import { useSession } from "next-auth/react";

export function UserName() {
  const { data: session } = useSession();
  return <p>{session?.user?.name ?? "Guest"}</p>;
}
```
**Explanation:**
This topic explains SessionProvider for Client Components in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind SessionProvider for Client Components.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- NextAuth.js: An authentication library for Next.js with built-in provider support and session management
- auth(): Server-side function to get the current user session
- signIn / signOut: Functions to initiate login and logout flows
- SessionProvider: A React context provider enabling `useSession` in Client Components
- AUTH_SECRET: A random string used to encrypt session tokens
- OAuth Provider: A third-party identity service (GitHub, Google) that handles login
- Handlers: The GET and POST handlers NextAuth needs for its API routes

## Visual Concept Map

```mermaid
flowchart TD
  A[User Clicks Sign In] --> B[NextAuth Route Handler]
  B --> C[OAuth Provider - GitHub/Google]
  C --> D[Callback with Token]
  D --> E[Session Created and Encrypted]
  E --> F[Session Cookie Set]
  F --> G[auth() Returns Session in Server Components]
  G --> H[useSession Returns Session in Client Components]
```

## End-to-End Practical

1. Install `next-auth@beta`.
2. Create `auth.ts` with GitHub provider configuration.
3. Add `app/api/auth/[...nextauth]/route.ts`.
4. Add `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` to `.env.local`.
5. Create a GitHub OAuth App at `github.com/settings/developers`.
6. Set callback URL to `http://localhost:3000/api/auth/callback/github`.
7. Add `AuthButton` to the layout and test sign in.
8. Read the session on a protected page.

## Hands-on Coding

### Example 1: Complete Auth Setup

```tsx
// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
});
```

### Example 2: Protected Dashboard Page

```tsx
// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div style={{ padding: "24px" }}>
      <h1>Dashboard</h1>
      <p>Welcome back, {session.user?.name}!</p>
      <img
        src={session.user?.image ?? ""}
        alt="avatar"
        style={{ borderRadius: "50%", width: "48px" }}
      />
    </div>
  );
}
```

### Example 3: Login Page

```tsx
// app/login/page.tsx
import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div style={{ padding: "48px", textAlign: "center" }}>
      <h1>Sign In</h1>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          style={{ padding: "12px 24px", fontSize: "16px" }}
        >
          Continue with GitHub
        </button>
      </form>
    </div>
  );
}
```

## Mini Exercise

Scenario:
Build a simple profile page that shows user info when signed in and a sign-in prompt when not.

Steps:

1. Set up NextAuth with GitHub provider.
2. Create a home page that reads the session with `auth()`.
3. If signed in, show the user's name, email, and avatar.
4. If not signed in, show a sign-in button.
5. Test both states in the browser.

Expected output:

- Signed-out state: displays a sign-in button
- Signed-in state: displays user name, email, and avatar image

## Assessment Quiz

### Quiz Questions

1. What file do you create to configure NextAuth in the App Router?
2. What does the `AUTH_SECRET` environment variable do?
3. How do you get the current session in a Server Component?
4. True or False: You need to create a database to use NextAuth with OAuth.
5. What is the purpose of `SessionProvider`?

### Quiz Answers

1. `auth.ts` at the project root, which exports `handlers`, `auth`, `signIn`, and `signOut`.
2. It is a random string used to encrypt and sign session tokens, preventing tampering.
3. Call `const session = await auth()` from your auth config file.
4. False. OAuth sessions are stored in encrypted cookies by default and do not require a database.
5. `SessionProvider` is a React context provider that enables the `useSession()` hook in Client Components.

## Task

- Install next-auth@beta and create auth.ts
- Set up a GitHub OAuth App and add credentials to .env.local
- Create the catch-all route handler
- Build a protected page that redirects unauthenticated users
- Add sign in and sign out buttons
- Complete the mini exercise

## Self Check

- You can set up NextAuth from scratch
- You can read sessions in Server Components with `auth()`
- You can protect pages with redirect for unauthenticated users
- You can add sign in and sign out actions
- You can answer at least 4 out of 5 quiz questions correctly

## Interview Questions and Answers

### Beginner

**Question:** What is NextAuth.js used for?

**Answer:** NextAuth.js is an authentication library for Next.js that handles login, logout, OAuth provider integrations, and session management with minimal configuration.

**Question:** How do you protect a page in Next.js using NextAuth?

**Answer:** Call `const session = await auth()` and if the session is null, redirect the user to the login page using `redirect("/login")`.

### Middle

**Question:** What is the difference between using `auth()` in a Server Component and `useSession()` in a Client Component?

**Answer:** `auth()` is an async function for Server Components that reads the session directly on the server with no network request. `useSession()` is a React hook for Client Components that reads session data from the `SessionProvider` context, which was populated on the server during page load.

**Question:** How does NextAuth handle sessions without a database?

**Answer:** NextAuth stores sessions in encrypted JWT cookies by default. The session data is signed with `AUTH_SECRET`, so it cannot be tampered with, and no database is needed unless you want to store sessions server-side.

### Advanced

**Question:** How would you add custom data to the session in NextAuth?

**Answer:** Use the `callbacks` option in the `NextAuth` config. Add a `jwt` callback to attach custom data to the token, and a `session` callback to expose that data on the session object. For example, you can add a user role from a database lookup and include it in the session.

**Question:** What is the security benefit of using `AUTH_SECRET`?

**Answer:** `AUTH_SECRET` is used to sign and encrypt session tokens (JWTs). Without it, anyone who obtained a session token could decode it or forge their own. The secret ensures only your server can create valid tokens, preventing session forgery and data tampering.

## Day 31 Outcome

- You can install and configure NextAuth.js in a Next.js App Router project
- You can authenticate users with OAuth providers like GitHub
- You can read sessions on the server and protect pages
- You are ready to learn specific OAuth providers in Day 32
