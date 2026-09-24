---
id: "d6d07"
title: Custom Pipes
slug: day-047-custom-pipes
dayLabel: Day 47
level: Beginner
estimatedMinutes: 90
order: 47
track: angular
youtubeVideos: []
---

# Day 47 — Custom Pipes

## Goal

Create reusable presentation transformations when built-in pipes are insufficient.

## Example

Suppose a job portal wants to display:

    0 days ago
    1 day ago
    5 days ago

A custom pipe can keep this presentation rule out of the template.

    @Pipe({
      name: 'relativeDays',
      standalone: true
    })
    export class RelativeDaysPipe {
      transform(days: number): string {
        if (days === 0) {
          return 'today';
        }

        if (days === 1) {
          return '1 day ago';
        }

        return days + ' days ago';
      }
    }

Template:

    {{ job.postedDaysAgo | relativeDays }}

## Pure pipes

A pure pipe is recalculated when its input changes according to Angular's change-detection rules. This is the normal choice for deterministic display transformations.

Use impure pipes only when you have a clear reason and understand their performance implications.

## Practical exercise

Create:

- relativeDays pipe
- initials pipe
- jobTypeLabel pipe

Keep all three focused on presentation.

## Common mistakes

- Putting API calls in a pipe
- Mutating external state
- Making one pipe perform many unrelated transformations
- Using an impure pipe without understanding the cost

## Interview questions

1. What is a custom pipe?
2. Pure vs impure pipe?
3. When should you create a custom pipe?
4. Why should pipes avoid side effects?

## Assignment

Create a custom salaryRange pipe that formats a minimum and maximum salary.

## Outcome

You can create focused custom pipes for reusable presentation logic.
