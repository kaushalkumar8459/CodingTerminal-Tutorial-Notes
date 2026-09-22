# Day 35 Interview Questions — Two-Way Component Communication with model()

## Interview Goal
Explain **Two-Way Component Communication with model()**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What problem does model() solve?
**Expected Answer:** It supports a writable component value that can participate in Angular's two-way component binding.

### 2. When is model() appropriate?
**Expected Answer:** When the parent and child genuinely need synchronized read/write interaction around one value.

### 3. How does a parent bind to a model?
**Expected Answer:** Use Angular's two-way binding syntax on the child model.

### 4. How is model() different from a normal input?
**Expected Answer:** A normal input is read-only from the child's perspective; a model exposes a writable contract.

### 5. How is model() different from output()?
**Expected Answer:** Output communicates an event; model provides a value that can be read and updated through a two-way binding contract.

### 6. When should model() not be used?
**Expected Answer:** Do not use it simply because it is convenient; use explicit inputs and outputs when one-way ownership is clearer.

### 7. How can model() improve a reusable control?
**Expected Answer:** A reusable control such as a slider or selected filter can expose one clear writable value.

### 8. What is a design risk of excessive two-way binding?
**Expected Answer:** Ownership can become unclear and state changes can be harder to trace.

### 9. JobHub scenario: a reusable page-size selector must let the parent both set and observe page size. What API fits?
**Expected Answer:** model() can express that intentional two-way value contract.

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
Two-Way Component Communication with model(), Angular 21, standalone components, component communication, interview questions, JobHub
