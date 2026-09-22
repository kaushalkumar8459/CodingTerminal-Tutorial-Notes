# Day 94 Interview Questions — Reactive Forms Fundamentals

## Interview Goal
Explain **Reactive Forms Fundamentals**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What are reactive forms?
**Expected Answer:** A model-driven Angular forms approach where form controls and validation are defined primarily in TypeScript.

### 2. Why are reactive forms useful?
**Expected Answer:** They provide explicit form structure, strong programmatic control, and support complex and dynamic forms.

### 3. What is the main difference from template-driven forms?
**Expected Answer:** Reactive forms define the form model in code, while template-driven forms derive more of the model from template directives.

### 4. Why are reactive forms good for dynamic forms?
**Expected Answer:** Controls can be added, removed, and validated programmatically.

### 5. What is a common reactive-forms anti-pattern?
**Expected Answer:** Creating a very large unstructured form model without separating reusable form sections or domain responsibilities.

### 6. How should form submission work?
**Expected Answer:** Validate the form, map the value to an explicit request model, handle loading/errors, and submit through a service boundary.

### 7. How should async validation be handled?
**Expected Answer:** Use Angular's async validation mechanisms when validation genuinely depends on asynchronous external data.

### 8. How would you test a reactive form?
**Expected Answer:** Test validators, state transitions, value mapping, submission behavior, and error handling.

### 9. JobHub scenario: recruiter job creation has conditional fields and many validators. Why might reactive forms fit?
**Expected Answer:** The form needs explicit programmatic control, dynamic controls, and complex validation rules.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular API could solve the problem?
- What is the ownership or validation boundary?
- How would you test it?
- What changes at enterprise scale?

## Common Interview Trap
Do not memorize syntax alone. Explain **why**, **when**, and **where** the Angular feature should be used.

## Self-Assessment
- [ ] I can explain the topic without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain a trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Reactive Forms Fundamentals, Angular 21, standalone Angular, interview questions, JobHub
