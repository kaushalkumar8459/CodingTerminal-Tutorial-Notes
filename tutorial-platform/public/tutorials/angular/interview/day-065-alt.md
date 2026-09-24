# Day 65 Interview Questions — Provider Recipes

## Interview Goal
Explain **Provider Recipes**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What is a value provider?
**Expected Answer:** A provider that supplies a specific value for a DI token.

### 2. What is a class provider?
**Expected Answer:** A provider that maps a token to a class implementation.

### 3. What is an existing provider?
**Expected Answer:** It maps one token to an already registered dependency.

### 4. What is a factory provider useful for?
**Expected Answer:** Creating a dependency dynamically from configuration or other injected dependencies.

### 5. Why use an alias token?
**Expected Answer:** It can expose an existing implementation under another contract token.

### 6. What is a common provider-recipe mistake?
**Expected Answer:** Using complex factories where a simple class or value provider would be clearer.

### 7. How do providers support testing?
**Expected Answer:** A test injector can replace a production provider with a controlled implementation.

### 8. Why should provider configuration remain understandable?
**Expected Answer:** DI setup is application infrastructure; overly clever providers make runtime resolution difficult to debug.

### 9. JobHub scenario: an analytics service needs an injected feature flag. Which provider pattern is appropriate?
**Expected Answer:** A typed configuration/value token can supply the flag without coupling the service to environment globals.

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
Provider Recipes, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
