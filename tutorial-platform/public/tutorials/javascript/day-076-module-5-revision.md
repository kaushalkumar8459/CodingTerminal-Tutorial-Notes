---
title: Module 5 Revision - OOP Interview Prep
slug: day-076-module-5-revision
dayLabel: Day 76
level: Intermediate
estimatedMinutes: 40
order: 76
track: javascript
---

# Day 76 [Intermediate]: Module 5 Revision — OOP Interview Prep

## Goal

Consolidate all of Module 5 — classes, encapsulation, inheritance, polymorphism, abstraction, composition, and collections — before moving into asynchronous JavaScript.

## Prerequisites

- Day 64–75 (all of Module 5)

## Explanation

Module 5 covered the four classic OOP principles (encapsulation, inheritance, polymorphism, abstraction), composition as a flexible alternative/complement to inheritance, and the `Set`/`Map`/`WeakMap`/`WeakSet` collection types. Today is a dedicated revision day — no new syntax, just making sure these ideas (and how they relate to each other) are genuinely solid before Module 6's asynchronous JavaScript, which will use classes and objects extensively without re-explaining them.

## Topic by Topic

### Topic 1: OOP interview questions — the four pillars

Theory:
Revisit the four classic OOP principles and be able to explain and demonstrate each with a simple example.

Practical:
Without looking anything up, explain and give a one-line code example of: (1) encapsulation, (2) inheritance, (3) polymorphism, (4) abstraction.

**Key Points:**

- Encapsulation: bundling data with controlled access (private fields + getters/setters).
- Inheritance: `class Child extends Parent`, sharing structure/behavior.
- Polymorphism: different subclasses responding to the same method call, each in their own way.
- Abstraction: exposing a simple interface while hiding implementation complexity.

### Topic 2: Prototype vs class — the connection

Theory:
Revisit how `class` syntax relates to the prototype system from Module 4 — this connection is a very common interview question.

Practical:
Without looking anything up, explain: "Is `class` a completely new feature in JavaScript, or is it built on something that already existed?" and justify your answer with what you observed on Day 66 (`Object.getPrototypeOf()`).

**Key Points:**

- `class` is syntactic sugar over the constructor-function-plus-prototype pattern from Module 4.
- Class methods genuinely live on the class's `.prototype`.
- Understanding this connection demonstrates deeper JavaScript knowledge in interviews.

### Topic 3: Inheritance vs composition — the tradeoff

Theory:
Revisit "favor composition over inheritance" and be ready to justify when each is the right choice.

Practical:
Without looking anything up, describe one example where inheritance is clearly the right choice (an IS-A relationship), and one where composition is clearly the right choice (a HAS-A relationship).

**Key Points:**

- Inheritance fits genuine IS-A relationships; composition fits HAS-A/uses-A relationships.
- Composition tends to be more flexible for combining independent pieces of behavior.
- Real systems typically use both, applied where each fits naturally.

### Topic 4: Collections — when to use what

Theory:
Revisit `Set` vs array (uniqueness), `Map` vs plain object (key flexibility, size, order), and when `WeakMap`/`WeakSet` might matter.

Practical:
Without looking anything up, decide which collection fits each scenario: (1) storing unique tag names, (2) a lookup table keyed by object references, (3) a simple config with known string keys, (4) tracking "already processed" objects without leaking memory.

**Key Points:**

- `Set`: uniqueness. `Map`: flexible keys + reliable order + `.size`. Plain object: simple, known string-keyed data. `WeakMap`/`WeakSet`: object-keyed metadata that shouldn't prevent garbage collection.
- Being able to justify a collection choice (not just use it) is a genuine interview skill.
- This decision-making skill will keep coming up as you build larger, more realistic projects.

## Recap

- The four OOP pillars (encapsulation, inheritance, polymorphism, abstraction) each have a clear definition and a simple demonstrable example.
- `class` syntax builds directly on prototypes from Module 4 — not a separate mechanism.
- Choosing between inheritance/composition, and between `Set`/`Map`/object/`WeakMap`/`WeakSet`, is a deliberate design decision based on the specific relationship or data need.

## What's Next

Practice for today: `public/coding/JavaScript/day-076-module-5-assessment.md` — a mini Library Management System combining classes, inheritance, encapsulation, Map, and Set. Day 77 begins Module 6 with synchronous vs asynchronous JavaScript.
