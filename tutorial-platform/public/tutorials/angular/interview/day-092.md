# Day 92 Interview Questions — Form Controls and Validation

## Interview Goal
Explain **Form Controls and Validation**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a form control?
**Expected Answer:** It represents the value and state of an individual user input.

### 2. What does required validation do?
**Expected Answer:** It marks a control invalid when its value does not satisfy the required constraint.

### 3. What is the difference between valid and invalid?
**Expected Answer:** Valid means the control satisfies its configured validators; invalid means one or more validation rules fail.

### 4. What do touched and dirty mean?
**Expected Answer:** Touched indicates interaction with the control; dirty indicates its value has changed from its initial state.

### 5. Why should validation messages be user-friendly?
**Expected Answer:** They should explain what the user needs to fix instead of exposing internal validator names.

### 6. What is a common validation mistake?
**Expected Answer:** Showing every error immediately or duplicating validation logic across templates and services.

### 7. Why is server validation still required?
**Expected Answer:** Client validation improves UX but cannot be trusted as the authoritative business rule.

### 8. How should custom validation be designed?
**Expected Answer:** Return Angular-compatible validation errors and keep the rule focused and testable.

### 9. JobHub scenario: salary must be positive and email must be valid. How should the UI handle failures?
**Expected Answer:** Attach appropriate validators, show useful messages at the right interaction state, and still validate the submission on the backend.

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
Form Controls and Validation, Angular 21, standalone Angular, interview questions, JobHub
