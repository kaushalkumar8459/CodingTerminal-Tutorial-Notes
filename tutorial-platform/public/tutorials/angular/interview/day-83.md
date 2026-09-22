# Day 83 Interview Questions — output() and model()

## Interview Goal
Explain **output() and model()**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What does output() provide?
**Expected Answer:** It is Angular's modern function-based API for declaring component outputs.

### 2. Why use output()?
**Expected Answer:** It provides a typed event-emission API for child-to-parent communication.

### 3. What is model()?
**Expected Answer:** It declares a writable model input that supports Angular's two-way binding pattern.

### 4. When is output() preferable to model()?
**Expected Answer:** Use output() when the child communicates an event or command and the parent remains the owner of the state.

### 5. When is model() useful?
**Expected Answer:** When a component conceptually owns an editable value while allowing two-way binding with its parent.

### 6. What is a common output design mistake?
**Expected Answer:** Emitting overly generic events that expose implementation details instead of meaningful domain events.

### 7. What is a common model() mistake?
**Expected Answer:** Using two-way binding for complex business state that should have explicit commands and ownership.

### 8. How should outputs be typed?
**Expected Answer:** Define a precise payload type that describes the event contract.

### 9. JobHub scenario: JobCard needs to notify the parent that the user clicked Apply. What fits?
**Expected Answer:** A typed output event such as applicationRequested is clearer than making the entire application workflow two-way.

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
output() and model(), Angular 21, standalone Angular, interview questions, JobHub
