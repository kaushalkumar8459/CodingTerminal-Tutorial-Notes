# Day 213 — Why Angular Testing, Vitest and Test Strategy

## Learning Goal
Understand Angular testing levels and create the first meaningful Vitest tests.

## Scenario
JobHub needs confidence that salary filtering works without Angular or a browser.

~~~ts
import { describe, expect, it } from 'vitest';

describe('salary filter', () => {
  it('keeps jobs that meet the minimum salary', () => {
    const jobs = [
      { title: 'Angular Developer', salary: 90000 },
      { title: 'Intern', salary: 30000 },
    ];
    const result = jobs.filter(job => job.salary >= 60000);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Angular Developer');
  });
});
~~~

## Choose the Smallest Useful Test
- Pure function: plain Vitest.
- Service with Angular DI: TestBed.
- Component: rendered DOM and public interaction.
- HTTP: HttpTestingController.
- Routing: RouterTestingHarness.
- Real browser behavior: browser/E2E testing.

## Strategy
Test business-critical behavior, failure paths, security-sensitive flows and reusable contracts. Do not chase coverage percentage without meaningful assertions.

## Exercise
Add tests for empty results and invalid salary input.

## Challenge
Identify three JobHub behaviors worth testing and one implementation detail that should not be tested.

## Interview Questions
1. Why does Angular use Vitest in new CLI projects?
2. When is a plain unit test better than TestBed?
3. What does behavior-focused testing mean?

## Expected Outcome
You can choose an appropriate Angular test level before writing the test.
