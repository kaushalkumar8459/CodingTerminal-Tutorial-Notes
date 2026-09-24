# Day 64 Interview Questions — InjectionToken and Configuration

## Interview Goal
Explain **InjectionToken and Configuration**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What is an InjectionToken?
**Expected Answer:** A DI token used to identify dependencies that may not be represented by a class, such as configuration values.

### 2. Why use InjectionToken for configuration?
**Expected Answer:** It provides a typed, explicit dependency boundary for configuration data.

### 3. Can an InjectionToken represent an object?
**Expected Answer:** Yes. It can be generic and used to inject typed configuration objects.

### 4. Why is configuration injection preferable to hard-coded values?
**Expected Answer:** It separates configuration from implementation and improves testability and environment-specific setup.

### 5. What is a factory provider?
**Expected Answer:** A provider that creates a dependency using a factory function, optionally resolving other dependencies.

### 6. What is multi-provider configuration?
**Expected Answer:** A token can collect multiple provider values when configured as a multi provider.

### 7. What is a common configuration anti-pattern?
**Expected Answer:** Reading environment-specific values directly throughout the application instead of using a controlled configuration boundary.

### 8. How can configuration be tested?
**Expected Answer:** Provide a test-specific value for the configuration token.

### 9. JobHub scenario: the API base URL differs between environments. What architecture fits?
**Expected Answer:** Expose a typed configuration token and provide the runtime value at application bootstrap.

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
InjectionToken and Configuration, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
