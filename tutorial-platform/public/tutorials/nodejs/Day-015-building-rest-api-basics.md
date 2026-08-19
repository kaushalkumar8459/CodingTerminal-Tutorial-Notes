---
title: Building REST API Basics
slug: day-015-building-rest-api-basics
dayLabel: Day 15
level: Beginner
estimatedMinutes: 30
order: 15
track: nodejs
---
# Day 015 [Beginner]: Building REST API Basics

## Index

- Goal
- Prerequisites
- Explanation
- Topic by Topic
- Key Concepts
- Visual Concept Map
- End-to-End Practical
- Hands-on Coding
- Mini Exercise
- Assessment Quiz
- Task
- Self Check
- Interview Questions and Answers
- Day Outcome

## Goal

Design and implement a beginner-friendly REST API with proper resource modeling, methods, and status codes.

## Prerequisites

- Day 014 HTTP module basics
- Basic JSON and CRUD understanding

## Explanation

REST APIs are resource-based and method-driven. A clean REST structure makes APIs predictable, testable, and easier for frontend/mobile consumers.

## Topic by Topic

### Topic 1: Resource-first Design

Theory:
Model nouns as resources (users, products, orders).

Practical:
Define URI conventions with plural naming.

**Explanation:** Resource-first design helps APIs stay clear because routes represent business entities and actions are expressed through HTTP semantics.

**Key Points:**

- Design around resources, not arbitrary endpoints.
- Keep route naming meaningful.
- Resource thinking scales better as the API grows.

### Topic 2: HTTP Methods and CRUD Mapping

Theory:
GET, POST, PUT/PATCH, DELETE map naturally to CRUD actions.
PUT usually replaces full resource, PATCH updates part of resource.

Practical:
Implement simple products resource methods.

**Explanation:** HTTP methods and CRUD mapping connect API behavior to widely understood web conventions.

**Key Points:**

- Match methods to intended action.
- Use HTTP semantics consistently.
- Consistency improves API usability.

### Topic 3: Status Codes and Error Contract

Theory:
Use consistent status codes and response shapes.

Practical:
Return 201 for create, 404 for missing resource, 400 for validation errors.

**Explanation:** Status codes and error contracts matter because clients need predictable success and failure responses.

**Key Points:**

- Return meaningful status codes.
- Keep error shapes consistent.
- Clear contracts reduce frontend confusion.

### Topic 4: Query Parameters and Filtering

Theory:
Query params refine collections without changing routes.

Practical:
Add filtering by category and price range.

**Explanation:** Query parameters and filtering help APIs support flexible data retrieval without creating too many narrowly specialized routes.

**Key Points:**

- Use queries for filtering and lookup options.
- Keep parameter behavior explicit.
- Well-designed query APIs stay easier to extend.

### Topic 6: Pagination and Idempotency Basics

Theory:
List APIs should support pagination, and repeated same requests should behave predictably.

Practical:
Add `page` and `limit` params for list responses and return 204 for successful delete without body.

**Explanation:** Pagination and idempotency basics improve API safety and scalability, especially as data volume and repeated requests increase.

**Key Points:**

- Pagination supports large result sets.
- Idempotency reduces repeated-request surprises.
- These concepts matter early in API design.

### Topic 5: Versioning and Growth

Theory:
API versioning avoids breaking clients.

Practical:
Use route prefix like `/api/v1`.

## Method Mapping Table

| Method | Route                | Purpose         | Typical Success Status |
| ------ | -------------------- | --------------- | ---------------------- |
| GET    | /api/v1/products     | List products   | 200                    |
| GET    | /api/v1/products/:id | Get one product | 200                    |
| POST   | /api/v1/products     | Create product  | 201                    |
| PATCH  | /api/v1/products/:id | Partial update  | 200                    |
| DELETE | /api/v1/products/:id | Remove product  | 204                    |

**Explanation:** Versioning and growth planning keep early APIs from becoming difficult to evolve once more clients depend on them.

**Key Points:**

- Think about API growth from the start.
- Avoid designs that block future changes.
- Versioning strategy should be deliberate.

## Key Concepts

- Resource-oriented URL design
- Method-to-action consistency
- PUT vs PATCH intent clarity
- Status code correctness
- Standard API response contracts
- Pagination-ready list endpoints
- Idempotent API behavior basics
- Evolvable route versioning

## Visual Concept Map

```mermaid
flowchart TD
  A[Client] --> B[/api/v1/products]
  B --> C{HTTP Method}
  C --> D[GET List]
  C --> E[POST Create]
  C --> F[PATCH Update]
  C --> G[DELETE Remove]
```

## End-to-End Practical

1. Create in-memory product collection.
2. Add REST routes for CRUD.
3. Add validation for create/update body.
4. Add query filter for category.
5. Return consistent response shape.

## Hands-on Coding

### Example 1: Case - REST Route Skeleton

Scenario:
Startup needs first products API quickly.

```js
const express = require("express");
const app = express();
app.use(express.json());

const products = [{ id: 1, name: "Laptop", category: "electronics" }];

app.get("/api/v1/products", (req, res) => {
  res.status(200).json({ success: true, data: products });
});

app.listen(3000, () => console.log("API on 3000"));
```

### Example 2: Case - Create with Validation

Scenario:
POST should reject incomplete data.

```js
app.post("/api/v1/products", (req, res) => {
  const { name, category } = req.body;
  if (!name || !category) {
    return res
      .status(400)
      .json({ success: false, message: "name and category required" });
  }

  const item = { id: Date.now(), name, category };
  products.push(item);
  res.status(201).json({ success: true, data: item });
});
```

### Example 3: Case - Filtering and Not-found Handling

Scenario:
Consumers need category filter and product details by id.

```js
app.get("/api/v1/products/:id", (req, res) => {
  const item = products.find((p) => p.id === Number(req.params.id));
  if (!item)
    return res
      .status(404)
      .json({ success: false, message: "product not found" });
  res.json({ success: true, data: item });
});

app.get("/api/v1/products", (req, res) => {
  const { category } = req.query;
  const data = category
    ? products.filter((p) => p.category === category)
    : products;
  res.json({ success: true, data });
});
```

### Example 4: Case - Pagination on List Route

Scenario:
Client needs paged product list for faster UI loading.

```js
app.get("/api/v1/products", (req, res) => {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.max(1, Number(req.query.limit || 10));
  const start = (page - 1) * limit;
  const data = products.slice(start, start + limit);

  res.json({ success: true, page, limit, data });
});
```

### Example 5: Case - Delete with 204

Scenario:
Delete succeeds and response should have no body.

```js
app.delete("/api/v1/products/:id", (req, res) => {
  // Assume delete success
  res.status(204).end();
});
```

## Mini Exercise

Scenario:
Build products REST API with list/get/create/update/delete and category filter.

Expected output:

- Full CRUD-like route coverage
- Validation + not-found handling
- Consistent JSON response format

## Assessment Quiz

### Quiz Questions

1. Why is resource naming important in REST design?
2. Which status code should successful POST usually return?
3. True or False: Skipping edge-case handling is acceptable in production.
4. Why should API responses use a consistent shape?
5. What is a practical reason to add pagination early?

### Quiz Answers

1. It keeps API semantics clear and predictable for clients.
2. 201 Created.
3. False.
4. Clients can parse errors and data reliably across endpoints.
5. It keeps list APIs fast and prevents sending huge payloads.

## Task

- Implement one REST resource with CRUD routes
- Add validation, 404 behavior, and query filter
- Complete mini exercise and quiz.

## Self Check

- You can design beginner-level REST APIs with confidence.
- You can map business actions to clean HTTP contracts.
- You can answer at least 4 out of 5 quiz questions.

## Interview Questions and Answers

### Beginner

Question: What makes an API RESTful at beginner level?

Answer: Resource-based URLs, method consistency, and correct status codes.

### Middle

Question: Why not put actions in routes like /createProduct?

Answer: REST prefers nouns and HTTP methods for clean, standard semantics.

### Advanced

Question: What tradeoff appears when strict REST standards are enforced?

Answer: Better consistency long-term, but slightly more design effort upfront.

## Day 015 Outcome

- You can create and test foundational REST APIs
- You can apply status codes, validation, and route design best practices
- You are ready for framework-based API scaling in upcoming days
