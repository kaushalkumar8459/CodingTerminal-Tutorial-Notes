---
id="angular-module-16"
title="RxJS Deep Dive"
slug="rxjs-deep-dive"
level=Intermediate
order=16
track=angular
---

# Module 16 - RxJS Deep Dive

## Purpose
RxJS is introduced after Pure Angular, Signals, Forms, HTTP, Authentication, and TypeScript so learners have real problems that justify reactive streams.

This module teaches RxJS through Angular use cases rather than operator memorization.

## Sequence
166. Why RxJS in Angular?
167. Observable Fundamentals
168. Subscription, Unsubscription and Teardown
169. Creation Operators
170. Operators: map, filter and tap
171. Flattening: switchMap, mergeMap, concatMap and exhaustMap
172. Time-Based Operators
173. Combination: combineLatest, forkJoin and zip
174. Error Handling: catchError, retry and finalize
175. Subjects: Subject, BehaviorSubject and ReplaySubject
176. Hot, Cold and Multicasted Observables
177. Higher-Order Observables and Flattening Strategies
178. RxJS with Angular HttpClient
179. RxJS with Forms and User Events
180. RxJS + Signals Interop: toSignal and toObservable
181. Subscription Lifecycle with takeUntilDestroyed
182. RxJS Architecture and Service Patterns
183. RxJS Anti-Patterns and Performance
184. Testing RxJS and Marble Thinking
185. Mini Project - Reactive Job Search Dashboard

## Learning Rules
- Start with the problem before introducing an operator.
- Use strict TypeScript types and generics from Module 15.
- Prefer Signals for simple synchronous state.
- Use RxJS for async streams, events, timing, cancellation, concurrency, and composition.
- Prefer declarative pipelines over nested subscriptions.
- Make subscription lifetime explicit.
- Do not introduce NgRx or SignalStore here; they come in Module 17.
- Use modern Angular interop such as toSignal, toObservable, and takeUntilDestroyed where appropriate.

## Module Project
**Reactive Job Search Dashboard** - typed API data, debounced search, cancellation, filters, pagination, error handling, lifecycle-safe subscriptions, and Signal/RxJS interop.

## Dependency Boundary
Previous: TypeScript Deep Dive (Days 146-165)

Current: RxJS Deep Dive (Days 166-185)

Next: State Management (Days 186-200)

## Outcome
By Day 185, learners should be able to design, explain, debug, test, and maintain RxJS-based Angular features without replacing every Signal or component state with an Observable.
