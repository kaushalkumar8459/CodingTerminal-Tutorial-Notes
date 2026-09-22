# Day 32 Interview Questions — Why Components Communicate

## Interview Goal
Explain **Why Components Communicate**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why do Angular components need communication?
**Expected Answer:** Real UIs are composed of components that must exchange data, user events, and content.

### 2. What is the simplest parent-to-child pattern?
**Expected Answer:** The parent provides input data to the child.

### 3. What is the child-to-parent pattern?
**Expected Answer:** The child emits an event or output when something happens.

### 4. Why should component communication have clear ownership?
**Expected Answer:** Clear ownership prevents duplicated state and makes data flow easier to reason about.

### 5. When should siblings communicate directly?
**Expected Answer:** Prefer a shared parent or shared service/state rather than tightly coupling sibling components.

### 6. What is a component contract?
**Expected Answer:** It is the explicit API a component exposes through inputs, outputs, models, and projected content.

### 7. Why avoid reaching into child internals?
**Expected Answer:** It creates tight coupling and makes reusable components harder to change safely.

### 8. When is shared service state appropriate?
**Expected Answer:** When multiple components need coordinated state that does not naturally belong to one parent-child contract.

### 9. JobHub scenario: a job-list component owns jobs while a job-card only displays one job and emits Apply. What is the communication flow?
**Expected Answer:** The parent passes the job into the card and the card emits an Apply event; the parent owns the application operation.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the communication pattern fits the component relationship and where the responsibility belongs.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Why Components Communicate, Angular 21, standalone components, interview questions, JobHub
