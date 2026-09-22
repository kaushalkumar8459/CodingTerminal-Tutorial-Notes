id="c5d01"
---
title: Why Components Communicate
slug: day-032-why-components-communicate
dayLabel: Day 32
level: Beginner
estimatedMinutes: 60
order: 32
track: angular
youtubeVideos: []
---

# Day 32 — Why Components Communicate?

## Goal

Understand why component communication is needed and how to choose a communication direction.

## The problem

A page may contain:

- Job List
- Job Card
- Search Bar
- Filter Panel
- Job Details

Each component should have a focused responsibility, but they sometimes need to exchange data.

Examples:

- Parent gives a Job Card the job to display.
- Job Card tells the parent that Apply was clicked.
- Search Bar tells the parent about a changed search term.
- A reusable dialog exposes actions to its parent.

## Mental model

Think of component communication as contracts:

**Parent → Child:** data

**Child → Parent:** events

**Two-way:** value + change

**Content projection:** parent supplies markup/content

**View query:** component gets a reference to something in its own view

## Practical exercise

Create:

- JobPageComponent
- JobCardComponent

The page owns a list of jobs. The card receives one job and displays it.

Do not introduce services or global state yet.

## Common mistakes

- Sharing everything through a global store
- Making unrelated components directly depend on each other
- Mutating parent-owned data inside a child
- Creating a service before a local component contract is needed

## Interview questions

1. Why should components communicate through explicit contracts?
2. Parent-to-child vs child-to-parent communication?
3. When is a service better than component communication?
4. Why avoid global state for local component relationships?

## Assignment

Draw a communication diagram for a Job List containing Job Cards.

## Outcome

You can identify the communication direction before choosing an Angular API.
