# Day 126 — Authentication Storage and Security

## Goal
Authentication Storage and Security

## Concept
Authentication storage is a threat-model decision, not a one-size-fits-all rule. HttpOnly secure cookies prevent JavaScript from reading the cookie and are useful for server-managed sessions. Memory storage reduces persistence but is lost on reload. Web Storage is accessible to JavaScript and can expose stored secrets if an XSS vulnerability exists. Never store passwords in browser storage.

## Practical Exercise
JobHub exercise: compare cookie sessions and browser-stored bearer tokens for persistence, JavaScript access, CSRF considerations and XSS impact.

## Common Mistakes
Common mistakes: calling localStorage automatically secure; assuming HttpOnly solves every web threat; storing passwords; ignoring CSRF for cookie-based authentication.

## Interview Questions
Interview: HttpOnly prevents client-side JavaScript from reading the cookie, but it does not solve every security problem.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.