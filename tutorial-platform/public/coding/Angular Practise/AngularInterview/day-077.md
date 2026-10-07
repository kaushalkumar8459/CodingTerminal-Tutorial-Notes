# Day 77 Interview Questions — signal()

## Interview Goal
Explain **signal()**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What does signal() create?
**Expected Answer:** It creates a writable reactive signal containing a current value.

### 2. How do you read a signal?
**Expected Answer:** Call the signal as a function, such as count().

### 3. How do you update a writable signal?
**Expected Answer:** Use set() for a replacement value or update() when deriving the next value from the current value.

### 4. Why is direct mutation risky for object state?
**Expected Answer:** Mutating an object in place can make state changes less explicit and can break assumptions about immutable updates.

### 5. When should update() be used?
**Expected Answer:** When the next value depends on the current value.

### 6. What should templates do with signals?
**Expected Answer:** Read them as functions so Angular can track the reactive dependency.

### 7. What is a common mistake?
**Expected Answer:** Forgetting to call the signal and binding the signal object instead of its current value.

### 8. How should signal state be modeled?
**Expected Answer:** Keep state minimal and derive secondary values rather than storing duplicates.

### 9. JobHub scenario: selectedJobId changes when a user clicks a job. What could represent it?
**Expected Answer:** A writable signal such as signal<string | null>(null) can own the selected ID.

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
signal(), Angular 21, standalone Angular, interview questions, JobHub
