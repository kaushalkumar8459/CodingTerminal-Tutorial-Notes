---
id: "angular-day-112"
title: "Mapping API Models to UI Models"
slug: "day-112-mapping-api-models-to-ui-models"
dayLabel: "Day 112"
level: Intermediate
estimatedMinutes: 75
order: 112
track: angular
youtubeVideos: []
---
# Day 112 — Mapping API Models to UI Models

## Goal
Prevent backend response shapes from leaking through the entire UI.

## DTO vs UI Model
An API might expose job_id, job_title, and company_name while the UI wants id, title, and company.

Create a mapper at the data-access boundary.

## Why Map?
- isolates backend naming
- keeps UI models readable
- contains API changes
- prevents transport details from becoming component contracts

## Exercise
Map a Job API response into the Job Dashboard model.

## Common Mistakes
- Treating DTO and UI model as automatically identical.
- Mapping inside every component.
- Using any for unknown fields.

## Interview Questions
1. DTO vs domain/UI model?
2. Where should mapping happen?
3. Why is mapping useful?

## Outcome
You can create a deliberate boundary between transport and presentation.
