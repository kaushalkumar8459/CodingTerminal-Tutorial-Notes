# Day 227 — OnPush and Signal-Driven Rendering

## Learning Goal
Understand OnPush as a rendering-boundary tool and signals as precise state notifications.

## Prerequisites
- Days 76–89: Signals
- Day 226: rendering cost

## Angular 21 Context
For Angular 21:
- **Zoneless is the default.**
- `OnPush` is **not required** for zoneless.
- `OnPush` remains important for existing applications, libraries and interview knowledge.
- Angular recommends OnPush as a step toward zoneless-compatible components.

Do not teach OnPush as the single modern Angular performance solution.

## Example

```ts
@Component({
  selector: 'app-job-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h3>{{ job().title }}</h3>',
})
export class JobCardComponent {
  readonly job = input.required<Job>();
}
```

A signal read by a template gives Angular a precise notification when that state changes.

## Boundary Thinking
Good component boundaries clarify:
- local vs shared state
- which view depends on which signal
- which subtree can remain unchanged
- where expensive work belongs

Avoid mutating shared input objects in place. Update the owning state immutably.

## Exercise
Measure a JobHub list before and after introducing focused component boundaries and appropriate OnPush/signal-driven state. Keep only changes that show benefit or satisfy a compatibility requirement.

## Common Mistakes
- Treating OnPush as a magic switch.
- Adding signals without a state problem.
- Mutating shared objects.
- Manually forcing change detection unnecessarily.

## Interview Questions
1. What does OnPush change?
2. Is OnPush required for zoneless Angular?
3. How do signals notify Angular?
4. Why do component boundaries matter?

## Expected Outcome
You can explain OnPush accurately without confusing it with the Angular 21 zoneless model.
