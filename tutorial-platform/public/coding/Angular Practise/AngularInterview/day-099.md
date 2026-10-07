# Day 99 Interview Questions — FormArray and Repeating Fields

## Interview Goal
Explain **FormArray and Repeating Fields**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is FormArray?
**Expected Answer:** It represents an ordered collection of form controls or groups that can change in size at runtime.

### 2. When is FormArray useful?
**Expected Answer:** For repeating fields such as skills, education entries, interview rounds, or job requirements.

### 3. How do you add an item?
**Expected Answer:** Create the appropriate control or group and add it to the FormArray.

### 4. How do you remove an item?
**Expected Answer:** Remove the item at its intended index and ensure the UI and validation state remain consistent.

### 5. Why use a FormGroup inside FormArray?
**Expected Answer:** Each repeated item can have multiple related fields with its own validation.

### 6. What is a common mistake?
**Expected Answer:** Using array indexes as business identifiers or assuming the displayed index is a stable domain ID.

### 7. How should repeated data be submitted?
**Expected Answer:** Map the form array values into an explicit request model rather than sending internal form structures.

### 8. How would you test FormArray behavior?
**Expected Answer:** Test adding, removing, updating, validation, ordering, and final value mapping.

### 9. JobHub scenario: recruiters can add multiple required skills to a job. What fits?
**Expected Answer:** A FormArray containing controls or groups for each skill entry.

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
FormArray and Repeating Fields, Angular 21, standalone Angular, interview questions, JobHub
