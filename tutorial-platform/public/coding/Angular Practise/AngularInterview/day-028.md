# Day 28 Interview Questions — Nested and Child Routes and Layouts

## Interview Goal
Explain **Nested and Child Routes and Layouts**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What are child routes?
**Expected Answer:** They are routes configured beneath a parent route and rendered within the parent's router outlet.

### 2. Why use nested routes?
**Expected Answer:** They model hierarchical feature navigation and allow a shared layout to remain while child content changes.

### 3. What is a route layout?
**Expected Answer:** A component that provides persistent UI such as a feature header, tabs, or sidebar around child routes.

### 4. How does a child route render?
**Expected Answer:** It renders into the router outlet provided by its parent component.

### 5. When should routes be nested?
**Expected Answer:** When the URL and UI naturally have a parent-child relationship.

### 6. What is a common nested-route mistake?
**Expected Answer:** Creating deep route nesting merely to organize files when the user-facing navigation does not require it.

### 7. How can tabs use child routes?
**Expected Answer:** Each tab can map to a child route, giving it a deep-linkable URL and browser navigation behavior.

### 8. How does lazy loading interact with nested routes?
**Expected Answer:** A parent feature can lazy-load its route configuration and then compose child routes within that boundary.

### 9. JobHub scenario: /jobs/123 has Overview, Applications, and Activity tabs. How could routing model it?
**Expected Answer:** Use a job-detail parent layout with child routes for overview, applications, and activity.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- What happens when the data changes or the URL changes?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the application problem and which layer owns the responsibility.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Nested and Child Routes and Layouts, Angular 21, standalone components, interview questions, JobHub
