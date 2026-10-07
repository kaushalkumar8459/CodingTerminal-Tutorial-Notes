# Day 71 Interview Questions — ngOnChanges and Input Changes

## Interview Goal
Explain **ngOnChanges and Input Changes**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What problem does ngOnChanges solve?
**Expected Answer:** It lets a component react when Angular detects changes to its inputs.

### 2. When does ngOnChanges run?
**Expected Answer:** It runs when one or more inputs receive values or change according to Angular's input-change detection.

### 3. What does SimpleChanges contain?
**Expected Answer:** It contains information about the changed inputs, including previous and current values and whether the change is the first change.

### 4. When is ngOnChanges useful?
**Expected Answer:** It is useful when input changes require imperative coordination that is clearer than a purely declarative reactive expression.

### 5. How is it different from ngOnInit?
**Expected Answer:** ngOnInit is for initialization after inputs are initialized; ngOnChanges is specifically for reacting to input changes.

### 6. What is a common mistake?
**Expected Answer:** Putting all input handling into ngOnChanges even when a signal-based computed or reactive design would be simpler.

### 7. How would you test it?
**Expected Answer:** Set or change the input through the Angular testing API and verify the resulting behavior.

### 8. JobHub scenario: a JobDetails component receives jobId changes without being recreated. What should happen?
**Expected Answer:** The component should react to the changed jobId and refresh the relevant job data.

### 9. Interviewer follow-up
**Expected Answer:** How would you handle this if the input is a signal input rather than a traditional decorator input?

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
ngOnChanges and Input Changes, Angular 21, standalone Angular, interview questions, JobHub
