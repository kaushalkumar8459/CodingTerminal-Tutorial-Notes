# Day 38 Interview Questions — View Queries with viewChild() and viewChildren()

## Interview Goal
Explain **View Queries with viewChild() and viewChildren()**, implement the relevant Angular pattern, discuss trade-offs, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is a view query?
**Expected Answer:** It lets a component obtain references to elements, directives, or child components in its own view.

### 2. What is viewChild()?
**Expected Answer:** It provides a query for one matching item from the component's view.

### 3. What is viewChildren()?
**Expected Answer:** It provides a query for multiple matching items from the component's view.

### 4. Why should queries not replace normal component communication?
**Expected Answer:** Inputs and outputs provide clearer declarative contracts; queries are useful when the parent needs imperative access to its own view.

### 5. When is a view query useful?
**Expected Answer:** Examples include focusing an element or interacting with a child component API when declarative binding is insufficient.

### 6. What should you consider with conditional elements?
**Expected Answer:** A queried item may not exist until the relevant view is rendered, so query state must be handled correctly.

### 7. Why can imperative view access increase coupling?
**Expected Answer:** The parent becomes dependent on the child's internal API or DOM structure.

### 8. What is a common query anti-pattern?
**Expected Answer:** Using DOM queries for state communication that should have been an input, output, or service.

### 9. JobHub scenario: after opening a search panel, focus its input. What Angular capability could help?
**Expected Answer:** A view query can obtain the input reference and focus it at an appropriate lifecycle/render point.

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
View Queries with viewChild() and viewChildren(), Angular 21, standalone components, interview questions, JobHub
