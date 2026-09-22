# Day 218 — Testing Inputs, Outputs and Content

## Learning Goal
Test modern Angular component contracts using input(), output(), and content projection.

## Scenario
A reusable JobCard receives a title, emits save, and projects help content.

~~~ts
@Component({
  standalone: true,
  template: '<article><h2>{{ title() }}</h2><button (click)="save.emit()">Save</button><ng-content /></article>',
})
export class JobCardComponent {
  title = input.required<string>();
  save = output<void>();
}
~~~

## Input
Set the public input, render, and assert the visible title.

## Output
Subscribe to the output, perform the user action, and assert that the parent-facing event occurred.

## Content Projection
Use a small host component that projects realistic content. Assert that the content is visible in the composed card.

For model(), test the externally visible two-way contract when the feature uses it.

## Exercise
Build tests for a JobFilter with location input, selection output, and projected help text.

## Common Mistakes
- Reaching into private state.
- Only asserting that an output exists.
- Testing projection without a realistic host.
- Falling back to legacy @Input/@Output in new examples.

## Interview Questions
1. How do you test input()?
2. What should an output test prove?
3. Why is a host component useful for projection?

## Expected Outcome
You can test modern Angular component contracts as public APIs.
