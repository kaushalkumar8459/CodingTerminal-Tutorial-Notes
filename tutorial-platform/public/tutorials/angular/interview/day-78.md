# Day 78 Interview Questions — computed()

## Interview Goal
Explain **computed()**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What does computed() provide?
**Expected Answer:** A read-only derived signal based on other signals.

### 2. Why use computed instead of storing duplicate state?
**Expected Answer:** The derived value stays consistent automatically with its source signals.

### 3. Is computed writable?
**Expected Answer:** No. It is read-only from the consumer's perspective.

### 4. When does a computed value recalculate?
**Expected Answer:** When a reactive dependency it actually read changes and the computed value is needed.

### 5. What is dynamic dependency tracking?
**Expected Answer:** Only signals read during the computation become dependencies for that computation.

### 6. What is a common computed anti-pattern?
**Expected Answer:** Using computed for side effects rather than deriving a value.

### 7. Can computed depend on other computed signals?
**Expected Answer:** Yes, derived signals can form a reactive dependency graph.

### 8. How does computed help performance?
**Expected Answer:** It avoids manually recalculating and storing derived state unnecessarily.

### 9. JobHub scenario: show only active jobs from all jobs. What fits?
**Expected Answer:** A computed signal can derive the active-job collection from the source jobs signal.

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
computed(), Angular 21, standalone Angular, interview questions, JobHub
