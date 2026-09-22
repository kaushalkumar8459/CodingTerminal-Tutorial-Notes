# Day 215 — Service Testing and Dependency Mocking

## Learning Goal
Test business logic in a service while controlling an injected dependency.

## Scenario
SavedJobsService uses StorageService. A duplicate job ID must not be saved twice.

~~~ts
const storageFake = {
  read: () => [10],
  write: vi.fn(),
};

TestBed.configureTestingModule({
  providers: [
    SavedJobsService,
    { provide: StorageService, useValue: storageFake },
  ],
});

const service = TestBed.inject(SavedJobsService);
service.add(20);

expect(storageFake.write).toHaveBeenCalledWith([10, 20]);
~~~

## Fake vs Spy
- Fake: a small working replacement.
- Spy: records calls or controls a result.
- Mock: a broader test-controlled replacement.

Use the simplest test double that communicates intent. Lightweight collaborators can remain real.

## DI Scope
If a dependency is provided at component or route scope, configure or retrieve it from the correct injector. Root scope and component scope are different contracts.

## Exercise
Test adding a new job, ignoring a duplicate, and preserving existing IDs.

## Common Mistakes
- Mocking every dependency automatically.
- Creating giant unused mock objects.
- Using real network or browser storage in a unit test.

## Interview Questions
1. When would you choose a fake over a spy?
2. Why does dependency injection help testing?
3. Should every service dependency be mocked?

## Expected Outcome
You can isolate business logic without creating brittle mock-heavy tests.
