# Day 39 Interview Questions — Component Communication Patterns and Boundaries

## Interview Goal
Explain **Component Communication Patterns and Boundaries**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why do component boundaries matter?
**Expected Answer:** They define ownership, contracts, responsibilities, and reuse boundaries.

### 2. What makes a good component API?
**Expected Answer:** Clear typed inputs, meaningful outputs, predictable behavior, and minimal hidden dependencies.

### 3. When should state remain local?
**Expected Answer:** When only one component or a small local interaction needs it.

### 4. When should feature state be shared?
**Expected Answer:** When several components need coordinated access or updates to the same feature state.

### 5. Why avoid overly smart reusable UI components?
**Expected Answer:** They become tightly coupled to domain rules and harder to reuse.

### 6. What is a presentational component?
**Expected Answer:** A component primarily responsible for rendering data and emitting user intent, with limited domain orchestration.

### 7. What is a container component?
**Expected Answer:** A component that coordinates feature state, data access, and composition around presentational components.

### 8. What is a communication anti-pattern at scale?
**Expected Answer:** Mixing local UI concerns, API calls, global state, and unrelated business rules in one component.

### 9. JobHub scenario: JobCard contains API calls, authentication logic, filtering, and presentation. What should change?
**Expected Answer:** Separate the card's UI contract from feature/data-access responsibilities and let a higher-level feature layer coordinate them.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the component boundary and which layer owns the responsibility.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Component Communication Patterns and Boundaries, Angular 21, standalone components, component communication, interview questions, JobHub
