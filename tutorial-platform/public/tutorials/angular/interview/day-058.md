# Day 58 Interview Questions — Why Services and Dependency Injection?

## Interview Goal
Explain **Why Services and Dependency Injection?**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why do Angular applications use services?
**Expected Answer:** Services provide reusable behavior, data access, shared state, and other logic outside component presentation.

### 2. What problem does dependency injection solve?
**Expected Answer:** It supplies dependencies to consumers while separating object creation from the consumer.

### 3. Why move API logic out of components?
**Expected Answer:** It keeps components focused on UI orchestration and makes data access reusable and testable.

### 4. What is dependency injection?
**Expected Answer:** A mechanism where a framework resolves and supplies an object's dependencies.

### 5. What is a service?
**Expected Answer:** A class or injectable object that encapsulates reusable application behavior or state.

### 6. Why is DI useful for testing?
**Expected Answer:** Dependencies can be replaced with controlled test implementations or mocks.

### 7. Should every helper become a service?
**Expected Answer:** No. Use services for meaningful reusable dependencies, not as a dumping ground for unrelated functions.

### 8. What is a common service anti-pattern?
**Expected Answer:** Creating one giant service that owns unrelated APIs, UI state, and business rules.

### 9. JobHub scenario: three components need the same job API operations. What should you introduce?
**Expected Answer:** A focused injectable data-access service can centralize the API boundary.

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
Why Services and Dependency Injection?, Angular 21, standalone components, interview questions, JobHub
