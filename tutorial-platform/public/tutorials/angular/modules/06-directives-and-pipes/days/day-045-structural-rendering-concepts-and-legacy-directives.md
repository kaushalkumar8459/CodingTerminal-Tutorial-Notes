---
id: "d6d05"
title: Structural Rendering Concepts and Legacy Directives
slug: day-045-structural-rendering-concepts-and-legacy-directives
dayLabel: Day 45
level: Intermediate
estimatedMinutes: 75
order: 45
track: angular
youtubeVideos: []
---

# Day 45 — Structural Rendering Concepts and Legacy Directives

## Goal

Understand how Angular can add or remove template content and recognize legacy structural directive syntax.

## Modern Angular first

Use built-in control flow for new Angular code:

    @if (isLoggedIn) {
      <p>Welcome</p>
    }

    @for (job of jobs; track job.id) {
      <app-job-card [job]="job" />
    }

This is the primary approach in this course.

## Legacy syntax

Older Angular applications commonly contain:

    <p *ngIf="isLoggedIn">Welcome</p>

    <li *ngFor="let job of jobs">
      {{ job.title }}
    </li>

The asterisk syntax is important when maintaining existing applications, but it is not the preferred new-code syntax for this roadmap.

## Why learn it?

Experienced Angular developers often inherit applications using older template APIs. You should be able to read, debug, and safely modernize them.

## Practical exercise

Take a small legacy snippet using *ngIf and *ngFor:

1. Explain what it renders.
2. Rewrite it with @if and @for.
3. Preserve the original behavior.

## Common mistakes

- Mixing old and new control-flow styles without a reason
- Treating *ngIf as a custom component
- Assuming all structural behavior requires a custom directive

## Interview questions

1. What does the asterisk in *ngIf historically represent?
2. Why is @if preferred in this course?
3. How would you migrate a legacy template?
4. What is structural rendering?

## Assignment

Modernize a legacy template from *ngIf/*ngFor to @if/@for.

## Outcome

You can maintain legacy Angular templates while writing modern control flow.
