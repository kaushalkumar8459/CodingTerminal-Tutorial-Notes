# Day 34 Interview Questions — Outputs with output()

## Interview Goal
Explain **Outputs with output()**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is output()?
**Expected Answer:** It declares a component output used to notify a parent about an event.

### 2. How does a parent listen to an output?
**Expected Answer:** Use event binding on the child component, such as (apply).

### 3. What should an output represent?
**Expected Answer:** A meaningful event or intent, such as apply, remove, or selection, rather than arbitrary internal state.

### 4. Why should output payloads be typed?
**Expected Answer:** Typed payloads make the component contract explicit and prevent unsafe consumers.

### 5. Should a child directly modify parent state?
**Expected Answer:** Prefer emitting an event and letting the owner decide how state changes.

### 6. How is output different from a shared service?
**Expected Answer:** Output is a direct component relationship; a service is more appropriate for shared behavior or state across broader boundaries.

### 7. What is a common output anti-pattern?
**Expected Answer:** Emitting excessively granular internal implementation details that couple the parent to the child.

### 8. How would you test an output?
**Expected Answer:** Trigger the relevant child interaction and verify the parent receives the expected payload or resulting behavior.

### 9. JobHub scenario: Save JobCard emits the saved job ID. What should the parent do?
**Expected Answer:** Handle the output and update the owning saved-jobs state or trigger the appropriate feature operation.

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
Outputs with output(), Angular 21, standalone components, component communication, interview questions, JobHub
