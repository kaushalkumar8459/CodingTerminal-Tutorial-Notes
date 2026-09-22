# Day 40 Interview Questions — Mini Project — Reusable Job Dashboard

## Interview Goal
Explain **Mini Project — Reusable Job Dashboard**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What should a reusable Job Dashboard demonstrate?
**Expected Answer:** It should combine inputs, outputs, model binding where appropriate, projection, queries, and clear component boundaries.

### 2. How should the dashboard receive job data?
**Expected Answer:** A feature/container component can own the job collection and pass relevant data through typed inputs.

### 3. How should JobCard notify the dashboard about Apply?
**Expected Answer:** Use a typed output carrying the required job identity or action data.

### 4. Where might model() be useful?
**Expected Answer:** For an intentionally two-way value such as selected filter or page size.

### 5. Where could content projection help?
**Expected Answer:** A reusable dashboard panel can project custom actions or headers.

### 6. When might viewChild() be useful?
**Expected Answer:** For focused UI behavior such as focusing a search field or coordinating a specific child view.

### 7. How do you keep the dashboard reusable?
**Expected Answer:** Keep domain orchestration outside low-level UI components and define small explicit contracts.

### 8. How would you test the component hierarchy?
**Expected Answer:** Test input rendering, output events, two-way interactions, projected content, and important user flows.

### 9. JobHub scenario: recruiter and candidate dashboards both need the same JobCard. How should reuse be achieved?
**Expected Answer:** Keep JobCard domain-light with typed inputs/outputs and let each feature provide its own orchestration.

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
Mini Project — Reusable Job Dashboard, Angular 21, standalone components, component communication, interview questions, JobHub
