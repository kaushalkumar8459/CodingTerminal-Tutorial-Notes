# Day 93 Interview Questions — Form Groups and Form State

## Interview Goal
Explain **Form Groups and Form State**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a FormGroup?
**Expected Answer:** It represents a collection of related controls and exposes aggregate value and validation state.

### 2. Why group controls?
**Expected Answer:** Grouping gives a form a structured model and lets related controls share validation and state.

### 3. What does a FormGroup value represent?
**Expected Answer:** It represents the current values of its registered controls, subject to Angular's form value rules.

### 4. What is the difference between form state and form value?
**Expected Answer:** Value is the data; state includes validity and interaction information such as touched, dirty, pending, and errors.

### 5. Why should form structure mirror the domain carefully?
**Expected Answer:** A clear structure makes validation, submission, and maintenance easier, but UI-specific structure should not be forced into backend models blindly.

### 6. What is a common mistake?
**Expected Answer:** Treating the form value as a complete trusted domain object without mapping or validation.

### 7. How should reset behavior be designed?
**Expected Answer:** Decide whether reset means returning to defaults, restoring saved data, or clearing the form, and implement that intent explicitly.

### 8. How would you test a FormGroup?
**Expected Answer:** Verify control values, aggregate validity, validation errors, and state transitions.

### 9. JobHub scenario: an application form has personal, experience, and availability sections. What structure fits?
**Expected Answer:** Use nested groups to represent meaningful sections while keeping the submitted domain model explicit.

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
Form Groups and Form State, Angular 21, standalone Angular, interview questions, JobHub
