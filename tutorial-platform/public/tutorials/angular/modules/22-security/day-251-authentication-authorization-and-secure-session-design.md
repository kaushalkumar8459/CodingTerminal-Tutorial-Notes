# Day 251 — Authentication, Authorization and Secure Session Design

## Goal

Connect Angular authentication patterns with server-enforced authorization.

## Authentication vs Authorization

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

Angular guards and UI permissions improve UX, but they must not be the final authorization boundary. The backend must enforce access to protected resources.

## Session Design

Evaluate:

- session cookies;
- token-based authentication;
- expiration;
- refresh strategy;
- logout;
- revocation;
- CSRF requirements;
- multi-tab behavior.

## Exercise

Threat-model JobHub roles:

- Candidate;
- Recruiter;
- Admin.

For each API operation, document the server-side authorization rule.

## Common Mistakes

- Hiding a button and assuming the action is protected.
- Storing authorization rules only in the frontend.
- Treating route guards as backend security.
- Forgetting token/session expiry.

## Interview Questions

1. Authentication vs authorization?
2. Can Angular guards secure an API?
3. Where should authorization be enforced?
4. What should happen when a session expires?

## Outcome

You can design frontend authentication without confusing it with server authorization.
