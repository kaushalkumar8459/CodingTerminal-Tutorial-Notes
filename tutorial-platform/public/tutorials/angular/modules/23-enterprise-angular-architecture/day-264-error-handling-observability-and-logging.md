---
id: angular-day-264
title: Error Handling, Observability and Logging
day: 264
module: 23
---

# Day 264 — Error Handling, Observability and Logging

## Goal

Design errors and observability as application architecture rather than scattered console statements.

## Error categories

Separate:

- expected validation errors
- authentication/authorization errors
- network failures
- backend failures
- unexpected application errors

The UI should convert technical failures into useful user-facing states.

## Observability

A production application may need:

~~~text
Logs
Metrics
Traces
Error reports
Performance signals
~~~

Do not send sensitive information merely because it is convenient for debugging.

## Logging contract

Prefer structured events:

~~~ts
interface AppLogEvent {
  event: string;
  feature: string;
  severity: 'info' | 'warn' | 'error';
  correlationId?: string;
}
~~~

Avoid logging credentials, tokens, or unnecessary sensitive data.

## Exercise

Design a JobHub error flow:

~~~text
HTTP failure
  ↓
data-access error
  ↓
feature state
  ↓
user-facing error
  ↓
observability event
~~~

## Common mistakes

- Logging tokens or sensitive user information.
- Showing raw backend errors to users.
- Catching every error and silently continuing.
- Using console logging as the production observability strategy.

## Outcome

You can design consistent error handling and safe observability across features.
