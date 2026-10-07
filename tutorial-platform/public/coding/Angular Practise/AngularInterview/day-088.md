# Day 88 Interview Questions — Signal Patterns, Anti-Patterns and Reactive UI States

## Interview Goal
Explain **Signal Patterns, Anti-Patterns and Reactive UI States**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a good signal pattern?
**Expected Answer:** Keep source state minimal, derive values with computed, and use effects only for genuine side effects.

### 2. Why avoid duplicate derived state?
**Expected Answer:** It can become stale because multiple pieces of state must remain synchronized.

### 3. When should an effect be used?
**Expected Answer:** For synchronization with an external system or other imperative side effect, not ordinary value derivation.

### 4. How should loading and error state be modeled?
**Expected Answer:** Use an explicit state model that represents the meaningful lifecycle of an operation.

### 5. What is a signal anti-pattern?
**Expected Answer:** Creating effects that copy values between signals instead of modeling the relationship directly.

### 6. How can signals improve component design?
**Expected Answer:** They can make state ownership and derived dependencies explicit and reduce manual synchronization.

### 7. Can every async workflow be replaced with signals?
**Expected Answer:** No. Signals model state; RxJS and other async APIs remain useful for streams, cancellation, and event composition.

### 8. How should signal performance be considered?
**Expected Answer:** Keep dependencies narrow, avoid unnecessary reads, and avoid expensive computations in frequently evaluated reactive paths.

### 9. JobHub scenario: a dashboard stores jobs, filteredJobs, openJobCount, and activeJobCount as four writable signals. What should be reviewed?
**Expected Answer:** Review whether the derived values should become computed signals so only the source jobs and filter state remain writable.

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
Signal Patterns, Anti-Patterns and Reactive UI States, Angular 21, standalone Angular, interview questions, JobHub
