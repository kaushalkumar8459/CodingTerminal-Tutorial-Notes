# Day 56 Interview Questions — Composition Patterns for Feature UIs

## Interview Goal
Explain **Composition Patterns for Feature UIs**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a container-presentational pattern?
**Expected Answer:** A container coordinates data and feature state while presentational components focus on rendering and user interaction.

### 2. Why can this pattern help feature UIs?
**Expected Answer:** It separates orchestration from reusable visual components.

### 3. Should every Angular feature use this pattern rigidly?
**Expected Answer:** No. Component boundaries should match actual complexity and responsibilities.

### 4. Where should API calls normally live?
**Expected Answer:** In appropriate data-access or service layers rather than low-level presentation components.

### 5. Where should local UI state live?
**Expected Answer:** Keep it in the smallest component or feature scope that owns it.

### 6. How does content projection support feature composition?
**Expected Answer:** Feature containers can provide reusable structure while individual consumers supply content.

### 7. What is over-composition?
**Expected Answer:** Breaking a simple feature into too many layers and components without meaningful boundaries.

### 8. How do you decide component boundaries?
**Expected Answer:** Consider responsibility, state ownership, reuse, testability, and whether the UI section has a coherent contract.

### 9. JobHub scenario: JobSearchPage handles API calls, filters, list rendering, and job cards. How could it be composed?
**Expected Answer:** Let the page/feature coordinate state and data access, while filter and job-card components expose focused UI contracts.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state or dependency?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the problem, where the responsibility belongs, and what the trade-offs are.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Composition Patterns for Feature UIs, Angular 21, standalone components, interview questions, JobHub
