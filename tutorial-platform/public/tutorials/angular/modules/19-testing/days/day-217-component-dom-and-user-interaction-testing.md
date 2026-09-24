# Day 217 — Component DOM and User Interaction Testing

## Learning Goal
Test the interaction a real user performs.

## Scenario
A JobHub favorite button changes from Save job to Saved.

~~~ts
const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

expect(button.textContent).toContain('Save job');

button.click();
fixture.detectChanges();

expect(button.textContent).toContain('Saved');
~~~

The important flow is **user action → state change → visible result**.

## Interaction Rules
Use the semantic event a user would trigger: click, input, change, submit or keyboard interaction when it is part of the feature contract.

Do not call component methods directly when the test is supposed to prove the UI interaction.

## Async UI
Wait for the actual completion condition. Do not add arbitrary setTimeout delays.

## Exercise
Test a JobHub search box: enter a keyword, submit, and verify the results message.

## Common Mistakes
- Calling component methods instead of simulating user behavior.
- Arbitrary timeouts.
- Fragile CSS ancestry.
- Testing styling with no behavioral contract.

## Interview Questions
1. Why test the DOM interaction?
2. How would you test a button that navigates?
3. How do you handle asynchronous UI?

## Expected Outcome
You can write interaction tests that represent realistic user behavior.
