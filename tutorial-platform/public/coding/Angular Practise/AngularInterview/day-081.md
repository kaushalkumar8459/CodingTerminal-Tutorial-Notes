# Day 81 Interview Questions — Signals in Templates

## Interview Goal
Explain **Signals in Templates**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. How are signals read in an Angular template?
**Expected Answer:** Call the signal as a function, such as jobs(). Angular tracks the read as a reactive dependency.

### 2. Why are signal reads useful in templates?
**Expected Answer:** They make the template's dependency on reactive state explicit.

### 3. What happens when a signal read by a template changes?
**Expected Answer:** Angular can update the relevant reactive consumer rather than requiring manual DOM synchronization.

### 4. Can computed signals be used in templates?
**Expected Answer:** Yes. A computed signal is read the same way as a writable signal.

### 5. What is a common template mistake?
**Expected Answer:** Binding the signal object instead of calling it to read its current value.

### 6. How should derived UI state be represented?
**Expected Answer:** Prefer computed signals rather than storing duplicate derived values.

### 7. How do signals work with OnPush components?
**Expected Answer:** Signal reads in an OnPush template establish reactive dependencies that can cause the component to be updated when those signals change.

### 8. How would you debug unnecessary updates?
**Expected Answer:** Inspect which signals the template or derived computations actually read and remove unrelated dependencies.

### 9. JobHub scenario: show the number of saved jobs in the header. What fits?
**Expected Answer:** Read a signal or computed signal representing the saved-job count directly in the template.

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
Signals in Templates, Angular 21, standalone Angular, interview questions, JobHub
