# Day 37 Interview Questions — Content Projection with ng-content

## Interview Goal
Explain **Content Projection with ng-content**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is content projection?
**Expected Answer:** It lets a component render content supplied by its consumer inside the component's template.

### 2. Why is content projection useful?
**Expected Answer:** It separates reusable container structure from consumer-provided content.

### 3. What element enables projection?
**Expected Answer:** ng-content marks where projected content is rendered.

### 4. What are projection slots?
**Expected Answer:** Multiple ng-content selectors can create distinct content regions based on selectors.

### 5. How is projection different from an input?
**Expected Answer:** An input passes data; projection passes template content that the component renders.

### 6. When should projection be preferred?
**Expected Answer:** Use it for flexible container components such as cards, panels, dialogs, and layout shells.

### 7. What is a common projection mistake?
**Expected Answer:** Using projection when a simple typed input or dedicated component API would make the contract clearer.

### 8. How does projection support reusable UI?
**Expected Answer:** The container controls layout while consumers control the content placed into defined slots.

### 9. JobHub scenario: a reusable job panel needs header, body, and actions supplied by different consumers. What pattern fits?
**Expected Answer:** Use content projection with clear slots/selectors where appropriate.

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
Content Projection with ng-content, Angular 21, standalone components, component communication, interview questions, JobHub
