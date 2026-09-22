# Day 216 — Component Testing Basics

## Learning Goal
Test a standalone JobCard through its rendered contract.

## Scenario
The card displays a title and Remote badge.

~~~ts
@Component({
  standalone: true,
  template: '<article><h2>{{ title }}</h2>@if (isRemote) { <span>Remote</span> }',
})
export class JobCardComponent {
  title = 'Angular Developer';
  isRemote = true;
}
~~~

~~~ts
fixture = TestBed.createComponent(JobCardComponent);
fixture.detectChanges();

expect(fixture.nativeElement.textContent).toContain('Angular Developer');
expect(fixture.nativeElement.textContent).toContain('Remote');
~~~

## Component Test Layers
1. Creation — required dependencies are available.
2. Rendering — correct UI appears for state.
3. Interaction — user actions produce behavior.
4. State transition — input/signal/form changes update the UI.

Prefer importing the real standalone component. Replace only meaningful external dependencies.

## Exercise
Add a location field and test its rendered value.

## Common Mistakes
- Testing private methods instead of observable behavior.
- Fragile selectors.
- Unrelated assertions in one test.

## Interview Questions
1. What should a component test prove?
2. Why use ComponentFixture?
3. Why are DOM assertions often more valuable than private method assertions?

## Expected Outcome
You can write a focused component test without coupling it to implementation details.
