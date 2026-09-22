# Day 34 Interview Questions — Outputs with output()

## Interview Goal
Explain **Outputs with output()**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is output()?
**Expected Answer:** It is Angular's modern API for declaring a component output that emits events to its parent.

### 2. What should an output represent?
**Expected Answer:** A meaningful event or notification that the child wants its parent to handle.

### 3. Why should outputs describe events rather than parent implementation details?
**Expected Answer:** Event-oriented contracts keep children reusable and reduce coupling to parent business logic.

### 4. How does a parent listen to an output?
**Expected Answer:** Bind to the child event in the template, such as (apply)=...

### 5. What type should an output payload have?
**Expected Answer:** Use a specific domain or event type rather than any.

### 6. Should a child call a parent method directly?
**Expected Answer:** No. Use the component's output contract instead of reaching into the parent.

### 7. Can a component expose multiple outputs?
**Expected Answer:** Yes, when each output represents a distinct meaningful event.

### 8. What is a common output anti-pattern?
**Expected Answer:** Creating outputs for every internal state change instead of meaningful component-level events.

### 9. JobHub scenario: JobCard has an Apply button. What should it emit?
**Expected Answer:** A clear event such as apply with the job identity or relevant typed payload.

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
Outputs with output(), Angular 21, standalone components, interview questions, JobHub
