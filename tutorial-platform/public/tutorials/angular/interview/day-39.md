# Day 39 Interview Questions — Component Communication Patterns and Boundaries

## Interview Goal
Explain **Component Communication Patterns and Boundaries**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a good component boundary?
**Expected Answer:** A boundary groups a coherent UI responsibility behind a small, typed public contract.

### 2. What belongs in a component contract?
**Expected Answer:** Inputs, outputs, models, projected content, and documented behavior relevant to consumers.

### 3. How can you reduce component coupling?
**Expected Answer:** Keep contracts explicit and avoid reaching into implementation details.

### 4. When should state move upward?
**Expected Answer:** Move state to the closest common owner when multiple children need to coordinate around it.

### 5. When should state move into a service?
**Expected Answer:** When it is shared across distant components or represents feature-level state rather than one view.

### 6. Why should components avoid owning unrelated business logic?
**Expected Answer:** It makes the component difficult to reuse and test.

### 7. What is prop drilling?
**Expected Answer:** Passing data through intermediate components that do not use it just to reach a deeper component.

### 8. How can a component API become too large?
**Expected Answer:** Too many inputs, outputs, and modes can make behavior difficult to understand; split responsibilities when necessary.

### 9. JobHub scenario: JobCard has 15 inputs and 10 outputs. What should you investigate?
**Expected Answer:** Review whether the component has too many responsibilities and whether related behavior should be composed into smaller components or feature state.

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
Component Communication Patterns and Boundaries, Angular 21, standalone components, interview questions, JobHub
