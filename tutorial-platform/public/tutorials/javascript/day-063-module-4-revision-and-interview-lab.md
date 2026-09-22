---
title: Module 4 Revision and Interview Lab
slug: day-063-module-4-revision-and-interview-lab
dayLabel: Day 63
level: Intermediate
estimatedMinutes: 40
order: 63
track: javascript
---

# Day 63 [Intermediate]: Module 4 Revision and Interview Lab

## Goal

Consolidate Module 4's advanced topics — scope, hoisting, closures, `this`, and prototypes — through focused revision before moving into OOP in Module 5.

## Prerequisites

- Day 48–62 (all of Module 4)

## Explanation

Module 4 covered some of the trickiest, most conceptually dense JavaScript topics so far: scope and hoisting (how variables are set up before code runs), closures (functions "remembering" their birth scope), `this` (context-dependent, not fixed), and prototypes (the mechanism behind shared methods and inheritance). These ideas interconnect heavily — closures rely on lexical scope, prototype inheritance interacts with `this`, and hoisting explains behavior you'll keep encountering.

Today is a dedicated revision day: no new syntax, just making sure these interconnected ideas are genuinely solid before Module 5 builds classes directly on top of them.

## Topic by Topic

### Topic 1: Scope and hoisting revision

Theory:
Revisit the core distinctions: global vs function vs block scope, lexical scope, and how `var`/`let`/`const`/function declarations are each hoisted differently.

Practical:
Without looking anything up, explain: (1) why `let`/`const` are block-scoped but `var` is function-scoped, (2) what the Temporal Dead Zone is, (3) why function declarations can be called before they appear in a file, but function expressions cannot.

**Key Points:**

- If any of these three explanations felt shaky, revisit Day 48 (scope) and Day 49 (hoisting) specifically.
- These concepts explain WHY certain code behaves the way it does — they're not just trivia.
- Confidently understanding scope is a prerequisite for confidently understanding closures.

### Topic 2: Closures revision

Theory:
Revisit why closures work (lexical scope + functions being storable values) and their most common real-world uses.

Practical:
Without looking anything up, rebuild a simple `createCounter()` from scratch, and explain in your own words why each call to it produces an independent counter.

**Key Points:**

- Closures aren't a separate "feature" — they're a natural consequence of lexical scope combined with functions as values.
- Data privacy (Day 57), memoization (Day 54), and factory functions (Day 53) are the classic real-world closure use cases.
- If building `createCounter()` from memory felt hard, spend extra time re-reading Day 57 before continuing.

### Topic 3: `this` and function-context revision

Theory:
Revisit the rule "how a function is called determines `this`" for regular functions, and "arrow functions inherit `this` from their surrounding scope."

Practical:
Without looking anything up, explain why extracting a method into a standalone variable breaks its `this`, and how `.bind()` fixes it.

**Key Points:**

- `this` is one of the most commonly interview-tested JavaScript topics — being able to explain it clearly matters.
- If the Day 55 predict-the-output questions still feel confusing, revisit Day 58 before Module 5's classes (which rely heavily on correct `this` behavior).
- `.call()`/`.apply()`/`.bind()` (Day 59) are the standard tools for controlling `this` explicitly.

### Topic 4: Prototypes revision

Theory:
Revisit what a prototype is, how the prototype chain enables shared methods, and how constructor functions link instances to their prototype automatically.

Practical:
Without looking anything up, explain why `Array.prototype.map` is shared by every array, rather than each array having its own private copy.

**Key Points:**

- Prototypes are the mechanism BEHIND the classes you'll start building in Module 5 — `class` syntax is largely a cleaner way to write exactly this pattern.
- If prototype inheritance (Day 59/61) still feels unclear, that's completely normal — it becomes much clearer once you see the equivalent `class extends` syntax in Module 5.
- Understanding prototypes deeply now will make Module 5 feel like "the same ideas, nicer syntax," rather than something entirely new.

## Recap

- Scope/hoisting explain variable setup and lifetime; closures rely on lexical scope to "remember" outer variables.
- `this` depends on how a function is called (except for arrow functions, which inherit it lexically).
- Prototypes enable shared methods and inheritance — the exact mechanism classes will build on top of in Module 5.

## What's Next

Practice for today: `public/coding/JavaScript/day-063-module-4-interview-challenge.md` — 25 advanced interview questions covering all of Module 4. Day 64 begins Module 5 with an introduction to OOP.
