---
id: angular-day-265
title: Enterprise Authentication Authorization and Permission Architecture
day: 265
module: 23
---

# Day 265 — Enterprise Authentication, Authorization and Permission Architecture

## Goal

Design authentication and authorization as explicit application boundaries.

## Separate the concepts

**Authentication**

> Who is the user?

**Authorization**

> What is this user allowed to do?

The backend must remain authoritative for protected operations. Frontend guards and permission checks improve navigation and UX but are not a security boundary.

## Architecture

A practical model:

~~~text
Auth bootstrap
   ↓
Session state
   ↓
Identity
   ↓
Permission model
   ↓
Route / UI checks
   ↓
Backend authorization
~~~

## Permission model

Prefer meaningful permissions:

~~~text
jobs.read
jobs.create
jobs.update
jobs.delete
users.manage
~~~

over scattering role-name checks throughout templates.

A role can map to permissions centrally.

## Feature boundary

Features should consume an authorization contract such as:

~~~ts
can('jobs.update')
~~~

rather than knowing token-storage details.

## Exercise

Design JobHub permissions for Candidate, Recruiter, and Admin. Identify which checks belong in routing, UI, and backend.

## Common mistakes

- Treating route guards as backend security.
- Checking raw role strings everywhere.
- Mixing authentication storage with feature code.
- Exposing sensitive authorization rules only in the browser.

## Outcome

You can create a permission architecture that keeps authentication infrastructure separate from business features.
