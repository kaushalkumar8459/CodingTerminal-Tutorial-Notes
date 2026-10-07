# Day 36 Interview Questions — Parent–Child Communication Patterns

## Interview Goal
Explain **Parent–Child Communication Patterns**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is the standard parent-to-child flow?
**Expected Answer:** Parent owns data and passes it through an input.

### 2. What is the standard child-to-parent flow?
**Expected Answer:** Child emits an output event and the parent decides what action to take.

### 3. When is model() useful between parent and child?
**Expected Answer:** When a value is intentionally two-way and both sides need to update it.

### 4. What should happen to business logic?
**Expected Answer:** The component that owns the responsibility should perform the business operation rather than the presentation child.

### 5. How should sibling components communicate?
**Expected Answer:** Use their common parent or a shared state/service when direct parent-child communication does not fit.

### 6. Why are clear boundaries important?
**Expected Answer:** They reduce coupling and make components easier to test and reuse.

### 7. When might a shared service be better than many outputs?
**Expected Answer:** When multiple distant components need the same state or coordinated operations.

### 8. What is a communication anti-pattern?
**Expected Answer:** Passing data through many unrelated component layers just to reach a distant consumer.

### 9. JobHub scenario: header, filters, list, and detail components all need the current search context. What should you consider?
**Expected Answer:** Use direct inputs/outputs for local relationships and shared feature state for genuinely cross-component search context.

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
Parent–Child Communication Patterns, Angular 21, standalone components, interview questions, JobHub
