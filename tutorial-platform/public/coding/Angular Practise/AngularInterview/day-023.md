# Day 23 Interview Questions — Why Routing and Navigation?

## Interview Goal
Explain **Why Routing and Navigation?**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why does an Angular application need routing?
**Expected Answer:** Routing maps URLs to views so users can navigate between application features without rebuilding separate pages.

### 2. What problem does client-side routing solve?
**Expected Answer:** It provides navigation and browser URL state within a single-page application.

### 3. What is a route?
**Expected Answer:** A route is configuration that maps a URL path to a component or lazy-loaded feature.

### 4. Why are routes important for deep linking?
**Expected Answer:** A meaningful URL lets users open or share a specific application view directly.

### 5. What is route navigation?
**Expected Answer:** It changes the router state and activates the view associated with the target route.

### 6. How does routing support application architecture?
**Expected Answer:** Routes can define feature boundaries, layouts, guards, and lazy-loading boundaries.

### 7. Why should routing not be introduced too early?
**Expected Answer:** A beginner first needs multiple components and a navigation problem to understand why routing exists.

### 8. What is a common routing anti-pattern?
**Expected Answer:** Putting unrelated application logic into route configuration instead of keeping route definitions focused on navigation and composition.

### 9. JobHub scenario: users need separate URLs for job search and job details. Why use routing?
**Expected Answer:** Each feature can have a meaningful URL and the router can activate the appropriate component based on that URL.

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
Why Routing and Navigation?, Angular 21, standalone components, interview questions, JobHub
