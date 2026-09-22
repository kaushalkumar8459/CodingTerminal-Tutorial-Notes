---
id: "angular-module-12"
title: "HTTP & API Integration"
slug: "http-and-api-integration"
level: Beginner
order: 12
track: angular
---
# Module 12 — HTTP & API Integration

## Goal
Connect Angular applications to backend APIs, model request/response flows, handle loading and errors, configure HttpClient, and build a clean API/data-access layer.

## Days
105. Why HTTP & API Integration?
106. HttpClient and provideHttpClient
107. GET Requests and Typed Responses
108. POST, PUT, PATCH and DELETE
109. Request Parameters, Headers and Options
110. Loading, Success, Empty and Error States
111. HttpClient Services and API Boundaries
112. Mapping API Models to UI Models
113. HTTP Interceptors
114. Authentication Headers and Request Context
115. HTTP Error Handling and Retry Strategy
116. httpResource() and Signal-Based HTTP State
117. API Configuration and Environment-Safe URLs
118. API Architecture and Data Access Patterns
119. Mini Project — Job Search API Dashboard

## Dependency Flow
HTTP problem → HttpClient → GET → mutations → request options → UI states → API services → mapping → interceptors → auth context → errors → httpResource → configuration → architecture → project

## Teaching Rules
- Introduce HTTP only after forms and local state.
- Use provideHttpClient() in standalone applications.
- Prefer typed request/response models; avoid any.
- Keep API calls in services/data-access layers.
- Treat loading, empty, success, and error as first-class UI states.
- Teach httpResource() only after HttpClient fundamentals.
- Keep authentication architecture simple here; deeper auth belongs to the next module.
- Use RxJS only where an HTTP workflow genuinely requires it.

## Outcome
By Day 119, learners can integrate REST APIs, handle mutations and failures, centralize cross-cutting HTTP behavior, and build a maintainable data-access layer.
