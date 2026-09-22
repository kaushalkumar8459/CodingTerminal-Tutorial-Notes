# Day 95 Interview Questions — FormControl and FormGroup

## Interview Goal
Explain **FormControl and FormGroup**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is FormControl?
**Expected Answer:** It represents one form value plus its validation and interaction state.

### 2. What is FormGroup?
**Expected Answer:** It contains related controls and exposes aggregate form state.

### 3. How do you read a control value?
**Expected Answer:** Read the control's value through its typed form API.

### 4. How do you update a control programmatically?
**Expected Answer:** Use APIs such as setValue or patchValue according to whether a complete or partial structure is intended.

### 5. What is the difference between setValue and patchValue?
**Expected Answer:** setValue expects the complete structure for the target form model, while patchValue updates only the supplied subset.

### 6. When should you disable a control?
**Expected Answer:** When the UX explicitly requires the field to be unavailable; remember disabled controls have special value semantics.

### 7. What is a common mistake?
**Expected Answer:** Using patchValue everywhere without checking that required fields were actually supplied.

### 8. How should nested groups be modeled?
**Expected Answer:** Use nested FormGroup instances that correspond to meaningful sections of the form.

### 9. JobHub scenario: editing an existing job returns only a subset of optional fields. What update API may fit?
**Expected Answer:** patchValue can apply the partial data, followed by explicit validation or normalization as needed.

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
FormControl and FormGroup, Angular 21, standalone Angular, interview questions, JobHub
