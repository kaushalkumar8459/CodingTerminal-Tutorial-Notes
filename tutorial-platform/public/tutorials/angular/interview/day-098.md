# Day 98 Interview Questions — Dynamic and Conditional Form Controls

## Interview Goal
Explain **Dynamic and Conditional Form Controls**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a dynamic form control?
**Expected Answer:** A control whose existence, validators, or configuration changes based on runtime requirements.

### 2. Why would a control be conditional?
**Expected Answer:** A field may only apply to a selected role, job type, country, or workflow step.

### 3. How should conditional controls be modeled?
**Expected Answer:** Make the rule explicit and add, remove, enable, disable, or validate controls according to the domain behavior.

### 4. What is a common mistake with hidden controls?
**Expected Answer:** Hiding a field visually while leaving invalid or stale state active in the submission model.

### 5. When should a control be disabled versus removed?
**Expected Answer:** Disable it when it remains part of the form concept but is temporarily unavailable; remove it when it is not part of the current form model.

### 6. How should conditional validators be updated?
**Expected Answer:** Use Angular's validator APIs and ensure the control's validation state is recalculated after configuration changes.

### 7. What is a common anti-pattern?
**Expected Answer:** Scattering conditional form rules across many template expressions.

### 8. How would you test conditional controls?
**Expected Answer:** Test each relevant condition, control existence/state, validators, and submitted value.

### 9. JobHub scenario: a recruiter sees different compensation fields for full-time and contract jobs. How should the form respond?
**Expected Answer:** Change the relevant control structure or enabled state and validators based on the selected employment type.

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
Dynamic and Conditional Form Controls, Angular 21, standalone Angular, interview questions, JobHub
