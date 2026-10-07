# Day 21 Interview Questions — Rendering Patterns and UI States

## Interview Goal
Explain **Rendering Patterns and UI States**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What are common UI states in an Angular feature?
**Expected Answer:** Typical states include loading, success, empty, and error; some features also need refreshing, disabled, or unauthorized states.

### 2. Why should UI states be explicit?
**Expected Answer:** Explicit state prevents ambiguous conditions such as treating an empty array as both loading and completed empty.

### 3. How can modern control flow represent UI states?
**Expected Answer:** Use @if, @else if, @else, @for, @empty, and @switch to make rendering branches clear.

### 4. Should loading state be inferred from data length?
**Expected Answer:** No. A collection can be empty while loaded, so loading should be modeled separately.

### 5. How would you model a feature with several mutually exclusive states?
**Expected Answer:** Use a typed state model or discriminated union when appropriate, then render each state explicitly.

### 6. What is the benefit of a discriminated union for UI state?
**Expected Answer:** It makes valid states explicit and lets TypeScript help prevent impossible combinations.

### 7. How should error recovery be handled?
**Expected Answer:** Show actionable error UI and connect retry to the appropriate data-access operation.

### 8. How would JobHub distinguish empty search results from an API failure?
**Expected Answer:** Use separate success-empty and error states instead of deriving both from the jobs array.

### 9. What is a common UI-state anti-pattern?
**Expected Answer:** A collection of unrelated booleans that can accidentally represent contradictory states.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- What happens when the data changes or the URL changes?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the application problem and which layer owns the responsibility.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Rendering Patterns and UI States, Angular 21, standalone components, interview questions, JobHub
