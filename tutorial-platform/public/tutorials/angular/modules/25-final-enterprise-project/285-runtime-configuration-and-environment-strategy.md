# Day 285 — Runtime Configuration and Environment Strategy

Separate application code from environment-specific deployment configuration.

## Goal
Make the same build capable of running against different environments where the deployment architecture requires runtime configuration.

## Configuration Areas
- API base URLs
- remote application URLs
- feature flags
- environment metadata
- safe public client configuration
- configuration validation and fallback behavior

## Exercise
Create a typed runtime configuration contract consumed by the host and remote-loading layer. Test missing and invalid configuration paths.

## Common Mistakes
Hardcoding production URLs; treating public browser configuration as secret; duplicating configuration parsing in multiple features.

## Interview Questions
1. What is the difference between build-time and runtime configuration?
2. Why should browser-visible configuration never contain secrets?
3. How should invalid configuration fail?

## Outcome
Deployment configuration is explicit, typed and centralized.