# Day 226 — Change Detection and Rendering Costs

## Learning Goal
Understand the work Angular performs to keep templates synchronized with application state.

## Prerequisites
- Days 69–89: lifecycle and signals
- Day 225: performance mental model

## Mental Model
`state change → Angular notification → view checking → template evaluation → DOM update`

Change detection does **not** mean Angular recreates the entire DOM on every check. Cost depends on application structure, state notifications, template work and DOM size.

## Common Sources of Cost
- large component trees
- expensive template expressions
- repeated function calls from templates
- very large DOM lists
- unnecessary notifications
- expensive lifecycle work
- heavy third-party components

Avoid expensive work directly in templates when it is repeatedly evaluated:

```html
<p>{{ calculateSalaryRange(job) }}</p>
```

Move stable derived state into an appropriate `computed()` or precomputed model when measurement shows the expression is a bottleneck.

## Angular 21 and Zoneless
Zoneless scheduling relies on Angular-relevant notifications such as signal updates, input updates, bound listeners and `markForCheck()`.

## Exercise
Profile a JobHub result list. Find one expensive expression and record:

```text
Scenario:
Before:
Root cause:
Change:
After:
Trade-off:
```

## Common Mistakes
- Assuming every check recreates DOM nodes.
- Calling expensive functions repeatedly from templates.
- Using manual change detection before measuring.
- Confusing derived state with side effects.

## Interview Questions
1. What is change detection?
2. What makes rendering expensive?
3. Does change detection recreate the DOM?
4. What notifications matter in zoneless Angular?

## Expected Outcome
You can reason about rendering cost using evidence rather than treating change detection as a black box.
