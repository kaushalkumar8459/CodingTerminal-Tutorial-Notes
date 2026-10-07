# Day 31 Interview Questions — Mini Project — Multi-Page Job Portal

## Interview Goal
Explain **Mini Project — Multi-Page Job Portal**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What should a multi-page job portal demonstrate?
**Expected Answer:** It should combine route configuration, links, parameters, query parameters, nested routes, guards, and lazy loading into one coherent feature.

### 2. Why use routes instead of manually hiding components?
**Expected Answer:** Routes give the application meaningful URLs, browser navigation, deep linking, and a clear feature boundary.

### 3. How would job search filters be represented?
**Expected Answer:** Use query parameters for non-sensitive, shareable search state such as keyword, location, and page.

### 4. How would one job be addressed?
**Expected Answer:** Use a route parameter such as jobs/:id.

### 5. How would recruiter-only pages be protected?
**Expected Answer:** Use a client-side authorization guard for navigation UX and enforce authorization again on the backend.

### 6. How would admin features be loaded only when needed?
**Expected Answer:** Use a lazy-loaded route boundary for the admin feature.

### 7. How would job detail tabs be modeled?
**Expected Answer:** Use child routes under the job detail route when each tab needs its own URL and navigation state.

### 8. What should happen for an unknown URL?
**Expected Answer:** Provide a wildcard route leading to a useful not-found experience.

### 9. JobHub scenario: a candidate shares a filtered job-search URL. What should happen?
**Expected Answer:** The application should restore the filters from query parameters and render the same search context.

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
Mini Project — Multi-Page Job Portal, Angular 21, standalone components, component communication, interview questions, JobHub
