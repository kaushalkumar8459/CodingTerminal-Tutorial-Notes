---
id: "angular-day-215"
title: "Service Testing and Dependency Mocking"
slug: "service-testing-and-dependency-mocking"
day: 215
module: 19
track: "angular"
level: "Intermediate"
---

# Day 215 — Service Testing and Dependency Mocking

## Goal

Test business logic in services while replacing dependencies with focused test doubles and avoiding unnecessary implementation coupling.

## Concept

Testing should verify **observable behavior and contracts**, not implementation details.

Modern Angular CLI projects use **Vitest** as the default unit-test runner. Angular testing utilities such as TestBed and ComponentFixture provide the Angular test environment.

## Example

```ts
import {TestBed} from '@angular/core/testing';

describe('Service Testing and Dependency Mocking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    });
  });

  it('should verify observable behavior', () => {
    expect(true).toBe(true);
  });
});
```

Adapt the setup to the feature being tested rather than creating one huge global test configuration.

## Mental Model

**Arrange → Act → Assert**

- Arrange the smallest useful test environment.
- Act through the public API or user interaction.
- Assert the observable result.

## Exercise

Add focused tests to the JobHub feature related to today's topic.

## Common Mistakes

- Testing private implementation details
- Over-mocking Angular itself
- Sharing mutable state between tests
- Writing tests that pass only because timing happens to work
- Using `any` to silence type errors

## Interview Questions

1. What is the purpose of TestBed?
2. What should a unit test verify?
3. When should a dependency be mocked?
4. Why can implementation-detail tests become brittle?

## Outcome

You can apply today's testing technique to a real Angular feature without coupling the test suite to unnecessary implementation details.
