# Day 132 — Frontend Security

## XSS

1. Explain reflected, stored, and DOM-based XSS.
2. Understand why inserting untrusted HTML is dangerous.
3. Prefer text rendering over unsafe HTML injection.
4. Explain output encoding and sanitization at a high level.

## CSRF

5. Explain how CSRF works.
6. Understand SameSite cookies.
7. Explain CSRF tokens at a high level.
8. Distinguish CSRF from XSS.

## Prototype Pollution

9. Explain how unsafe object merging can modify object prototypes.
10. Avoid blindly merging untrusted keys.
11. Prefer safe parsing and validated schemas.

## Dangerous APIs

12. Explain risks of `eval()`.
13. Explain risks of `new Function()`.
14. Avoid constructing executable code from untrusted input.
15. Identify unsafe DOM APIs such as uncontrolled `innerHTML`.

## Authentication & Tokens

16. Explain the trade-offs of cookie-based sessions and browser-accessible tokens.
17. Explain why XSS changes the risk profile of JavaScript-readable tokens.
18. Use HTTPS for authenticated traffic.
19. Do not put secrets in frontend source code.

## Interview Questions

20. XSS vs CSRF?
21. Why is HttpOnly useful?
22. Why is localStorage not automatically a secure place for authentication tokens?
23. What is prototype pollution?
24. Why is eval dangerous?
25. How would you secure a frontend form?

## Practice Checklist

Review a sample frontend for XSS, unsafe DOM manipulation, exposed secrets, weak cookie settings, and unsafe object merging.
