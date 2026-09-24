# Day 254 — Mini Project: Security-Hardened JobHub

## Goal

Perform a practical security review of an Angular application.

## Project

Harden JobHub across:

- login;
- job descriptions;
- comments;
- profile editing;
- admin routes;
- API calls;
- dynamic media;
- deployment configuration.

## Requirements

### XSS

- test attacker-controlled text;
- audit innerHTML;
- audit direct DOM APIs;
- review every DomSanitizer bypass call.

### HTTP Security

- configure XSRF where the server contract requires it;
- document CORS;
- review credential handling;
- verify secure cookie settings.

### Authentication

- protect routes for UX;
- enforce authorization on the backend;
- handle expiry and logout;
- avoid shipping secrets.

### Browser Defense

- define a CSP;
- evaluate Trusted Types;
- use AOT production builds.

### Supply Chain

- review dependencies;
- inspect lockfile changes;
- run security checks in CI.

## Security Report

Create:

~~~text
Asset:
Threat:
Attack Surface:
Existing Control:
Gap:
Remediation:
Verification:
~~~

## Final Review

Answer:

1. Where is the strongest trust boundary?
2. Where can attacker-controlled input enter?
3. Which security controls are browser-side?
4. Which controls must be server-side?
5. Which production headers and dependency checks are required?

## Interview Walkthrough

Explain:

threat model → attack surface → Angular protection → server control → defense in depth → verification

## Outcome

You can perform an Angular security review without treating framework features as a substitute for secure backend and infrastructure design.
