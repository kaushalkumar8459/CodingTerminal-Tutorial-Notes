---
title: Iterators and Generators
slug: day-023-iterators-and-generators
dayLabel: Day 23
level: Beginner
estimatedMinutes: 30
order: 23
track: python
---
# Day 023 [Beginner]: Iterators and Generators

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
- [Day 023 Outcome](#day-023-outcome)

## Goal

Understand how Python iterators and generators help process data lazily and efficiently.

## Prerequisites

- Day 022 completed
- Comfortable with loops and functions

## Explanation

Many Python features work by producing values one at a time instead of building everything at once. Iterators and generators make this style possible and help save memory for larger sequences.

## Topic by Topic

### Topic 1: What an Iterator Is

Theory:
An iterator is an object that returns one item at a time until there is nothing left.

Practical:
Lists, strings, and many Python objects can be iterated in a `for` loop.

Code Example:

```python
numbers = [1, 2, 3]
for number in numbers:
  print(number)
```

**Explanation:**
This topic explains What an Iterator Is in a practical Python context so you can write clear, reliable, and maintainable programs for real-world tasks.

**Key Points:**
- Understand the core idea behind What an Iterator Is.
- Apply the practical pattern with good readability and validation habits.
- Keep the solution maintainable, testable, and safe for production use where relevant.

### Topic 2: Using `iter()` and `next()`

Theory:
`iter()` creates an iterator and `next()` moves to the next value.

Practical:
This helps you understand what Python loops are doing behind the scenes.

Code Example:

```python
values = iter([10, 20, 30])
print(next(values))
```

**Explanation:**
This topic explains Using `iter()` and `next()` in a practical Python context so you can write clear, reliable, and maintainable programs for real-world tasks.

**Key Points:**
- Understand the core idea behind Using `iter()` and `next()`.
- Apply the practical pattern with good readability and validation habits.
- Keep the solution maintainable, testable, and safe for production use where relevant.

### Topic 3: What a Generator Is

Theory:
A generator is a simpler way to create iterators using `yield`.

Practical:
Use generators when values should be produced step by step.

Code Example:

```python
def count_up_to(limit):
  for number in range(1, limit + 1):
    yield number
```

**Explanation:**
This topic explains What a Generator Is in a practical Python context so you can write clear, reliable, and maintainable programs for real-world tasks.

**Key Points:**
- Understand the core idea behind What a Generator Is.
- Apply the practical pattern with good readability and validation habits.
- Keep the solution maintainable, testable, and safe for production use where relevant.

### Topic 4: Why Generators Save Memory

Theory:
Generators do not store the full result at once.

Practical:
This is useful when processing large files, many records, or long numeric ranges.

Code Example:

```python
numbers = (number * number for number in range(1000))
```

**Explanation:**
This topic explains Why Generators Save Memory in a practical Python context so you can write clear, reliable, and maintainable programs for real-world tasks.

**Key Points:**
- Understand the core idea behind Why Generators Save Memory.
- Apply the practical pattern with good readability and validation habits.
- Keep the solution maintainable, testable, and safe for production use where relevant.

### Topic 5: Generator Expressions

Theory:
Generator expressions look like list comprehensions but use parentheses.

Practical:
Use them when you want lazy evaluation instead of a full list in memory.

Code Example:

```python
squares = (number * number for number in range(5))
```

**Explanation:**
This topic explains Generator Expressions in a practical Python context so you can write clear, reliable, and maintainable programs for real-world tasks.

**Key Points:**
- Understand the core idea behind Generator Expressions.
- Apply the practical pattern with good readability and validation habits.
- Keep the solution maintainable, testable, and safe for production use where relevant.

### Topic 6: Choosing the Right Approach

Theory:
Lists are easier when you need all results immediately, while generators are better when values can be streamed.

Practical:
Choose based on readability, memory use, and how the data is consumed.

Code Example:

```python
result = [number for number in range(5)]
```

**Explanation:**
This topic explains Choosing the Right Approach in a practical Python context so you can write clear, reliable, and maintainable programs for real-world tasks.

**Key Points:**
- Understand the core idea behind Choosing the Right Approach.
- Apply the practical pattern with good readability and validation habits.
- Keep the solution maintainable, testable, and safe for production use where relevant.

## Key Concepts

- Iterators return values one at a time
- `iter()` and `next()` reveal iteration flow
- Generators use `yield` to produce values lazily
- Generator expressions avoid building full lists
- Lazy evaluation can reduce memory usage
- Choose lists or generators based on the use case

## Visual Concept Map

```mermaid
flowchart TD
  A[Sequence or Source] --> B[Iterator]
  B --> C[next() gives one value]
  A --> D[Generator]
  D --> E[yield values lazily]
  C --> F[Efficient Processing]
  E --> F
```

## End-to-End Practical

1. Iterate through a list normally.
2. Create an iterator with `iter()`.
3. Read values with `next()`.
4. Write one generator function.
5. Compare a list comprehension with a generator expression.

## Hands-on Coding

### Example 1: Case - Manual Iterator Use

Scenario:
You want to see item-by-item iteration directly.

```python
letters = iter(["a", "b", "c"])
print(next(letters))
print(next(letters))
```

### Example 2: Case - Number Generator

Scenario:
You want to produce numbers one at a time.

```python
def countdown(start):
  while start > 0:
    yield start
    start -= 1
```

### Example 3: Case - Lazy Square Values

Scenario:
You want square values without storing a big list immediately.

```python
squares = (number * number for number in range(10))
for value in squares:
  print(value)
```

## Mini Exercise

Scenario:
Write a generator function that yields even numbers from 2 to 20. Then loop through the generator and print each value.

Expected output:

- One generator function
- Use of `yield`
- All even values printed one by one

## Assessment Quiz

### Quiz Questions

1. What does an iterator do?
2. What keyword is used in a generator function?
3. True or False: A generator stores every result in memory immediately.
4. What is the role of `next()`?
5. When is a generator a better choice than a list?

### Quiz Answers

1. It returns values one at a time
2. `yield`
3. False
4. It gets the next value from an iterator
5. When values can be processed lazily and memory should be saved

## Task

- Use `iter()` and `next()` once
- Build one generator function
- Complete the mini exercise

## Self Check

- You can explain the difference between iterators and generators
- You can write a simple generator with `yield`
- You can choose a lazy approach when appropriate

## Interview Questions and Answers

### Beginner

**Question:** What is a generator in Python?

**Answer:** A generator is a function that yields values one at a time instead of returning them all at once.

**Question:** Why are generators useful?

**Answer:** They can process data lazily and often save memory.

### Middle

**Question:** What is the difference between a list comprehension and a generator expression?

**Answer:** A list comprehension builds a full list immediately, while a generator expression yields values lazily.

**Question:** Why should you learn `iter()` and `next()` even if you use `for` loops most of the time?

**Answer:** They help you understand how Python iteration works internally.

### Advanced

**Question:** Why do generators matter in large-scale data processing?

**Answer:** They allow streaming values without loading everything into memory.

**Question:** What is a common beginner mistake with generators?

**Answer:** Expecting a generator to behave like a reusable full list after it has already been consumed.

## Day 023 Outcome

- You can explain and use iterators and generators
- You can build lazy value-producing functions with `yield`
- You are ready for decorators basics on Day 024
