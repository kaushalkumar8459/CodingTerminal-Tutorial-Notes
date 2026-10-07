# Day 36 Interview Questions — Parent–Child Communication Patterns

## Interview Goal
Explain **Parent–Child Communication Patterns**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is the simplest parent-child communication pattern?
**Expected Answer:** Parent supplies data through inputs; child communicates user intent through outputs.

### 2. When should a child emit instead of mutate?
**Expected Answer:** When the parent owns the state and the child should only report an action or requested change.

### 3. When is model() useful?
**Expected Answer:** When the component's API intentionally exposes a writable value.

### 4. When should shared state be introduced?
**Expected Answer:** When multiple components need the same state and direct parent-child communication becomes awkward or misleading.

### 5. Why is state ownership important?
**Expected Answer:** A clear owner reduces conflicting updates and makes application behavior easier to reason about.

### 6. What is prop drilling?
**Expected Answer:** Passing data through intermediate components that do not actually use it just to reach a deeper component.

### 7. How can content projection differ from input data?
**Expected Answer:** Projection supplies template content/structure, while inputs supply component data.

### 8. What is a common communication anti-pattern?
**Expected Answer:** Using deeply coupled references or global state for interactions that could be handled by a simple component contract.

### 9. JobHub scenario: Dashboard → JobList → JobCard needs a shared selected-job state. What should you consider?
**Expected Answer:** If JobList only forwards the value, consider restructuring the component boundary or using appropriately scoped shared feature state rather than excessive prop drilling.

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
Parent–Child Communication Patterns, Angular 21, standalone components, component communication, interview questions, JobHub
