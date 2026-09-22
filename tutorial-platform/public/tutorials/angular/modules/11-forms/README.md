---
id="angular-module-11"
title="Angular Forms"
slug="angular-forms"
level=Beginner
order=11
track=angular
---
# Module 11 — Forms

## Goal

Learn how Angular handles user input, validation, form state, submission, and reusable form components.

## Days

90. Why Angular Forms?
91. Template-Driven Forms Fundamentals
92. Form Controls and Validation
93. Form Groups and Form State
94. Reactive Forms Fundamentals
95. FormControl and FormGroup
96. FormBuilder and Non-Nullable Forms
97. Validators and Custom Validation
98. Dynamic and Conditional Form Controls
99. FormArray and Repeating Fields
100. Cross-Field Validation
101. Custom Form Controls and ControlValueAccessor
102. Form UX: Errors, Dirty, Touched, Pending & Submission
103. Form Architecture and Reusable Form Patterns
104. Mini Project — Job Application Form

## Dependency Flow

user input → controls → validation → form state → reactive forms → typed forms → reusable validation → dynamic fields → arrays → cross-field rules → custom controls → UX → architecture → project

## Teaching Rules

- Start with the problem of collecting and validating user input.
- Teach template-driven forms first because the learner already knows templates and two-way binding.
- Move to reactive forms when form complexity requires explicit programmatic state.
- Prefer typed reactive forms for modern application code.
- Use standalone components and modern Angular control flow.
- Do not introduce RxJS, HTTP, or external form/state libraries.
- Keep business logic outside templates.
- Teach ControlValueAccessor only after normal controls and reactive forms are understood.

## Outcome

By Day 104, learners can build production-style forms with validation, dynamic fields, custom controls, accessible error UX, and clean form architecture.

## Prerequisite

Complete Days 1–89, especially templates, control flow, component communication, services, lifecycle, and signals.
