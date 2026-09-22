# Day 52 Interview Questions — Content Projection and Slots

## Interview Goal
Explain **Content Projection and Slots**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is content projection?
**Expected Answer:** It allows a consumer to supply template content that a component renders through ng-content.

### 2. Why is projection useful for reusable components?
**Expected Answer:** It allows a component to own structure while consumers customize content.

### 3. What is a projection slot?
**Expected Answer:** A selected ng-content region that accepts matching projected content.

### 4. Projection vs input?
**Expected Answer:** Inputs pass values; projection passes template content.

### 5. When is projection useful for a card or panel?
**Expected Answer:** When headers, bodies, actions, or other content vary while the surrounding structure stays consistent.

### 6. How can multiple slots be created?
**Expected Answer:** Use multiple ng-content elements with selectors that identify the intended projected content.

### 7. What is a projection design mistake?
**Expected Answer:** Creating complicated slot rules when a simpler component API would be clearer.

### 8. How does projection affect reusability?
**Expected Answer:** Consumers can customize content without modifying the reusable container component.

### 9. JobHub scenario: an application panel needs custom header and footer actions in different features. What fits?
**Expected Answer:** Use clearly defined projection slots so each feature can provide its own content.

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
Content Projection and Slots, Angular 21, standalone components, interview questions, JobHub
