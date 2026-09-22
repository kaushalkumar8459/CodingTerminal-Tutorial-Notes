# Day 221 — Routing, Guards and Navigation Testing

## Learning Goal
Test real route configuration, parameters, guards and navigation.

## Use RouterTestingHarness
RouterTestingHarness reduces boilerplate and tests routed components with a real router configuration.

~~~ts
TestBed.configureTestingModule({
  providers: [
    provideRouter([
      { path: 'jobs/:id', component: JobDetailsComponent },
    ]),
  ],
});

const harness = await RouterTestingHarness.create();
const component = await harness.navigateByUrl('/jobs/42', JobDetailsComponent);

expect(component.id()).toBe(42);
~~~

## Route Parameters
Navigate to a realistic URL and assert the routed component receives the expected parameter.

## Guards
For an authentication guard:
1. configure unauthenticated state
2. navigate to the protected recruiter route
3. assert the login redirect
4. configure authenticated state
5. assert the protected component appears

## Query Parameters
Test a URL such as /jobs?location=Delhi&remote=true and verify the filter state.

## Do Not Mock Router by Default
Real route configuration catches integration problems that a fake Router can hide. Use focused mocks only when a specific dependency boundary requires them.

## Exercise
Test Job details, missing IDs, recruiter protection and query parameters.

## Common Mistakes
- Mocking Router instead of testing navigation.
- Testing only a guard function and not its navigation result.
- Ignoring asynchronous navigation.

## Interview Questions
1. Why use RouterTestingHarness?
2. How do you test a route guard?
3. What is the difference between a guard unit test and a navigation test?

## Expected Outcome
You can test real Angular navigation behavior with modern routing test utilities.
