# Day 73 Interview Questions — OnDestroy and Cleanup

## Interview Goal
Explain **OnDestroy and Cleanup**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why is OnDestroy important?
**Expected Answer:** It provides a lifecycle point for releasing resources owned by a component or directive before destruction.

### 2. What resources commonly need cleanup?
**Expected Answer:** Timers, event listeners, subscriptions, observers, and external resources that are not automatically tied to Angular's lifecycle.

### 3. Should every subscription be manually unsubscribed in ngOnDestroy?
**Expected Answer:** Not necessarily; Angular utilities such as takeUntilDestroyed can connect subscription cleanup to the injection context.

### 4. What is a memory leak?
**Expected Answer:** A resource remains reachable or active after the feature that owns it should have been destroyed.

### 5. Why is cleanup also a correctness issue?
**Expected Answer:** Stale callbacks can update destroyed UI, duplicate requests, or trigger unexpected behavior.

### 6. What is a common mistake?
**Expected Answer:** Assuming every observable needs identical manual cleanup regardless of how it is consumed.

### 7. How should external event listeners be handled?
**Expected Answer:** Remove them or use an Angular lifecycle-aware mechanism that owns their cleanup.

### 8. How would you test cleanup?
**Expected Answer:** Destroy the fixture or component and verify timers, subscriptions, listeners, or other owned resources no longer produce effects.

### 9. JobHub scenario: a live job-status polling process continues after leaving the details page. What is wrong?
**Expected Answer:** The polling resource is not correctly tied to the component or feature lifecycle and needs lifecycle-aware teardown.

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
OnDestroy and Cleanup, Angular 21, standalone Angular, interview questions, JobHub
