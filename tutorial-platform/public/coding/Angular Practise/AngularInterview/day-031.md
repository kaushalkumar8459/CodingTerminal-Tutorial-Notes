# Day 31 Interview Questions — Mini Project — Multi-Page Job Portal

## Interview Goal
Explain **Mini Project — Multi-Page Job Portal**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What routing concepts should this project demonstrate?
**Expected Answer:** It should demonstrate route configuration, navigation, parameters, query parameters, nested routes, guards, and lazy loading.

### 2. How would you structure the main job portal routes?
**Expected Answer:** Separate public, candidate, recruiter, and fallback areas into clear route boundaries.

### 3. Why use route parameters for job details?
**Expected Answer:** A URL such as /jobs/123 identifies a specific job resource.

### 4. Why use query parameters for job filters?
**Expected Answer:** Filters such as keyword, location, and page are optional URL state that can be shared and restored.

### 5. Where should authentication protection be applied?
**Expected Answer:** At protected route boundaries, while remembering that backend authorization remains the real security boundary.

### 6. How would you lazy-load recruiter features?
**Expected Answer:** Use a route-level lazy-loading boundary so recruiter code is fetched only when needed.

### 7. How would you handle an invalid job ID?
**Expected Answer:** Show an intentional not-found state and provide a path back to the job list.

### 8. What routing architecture mistake should be avoided?
**Expected Answer:** Do not create deep nesting or guards merely for organization; route structure should reflect real navigation and feature boundaries.

### 9. JobHub scenario: a candidate opens a bookmarked filtered job-search URL. What should happen?
**Expected Answer:** The router should restore the search route and query parameters so the same filter state can be reconstructed.

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
Mini Project — Multi-Page Job Portal, Angular 21, standalone components, interview questions, JobHub
