# Day 26 Interview Questions — Route Parameters

## Interview Goal
Explain **Route Parameters**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a route parameter?
**Expected Answer:** It is a dynamic URL segment, such as :id, used to identify a resource or context.

### 2. How is a route parameter configured?
**Expected Answer:** Define a dynamic segment in the route path, such as jobs/:id.

### 3. Why are route parameters useful?
**Expected Answer:** They allow a URL to represent a specific resource such as one job or candidate.

### 4. How do you read route parameters?
**Expected Answer:** Use the Angular ActivatedRoute APIs or an appropriate modern router pattern to access the route state.

### 5. What is the difference between a route parameter and query parameter?
**Expected Answer:** A route parameter is part of the route path; a query parameter is optional URL query state after the ?.

### 6. What should happen when an ID is invalid?
**Expected Answer:** The feature should handle missing or invalid resources with an intentional not-found or error state.

### 7. How should parameter changes be handled when staying on the same component?
**Expected Answer:** React to the router state changes rather than assuming the component is recreated for every parameter change.

### 8. Why should route IDs be treated as untrusted input?
**Expected Answer:** They come from the URL and must be validated and safely used in API requests.

### 9. JobHub scenario: /jobs/123 loads one job. What should the detail feature do when 123 does not exist?
**Expected Answer:** Show a clear not-found state and provide navigation back to the job list.

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
Route Parameters, Angular 21, standalone components, interview questions, JobHub
