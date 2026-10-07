# Day 96 Interview Questions — FormBuilder and Non-Nullable Forms

## Interview Goal
Explain **FormBuilder and Non-Nullable Forms**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is FormBuilder?
**Expected Answer:** A helper service for creating Angular form controls, groups, and arrays with concise configuration.

### 2. Why use non-nullable controls?
**Expected Answer:** They make the form model clearer when a control should always contain its defined value type rather than null.

### 3. What does nonNullable help with?
**Expected Answer:** It provides stronger typing and reset behavior for controls that should not reset to null.

### 4. Why is typed forms important?
**Expected Answer:** It catches mismatched form values and improves autocomplete and refactoring safety.

### 5. Should every control be non-nullable?
**Expected Answer:** No. Nullable values can be meaningful when the domain or UI genuinely represents absence.

### 6. What is a common typing mistake?
**Expected Answer:** Using broad types or any instead of modeling the actual control value.

### 7. How should FormBuilder be injected?
**Expected Answer:** In modern Angular, use inject(FormBuilder) or an appropriate constructor injection pattern consistent with the project's style.

### 8. How would you test typed form construction?
**Expected Answer:** Verify the initial values, validators, reset behavior, and important type-driven contracts at compile time and runtime.

### 9. JobHub scenario: job title must always be a string, while an optional salary may be absent. How might the controls differ?
**Expected Answer:** Use a non-nullable title control and an appropriately nullable or optional salary representation.

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
FormBuilder and Non-Nullable Forms, Angular 21, standalone Angular, interview questions, JobHub
