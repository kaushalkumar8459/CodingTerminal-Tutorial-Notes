# Day 252 — Browser Storage, Cookies and Sensitive Data

## Goal

Understand the security trade-offs of common browser storage mechanisms.

## Options

Common mechanisms include:

- HttpOnly cookies;
- regular cookies;
- sessionStorage;
- localStorage;
- in-memory state.

Each has different behavior around JavaScript access, persistence, tab lifetime, and CSRF/XSS exposure.

## Key Principle

Do not store sensitive information in the browser merely because it is convenient.

Design the authentication mechanism together with:

- XSS defenses;
- CSRF defenses;
- cookie flags;
- expiration;
- server session management.

## Exercise

Create a JobHub data-classification list:

- public data;
- normal user data;
- sensitive user data;
- credentials/session material;
- secrets.

Decide where each belongs.

## Common Mistakes

- Storing secrets in localStorage.
- Treating obfuscation as encryption.
- Putting API keys in frontend source code.
- Assuming HTTPS makes unsafe browser storage safe.

## Interview Questions

1. localStorage vs HttpOnly cookie?
2. What does HttpOnly prevent?
3. What is SameSite?
4. Why should secrets never be shipped to the browser?

## Outcome

You can make storage decisions based on threat models rather than convenience.
