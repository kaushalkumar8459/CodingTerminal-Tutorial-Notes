# Day 40 Interview Questions — Mini Project — Reusable Job Dashboard

## Interview Goal
Explain **Mini Project — Reusable Job Dashboard**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What should the reusable dashboard demonstrate?
**Expected Answer:** It should combine inputs, outputs, models, projection, queries, and clear component boundaries in a realistic feature.

### 2. Which component should own the job collection?
**Expected Answer:** The feature/container component should own the collection or delegate it to feature state, while presentational children receive only what they need.

### 3. How should JobCard communicate Apply?
**Expected Answer:** Emit a typed output event rather than performing the parent operation directly.

### 4. How could a filter component expose a selected value?
**Expected Answer:** Use an input/output pair or model() depending on whether true two-way binding is part of the contract.

### 5. Where could customizable dashboard actions go?
**Expected Answer:** Content projection can allow consumers to supply action content without changing the dashboard component.

### 6. When might viewChild() be useful in this project?
**Expected Answer:** For a focused imperative interaction such as focusing a search input after a panel opens.

### 7. How should shared job state be handled if several distant widgets need it?
**Expected Answer:** Use a feature-level service or state store rather than passing data through unrelated component layers.

### 8. What would you test?
**Expected Answer:** Component contracts, emitted events, projected content, conditional UI, and important user interactions.

### 9. JobHub scenario: a recruiter dashboard must reuse the same JobCard in list and favorites views. What design helps?
**Expected Answer:** Keep JobCard focused on presentation and explicit contracts, while each feature owns its own actions and data flow.

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
Mini Project — Reusable Job Dashboard, Angular 21, standalone components, interview questions, JobHub
