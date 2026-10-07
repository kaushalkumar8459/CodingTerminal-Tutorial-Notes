# Day 79 Interview Questions — Signal Reads, Writes and Dependency Tracking

## Interview Goal
Explain **Signal Reads, Writes and Dependency Tracking**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. How does Angular know a template depends on a signal?
**Expected Answer:** Reading a signal during reactive template evaluation records that dependency.

### 2. What happens when a writable signal changes?
**Expected Answer:** Consumers that depend on it can be marked for the necessary reactive update.

### 3. Why should reads be intentional?
**Expected Answer:** Unnecessary reactive dependencies can cause work to run when it does not need to.

### 4. What is dependency tracking?
**Expected Answer:** The reactive system records which signals are read by a computation or reactive consumer.

### 5. Why avoid manually syncing duplicate state?
**Expected Answer:** It creates additional dependencies and opportunities for stale values.

### 6. How should updates to arrays be handled?
**Expected Answer:** Prefer creating an updated array rather than mutating shared state in place.

### 7. What is a common mistake with nested objects?
**Expected Answer:** Mutating nested data without producing a new state value when the application relies on immutable update patterns.

### 8. How would you debug unexpected recomputation?
**Expected Answer:** Inspect which signals are being read by the reactive computation and remove unnecessary dependencies.

### 9. JobHub scenario: a filtered job list changes when unrelated profile state changes. What should you inspect?
**Expected Answer:** Check whether the filtering computation accidentally reads the profile signal and remove that unnecessary dependency.

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
Signal Reads, Writes and Dependency Tracking, Angular 21, standalone Angular, interview questions, JobHub
