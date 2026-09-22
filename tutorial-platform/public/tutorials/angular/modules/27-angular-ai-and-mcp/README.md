# Module 27 — Angular AI & MCP

**Days 321–335**

This module is an advanced extension to the 320-day Angular curriculum. It should be studied after the core Angular, enterprise architecture, Micro Frontend, and interview foundations.

## Learning Goals

- Use AI responsibly during Angular development.
- Understand Angular CLI MCP and AI-assisted development workflows.
- Understand MCP concepts such as tools, context, permissions, and agent workflows.
- Understand WebMCP as an emerging browser-facing standard.
- Build experimental WebMCP integrations using Angular's dependency injection and lifecycle model.
- Connect AI features with Signals, forms, services, and APIs.
- Design secure AI-powered Angular applications.
- Build an AI-powered JobHub assistant.

## Day Sequence

| Day | Topic |
|---|---|
| 321 | AI in Modern Angular Development |
| 322 | Angular AI Development Workflow |
| 323 | Angular CLI MCP Server |
| 324 | Angular AI Tutor |
| 325 | Angular AI Rules, AGENTS.md & AI Configuration |
| 326 | Angular + GitHub Copilot and AI IDEs |
| 327 | Angular MCP Tools and Workspace Interaction |
| 328 | WebMCP Fundamentals |
| 329 | Creating WebMCP Tools in Angular |
| 330 | WebMCP + Signals and Dependency Injection |
| 331 | WebMCP + Signal Forms |
| 332 | AI-Powered Angular Applications |
| 333 | Angular + Gemini, Genkit and AI SDK Integration |
| 334 | AI Security, Validation and Responsible Tool Design |
| 335 | Mini Project — AI-Powered Job Assistant |

## Important Stability Boundary

Angular's official roadmap currently lists **Web MCP as available to experiment with**, while several related Angular APIs are production-ready. WebMCP support must therefore be taught as experimental and version-sensitive rather than as a stable Angular foundation.

The Angular CLI MCP server is developer tooling: it allows compatible AI assistants to interact with Angular workspace capabilities such as documentation, project analysis, builds, tests, and other supported tools.

Do not confuse:

- **Angular CLI MCP** → AI agent interacts with the Angular development workspace.
- **WebMCP** → the web application exposes structured tools to browser-based AI agents.
- **AI application integration** → the Angular application calls AI/model services or uses tool calling.

## Teaching Rule

Never introduce MCP or AI before learners understand the Angular feature being enhanced. AI should solve a real development or application problem, not replace basic Angular understanding.

## Running Project

The final JobHub project is the running example for AI features and tool contracts.
