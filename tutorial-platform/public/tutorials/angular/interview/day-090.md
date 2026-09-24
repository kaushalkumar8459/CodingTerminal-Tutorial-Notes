# Day 90 Interview Questions — Why Angular Forms?

## Interview Goal
Explain **Why Angular Forms?**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why does Angular provide forms APIs?
**Expected Answer:** They provide structured ways to capture user input, validate it, track state, and integrate forms with application logic.

### 2. What is the difference between template-driven and reactive forms?
**Expected Answer:** Template-driven forms emphasize template configuration, while reactive forms define form structure and validation in TypeScript.

### 3. When are reactive forms useful?
**Expected Answer:** They are especially useful for complex, dynamic, or strongly controlled form workflows.

### 4. What does form state include?
**Expected Answer:** Values plus interaction and validation state such as touched, dirty, valid, pending, and errors.

### 5. Why is validation important?
**Expected Answer:** It provides immediate user feedback and prevents invalid client-side submissions, while the backend remains authoritative.

### 6. What is a common forms anti-pattern?
**Expected Answer:** Putting complex business logic directly into templates or treating UI validation as a replacement for backend validation.

### 7. How should form models be typed?
**Expected Answer:** Use explicit TypeScript models and appropriate Angular form types instead of any.

### 8. How do signals relate to forms?
**Expected Answer:** Signals can represent surrounding UI state, while Angular's established Reactive Forms APIs remain important for complex form control state.

### 9. JobHub scenario: build a job-application form with required resume and contact fields. What should you decide first?
**Expected Answer:** Choose the form approach and model the controls, validation rules, submission state, and server contract before implementing the UI.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular API could solve the problem?
- What is the ownership or lifecycle boundary?
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
Why Angular Forms?, Angular 21, standalone Angular, interview questions, JobHub
