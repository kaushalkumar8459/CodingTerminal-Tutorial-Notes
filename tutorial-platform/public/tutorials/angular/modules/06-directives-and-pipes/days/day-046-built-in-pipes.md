id="d6d06"
---
title: Built-in Pipes
slug: day-046-built-in-pipes
dayLabel: Day 46
level: Beginner
estimatedMinutes: 90
order: 46
track: angular
youtubeVideos: []
---

# Day 46 — Built-in Pipes

## Goal

Transform values for display using Angular's built-in pipes.

## Common pipes

Useful examples include:

- DatePipe
- CurrencyPipe
- DecimalPipe
- PercentPipe
- UpperCasePipe
- LowerCasePipe
- TitleCasePipe
- JsonPipe

## Examples

    {{ job.title | titlecase }}

    {{ job.salary | currency:'INR' }}

    {{ job.postedAt | date:'mediumDate' }}

    {{ completion | percent }}

Pipes make display formatting readable and reusable.

## Pipe chaining

Pipes can be chained:

    {{ job.title | uppercase | slice:0:30 }}

Use chaining only when the resulting template remains understandable.

## Pure display transformation

A pipe should generally answer:

"How should this value appear?"

It should not answer:

"How should the application change its business state?"

## Practical exercise

Create a Job Details screen showing:

- Salary as currency
- Posted date
- Job title in title case
- Completion percentage

## Common mistakes

- Formatting data permanently instead of only for display
- Putting HTTP calls into pipes
- Mutating values from a pipe
- Overly complex pipe chains

## Interview questions

1. What is a pipe?
2. Name five built-in pipes.
3. Can pipes be chained?
4. Should a pipe perform API calls?

## Assignment

Create a formatted Employee Profile using at least five built-in pipes.

## Outcome

You can use built-in pipes for readable display transformation.
