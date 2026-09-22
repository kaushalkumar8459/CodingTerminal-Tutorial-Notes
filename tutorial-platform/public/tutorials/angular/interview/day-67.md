# Day 67 Interview Questions — Feature Service Architecture

## Interview Goal
Explain **Feature Service Architecture**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What is feature service architecture?
**Expected Answer:** Organizing services around clear feature responsibilities rather than creating one global service for the entire application.

### 2. Why separate data-access from feature orchestration?
**Expected Answer:** It keeps HTTP concerns distinct from feature state and UI workflows.

### 3. What might a feature contain?
**Expected Answer:** Components, routes, state/facade services, data-access services, models, and feature-specific utilities.

### 4. Should feature services depend directly on UI components?
**Expected Answer:** No. Dependencies should generally point from UI toward services, not services toward concrete UI components.

### 5. Why are boundaries important?
**Expected Answer:** They reduce coupling and make features easier to change, test, and potentially reuse.

### 6. How can services share common infrastructure?
**Expected Answer:** Use well-defined platform/core dependencies such as HTTP, authentication, configuration, and observability.

### 7. What is a feature-service anti-pattern?
**Expected Answer:** A service that knows about unrelated features and becomes a hidden global dependency.

### 8. How should feature APIs be named?
**Expected Answer:** Use domain-oriented names that describe the responsibility rather than implementation details.

### 9. JobHub scenario: candidate jobs and recruiter job-management need different workflows over the same backend resource. How should services be organized?
**Expected Answer:** Share a focused data-access boundary where appropriate, while keeping candidate and recruiter orchestration/state in their own feature boundaries.

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
Feature Service Architecture, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
