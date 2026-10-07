# Day 91 Interview Questions — Template-Driven Forms Fundamentals

## Interview Goal
Explain **Template-Driven Forms Fundamentals**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a template-driven form?
**Expected Answer:** A form whose controls and validation are primarily configured through template directives, with Angular tracking the form state.

### 2. When are template-driven forms useful?
**Expected Answer:** They can work well for smaller forms with straightforward validation and limited dynamic behavior.

### 3. What does ngModel do?
**Expected Answer:** It connects a form control to component state and participates in Angular's forms tracking.

### 4. Why should form controls have names?
**Expected Answer:** Named controls allow Angular to register them with the parent form and track their state.

### 5. What is ngForm?
**Expected Answer:** It exposes the Angular form directive and its aggregate state for a template-driven form.

### 6. What is a common template-driven anti-pattern?
**Expected Answer:** Putting complex form logic and business rules directly into the template.

### 7. How is validation represented?
**Expected Answer:** Angular exposes control state and validation errors through the form and control directives.

### 8. How would you test a template-driven form?
**Expected Answer:** Render the form, interact with controls, and verify values, validation state, and submission behavior.

### 9. JobHub scenario: create a simple contact form with name and email. When might template-driven forms be reasonable?
**Expected Answer:** When the form is small, mostly static, and its validation and interaction logic remain straightforward.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular API could solve the problem?
- What is the ownership or validation boundary?
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
Template-Driven Forms Fundamentals, Angular 21, standalone Angular, interview questions, JobHub
