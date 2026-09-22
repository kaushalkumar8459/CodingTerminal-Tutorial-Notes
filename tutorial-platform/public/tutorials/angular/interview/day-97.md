# Day 97 Interview Questions — Validators and Custom Validation

## Interview Goal
Explain **Validators and Custom Validation**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a synchronous validator?
**Expected Answer:** A function that evaluates a control or group value immediately and returns validation errors or null.

### 2. What is an async validator?
**Expected Answer:** A validator that performs asynchronous validation and resolves with validation errors or null.

### 3. Where should cross-field validation live?
**Expected Answer:** At a common parent group when the rule depends on multiple controls.

### 4. Why return null from a valid validator?
**Expected Answer:** Angular interprets null as no validation errors.

### 5. What makes a good custom validator?
**Expected Answer:** It should have one clear rule, return a predictable error shape, avoid side effects, and be easy to test.

### 6. What is a common validator mistake?
**Expected Answer:** Embedding API calls or unrelated business workflows inside synchronous validators.

### 7. How should validation errors be mapped to UI messages?
**Expected Answer:** Use stable error keys and map them to human-readable messages at the presentation boundary.

### 8. How would you test a custom validator?
**Expected Answer:** Test valid values, invalid values, edge cases, and the exact error shape.

### 9. JobHub scenario: end date must not be before start date. What kind of validator is appropriate?
**Expected Answer:** A group-level cross-field validator comparing the two date controls.

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
Validators and Custom Validation, Angular 21, standalone Angular, interview questions, JobHub
