# Day 27 Interview Questions — Query Parameters and Navigation State

## Interview Goal
Explain **Query Parameters and Navigation State**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What are query parameters?
**Expected Answer:** They are URL key-value pairs used to represent optional navigation state, such as filters or pagination.

### 2. Give an example of query parameters.
**Expected Answer:** A URL such as /jobs?location=Delhi&page=2 can represent search state.

### 3. Why are query parameters useful for job search?
**Expected Answer:** They make filters shareable, bookmarkable, and recoverable from the URL.

### 4. Route parameter vs query parameter?
**Expected Answer:** Route parameters identify a route resource; query parameters represent optional state associated with the route.

### 5. How should query parameters be typed?
**Expected Answer:** Parse and validate values into the domain types the feature expects instead of trusting raw URL strings.

### 6. What is navigation state?
**Expected Answer:** It is transient state that can be passed during navigation and is different from durable URL query state.

### 7. When should filters use query parameters?
**Expected Answer:** When the state should survive refresh, be shareable, or correspond to a meaningful URL.

### 8. What is a common query-parameter mistake?
**Expected Answer:** Putting sensitive information or large application state into the URL.

### 9. JobHub scenario: preserve keyword, location, and page when users refresh search. What should you use?
**Expected Answer:** Represent those non-sensitive search values as query parameters and restore the feature state from the URL.

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
Query Parameters and Navigation State, Angular 21, standalone components, interview questions, JobHub
