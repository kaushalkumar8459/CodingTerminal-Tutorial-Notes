# Day 61 Interview Questions — Provider Scope and Service Lifetimes

## Interview Goal
Explain **Provider Scope and Service Lifetimes**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What does provider scope mean in Angular?
**Expected Answer:** It determines which injector can resolve a dependency and therefore which parts of the application can share an instance.

### 2. What does providedIn: 'root' generally provide?
**Expected Answer:** Application-level availability through the root injector and typically one shared instance.

### 3. Why might a service need a narrower scope?
**Expected Answer:** A feature or component may need isolated state or a lifecycle tied to that scope.

### 4. What is component-level provider scope useful for?
**Expected Answer:** It creates a service instance associated with that component injector and its descendants.

### 5. What happens to a component-scoped service when its component is destroyed?
**Expected Answer:** Its injector scope is destroyed, so the service instance is no longer retained by that scope.

### 6. Why should service lifetime match state ownership?
**Expected Answer:** It prevents unrelated features from sharing state accidentally and makes lifecycle behavior predictable.

### 7. What is a common root-provider mistake?
**Expected Answer:** Putting temporary feature state in a root service simply because it is convenient.

### 8. How would you choose between root and feature scope?
**Expected Answer:** Choose the smallest scope that correctly owns the dependency, widening it only when sharing is intentional.

### 9. JobHub scenario: a job-search filter should reset whenever the search page is recreated. What scope could fit?
**Expected Answer:** A page/feature-scoped state service can keep the state local to that feature lifecycle.

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
Provider Scope and Service Lifetimes, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
