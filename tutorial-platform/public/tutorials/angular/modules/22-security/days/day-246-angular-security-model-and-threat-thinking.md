# Day 246 — Angular Security Model and Threat Thinking

## Goal

Understand what Angular protects automatically and what remains the application's responsibility.

## Concept

Angular security has multiple layers:

- template and DOM protection;
- HTTP-level protections;
- browser security policies;
- authentication;
- authorization;
- server-side validation;
- dependency and deployment security.

Angular specifically documents built-in protections for XSS, XSRF, and XSSI, while authentication and authorization remain application-level concerns.

## Threat Thinking

For every feature ask:

1. What input is attacker-controlled?
2. Where does it enter?
3. What trust boundary does it cross?
4. What executes or renders it?
5. What happens if the server is also sent malicious input?

## Exercise

Threat-model JobHub login, job descriptions, profile editing, file upload, and admin pages.

## Common Mistakes

- Assuming Angular makes the entire application secure.
- Validating only on the client.
- Trusting data because it came from an API.
- Ignoring server-side authorization.

## Interview Questions

1. What security protections does Angular provide?
2. What is an application trust boundary?
3. Why is client-side validation insufficient?
4. Which security responsibilities belong on the server?

## Outcome

You can identify security boundaries before choosing implementation details.
