---
id="angular-day-108"
title="POST, PUT, PATCH and DELETE"
slug="day-108-post-put-patch-delete"
dayLabel="Day 108"
level=Beginner
estimatedMinutes=75
order=108
track=angular
youtubeVideos=[]
---
# Day 108 — POST, PUT, PATCH and DELETE

## Goal
Implement common API mutations.

## Operations
- POST commonly creates a resource or triggers an operation.
- PUT commonly replaces a resource representation.
- PATCH commonly applies partial changes.
- DELETE removes a resource.

## Example Shape
JobApiService should expose typed methods such as createJob(request), updateJob(id, changes), and deleteJob(id).

## Important
The exact semantics belong to the backend API contract. Do not choose PUT or PATCH only from frontend preference.

## Exercise
Add create, update, and delete operations to JobApiService.

## Common Mistakes
- Sending the UI model when the API expects a DTO.
- Treating every update as PUT without checking the contract.
- Updating local state before knowing whether the server accepted the mutation.

## Interview Questions
1. POST vs PUT?
2. PUT vs PATCH?
3. How do you type a DELETE response?
4. Why should request DTOs be explicit?

## Outcome
You can model standard API mutations.
