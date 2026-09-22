# Day 281 — Final Project Vision, Requirements and Architecture

Define the enterprise JobHub capstone, personas, scope, success criteria and architecture. Map the project to the Angular skills learned so far.

## Goal
Turn the earlier JobHub work into one production-style application that integrates Angular fundamentals, modern reactivity, forms, HTTP, state management, testing, performance, security, SSR and micro frontends.

## Project Scope
JobHub has Candidate, Recruiter and Admin experiences. A lightweight host composes independently deployable feature frontends. Backend APIs may be real or contract-driven/mock during development.

## Architecture
- Angular standalone application model
- Feature/domain boundaries
- Signals and SignalStore where shared complexity requires it
- HttpClient/httpResource for data access where appropriate
- RxJS only for genuinely stream-oriented workflows
- Native Federation for remote feature applications
- Vitest for automated tests
- Responsive, accessible and secure UI

## Exercise
Create a requirements checklist and draw the runtime architecture before writing feature code.

## Common Mistakes
Starting with components before defining boundaries; putting all state in a global store; coupling remotes through internal implementation details; treating browser configuration as a secret store.

## Interview Questions
1. What makes this an enterprise application rather than a large component demo?
2. How would you decide whether a capability belongs in the host or a remote?
3. Which boundaries should remain stable as the project grows?

## Outcome
You have a written architecture and implementation backlog for the final JobHub project.

## Prerequisites

Complete Days 1–280. This capstone assumes the learner already knows Angular fundamentals, Signals, forms, HTTP, RxJS, state management, testing, performance, SSR/hydration, security, enterprise architecture, and Micro Frontends.

## Acceptance Criteria

Before implementation begins, the team can explain each major technology choice in terms of a concrete requirement, identify ownership boundaries, and describe how Candidate, Recruiter, and Admin workflows are separated.

## Challenge

For every major technology in the architecture, answer: **What concrete requirement makes this technology necessary?** If there is no clear answer, do not add the technology merely for demonstration.
