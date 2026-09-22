# Day 69 Interview Questions — Why Component Lifecycle Matters

## Interview Goal
Explain **Why Component Lifecycle Matters**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What is the Angular component lifecycle?
**Expected Answer:** The sequence of creation, input updates, rendering-related phases, and destruction through which a component passes.

### 2. Why understand lifecycle timing?
**Expected Answer:** Code that reads inputs, view children, or performs setup/cleanup must run at an appropriate lifecycle point.

### 3. When is constructor execution relevant?
**Expected Answer:** It occurs during class construction and is appropriate for dependency injection and simple initialization, not for assuming the view is ready.

### 4. What is initialization?
**Expected Answer:** The phase where Angular initializes a component and its inputs before normal rendering proceeds.

### 5. Why is cleanup important?
**Expected Answer:** Resources such as timers, subscriptions, listeners, and external handles must not outlive their owning component.

### 6. What is a lifecycle anti-pattern?
**Expected Answer:** Putting unrelated initialization and cleanup logic into lifecycle hooks without clear ownership.

### 7. How do signals affect lifecycle thinking?
**Expected Answer:** Reactive dependencies can reduce the need for manual synchronization, but lifecycle still matters for view and external-resource boundaries.

### 8. Why should lifecycle code remain small?
**Expected Answer:** Small lifecycle hooks make timing assumptions easier to understand and test.

### 9. JobHub scenario: a job detail component starts a polling timer. What lifecycle concern matters most?
**Expected Answer:** The polling resource must be tied to the component lifecycle and cleaned up when the component is destroyed.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative could solve the same problem?
- Who owns the state, dependency, or lifecycle?
- How would you test this behavior?
- What changes would you make for a large enterprise application?

## Common Interview Trap
Do not answer with syntax alone. Explain **why**, **where the responsibility belongs**, and the relevant lifecycle or architectural trade-offs.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Why Component Lifecycle Matters, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
