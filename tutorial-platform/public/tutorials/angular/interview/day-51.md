# Day 51 Interview Questions — Reusable UI Components

## Interview Goal
Explain **Reusable UI Components**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What makes a UI component reusable?
**Expected Answer:** A focused responsibility, clear typed inputs and outputs, predictable behavior, and minimal feature-specific dependencies.

### 2. Why should reusable components avoid API calls?
**Expected Answer:** Keeping data access outside the UI component makes the component easier to reuse, test, and reason about.

### 3. What is a component contract?
**Expected Answer:** The public inputs, outputs, models, projected content, and expected behavior exposed by a component.

### 4. Why are typed contracts important?
**Expected Answer:** They make component usage safer and document what consumers must provide.

### 5. When should a component accept configuration?
**Expected Answer:** When consumers need controlled variations that can be expressed clearly through inputs or projected content.

### 6. How do you avoid making a component too configurable?
**Expected Answer:** Only expose options that represent real supported use cases; avoid dozens of flags that make behavior unpredictable.

### 7. How should reusable UI handle domain-specific actions?
**Expected Answer:** Expose generic or clearly typed events and let the feature decide what operation to perform.

### 8. What is a common reusable-component anti-pattern?
**Expected Answer:** A supposedly shared component directly depending on one feature's store, route, or API.

### 9. JobHub scenario: Candidate and Recruiter both need the same JobCard. What should the contract contain?
**Expected Answer:** Typed display data and meaningful user-action outputs, while candidate/recruiter orchestration remains outside the card.

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
Reusable UI Components, Angular 21, standalone components, interview questions, JobHub
