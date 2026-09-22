# Day 87 Interview Questions — Signals in Services and Feature State

## Interview Goal
Explain **Signals in Services and Feature State**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why put signals in services?
**Expected Answer:** A service can own shared feature state while components consume a stable reactive API.

### 2. How should writable state be exposed?
**Expected Answer:** Keep mutation controlled through service methods or carefully designed commands rather than exposing unrestricted writes.

### 3. What is a good service state boundary?
**Expected Answer:** The service should own state that belongs to its feature or provider scope.

### 4. How can computed signals help a service?
**Expected Answer:** They expose derived values such as filtered records, counts, and permissions without duplicating state.

### 5. When should state move to a dedicated store?
**Expected Answer:** When feature state becomes complex enough that explicit state modeling, methods, selectors, and async workflows need stronger structure.

### 6. What is a common anti-pattern?
**Expected Answer:** One global service containing unrelated state for the entire application.

### 7. How does provider scope affect signal state?
**Expected Answer:** The service instance and therefore its signal state are shared according to the provider's injector scope.

### 8. How should service state be tested?
**Expected Answer:** Test state transitions and public methods without coupling tests to internal signal implementation details.

### 9. JobHub scenario: recruiter filters and selected jobs must be shared across several recruiter components. What fits?
**Expected Answer:** A recruiter-feature service can own signals for those shared values within an appropriate provider scope.

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
Signals in Services and Feature State, Angular 21, standalone Angular, interview questions, JobHub
