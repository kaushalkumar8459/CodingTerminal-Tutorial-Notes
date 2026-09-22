# Day 222 — Directives, Pipes and Shared UI Testing

## Learning Goal
Choose the smallest useful test environment for reusable Angular building blocks.

## Pipe
A pure salaryRange pipe can usually be tested directly.

~~~ts
expect(new SalaryRangePipe().transform(80000, 120000))
  .toBe('₹80K–₹120K');
~~~

## Directive
A focusInvalid directive depends on Angular rendering and a real element. Test it with a small host component and verify the observable focus behavior.

## Shared UI
For AppButtonComponent, test:
- label rendering
- disabled behavior
- click contract
- accessible button semantics

Do not assert internal CSS classes unless they are deliberately part of the public contract.

## Component Harnesses
For Angular Material or shared components that provide a supported harness, use the harness for stable interaction instead of depending on internal DOM structure.

## Exercise
Test one pipe, one directive and one reusable button.

## Common Mistakes
- Using a full application test for a pure pipe.
- Testing private directive methods.
- Coupling Material tests to internal DOM.
- Duplicating the same shared-component tests in every feature.

## Interview Questions
1. When is a plain unit test enough for a pipe?
2. Why use a host for a directive?
3. What problem do component harnesses solve?

## Expected Outcome
You can test reusable Angular pieces independently and through realistic composition when required.
