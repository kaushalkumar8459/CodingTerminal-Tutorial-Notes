---
title: InjectionToken and Configuration
slug: injectiontoken-and-configuration
dayLabel: Day 64
level: Intermediate
estimatedMinutes: 70
order: 64
track: angular
youtubeVideos: []
---

# Day 64 — InjectionToken and Configuration

## Goal

Provide typed configuration values through Angular DI.

## The problem

Hard-coding configuration inside services makes it difficult to change and reuse.

## Create a token

~~~ts
export const APP_NAME = new InjectionToken<string>('APP_NAME');
~~~

## Provide a value

~~~ts
providers: [
  { provide: APP_NAME, useValue: 'CodingTerminals' }
]
~~~

## Inject it

~~~ts
export class HeaderService {
  private readonly appName = inject(APP_NAME);
}
~~~

## Typed configuration

~~~ts
export interface AppConfig {
  appName: string;
  defaultPageSize: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
~~~

An InjectionToken gives DI a unique identity for values that do not have a class constructor token.

## Exercise

Create APP_CONFIG containing application name, default page size, support email, and a compact-mode feature flag. Inject it where configuration is actually needed.

## Interview questions

1. What is an InjectionToken?
2. Why use it for primitive or interface-based values?
3. What is useValue?

## Outcome

You can provide and inject typed configuration through Angular DI.
