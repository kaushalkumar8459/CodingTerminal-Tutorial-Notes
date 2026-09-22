# Day 32 Interview Questions — Why Components Communicate

## Interview Goal
Explain **Why Components Communicate**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why do Angular components need communication?
**Expected Answer:** Real UIs are composed of components that must exchange data, user actions, and shared state.

### 2. What is parent-to-child communication?
**Expected Answer:** A parent passes data into a child, commonly through signal inputs such as input().

### 3. What is child-to-parent communication?
**Expected Answer:** A child notifies its parent about an event, commonly through output().

### 4. When should components use shared state instead?
**Expected Answer:** When data is truly shared across multiple unrelated parts of a feature rather than belonging to a direct parent-child contract.

### 5. Why define clear component contracts?
**Expected Answer:** They make ownership, inputs, outputs, and dependencies easier to understand and test.

### 6. What is a common communication anti-pattern?
**Expected Answer:** Using a global service for every interaction even when a simple parent-child contract is sufficient.

### 7. How does component communication affect reusability?
**Expected Answer:** Explicit contracts reduce hidden dependencies and make a component easier to reuse in different features.

### 8. How should communication be tested?
**Expected Answer:** Test that the parent provides the expected input and that child actions produce the expected output or state change.

### 9. JobHub scenario: a job card needs to tell the job list that Apply was clicked. What pattern fits?
**Expected Answer:** Use an output from the job card to emit the application action to the parent list.

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
Why Components Communicate, Angular 21, standalone components, component communication, interview questions, JobHub
