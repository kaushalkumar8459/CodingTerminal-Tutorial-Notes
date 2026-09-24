# Day 72 Interview Questions — AfterViewInit and AfterViewChecked

## Interview Goal
Explain **AfterViewInit and AfterViewChecked**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. Why does AfterViewInit exist?
**Expected Answer:** It provides a lifecycle point after Angular has initialized the component's view and child views.

### 2. When is AfterViewInit useful?
**Expected Answer:** For work that requires the rendered view or view queries to be initialized.

### 3. Why should DOM work be used carefully?
**Expected Answer:** Direct DOM manipulation can bypass Angular's rendering model and can create maintenance, accessibility, SSR, or hydration problems.

### 4. What is AfterViewChecked?
**Expected Answer:** A lifecycle hook that runs after Angular checks the component's view.

### 5. Why should AfterViewChecked contain minimal work?
**Expected Answer:** It can run frequently, so expensive or state-changing work can cause performance problems or repeated rendering.

### 6. What is a common mistake?
**Expected Answer:** Using AfterViewChecked for ordinary initialization or expensive calculations.

### 7. What modern API can help with post-render work?
**Expected Answer:** Angular's render callbacks such as afterNextRender can be more appropriate for post-render browser work.

### 8. How would you test view-dependent behavior?
**Expected Answer:** Create the component, trigger rendering, and assert behavior after the view is initialized.

### 9. JobHub scenario: a job table needs focus applied after it renders. What should guide the implementation?
**Expected Answer:** Use an appropriate post-render or view lifecycle mechanism and keep the DOM interaction focused and accessible.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular API could solve the problem?
- What is the ownership or lifecycle boundary?
- How would you test it?
- What changes at enterprise scale?

## Common Interview Trap
Do not memorize syntax alone. Explain **why**, **when**, and **where** the Angular feature should be used.

## Self-Assessment
- [ ] I can explain the topic without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain a trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
AfterViewInit and AfterViewChecked, Angular 21, standalone Angular, interview questions, JobHub
