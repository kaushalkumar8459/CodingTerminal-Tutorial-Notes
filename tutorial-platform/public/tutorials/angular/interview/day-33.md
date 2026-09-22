# Day 33 Interview Questions — Signal Inputs with input()

## Interview Goal
Explain **Signal Inputs with input()**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is input()?
**Expected Answer:** It is Angular's modern API for declaring component inputs, exposing input values as signals.

### 2. Why use signal inputs?
**Expected Answer:** They provide reactive input state and integrate naturally with Angular's signal-based model.

### 3. Can an input be required?
**Expected Answer:** Yes. Angular supports required inputs so consumers must provide the value.

### 4. How do you read an input signal in a template?
**Expected Answer:** Call the signal, for example job().

### 5. Can an input have a transform?
**Expected Answer:** Yes, Angular input APIs support input transformations for suitable input normalization.

### 6. Should a child mutate its input?
**Expected Answer:** A child should treat input data as externally owned; use an output or model when the contract requires changes.

### 7. How is input() different from a normal component field?
**Expected Answer:** Angular tracks input updates and exposes the value as a reactive signal.

### 8. What is a common input anti-pattern?
**Expected Answer:** Copying an input into unrelated local state without defining how synchronization should work.

### 9. JobHub scenario: JobCard receives a required Job. How should the contract be declared?
**Expected Answer:** Use a typed required input so every JobCard consumer must provide the job data.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the communication pattern fits the component relationship and where the responsibility belongs.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Signal Inputs with input(), Angular 21, standalone components, interview questions, JobHub
