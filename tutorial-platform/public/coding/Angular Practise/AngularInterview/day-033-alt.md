# Day 33 Interview Questions — Signal Inputs with input()

## Interview Goal
Explain **Signal Inputs with input()**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is input() in modern Angular?
**Expected Answer:** It declares a component input as an Angular signal-based input API.

### 2. Why use signal inputs?
**Expected Answer:** They provide a reactive, type-friendly way for a component to consume input values.

### 3. How does a parent bind to an input?
**Expected Answer:** The parent uses normal property binding syntax, such as [job].

### 4. How do you define a required input?
**Expected Answer:** Use Angular's required input API so the component contract requires a value from its parent.

### 5. Can an input have a default value?
**Expected Answer:** Yes, an input can be initialized with a default where appropriate.

### 6. How is an input read inside a component?
**Expected Answer:** Read the input signal by calling it, for example job().

### 7. When should a value be an input rather than shared service state?
**Expected Answer:** When the value belongs to the direct parent-child component contract.

### 8. What is a common input mistake?
**Expected Answer:** Mutating parent-owned objects from a child instead of treating the input as data supplied by the parent.

### 9. JobHub scenario: JobCard receives a job and compact display preference. How would you model it?
**Expected Answer:** Expose both as typed inputs and keep the card focused on presentation and user interaction.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the component boundary and which layer owns the responsibility.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Signal Inputs with input(), Angular 21, standalone components, component communication, interview questions, JobHub
