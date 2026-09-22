# Day 66 Interview Questions — Service Responsibilities and Facade Design

## Interview Goal
Explain **Service Responsibilities and Facade Design**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What is a facade service?
**Expected Answer:** A focused API that coordinates feature state and operations while hiding underlying implementation details.

### 2. Why use a facade?
**Expected Answer:** It can simplify component dependencies and provide a stable feature-facing contract.

### 3. What should a facade avoid becoming?
**Expected Answer:** A giant service containing every API, UI concern, and unrelated business rule.

### 4. Facade vs API service?
**Expected Answer:** An API service focuses on data-access operations; a facade can coordinate data access, feature state, and UI-facing workflows.

### 5. Where should business rules live?
**Expected Answer:** In an appropriate domain/service layer rather than being scattered across templates and components.

### 6. How does a facade improve testing?
**Expected Answer:** Components can test against a focused facade contract while API details are tested separately.

### 7. When is a facade unnecessary?
**Expected Answer:** For a small feature where direct use of a focused service remains simple and clear.

### 8. What is a facade anti-pattern?
**Expected Answer:** Adding a facade solely to forward every method without providing meaningful abstraction.

### 9. JobHub scenario: JobListComponent depends on five services. What should you evaluate?
**Expected Answer:** Whether a focused feature facade can provide the component with the small set of state and commands it actually needs.

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
Service Responsibilities and Facade Design, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
