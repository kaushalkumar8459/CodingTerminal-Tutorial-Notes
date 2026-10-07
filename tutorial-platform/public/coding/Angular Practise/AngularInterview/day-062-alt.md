# Day 62 Interview Questions — Component and Route-Level Providers

## Interview Goal
Explain **Component and Route-Level Providers**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. Why provide a service at component level?
**Expected Answer:** To create an instance scoped to that component subtree.

### 2. Why provide a service at route level?
**Expected Answer:** To scope a dependency to a route and its routed component tree.

### 3. What is the benefit of route-level state?
**Expected Answer:** It can preserve shared state across components within a feature route without making it application-global.

### 4. Can a child component override a parent provider?
**Expected Answer:** Yes. A nearer injector can provide its own instance.

### 5. What determines which provider Angular resolves?
**Expected Answer:** Angular searches the relevant injector hierarchy for a matching token.

### 6. When is route-level provision useful in JobHub?
**Expected Answer:** For state or services belonging specifically to a candidate or recruiter feature route.

### 7. What is provider shadowing?
**Expected Answer:** A child injector supplies another instance for the same token, taking precedence within that subtree.

### 8. What is a common provider-scope debugging issue?
**Expected Answer:** Unexpectedly having multiple service instances because a provider was registered in more than one scope.

### 9. How would you verify service instance ownership?
**Expected Answer:** Trace where the provider is registered and determine which injector resolves each consumer.

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
Component and Route-Level Providers, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
