# Day 249 — CSP, Trusted Types and AOT

## Goal

Add browser-level defense against classes of injection attacks.

## Content Security Policy

CSP limits which resources and execution paths a page can use. Angular recommends CSP as an additional XSS defense.

A production policy must be designed for the application's actual resources rather than copied blindly.

## Trusted Types

Trusted Types can require dangerous DOM sinks to receive approved trusted values. Angular documents Angular-specific Trusted Types policies for its runtime and bundler.

## AOT

Angular recommends the AOT compiler for production. Dynamically constructing Angular templates from user input is a security anti-pattern because templates are executable code.

## Exercise

Create a security-header checklist for JobHub:

- CSP;
- Trusted Types;
- HTTPS;
- cookie policy;
- framing policy;
- referrer policy;
- permissions policy.

## Common Mistakes

- Copying a restrictive CSP without testing application resources.
- Adding unsafe-inline or unsafe-eval without understanding the impact.
- Dynamically generating Angular templates from user data.
- Treating CSP as a replacement for secure application code.

## Interview Questions

1. What does CSP protect against?
2. What are Trusted Types?
3. Why is AOT important for security?
4. Can CSP replace input validation?

## Outcome

You understand defense-in-depth at the browser boundary.
