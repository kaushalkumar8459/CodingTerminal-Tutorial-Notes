# Day 250 — CSRF/XSRF, XSSI and Secure HTTP

## Goal

Understand common HTTP-level web attacks and Angular's client-side support.

## CSRF/XSRF

CSRF tricks a user's browser into sending an unwanted authenticated request. Angular HttpClient provides XSRF configuration support, but the primary mitigation must be implemented correctly on the server.

## Example

~~~ts
provideHttpClient(
  withXsrfConfiguration({
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN',
  }),
)
~~~

Use names that match the server contract.

## XSSI

Angular HttpClient recognizes the conventional XSSI JSON prefix and removes it before parsing.

## Exercise

Document the JobHub API's authentication, CSRF/XSRF, CORS, and cookie contract.

## Common Mistakes

- Assuming an XSRF client setting secures an incorrectly configured server.
- Using permissive CORS as an authentication mechanism.
- Sending credentials to unintended origins.
- Ignoring SameSite cookie behavior.

## Interview Questions

1. What is CSRF?
2. What does Angular's XSRF support do?
3. What is XSSI?
4. Why is CORS not an authentication system?

## Outcome

You can reason about browser-to-API security boundaries.
