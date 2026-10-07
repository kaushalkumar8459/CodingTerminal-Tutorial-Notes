# Day 60 Interview Questions — inject() and Dependency Injection

## Interview Goal
Explain **inject() and Dependency Injection**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is inject()?
**Expected Answer:** It is Angular's API for retrieving a dependency from the current injection context.

### 2. Where can inject() be used?
**Expected Answer:** It can be used in supported Angular injection contexts such as field initializers, constructors, factory functions, and certain framework callbacks.

### 3. Why do modern Angular developers often use inject()?
**Expected Answer:** It works naturally with standalone APIs and can make dependencies concise and explicit.

### 4. What is an injection context?
**Expected Answer:** A framework-managed context in which Angular can resolve dependencies using the current injector.

### 5. What happens if inject() is called outside a valid context?
**Expected Answer:** Angular throws an injection-context error because no injector is available for that call.

### 6. How can assertInInjectionContext help?
**Expected Answer:** It can document and validate that a helper is called from a valid injection context.

### 7. Can inject() replace all constructor injection?
**Expected Answer:** It can be used in many modern cases, but constructor injection remains valid; project consistency matters.

### 8. What is a common inject() anti-pattern?
**Expected Answer:** Calling inject() from arbitrary asynchronous callbacks or ordinary functions that do not have an injection context.

### 9. JobHub scenario: a service needs Router and HttpClient. How could modern Angular code obtain them?
**Expected Answer:** Use inject(Router) and inject(HttpClient) in valid injection contexts, such as service field initializers.

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
inject() and Dependency Injection, Angular 21, standalone components, interview questions, JobHub
