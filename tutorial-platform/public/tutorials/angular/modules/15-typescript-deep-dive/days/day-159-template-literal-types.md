---
id: "angular-day-159"
title: "Template Literal Types"
slug: "day-159-template-literal-types"
dayLabel: "Day 159"
level: Advanced
estimatedMinutes: 90
order: 159
track: angular
youtubeVideos: []
---
# Day 159 — Template Literal Types

## Goal
Generate constrained string types from other types.

## Example
~~~ts
type Entity = 'job' | 'user';
type Action = 'create' | 'update' | 'delete';

type Permission = `${Entity}:${Action}`;

const permission: Permission = 'job:update';
~~~

## Concept
Template literal types combine literal unions into predictable string contracts.

## Exercise
Model feature-event names such as `job:created`, `job:updated`, and `job:deleted`.

## Common Mistakes
- Treating template literal types as runtime string validation.
- Generating huge unions unnecessarily.

## Interview Questions
1. What is a template literal type?
2. How does it combine unions?
3. Where can it help in an application?

## Outcome
You can create precise string contracts for events, permissions, and keys.
