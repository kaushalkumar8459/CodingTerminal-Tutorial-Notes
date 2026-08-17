---
title: Mini Project - Blog App
slug: day-048-mini-project-blog-app
dayLabel: Day 48
level: Beginner
estimatedMinutes: 45
order: 48
track: react
---
---
title: Mini Project - Blog App
slug: day-048-mini-project-blog-app
dayLabel: Day 48
level: Beginner
estimatedMinutes: 45
order: 48
track: react
---
# Day 48 [Intermediate to Advanced]: Mini Project - Blog App

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
- [Day 48 Outcome](#day-48-outcome)

## Goal

Build a routing-focused blog app with list, category filtering, and dynamic detail pages.

## Prerequisites

- Day 47 completed
- Route params, nested routes, and navigation patterns

## Explanation

This mini project combines multiple routing concepts in one feature-rich flow: blog list, category paths, post details, and not-found handling.

## Topic by Topic

### Topic 1: Blog Route Structure

Theory:
Define list route, details route, and optional category route.

Practical:
Create `/blog`, `/blog/:postId`, `/blog/category/:slug`.

Code Example:

```jsx
<Route path="/blog/:postId" element={<PostDetails />} />
```

**Explanation:** This topic explains Blog Route Structure in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Blog Route Structure.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 2: Post List with Links

Theory:
List view should link each item to dynamic detail route.

Practical:
Generate links from posts array.

Code Example:

```jsx
<Link to={`/blog/${post.id}`}>{post.title}</Link>
```

**Explanation:** This topic explains Post List with Links in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Post List with Links.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 3: Category-based Filtering via URL

Theory:
Category in URL allows shareable filtered views.

Practical:
Read category slug from params and filter list.

Code Example:

```jsx
const { slug } = useParams();
```

**Explanation:** This topic explains Category-based Filtering via URL in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Category-based Filtering via URL.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 4: Detail Page and Fallback

Theory:
Detail pages must handle missing IDs gracefully.

Practical:
Show post not found for invalid params.

Code Example:

```jsx
if (!post) return <p>Post not found</p>;
```

**Explanation:** This topic explains Detail Page and Fallback in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Detail Page and Fallback.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 5: Optional Route-level Lazy Loading

Theory:
Blog details page can be lazy loaded for optimization.

Practical:
Use lazy+Suspense for detail view.

Code Example:

```jsx
const PostDetails = lazy(() => import("./PostDetails"));
```

**Explanation:** This topic explains Optional Route-level Lazy Loading in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Optional Route-level Lazy Loading.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 6: Detail Page Loading and Error States

Theory:
Dynamic detail routes should clearly represent loading, error, and not-found states for real API workflows.

Practical:
Add dedicated UI branches so post pages never appear blank during fetch failures.

Code Example:

```jsx
if (isLoading) return <p>Loading post...</p>;
```

**Explanation:** This topic explains Detail Page Loading and Error States in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Detail Page Loading and Error States.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

## Key Concepts

- Integrated route architecture
- Dynamic detail pages
- URL-driven category filters
- No-match post handling
- Routing + performance integration
- Route-data state resilience

## Visual Concept Map

```mermaid
flowchart TD
		A[/blog] --> B[Post List]
		B --> C[/blog/:postId]
		B --> D[/blog/category/:slug]
		C --> E[Post Details]
		D --> F[Filtered List]
```

## End-to-End Practical

1. Define blog route map.
2. Render post list with detail links.
3. Add category filter routes.
4. Build post details using params.
5. Add not-found handling for missing posts.

## Hands-on Coding

### Example 1: Case - Blog List and Details Routing

Scenario:
An editorial portal should navigate from post list to post detail by id.

```jsx
import { Link, Route, Routes, useParams } from "react-router-dom";

const posts = [
  { id: 1, title: "React Basics", category: "react" },
  { id: 2, title: "Routing Tips", category: "routing" },
];

function BlogList() {
  return posts.map((post) => (
    <p key={post.id}>
      <Link to={`/blog/${post.id}`}>{post.title}</Link>
    </p>
  ));
}

function PostDetails() {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === Number(postId));
  if (!post) return <p>Post not found</p>;
  return <h3>{post.title}</h3>;
}
```

### Example 2: Case - Category Route Filtering

Scenario:
Readers should view posts by category directly from URL.

```jsx
import { useParams } from "react-router-dom";

function CategoryPage() {
  const { slug } = useParams();
  const filtered = posts.filter((p) => p.category === slug);
  if (filtered.length === 0) return <p>No posts in this category</p>;
  return filtered.map((p) => <p key={p.id}>{p.title}</p>);
}
```

### Example 3: Case - Blog Route Configuration

Scenario:
A content platform organizes list, category, and details pages under blog routes.

```jsx
<Routes>
  <Route path="/blog" element={<BlogList />} />
  <Route path="/blog/category/:slug" element={<CategoryPage />} />
  <Route path="/blog/:postId" element={<PostDetails />} />
  <Route path="*" element={<p>404 - Page not found</p>} />
</Routes>
```

## Mini Exercise

Scenario:
You are building a knowledge hub.

Implement pages for articles list, article detail by id, and topic filter by slug. Add 404 fallback.

Expected output:

- List links open correct detail routes
- Topic URL renders filtered articles
- Invalid article id or route shows fallback message

## Assessment Quiz

### Quiz Questions

1. Why is route parameter useful in blog details page?
2. What is benefit of category filter in URL?
3. True or False: Detail page should crash when post id is invalid.
4. Which hook reads category slug from route?
5. Why include wildcard route in blog app?

### Quiz Answers

1. One page template can render many posts dynamically
2. Shareable and bookmarkable filtered views
3. False
4. useParams
5. Graceful handling of unknown URLs

## Task

- Build routing-heavy blog mini project
- Add list, detail, category and fallback routes
- Complete mini exercise

## Self Check

- You can combine multiple routing concepts in one app
- You can handle dynamic and filtered routes safely
- You can answer at least 4 out of 5 quiz questions correctly

## Interview Questions and Answers

### Beginner

**Question:** Which route pattern is used for blog detail by id?

**Answer:** `/blog/:postId`

**Question:** How do you navigate from list item to details page?

**Answer:** Use Link with dynamic id in `to` path.

### Middle

**Question:** Why return fallback UI for missing post id?

**Answer:** To handle invalid URLs safely and preserve user experience.

**Question:** How do category routes improve UX?

**Answer:** They provide direct, shareable filtered views.

### Advanced

**Question:** How can you optimize blog details for large content sets?

**Answer:** Lazy-load details component and fetch post data by id on demand.

**Question:** How can route structure support future CMS growth?

**Answer:** Use modular nested routes by domain and consistent slug/id conventions.

## Day 48 Outcome

- You can deliver a complete routing-oriented mini project
- You can handle detail and category navigation patterns effectively
- You are ready to evaluate quality and improvements in Day 49

