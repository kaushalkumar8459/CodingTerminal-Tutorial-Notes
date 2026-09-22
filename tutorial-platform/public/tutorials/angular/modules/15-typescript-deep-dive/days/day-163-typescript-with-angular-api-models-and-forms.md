---
id="angular-day-163"
title="TypeScript with Angular API Models and Forms"
slug="day-163-typescript-with-angular-api-models-and-forms"
dayLabel="Day 163"
level=Advanced
estimatedMinutes=90
order=163
track=angular
youtubeVideos=[]
---
# Day 163 — TypeScript with Angular API Models and Forms

## Goal
Apply TypeScript where Angular applications most need strong contracts.

## Example
~~~ts
interface JobDto {
  job_id: number;
  job_title: string;
  remote_flag: boolean;
}

interface Job {
  id: number;
  title: string;
  remote: boolean;
}

function toJob(dto: JobDto): Job {
  return {
    id: dto.job_id,
    title: dto.job_title,
    remote: dto.remote_flag
  };
}
~~~

## Concept
Separate transport models, domain models, and form models when their responsibilities differ.

## Angular Applications
Use typed:
- service method contracts
- component inputs and outputs
- route data
- form models
- API request/response models
- UI state unions

## Exercise
Create typed create/update DTOs and a typed job form model.

## Common Mistakes
- Treating API JSON as trusted just because it has a TypeScript interface.
- Reusing one giant model for API, form, and UI.
- Using `any` for third-party or unknown data.

## Interview Questions
1. Why map DTOs to UI models?
2. Does an interface validate JSON?
3. Where should domain types live?

## Outcome
You can apply TypeScript directly to Angular architecture.
