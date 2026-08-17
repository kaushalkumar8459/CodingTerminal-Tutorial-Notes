---
title: Middleware Basics
slug: day-029-middleware-basics
dayLabel: Day 29
level: Intermediate
estimatedMinutes: 30
order: 29
track: nextjs
---
---
title: Middleware Basics
slug: day-029-middleware-basics
dayLabel: Day 29
level: Intermediate
estimatedMinutes: 30
order: 29
track: nextjs
---
# Day 29 [Intermediate]: Middleware Basics

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
- [Day 29 Outcome](#day-29-outcome)

## Goal

Master Middleware Basics in Next.js and apply it effectively in real applications.

## Prerequisites

- Completed Day 28 of the Next.js track
- Understanding of core Next.js App Router concepts

## Explanation

Middleware Basics is a key Next.js concept that enables you to build efficient, scalable applications. Understanding how it works and when to use it will help you make better architectural decisions.

In the Next.js App Router, Middleware Basics integrates seamlessly with Server Components, route handlers, and the caching system. Mastering this topic will prepare you for more advanced patterns and real-world use cases.

The practical examples in this lesson use real TypeScript code that you can run in your own Next.js project immediately. Focus on understanding the underlying principles, not just copying code.

## Topic by Topic

### Topic 1: Core Concept

Theory:
Middleware Basics is built into the Next.js framework and works with the App Router's rendering model. The key is understanding when and why to use it.

Practical:
Start with the simplest possible implementation and add complexity only when needed.

Code Example:

`tsx
// app/example/page.tsx
export default async function ExamplePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Middleware Basics</h1>
      <p className="text-gray-600 mt-2">This page demonstrates Middleware Basics.</p>
    </div>
  )
}
`
**Explanation:**
This topic explains Core Concept in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Core Concept.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 2: Basic Implementation

Theory:
The basic implementation follows Next.js conventions and integrates with the file system routing. Each file has a specific purpose.

Practical:
Create the simplest working example first. Test it. Then add features incrementally.

Code Example:

`tsx
// Basic implementation pattern
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    feature: 'Middleware Basics',
    working: true 
  })
}
`
**Explanation:**
This topic explains Basic Implementation in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Basic Implementation.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 3: TypeScript Integration

Theory:
Next.js has excellent TypeScript support for all its APIs. Use proper types for route params, request/response objects, and component props.

Practical:
Always type your props, params, and data structures. TypeScript prevents many common bugs.

Code Example:

`tsx
// TypeScript types for Middleware Basics
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ filter?: string }>
}

export default async function TypedPage({ params, searchParams }: Props) {
  const { id } = await params
  const { filter } = await searchParams
  return <div>ID: {id}, Filter: {filter}</div>
}
`
**Explanation:**
This topic explains TypeScript Integration in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind TypeScript Integration.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 4: Error Handling

Theory:
Always handle errors gracefully. Use try/catch in Server Components and appropriate HTTP status codes in Route Handlers.

Practical:
Test your error paths — what happens when the API is down? What if data is null?

Code Example:

`tsx
// Error handling pattern
import { notFound } from 'next/navigation'

export default async function PageWithErrorHandling({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await fetchData(id)
    if (!data) notFound()
    return <div>{data.name}</div>
  } catch (error) {
    throw new Error('Failed to load data: ' + (error as Error).message)
  }
}

async function fetchData(id: string) {
  return id === 'valid' ? { name: 'Valid Item' } : null
}
`
**Explanation:**
This topic explains Error Handling in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Error Handling.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 5: Performance Considerations

Theory:
Every Next.js feature has performance implications. Understand when a feature adds overhead vs when it saves computation.

Practical:
Profile your pages using Next.js build output and browser DevTools to measure the impact.

Code Example:

`tsx
// Measure with the built-in performance API
export default async function PerformancePage() {
  const start = Date.now()
  const data = await expensiveOperation()
  const elapsed = Date.now() - start
  
  return (
    <div>
      <p>Data loaded in {elapsed}ms</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

async function expensiveOperation() {
  await new Promise(r => setTimeout(r, 100))
  return { result: 'computed data' }
}
`
**Explanation:**
This topic explains Performance Considerations in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Performance Considerations.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 6: Testing Patterns

Theory:
Test your Next.js features with unit tests (logic functions), integration tests (API routes), and end-to-end tests (full user flows).

Practical:
Write tests for the pure functions in your data layer first. They are easiest to test and give the most confidence.

Code Example:

`tsx
// testable pure function
export function formatData(raw: { id: number; name: string; active: boolean }[]) {
  return raw
    .filter(item => item.active)
    .map(item => ({ id: item.id, label: item.name }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// test
// expect(formatData([{id:1,name:'B',active:true},{id:2,name:'A',active:false}]))
//   .toEqual([{id:1,label:'B'}])
`
**Explanation:**
This topic explains Testing Patterns in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Testing Patterns.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 7: Integration with Other Features

Theory:
Middleware Basics works best when combined with other Next.js features. Think holistically about your data flow and rendering strategy.

Practical:
Map out which features you need before writing code: authentication, caching, validation, etc.

Code Example:

`tsx
// Integration example
import { Suspense } from 'react'
import { cookies } from 'next/headers'

export default async function IntegrationPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  return (
    <div>
      <header>
        <p>{token ? 'Logged in' : 'Not logged in'}</p>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <DataSection />
      </Suspense>
    </div>
  )
}

async function DataSection() {
  await new Promise(r => setTimeout(r, 500))
  return <p>Data loaded!</p>
}
`
**Explanation:**
This topic explains Integration with Other Features in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Integration with Other Features.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


### Topic 8: Advanced Patterns

Theory:
Once you master the basics, advanced patterns unlock new capabilities: composition, abstraction, and optimization techniques.

Practical:
Refactor your working code to be more reusable. Extract common patterns into utility functions or custom hooks.

Code Example:

`tsx
// Advanced composition pattern
async function withAuth<T>(
  handler: (userId: string) => Promise<T>
): Promise<T | null> {
  const cookieStore = await (await import('next/headers')).cookies()
  const userId = cookieStore.get('user-id')?.value
  if (!userId) return null
  return handler(userId)
}

export default async function AdvancedPage() {
  const data = await withAuth(async (userId) => {
    return { userId, role: 'admin' }
  })
  if (!data) return <p>Not authenticated</p>
  return <p>Welcome, {data.userId}</p>
}
`
**Explanation:**
This topic explains Advanced Patterns in practical Next.js terms so you can build correct routing, rendering, and data flow patterns in real applications.

**Key Points:**
- Understand the core concept behind Advanced Patterns.
- Apply it with the right Next.js feature and defaults.
- Watch for common mistakes that affect performance, SEO, or maintainability.


## Key Concepts

- **Middleware Basics**: The core Next.js feature covered in this lesson with its unique capabilities.
- **Server Component**: Default component type in App Router that runs on the server.
- **Client Component**: Component marked with use client that runs in the browser.
- **Route Handler**: API endpoint defined in route.ts files.
- **Caching**: Next.js multi-layer caching system for optimal performance.
- **TypeScript**: Static typing for better developer experience and fewer bugs.
- **Error Boundary**: error.tsx file for graceful error handling per route segment.
- **Streaming**: Sending HTML incrementally using React Suspense.

## Visual Concept Map

`mermaid
flowchart TD
  A[Middleware Basics] --> B[Server Side]
  A --> C[Client Side]
  B --> D[Server Components]
  B --> E[Route Handlers]
  C --> F[Client Components]
  C --> G[Browser APIs]
  D --> H[Data Fetching]
  E --> I[API Endpoints]
  F --> J[Hooks and Events]
  H --> K[Rendering Strategy]
  K --> L[SSG Static]
  K --> M[SSR Dynamic]
  K --> N[ISR Incremental]
`

## End-to-End Practical

1. Understand the core concept of Middleware Basics through the examples above.
2. Create a simple implementation in your Next.js project.
3. Add TypeScript types to all props and data structures.
4. Test the happy path: does it work as expected?
5. Test the error path: what happens when data is missing?
6. Review the build output to understand the rendering strategy.
7. Check the browser Network tab to confirm the expected behavior.

## Hands-on Coding

### Example 1: Basic Setup

`tsx
// app/middleware-29-basics/page.tsx
export default async function BasicPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Middleware Basics</h1>
      <p className="text-gray-600">
        This demonstrates the basic usage of Middleware Basics in Next.js.
      </p>
    </div>
  )
}
`

### Example 2: With Data Fetching

`tsx
// Fetch and display data
async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!res.ok) throw new Error('Fetch failed')
  return res.json()
}

export default async function WithDataPage() {
  const posts = await getData()
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Middleware Basics — With Data</h1>
      <ul className="space-y-3">
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="font-medium capitalize">{post.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}
`

### Example 3: Complete Feature Implementation

`tsx
// Full implementation with types, error handling, and loading states
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Middleware Basics',
  description: 'Learn Middleware Basics in Next.js',
}

type Item = { id: number; title: string; status: 'active' | 'inactive' }

async function getItems(): Promise<Item[]> {
  await new Promise(r => setTimeout(r, 300))
  return [
    { id: 1, title: 'First Item', status: 'active' },
    { id: 2, title: 'Second Item', status: 'active' },
    { id: 3, title: 'Third Item', status: 'inactive' },
  ]
}

async function ItemList() {
  const items = await getItems()
  const active = items.filter(i => i.status === 'active')
  return (
    <div className="space-y-3">
      {active.map(item => (
        <div key={item.id} className="flex items-center gap-3 bg-white border rounded-lg p-4">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-medium">{item.title}</span>
        </div>
      ))}
    </div>
  )
}

export default function CompleteFeaturePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Middleware Basics</h1>
      <Suspense fallback={<div className="h-32 bg-gray-100 rounded-lg animate-pulse" />}>
        <ItemList />
      </Suspense>
    </div>
  )
}
`

## Mini Exercise

Scenario:
Apply Middleware Basics to a real-world use case in your existing Next.js project.

Steps:
1. Identify a page or component that would benefit from Middleware Basics.
2. Implement the feature following the patterns from this lesson.
3. Add proper TypeScript types.
4. Test both the success and error paths.
5. Check the browser DevTools to confirm the expected behavior.

Expected output:
- The feature works correctly with real data.
- TypeScript has no errors.
- Both success and error cases are handled gracefully.

## Assessment Quiz

### Quiz Questions

1. What is the primary purpose of Middleware Basics in Next.js?
2. How does Middleware Basics integrate with the App Router?
3. What TypeScript types should you use with Middleware Basics?
4. How do you handle errors when using Middleware Basics?
5. What are the performance implications of Middleware Basics?

### Quiz Answers

1. Middleware Basics enables specific functionality in Next.js applications, improving developer experience and application capabilities.
2. It integrates through file conventions, special exports, or API calls within the App Router structure.
3. Use the types provided by Next.js (imported from 'next') plus your own domain types for data structures.
4. Use try/catch blocks in Server Components, the error.tsx file for route-level errors, and appropriate HTTP status codes in Route Handlers.
5. Performance varies by implementation. Server-side operations reduce client bundle size; client-side operations enable interactivity. Profile and measure to confirm.

## Task

- Implement Middleware Basics in a new page in your project.
- Add comprehensive TypeScript types.
- Create an error.tsx for the route segment.
- Add a loading.tsx skeleton.
- Write at least one pure function from the data layer and note how it could be tested.

## Self Check

- Can you explain Middleware Basics in simple terms?
- Do you have TypeScript types for all your data?
- Have you tested both success and error cases?
- Is your implementation as simple as possible?
- Could a teammate understand your code without explanation?

## Interview Questions and Answers

### Beginner

**Question:** What is Middleware Basics in Next.js?
**Answer:** Middleware Basics is a Next.js feature that provides specific capabilities within the App Router. It follows Next.js conventions and integrates with the server/client component model.

**Question:** When should you use Middleware Basics?
**Answer:** Use it when you need its specific capabilities — not every page needs every feature. Choose the right tool for the job based on your data requirements and user experience goals.

### Middle

**Question:** How does Middleware Basics affect the rendering strategy?
**Answer:** It can trigger dynamic rendering (SSR) if it accesses request-specific data like headers or cookies. Pure computations remain static.

**Question:** How do you type Middleware Basics properly in TypeScript?
**Answer:** Import types from 'next' and 'next/server'. Define your own types for domain data. Use generic types when building reusable utilities.

### Advanced

**Question:** How would you optimize Middleware Basics for a high-traffic production application?
**Answer:** Use appropriate caching strategies (ISR, CDN headers), implement connection pooling for database calls, use edge functions for low-latency operations, and profile with real traffic to identify bottlenecks.

**Question:** What are common mistakes developers make with Middleware Basics?
**Answer:** Over-using client components when server components would work, not handling errors gracefully, skipping TypeScript types, and not measuring performance impact before shipping to production.

## Day 29 Outcome

- You understand Middleware Basics and its role in the Next.js ecosystem.
- You can implement it with proper TypeScript types.
- You handle errors and loading states correctly.
- You know the performance implications.
- You are ready for Day 30.