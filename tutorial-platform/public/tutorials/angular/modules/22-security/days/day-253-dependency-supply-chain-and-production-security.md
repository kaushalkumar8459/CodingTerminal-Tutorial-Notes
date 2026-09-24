# Day 253 — Dependency, Supply-Chain and Production Security

## Goal

Build a production security checklist beyond Angular-specific APIs.

## Dependency Security

Review:

- direct dependencies;
- transitive dependencies;
- lockfiles;
- outdated packages;
- known vulnerabilities;
- abandoned packages;
- postinstall scripts;
- third-party browser libraries.

Keep Angular libraries current because security fixes are delivered through releases.

## Production Security

Check:

- HTTPS;
- security headers;
- source-map exposure policy;
- environment configuration;
- CORS;
- cookie settings;
- logging and redaction;
- dependency scanning;
- CI security checks;
- least-privilege deployment.

## Exercise

Create a JobHub release security checklist and run it before a production build.

## Common Mistakes

- Updating packages blindly without testing.
- Ignoring transitive dependencies.
- Logging access tokens or personal data.
- Committing environment secrets.
- Treating client configuration as secret storage.

## Interview Questions

1. What is a software supply-chain risk?
2. Why are lockfiles useful?
3. Why should frontend environment values not contain secrets?
4. What should CI check before production deployment?

## Outcome

You can include dependency and deployment security in an Angular release process.
