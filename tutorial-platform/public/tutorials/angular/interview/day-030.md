# Day 30 Interview Questions — Lazy Loading and Route-Level Code Splitting

## Interview Goal
Explain **Lazy Loading and Route-Level Code Splitting**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is lazy loading?
**Expected Answer:** It loads a feature's code when the application needs that route instead of putting everything in the initial bundle.

### 2. Why does lazy loading improve application startup?
**Expected Answer:** It can reduce the amount of JavaScript required before the initial feature becomes usable.

### 3. How are standalone components commonly lazy loaded?
**Expected Answer:** Routes can use loadComponent for a component or loadChildren for route configurations.

### 4. What is route-level code splitting?
**Expected Answer:** It creates separate chunks around route boundaries so features can be loaded independently.

### 5. Should every tiny component be lazy loaded?
**Expected Answer:** No. Lazy loading should align with meaningful feature boundaries; excessive fragmentation can add overhead and complexity.

### 6. How does lazy loading support enterprise architecture?
**Expected Answer:** It reinforces feature boundaries and lets rarely used areas load only when needed.

### 7. What should be measured after lazy loading?
**Expected Answer:** Initial bundle size, route load time, network requests, and actual user-perceived performance.

### 8. What is a common lazy-loading mistake?
**Expected Answer:** Lazy loading critical above-the-fold functionality without considering the resulting navigation cost.

### 9. JobHub scenario: admin screens are rarely used by candidates. What is a reasonable boundary?
**Expected Answer:** Lazy-load the admin feature so candidate startup does not require its code.

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
Lazy Loading and Route-Level Code Splitting, Angular 21, standalone components, interview questions, JobHub
