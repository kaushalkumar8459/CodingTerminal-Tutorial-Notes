---
title: Provider Recipes: useValue, useFactory, useClass and useExisting
slug: provider-recipes
dayLabel: Day 65
level: Intermediate
estimatedMinutes: 80
order: 65
track: angular
youtubeVideos: []
---

# Day 65 — Provider Recipes: useValue, useFactory, useClass and useExisting

## Goal

Understand the main provider recipes that tell Angular what to return for a DI token.

## useValue

~~~ts
{ provide: APP_NAME, useValue: 'CodingTerminals' }
~~~

Good for constants and configuration.

## useFactory

~~~ts
{
  provide: API_OPTIONS,
  useFactory: () => ({ timeoutMs: 5000, retryCount: 2 })
}
~~~

Factories are useful when a value must be constructed dynamically or from dependencies.

## useClass

~~~ts
{ provide: Logger, useClass: ConsoleLogger }
~~~

Consumers request Logger while DI creates ConsoleLogger.

## useExisting

~~~ts
{ provide: OldLogger, useExisting: Logger }
~~~

useExisting aliases an already registered provider rather than mapping the token to a new class.

## Exercise

Create a small logging abstraction demonstrating all four recipes.

## Common mistakes

- Using useFactory when a simple value is enough
- Confusing useClass and useExisting
- Creating complex provider graphs without a real requirement

## Interview questions

1. Difference between useClass and useExisting?
2. When would you use useFactory?
3. When is useValue appropriate?

## Outcome

You can read and write common Angular provider configurations.
