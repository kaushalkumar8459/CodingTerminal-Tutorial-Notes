# Day 89 Interview Questions — Mini Project — Reactive Job Dashboard

## Interview Goal
Explain **Mini Project — Reactive Job Dashboard**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What should a reactive Job Dashboard demonstrate?
**Expected Answer:** It should combine source signal state, computed filters, user actions, and reactive UI updates.

### 2. What should be writable state?
**Expected Answer:** Only values the user or application explicitly owns and updates, such as jobs, search text, or selected filters.

### 3. What should be computed?
**Expected Answer:** Derived values such as filtered jobs, counts, and grouped summaries.

### 4. Where could an effect fit?
**Expected Answer:** For a genuine external side effect such as synchronizing a selected filter with browser storage.

### 5. How should the UI represent async states?
**Expected Answer:** Show meaningful loading, success, empty, and error states.

### 6. How should state ownership be tested?
**Expected Answer:** Test state transitions through the public API and verify derived values update correctly.

### 7. What performance concern should be reviewed?
**Expected Answer:** Avoid unnecessary reactive dependencies and expensive repeated computations.

### 8. How could the project evolve later?
**Expected Answer:** Its state model can become a foundation for service-based state or SignalStore when complexity grows.

### 9. JobHub scenario: add saved-job filtering to the dashboard. What should be source state versus derived state?
**Expected Answer:** Saved-job preference and raw job data can be source state; the saved-job list and count should generally be derived.

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
Mini Project — Reactive Job Dashboard, Angular 21, standalone Angular, interview questions, JobHub
