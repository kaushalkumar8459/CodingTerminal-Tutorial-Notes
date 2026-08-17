---
title: Deployment on Cloud Platforms
slug: day-054-deployment-on-cloud-platforms
dayLabel: Day 54
level: Intermediate
estimatedMinutes: 30
order: 54
track: nodejs
---
# Day 054 [Intermediate]: Deployment on Cloud Platforms

## Index

- Goal
- Prerequisites
- Explanation
- Topic by Topic
- Key Concepts
- Visual Concept Map
- End-to-End Practical
- Hands-on Coding
- Mini Exercise
- Assessment Quiz
- Task
- Self Check
- Interview Questions and Answers
- Day Outcome

## Goal

Deploy Node services on cloud platforms with environment strategy, reliability controls, and cost-aware operations.

## Prerequisites

- Day 053 CI/CD fundamentals
- Basic DNS, HTTPS, and networking concepts

## Explanation

Cloud deployment combines compute, networking, config, and monitoring. Production success depends on repeatability, observability, and rollback speed, not only making app start.

## Topic by Topic

### Topic 1: Deployment Models

Theory:
Common models: VM, container platform, managed serverless.

Practical:
Choose based on latency, control, and team ops capacity.

**Explanation:**
This topic explains Deployment Models in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Deployment Models.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 2: Environment Promotion

Theory:
Staging should mirror production as closely as possible.

Practical:
Use same container image across staging and production.

**Explanation:**
This topic explains Environment Promotion in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Environment Promotion.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 3: Traffic and Release Strategies

Theory:
Blue-green and canary reduce user impact from bad releases.

Practical:
Route small percentage to new version first.

**Explanation:**
This topic explains Traffic and Release Strategies in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Traffic and Release Strategies.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 4: Config and Secret Management

Theory:
Sensitive values belong in managed secret services.

Practical:
Inject DB credentials at deploy time.

**Explanation:**
This topic explains Config and Secret Management in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Config and Secret Management.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 5: Reliability and Cost Governance

Theory:
Autoscaling, budget alerts, and right-sizing keep systems sustainable.

Practical:
Set minimum and maximum instance policy with alerting.

**Explanation:**
This topic explains Reliability and Cost Governance in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Reliability and Cost Governance.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

### Topic 6: Runtime Probes and Zero-downtime Deployments

Theory:
Cloud platform needs signals to know when to start/stop routing traffic. Proper probes and draining reduce release incidents.

Practical:
Configure startup/readiness/liveness checks and graceful shutdown timeout.

**Explanation:**
This topic explains Runtime Probes and Zero-downtime Deployments in a practical Node.js backend context so you can build reliable, production-ready APIs and services.

**Key Points:**
- Understand the core idea behind Runtime Probes and Zero-downtime Deployments.
- Apply the practical pattern with safe defaults and validation.
- Keep the implementation observable, maintainable, and secure where relevant.

## Cloud Deployment Choice Table

| Model              | Strength                         | Tradeoff                       |
| ------------------ | -------------------------------- | ------------------------------ |
| VM                 | Full control                     | More ops overhead              |
| Managed containers | Good balance of control and ease | Platform-specific constraints  |
| Serverless         | Fast scale and low idle cost     | Cold starts and runtime limits |

## Key Concepts

- Deployment model evaluation
- Environment consistency and promotion
- Safe rollout and rollback strategy
- Secret/config lifecycle management
- Reliability and cost optimization
- Startup, readiness, and liveness probe strategy
- Graceful draining during rollout

## Visual Concept Map

```mermaid
flowchart LR
  A[CI Build Artifact] --> B[Deploy Staging]
  B --> C[Validation Checks]
  C --> D[Canary/Blue-Green]
  D --> E[Production Release]
  E --> F[Monitoring + Rollback]
```

## End-to-End Practical

1. Package app as container image.
2. Deploy to staging cloud environment.
3. Run smoke and health checks.
4. Perform canary/blue-green production release.
5. Monitor and verify rollback readiness.

## Hands-on Coding

### Example 1: Case - Generic Cloud Run Command

Scenario:
Deploy Node container image to managed container runtime.

```bash
cloud-cli deploy service orders-api \
  --image registry.example.com/orders-api:${GIT_SHA} \
  --port 3000 \
  --env NODE_ENV=production
```

### Example 2: Case - Blue-Green Switch

Scenario:
New release is deployed to green environment before traffic cutover.

```bash
cloud-cli release create --service orders-api --slot green --image registry.example.com/orders-api:${GIT_SHA}
cloud-cli traffic shift --service orders-api --to green=20,blue=80
```

### Example 3: Case - Rollback Command

Scenario:
Error rate spikes after rollout; revert immediately.

```bash
cloud-cli release rollback --service orders-api --to previous-stable
```

### Example 4: Case - Probe Configuration Concept

Scenario:
New instances should receive traffic only after app and dependencies are ready.

```yaml
probes:
  startup: /health/startup
  readiness: /ready
  liveness: /health
```

### Example 5: Case - Graceful Shutdown Timeout

Scenario:
During rolling deploy, app should finish in-flight requests.

```bash
cloud-cli service update orders-api \
  --graceful-shutdown-timeout 30s \
  --max-unavailable 0
```

## Mini Exercise

Scenario:
Deploy a containerized Node API to cloud with staged rollout and rollback runbook.

Expected output:

- Staging and production deployment flow
- Controlled traffic shifting
- Rollback tested and documented

## Assessment Quiz

### Quiz Questions

1. Why should staging mimic production closely?
2. What is the purpose of canary deployment?
3. True or False: Skipping edge-case handling is acceptable in production.
4. Why is secret management critical in cloud deployments?
5. Why do readiness probes matter during deployment?

### Quiz Answers

1. It reduces surprise failures during production release.
2. It limits blast radius by testing new version on partial traffic.
3. False.
4. Exposed secrets can compromise systems and data.
5. They prevent traffic from reaching instances that are not ready yet.

## Task

- Deploy one service to staging and production
- Define rollback trigger and execute dry run
- Complete mini exercise and quiz.

## Self Check

- You can release Node services safely on cloud platforms.
- You can manage deployment risk using progressive rollout.
- You can answer at least 4 out of 5 quiz questions.

## Interview Questions and Answers

### Beginner

Question: What makes a cloud deployment production-ready?

Answer: Repeatable automation, health checks, observability, and rollback capability.

### Middle

Question: Why avoid manual production deployments?

Answer: Manual steps are error-prone and harder to audit or reproduce.

### Advanced

Question: What tradeoff appears in multi-region deployment?

Answer: Better resilience and latency distribution, but higher cost and operational complexity.

## Day 054 Outcome

- You can deploy Node applications safely in cloud environments
- You can choose rollout strategies based on risk tolerance
- You are ready for observability systems in Day 055
