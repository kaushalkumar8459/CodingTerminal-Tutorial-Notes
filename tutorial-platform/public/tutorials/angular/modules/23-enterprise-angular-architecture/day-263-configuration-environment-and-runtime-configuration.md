---
id: angular-day-263
title: Configuration, Environment and Runtime Configuration
day: 263
module: 23
---

# Day 263 — Configuration, Environment and Runtime Configuration

## Goal

Understand configuration boundaries for local, test, staging, and production deployments.

## Build-time vs runtime configuration

Build-time configuration is selected while creating the application bundle.

Runtime configuration is loaded when the deployed application starts.

Examples:

~~~text
Build-time
  compilation options
  build optimizations

Runtime
  API base URL
  tenant configuration
  feature flags
  deployment-specific endpoints
~~~

## Important security rule

A frontend bundle is public to the browser. Never treat frontend configuration as a secret store.

Do not place private API keys, database passwords, signing secrets, or confidential credentials in browser-accessible configuration.

## Configuration contract

Define a typed configuration shape:

~~~ts
interface AppConfig {
  apiBaseUrl: string;
  environment: 'development' | 'test' | 'production';
  features: {
    newSearch: boolean;
  };
}
~~~

Expose configuration through one application boundary rather than reading arbitrary globals throughout the codebase.

## Exercise

Design JobHub configuration for local, test, staging, and production. Separate browser-safe values from server-only secrets.

## Common mistakes

- Hardcoding deployment URLs in feature code.
- Mixing configuration loading with business logic.
- Assuming browser environment variables are automatically secret.
- Reading configuration through many unrelated mechanisms.

## Outcome

You can design a predictable configuration boundary for multiple deployments.
