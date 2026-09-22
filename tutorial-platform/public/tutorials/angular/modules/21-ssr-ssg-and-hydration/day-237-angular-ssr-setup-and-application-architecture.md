# Day 237 — Angular SSR Setup and Application Architecture

## Goal

Enable server rendering and understand the architecture it introduces.

## Setup

Angular CLI can create an application with SSR enabled:

~~~bash
ng new jobhub --ssr
~~~

An existing application can add Angular SSR with:

~~~bash
ng add @angular/ssr
~~~

Angular's current SSR tooling is provided through @angular/ssr.

## Architecture

A hybrid application has:

- browser application code;
- server rendering configuration;
- server route configuration;
- browser hydration;
- APIs and data services;
- deployment infrastructure.

The same Angular application must be authored with both server and browser execution in mind.

## Exercise

Take the JobHub project and identify code that assumes a browser exists during initial execution.

## Common Mistakes

- Accessing window or document at module evaluation time.
- Assuming every third-party browser library works on the server.
- Treating server rendering as a separate frontend application.
- Ignoring deployment requirements.

## Interview Questions

1. How do you enable SSR in Angular?
2. What does @angular/ssr provide?
3. Why can browser-only code fail during SSR?
4. What changes when an Angular app has a server runtime?

## Outcome

You understand the architecture introduced by SSR.


## Angular 21 Version Note

Use the current `@angular/ssr` workflow. Do not teach the older `@nguniversal/express-engine` setup as the primary Angular 21 path.
