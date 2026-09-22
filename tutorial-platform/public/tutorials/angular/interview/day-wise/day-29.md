# Day 29 Interview Questions — Guards and Route Protection

## Interview Goal
Explain **Guards and Route Protection**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a route guard?
**Expected Answer:** It is router logic that controls whether navigation or route activation should proceed.

### 2. What is the purpose of an authentication guard?
**Expected Answer:** It can prevent unauthenticated users from entering protected application areas.

### 3. Why are guards not a security boundary?
**Expected Answer:** The browser is controlled by the user; real authorization must be enforced by the backend.

### 4. What should an authentication guard return?
**Expected Answer:** It can allow navigation or return an appropriate router decision such as a UrlTree/redirect result.

### 5. What is the difference between authentication and authorization?
**Expected Answer:** Authentication establishes identity; authorization determines what that identity is allowed to access.

### 6. Why prefer functional guards in modern Angular?
**Expected Answer:** They work naturally with standalone APIs and inject dependencies directly.

### 7. Should a guard contain large API workflows?
**Expected Answer:** Keep guards focused on navigation decisions; complex business operations belong in appropriate services or data-access layers.

### 8. How should unauthorized access be handled?
**Expected Answer:** Redirect or render an appropriate access-denied flow without exposing protected data.

### 9. JobHub scenario: only recruiters can access /recruiter/jobs/new. What layers are required?
**Expected Answer:** A client-side guard can improve navigation UX, but the backend must also enforce recruiter authorization.

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
Guards and Route Protection, Angular 21, standalone components, interview questions, JobHub
