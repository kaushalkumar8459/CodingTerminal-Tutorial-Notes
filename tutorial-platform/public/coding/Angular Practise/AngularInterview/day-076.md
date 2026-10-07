# Day 76 Interview Questions — Why Signals and Modern Reactivity?

## Interview Goal
Explain **Why Signals and Modern Reactivity?**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why were signals introduced?
**Expected Answer:** Signals provide a fine-grained reactive primitive for representing state and deriving dependent values.

### 2. What problem do signals help solve?
**Expected Answer:** They make state dependencies explicit and allow Angular to update consumers when relevant signal values change.

### 3. What is a signal?
**Expected Answer:** A reactive value container that can be read and, for writable signals, updated.

### 4. What is computed?
**Expected Answer:** A read-only derived signal whose value is calculated from other reactive dependencies.

### 5. What is effect?
**Expected Answer:** A reactive side-effect mechanism that runs when the signals it reads change.

### 6. When should signals be preferred?
**Expected Answer:** For local or application state where explicit reactive dependencies make the design simpler.

### 7. Are signals a replacement for every RxJS use case?
**Expected Answer:** No. RxJS remains useful for asynchronous streams, event composition, cancellation, and stream-oriented workflows.

### 8. What is a common signal anti-pattern?
**Expected Answer:** Using effects to manually synchronize state that could be represented directly with computed or normal signal relationships.

### 9. JobHub scenario: a job list needs a derived count of open jobs. What signal concept fits?
**Expected Answer:** Use computed state derived from the source job-list signal.

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
Why Signals and Modern Reactivity?, Angular 21, standalone Angular, interview questions, JobHub
