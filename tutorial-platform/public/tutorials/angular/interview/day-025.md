# Day 25 Interview Questions — RouterLink, RouterLinkActive and Programmatic Navigation

## Interview Goal
Explain **RouterLink, RouterLinkActive and Programmatic Navigation**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is RouterLink?
**Expected Answer:** It is Angular's directive for declarative navigation from a template.

### 2. Why prefer RouterLink for normal navigation?
**Expected Answer:** It expresses navigation in the template and integrates with Angular routing instead of manually manipulating browser URLs.

### 3. What is RouterLinkActive?
**Expected Answer:** It applies classes or attributes when its associated route is active.

### 4. When is programmatic navigation useful?
**Expected Answer:** When navigation follows an application event or operation such as successful creation or selection.

### 5. How do you navigate programmatically?
**Expected Answer:** Inject Router and call an appropriate navigation method such as navigate().

### 6. Why avoid window.location for internal Angular navigation?
**Expected Answer:** It bypasses Angular router state and can trigger a full browser navigation.

### 7. How can navigation include route parameters?
**Expected Answer:** Pass route segments or a parameter object to the router navigation APIs.

### 8. How should active navigation styles be tested?
**Expected Answer:** Verify the correct link receives the expected active state for the current URL.

### 9. JobHub scenario: after creating a job, navigate to its details page. What approach fits?
**Expected Answer:** Use Router programmatic navigation after the creation operation succeeds.

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
RouterLink, RouterLinkActive and Programmatic Navigation, Angular 21, standalone components, interview questions, JobHub
