# Day 37 Interview Questions — Content Projection with ng-content

## Interview Goal
Explain **Content Projection with ng-content**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is content projection?
**Expected Answer:** It lets a component render content supplied by its consumer through ng-content.

### 2. Why is content projection useful?
**Expected Answer:** It separates a reusable component's structure from the content the consumer wants to place inside it.

### 3. What is a single-slot projection?
**Expected Answer:** A component exposes one ng-content location for projected content.

### 4. Can a component have multiple projection slots?
**Expected Answer:** Yes, Angular supports selecting different projected content into different slots.

### 5. When should projection be preferred over many inputs?
**Expected Answer:** When consumers need to provide arbitrary template/content structure rather than just data values.

### 6. What is a projection anti-pattern?
**Expected Answer:** Using projection when a simple typed input is sufficient and would make the component contract clearer.

### 7. How does projection help reusable cards?
**Expected Answer:** A card can own layout while consumers provide custom header, body, or actions.

### 8. How is projection different from dynamic component creation?
**Expected Answer:** Projection places consumer-provided content into a component's template; dynamic creation creates component instances programmatically.

### 9. JobHub scenario: a reusable JobCard needs customizable actions. What could you use?
**Expected Answer:** Project the action content while keeping the card's core job display structure reusable.

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
Content Projection with ng-content, Angular 21, standalone components, interview questions, JobHub
