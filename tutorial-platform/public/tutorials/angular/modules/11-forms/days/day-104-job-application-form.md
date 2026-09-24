---
id: "angular-day-104"
title: "Mini Project — Job Application Form"
slug: "day-104-job-application-form"
dayLabel: Day 104
level: Intermediate
estimatedMinutes: 120
order: 104
track: angular
youtubeVideos: []
---
# Day 104 — Mini Project: Job Application Form

## Goal

Build a complete production-style form before moving to HTTP and API integration.

## Features

Create a Job Application form with:

### Personal Details
- first name
- last name
- email
- phone

### Professional Details
- experience
- current company
- current salary
- expected salary
- notice period

### Preferences
- preferred role
- preferred locations
- work mode
- willingness to relocate

### Skills
Use a FormArray for multiple skills.

### Previous Experience
Use a FormArray of FormGroups.

## Validation

Include:

- required fields
- email
- length rules
- salary range cross-field validation
- conditional validation
- custom validator
- meaningful error messages

## Custom Control

Create a reusable RatingControl and integrate it with the form using ControlValueAccessor.

## UX Requirements

- clear labels
- keyboard-friendly controls
- useful error messages
- touched/dirty-aware feedback
- disabled submit when invalid
- successful submission summary
- reset behavior

## Suggested Structure

```
job-application/
├── components/
│   ├── personal-details/
│   ├── professional-details/
│   ├── preferences/
│   ├── skills/
│   └── rating-control/
├── validators/
├── models/
└── job-application.component.ts
```

## Acceptance Criteria

- [ ] Standalone components
- [ ] Typed reactive forms
- [ ] FormBuilder nonNullable
- [ ] FormGroup and FormControl
- [ ] FormArray
- [ ] custom validators
- [ ] cross-field validation
- [ ] conditional controls/validators
- [ ] custom ControlValueAccessor
- [ ] accessible validation UX
- [ ] no HTTP
- [ ] no RxJS
- [ ] no external form library
- [ ] no duplicated form state
- [ ] clean separation between form concerns and domain concerns

## Interview Questions

1. Template-driven vs reactive forms?
2. FormControl vs FormGroup vs FormArray?
3. Why use typed forms?
4. What is ControlValueAccessor?
5. How do you implement cross-field validation?
6. How do you handle dynamic controls?
7. How should validation UX work?
8. How do you architect a large Angular form?

## Outcome

After Day 104, the learner can build and structure complex Angular forms and is ready for HTTP/API integration.
