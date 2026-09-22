# Day 227 — OnPush and Signal-Driven Rendering

## Goal
Learn how OnPush-compatible components and signals help Angular avoid unnecessary rendering work.

## Concept
OnPush-compatible components allow Angular to skip unchanged subtrees. A signal read by a template provides a precise notification when that state changes.

~~~ts
@Component({
  selector: 'app-job-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h3>{{ job().title }}</h3>'
})
export class JobCardComponent {
  readonly job = input.required<Job>();
}
~~~

Prefer small state → signal → computed value → template over hidden mutation and broad manual refreshes.

## Exercise
Convert a JobHub list item's local UI state to signals and keep its component boundary focused.

## Common Mistakes
- Mutating input objects in place.
- Treating OnPush as a magic performance switch.
- Creating signals without a reason.
- Manually forcing change detection unnecessarily.

## Interview Questions
1. What does OnPush change?
2. How do signals help rendering?
3. When can a subtree be skipped?
4. Why does immutability help boundaries?

## Outcome
You can design predictable rendering boundaries.