# Day 219 — Testing Signals, Forms and Async State

## Learning Goal
Test signal state, form validation and asynchronous UI deterministically.

## Signals

~~~ts
count = signal(0);
doubleCount = computed(() => this.count() * 2);

expect(component.doubleCount()).toBe(0);
component.count.set(3);
expect(component.doubleCount()).toBe(6);
~~~

When the signal drives the UI, also test the rendered result.

## Forms
For a JobHub application form, test required fields, invalid-to-valid transitions, cross-field rules, submit state and submitted values.

Assert the application's contract instead of duplicating Angular's validator implementation.

## Async State
Model meaningful states explicitly:

**idle → loading → success**

**idle → loading → error**

Test each transition and wait for real completion rather than sleeping.

## effect()
Do not treat effect() as a replacement for computed(). Test an effect through its externally visible side effect when that side effect is part of the feature contract.

## Exercise
Test a filter form for empty, valid, success and error states.

## Common Mistakes
- Testing scheduling instead of behavior.
- Arbitrary waits.
- Forgetting error UI.
- Using effect() where derived state should be computed.

## Interview Questions
1. How do you test a signal?
2. What should an async UI test verify?
3. When should a signal be tested through the DOM?

## Expected Outcome
You can test modern reactive Angular state without race-prone tests.
