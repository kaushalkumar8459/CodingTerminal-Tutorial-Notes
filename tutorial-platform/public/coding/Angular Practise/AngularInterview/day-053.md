# Day 53 Interview Questions — Template Fragments and Dynamic UI Composition

## Interview Goal
Explain **Template Fragments and Dynamic UI Composition**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is template composition?
**Expected Answer:** It is the practice of building UI from reusable template or component pieces instead of duplicating markup.

### 2. Why use template fragments?
**Expected Answer:** They can keep repeated template sections organized and reusable within the appropriate boundary.

### 3. When should a fragment become a component?
**Expected Answer:** When it has an independent responsibility, state, contract, or meaningful reuse across features.

### 4. What is dynamic UI composition?
**Expected Answer:** Choosing which UI component or content to render based on application state or configuration.

### 5. Why should dynamic composition be typed?
**Expected Answer:** A typed mapping makes supported UI variants explicit and reduces unsafe runtime decisions.

### 6. What is a common dynamic-composition mistake?
**Expected Answer:** Turning arbitrary backend strings into component types without validation or a controlled mapping.

### 7. How can composition support dashboards?
**Expected Answer:** A dashboard can select known widget components based on a typed configuration.

### 8. When is projection better than dynamic component selection?
**Expected Answer:** Projection fits consumer-supplied template content; dynamic components fit a runtime choice among known component types.

### 9. JobHub scenario: different user roles see different dashboard widgets. How should this be designed?
**Expected Answer:** Use explicit role/feature configuration and a controlled component composition strategy rather than arbitrary dynamic rendering.

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
Template Fragments and Dynamic UI Composition, Angular 21, standalone components, interview questions, JobHub
