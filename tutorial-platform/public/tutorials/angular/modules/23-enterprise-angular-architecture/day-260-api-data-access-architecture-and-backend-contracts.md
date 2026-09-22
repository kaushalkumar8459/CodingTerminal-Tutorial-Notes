---
id: angular-day-260
title: API Data Access Architecture and Backend Contracts
day: 260
module: 23
---

# Day 260 — API/Data Access Architecture and Backend Contracts

## Goal

Separate backend contracts from feature and UI concerns.

## Three representations

A mature feature may have:

~~~text
API DTO
   ↓ mapping
Domain model
   ↓ mapping
UI view model
~~~

Not every application needs all three, but the distinction becomes useful when backend contracts differ from business or presentation needs.

## Example

API:

~~~ts
interface JobDto {
  job_id: string;
  job_title: string;
  salary_min: number | null;
}
~~~

Domain:

~~~ts
interface Job {
  id: string;
  title: string;
  salaryRange: SalaryRange | null;
}
~~~

The feature should not spread backend naming conventions throughout the UI unnecessarily.

## Data-access boundary

A feature data-access layer can own:

- HttpClient calls
- DTO types
- request construction
- response mapping
- API-specific errors

## Exercise

Take JobHub's job-search endpoint and define a DTO, domain model, UI model, mapper, and data-access service.

## Common mistakes

- Treating API DTOs as domain models by default.
- Mapping data inside templates.
- Duplicating endpoint logic across components.
- Hiding backend breaking changes behind vague types.

## Outcome

You can create a clear boundary between Angular features and backend contracts.
