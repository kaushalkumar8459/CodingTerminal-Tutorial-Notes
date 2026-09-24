# Day 84 Interview Questions — Signal Queries

## Interview Goal
Explain **Signal Queries**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What are signal queries?
**Expected Answer:** They are modern query APIs that expose queried view or content references through signals.

### 2. What is viewChild() used for?
**Expected Answer:** It can query a child component, directive, or matching element from the component's view.

### 3. What is viewChildren() used for?
**Expected Answer:** It queries multiple matching items in the component's view.

### 4. Why are signal queries useful?
**Expected Answer:** The query result participates in Angular's reactive model and can be read as signal state.

### 5. What should you avoid with view queries?
**Expected Answer:** Avoid using queries to tightly couple components or bypass normal input/output contracts.

### 6. When is a view query appropriate?
**Expected Answer:** When the parent genuinely needs a reference to a child view object or DOM-related capability.

### 7. What is a common mistake?
**Expected Answer:** Using viewChild to exchange ordinary business data that should use inputs, outputs, services, or state.

### 8. How can query timing matter?
**Expected Answer:** The query result depends on the relevant view being created and can change as conditional or repeated content changes.

### 9. JobHub scenario: an admin page needs to call a focus method on a search input component. What can fit?
**Expected Answer:** A viewChild query can provide the reference when direct component interaction is genuinely required.

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
Signal Queries, Angular 21, standalone Angular, interview questions, JobHub
