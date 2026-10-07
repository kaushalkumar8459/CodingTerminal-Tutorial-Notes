# Day 80 Interview Questions — effect()

## Interview Goal
Explain **effect()**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is effect()?
**Expected Answer:** It runs a side effect whenever the signals read by that effect change.

### 2. When is effect appropriate?
**Expected Answer:** For synchronization with external systems or imperative side effects that cannot be expressed as derived state.

### 3. When should effect not be used?
**Expected Answer:** Do not use it merely to copy one signal into another when computed or direct state modeling is more appropriate.

### 4. Can an effect read multiple signals?
**Expected Answer:** Yes. All signals read during the effect become reactive dependencies.

### 5. Why can effects create feedback loops?
**Expected Answer:** An effect that writes to state which influences its own dependencies can repeatedly trigger itself or create difficult-to-reason-about flows.

### 6. What is an effect cleanup function for?
**Expected Answer:** It can clean up resources associated with the previous effect execution before the effect reruns or is destroyed.

### 7. What is a common anti-pattern?
**Expected Answer:** Using effects as a general replacement for application state management.

### 8. How should effects interact with external APIs?
**Expected Answer:** Keep the effect boundary explicit and ensure external resources are cleaned up appropriately.

### 9. JobHub scenario: persist a user's selected filter to browser storage whenever it changes. What reactive tool could fit?
**Expected Answer:** An effect can synchronize the selected filter signal with browser storage, provided the browser-only boundary is handled appropriately.

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
effect(), Angular 21, standalone Angular, interview questions, JobHub
