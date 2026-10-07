# Day 59 Interview Questions — Creating Services with @Injectable

## Interview Goal
Explain **Creating Services with @Injectable**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What does @Injectable do?
**Expected Answer:** It marks a class for Angular dependency injection and can provide metadata used to resolve its dependencies.

### 2. What does providedIn: 'root' mean?
**Expected Answer:** It makes the service available through the root injector and commonly results in an application-wide singleton instance.

### 3. Why use injectable services for API access?
**Expected Answer:** They create a reusable dependency boundary between UI features and HTTP operations.

### 4. Can an injectable service depend on another service?
**Expected Answer:** Yes. Angular can resolve constructor or inject()-based dependencies.

### 5. What is the benefit of inject() in a service?
**Expected Answer:** It allows dependencies to be resolved directly in class field initializers and modern Angular code.

### 6. Should a root service own feature-specific UI state?
**Expected Answer:** Only when that state genuinely belongs to application-wide or shared scope; otherwise use a narrower provider scope.

### 7. How do you test an injectable service?
**Expected Answer:** Configure its dependencies in TestBed and replace external dependencies with test doubles where appropriate.

### 8. What is a common @Injectable mistake?
**Expected Answer:** Making every service root-scoped without considering ownership and lifetime.

### 9. JobHub scenario: JobApiService calls /jobs endpoints. What should the service expose?
**Expected Answer:** Typed methods representing domain operations while hiding HTTP implementation details from components.

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
Creating Services with @Injectable, Angular 21, standalone components, interview questions, JobHub
