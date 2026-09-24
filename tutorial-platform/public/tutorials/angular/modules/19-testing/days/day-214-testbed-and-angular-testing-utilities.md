# Day 214 — TestBed and Angular Testing Utilities

## Learning Goal
Use TestBed and ComponentFixture to test a standalone component.

## Scenario
JobHub displays the number of saved jobs.

~~~ts
@Component({
  standalone: true,
  template: '<p>Saved: {{ savedJobs() }}</p>',
})
export class JobCounterComponent {
  savedJobs = signal(3);
}
~~~

~~~ts
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [JobCounterComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(JobCounterComponent);
  fixture.detectChanges();
});

it('renders the saved job count', () => {
  expect(fixture.nativeElement.textContent).toContain('Saved: 3');
});
~~~

## Core APIs
- TestBed configures the Angular testing injector.
- ComponentFixture owns the created component and rendered DOM.
- detectChanges synchronizes Angular rendering.
- TestBed.inject retrieves configured dependencies.

## Exercise
Create a JobBadgeComponent with Open, Closed and Draft states and test two rendered states.

## Common Mistakes
- Forgetting detectChanges when rendered output is asserted.
- Rebuilding a standalone component instead of importing it.
- Testing private implementation details.

## Interview Questions
1. What problem does TestBed solve?
2. What is ComponentFixture?
3. When is detectChanges needed?

## Expected Outcome
You can create a focused Angular test environment and understand the role of TestBed and ComponentFixture.
