# Day 63 Interview Questions — Service-Owned Signal State

## Interview Goal
Explain **Service-Owned Signal State**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. Why can a service own signal state?
**Expected Answer:** It provides a shared reactive state boundary without requiring a larger state-management library.

### 2. What should a service expose instead of its writable state when possible?
**Expected Answer:** A read-only view of state plus explicit methods for allowed updates.

### 3. Why keep state mutation inside service methods?
**Expected Answer:** It creates a clear ownership boundary and prevents arbitrary consumers from changing state.

### 4. What kind of state fits a service-owned signal?
**Expected Answer:** Feature-level shared state such as filters, selected records, or cached UI state.

### 5. When should service-owned state not be used?
**Expected Answer:** When local component state is sufficient or when the application requires more formal state architecture.

### 6. How does a signal help consumers?
**Expected Answer:** Consumers react to changes without manually subscribing to a state stream.

### 7. What is a common signal-state mistake?
**Expected Answer:** Exposing writable signals everywhere and allowing any component to mutate them directly.

### 8. How should derived state be represented?
**Expected Answer:** Use computed signals when the value is derived from existing reactive state.

### 9. JobHub scenario: multiple job-search components need the selected job and filters. What could own this state?
**Expected Answer:** A focused feature service can own signals and expose controlled read access and update methods.

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
Service-Owned Signal State, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
