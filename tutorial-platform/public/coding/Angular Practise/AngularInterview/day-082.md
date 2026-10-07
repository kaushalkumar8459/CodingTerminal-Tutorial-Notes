# Day 82 Interview Questions — input()

## Interview Goal
Explain **input()**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is input()?
**Expected Answer:** It is Angular's modern function-based API for declaring component inputs.

### 2. Why use input() in modern Angular?
**Expected Answer:** It provides a signal-based input API with strong typing and a composition-friendly developer experience.

### 3. What is the difference between input() and input.required()?
**Expected Answer:** input.required() declares that a value must be supplied by the parent.

### 4. How is an input signal read?
**Expected Answer:** Call it as a signal, for example jobId().

### 5. Can input values be transformed?
**Expected Answer:** Angular input APIs support input transforms for supported transformation scenarios.

### 6. How can input() simplify derived state?
**Expected Answer:** A computed signal can derive values directly from the input signal.

### 7. What is a common mistake?
**Expected Answer:** Treating an input signal like a normal property and forgetting that its current value is read through a function call.

### 8. When should a component own state instead of using an input?
**Expected Answer:** Use an input when the parent owns and supplies the value; keep internal state inside the component when the component owns it.

### 9. JobHub scenario: JobCard must always receive a job. What input declaration fits?
**Expected Answer:** A required input can express that contract, such as input.required<Job>().

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
input(), Angular 21, standalone Angular, interview questions, JobHub
