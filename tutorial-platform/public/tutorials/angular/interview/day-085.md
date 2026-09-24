# Day 85 Interview Questions — linkedSignal()

## Interview Goal
Explain **linkedSignal()**, implement the relevant Angular pattern, and apply it to a realistic JobHub scenario.

## Interview Questions

### 1. What is linkedSignal()?
**Expected Answer:** It creates writable reactive state that is linked to a source signal or computation while allowing the value to be changed.

### 2. Why is linkedSignal useful?
**Expected Answer:** It fits cases where a value should reset or derive from changing source state but still be user-editable.

### 3. How is linkedSignal different from computed?
**Expected Answer:** computed is read-only derived state, while linkedSignal can be written and can react to changes in its source.

### 4. What problem can linkedSignal solve?
**Expected Answer:** It can represent dependent editable state without manually synchronizing separate signals.

### 5. What is a common anti-pattern?
**Expected Answer:** Using linkedSignal simply because it is available when a normal signal or computed value is sufficient.

### 6. How should linked state be modeled?
**Expected Answer:** Keep the source relationship explicit and make the reset or derivation behavior understandable.

### 7. What should you consider when the source changes?
**Expected Answer:** Decide what should happen to the linked value when its source changes and ensure the behavior matches the UX.

### 8. How would you test linkedSignal behavior?
**Expected Answer:** Change the source, verify the linked value, then write the linked value and verify the expected independent behavior.

### 9. JobHub scenario: a job form defaults its selected location from the selected company but lets the user override it. What signal concept can fit?
**Expected Answer:** linkedSignal can represent a value linked to the company selection while remaining writable by the user.

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
linkedSignal(), Angular 21, standalone Angular, interview questions, JobHub
