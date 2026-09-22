# Day 220 — HTTP Testing and API Services

## Learning Goal
Test an Angular API service without making a real network request.

## Modern Setup
Use provideHttpClientTesting() and HttpTestingController.

If HTTP features such as interceptors are configured, provideHttpClient(...) before provideHttpClientTesting().

~~~ts
TestBed.configureTestingModule({
  providers: [
    provideHttpClient(),
    provideHttpClientTesting(),
    JobApiService,
  ],
});

const http = TestBed.inject(HttpTestingController);
~~~

## Scenario

~~~ts
service.search('angular').subscribe(jobs => {
  expect(jobs).toHaveLength(1);
});

const request = http.expectOne('/api/jobs?keyword=angular');
expect(request.request.method).toBe('GET');

request.flush([
  { id: 1, title: 'Angular Developer' },
]);
~~~

## Cleanup

~~~ts
afterEach(() => {
  TestBed.inject(HttpTestingController).verify();
});
~~~

## Test These Behaviors
- query parameters
- headers
- request bodies
- empty responses
- 401/403/404/500 behavior
- interceptor behavior when relevant
- multiple intentional requests with match()

httpResource() uses the HttpClient testing infrastructure too; its maturity is version-sensitive and should match the tutorial's Angular version.

HttpClientTestingModule is deprecated in current Angular documentation. Prefer provider-based setup.

## Exercise
Test successful, empty and failed JobHub searches.

## Interview Questions
1. Why should unit tests avoid real APIs?
2. What does HttpTestingController do?
3. Why does provider order matter?
4. How do you verify there are no outstanding requests?

## Expected Outcome
You can test typed HTTP services with deterministic requests and responses.
