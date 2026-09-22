---
id="angular-day-139"
title="Admin and Permission Management"
slug="day-139-admin-and-permission-management"
dayLabel="Day 139"
level=Advanced
estimatedMinutes=90
order=139
track=angular
youtubeVideos=[]
---
# Day 139 — Admin and Permission Management

## Goal
Build the administrative part of JobHub without breaking feature boundaries.

## Features
- user list
- search/filter users
- view user details
- assign roles
- display effective permissions
- activate/deactivate account when supported by the API

## Architecture
Admin components should consume an AdminApiService and permission state rather than directly managing transport details.

## Exercise
Protect the admin area with users.manage and implement a role-editing workflow.

## Common Mistakes
- Allowing client-side role changes to become the source of truth.
- Assuming role visibility equals authorization.
- Mixing admin APIs into candidate features.

## Interview Questions
1. How would you structure an admin feature?
2. Why isolate admin data access?
3. Why must the backend validate role changes?

## Outcome
You can build a permission-sensitive feature area with clear boundaries.
