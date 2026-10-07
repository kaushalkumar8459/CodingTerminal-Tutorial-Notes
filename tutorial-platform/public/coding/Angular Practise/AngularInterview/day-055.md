# Day 55 Interview Questions — Component Contracts and Reusability

## Interview Goal
Explain **Component Contracts and Reusability**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a good component contract?
**Expected Answer:** It clearly defines inputs, outputs, supported content, and expected behavior.

### 2. Why minimize public API surface?
**Expected Answer:** A smaller API is easier to understand, test, and keep backward compatible.

### 3. What should a reusable component not expose?
**Expected Answer:** Internal implementation details that consumers do not need to control.

### 4. Why are semantic outputs better than generic outputs?
**Expected Answer:** Events such as applyJob communicate intent more clearly than generic events carrying internal details.

### 5. How can required inputs improve contracts?
**Expected Answer:** They make essential dependencies explicit and allow Angular's type checking to catch missing configuration.

### 6. What is a breaking component change?
**Expected Answer:** Changing or removing a public input/output or altering its expected behavior in a way consumers must adapt to.

### 7. How should shared components be documented?
**Expected Answer:** Document purpose, inputs, outputs, supported usage, accessibility expectations, and important constraints.

### 8. What is a common contract mistake?
**Expected Answer:** Adding inputs for every visual detail until the component becomes difficult to use.

### 9. JobHub scenario: a shared button has 15 boolean inputs. What should you review?
**Expected Answer:** Look for a simpler semantic API or variant model and remove options that do not represent real supported states.

## Interviewer Follow-Ups
- Why did you choose this approach?
- What alternative Angular approach could solve the same problem?
- Who owns the state or dependency?
- How would you test this behavior?
- What would you change for a large enterprise application?

## Common Interview Trap
Do not memorize syntax alone. Explain why the pattern fits the problem, where the responsibility belongs, and what the trade-offs are.

## Self-Assessment
- [ ] I can explain the concept without documentation.
- [ ] I can write a small example from memory.
- [ ] I can explain one trade-off.
- [ ] I can solve the JobHub scenario.
- [ ] I can answer follow-up questions.

## Interview Readiness
**Ready** when you can explain the topic in 60–90 seconds, implement a small example, and defend your design choice.

## Keywords
Component Contracts and Reusability, Angular 21, standalone components, interview questions, JobHub
