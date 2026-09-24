# Day 54 Interview Questions — Dynamic Component Rendering

## Interview Goal
Explain **Dynamic Component Rendering**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is dynamic component rendering?
**Expected Answer:** It creates or selects a component at runtime rather than hard-coding one component in the template.

### 2. When is dynamic rendering useful?
**Expected Answer:** For extensible UI such as dashboards, dialogs, plugin-like widgets, or configuration-driven sections.

### 3. What should determine which component is rendered?
**Expected Answer:** Prefer a trusted, typed application configuration mapped to known component definitions.

### 4. Why avoid arbitrary component names from backend data?
**Expected Answer:** It can create unsafe, fragile, and difficult-to-maintain runtime behavior.

### 5. How does Angular support dynamic components?
**Expected Answer:** Angular provides APIs such as ViewContainerRef and modern component creation patterns for programmatic rendering.

### 6. What should you consider when creating components dynamically?
**Expected Answer:** Lifecycle, inputs, outputs, cleanup, accessibility, performance, and ownership.

### 7. What is a common dynamic-component anti-pattern?
**Expected Answer:** Using dynamic rendering everywhere instead of ordinary template composition.

### 8. How should dynamically rendered components receive data?
**Expected Answer:** Use their defined component contract rather than mutating internal state or relying on global variables.

### 9. JobHub scenario: an admin dashboard chooses from approved widget types. What architecture fits?
**Expected Answer:** Use a typed registry of approved components and render only those supported widget types.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state or dependency?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the problem, where the responsibility belongs, and what the trade-offs are.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Dynamic Component Rendering, Angular 21, standalone components, interview questions, JobHub
