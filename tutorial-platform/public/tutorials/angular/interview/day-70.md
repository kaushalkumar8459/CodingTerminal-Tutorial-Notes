# Day 70 Interview Questions — Component Creation and Initialization

## Interview Goal
Explain **Component Creation and Initialization**, discuss Angular design trade-offs, and apply the concept to a realistic JobHub scenario.

## Interview Questions

### 1. What happens when Angular creates a component?
**Expected Answer:** Angular constructs the instance, resolves dependencies, initializes inputs, creates the view, and performs the relevant rendering lifecycle.

### 2. Where should dependency injection happen?
**Expected Answer:** Use Angular DI through constructor injection or inject() in a valid injection context.

### 3. What is ngOnInit used for?
**Expected Answer:** Initialization logic that should run after Angular has initialized the component's inputs.

### 4. Why not put everything in the constructor?
**Expected Answer:** The constructor is primarily for construction and dependency setup; input-dependent initialization belongs after inputs are initialized.

### 5. Does ngOnInit run for every input change?
**Expected Answer:** No. It runs once after the initial input initialization.

### 6. What should input-dependent logic use when values can change?
**Expected Answer:** Use the appropriate reactive or input-change mechanism rather than relying on ngOnInit for later changes.

### 7. What is a common initialization mistake?
**Expected Answer:** Starting resources in multiple hooks without a clear ownership or cleanup strategy.

### 8. How can initialization be tested?
**Expected Answer:** Create the component with the required inputs/providers and assert observable behavior rather than implementation timing alone.

### 9. JobHub scenario: JobDetails needs an input jobId to load details. What should you consider?
**Expected Answer:** Initial loading can use initialized input state, while later jobId changes require a reactive/input-change strategy.

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
Component Creation and Initialization, Angular 21, standalone Angular, dependency injection, JobHub, interview questions
