# Angular 320-Day Roadmap — Review & Fix Checklist

> Purpose: complete this checklist before publishing the detailed daily Angular tutorials.
>
> Rule: when the user says Next, continue from the first unchecked item. Do not create new curriculum days unless the checklist identifies a genuine missing topic.

## Status Legend
- [ ] Not reviewed
- [~] Reviewed; improvement identified
- [x] Reviewed and fixed
- [!] Needs special attention

# Phase 1 — Global Roadmap Audit

## A. Structure & Sequencing
- [x] Verify all 26 modules exist.
- [x] Verify all 320 days exist exactly once. (320 lesson files confirmed; filename convention still needs normalization.)
- [~] Verify day numbering is continuous: 1–320. Day numbers are present 1–320, but Modules 13, 25 and 26 use a different filename convention.
- [x] Verify module day ranges match roadmap.md.
- [x] Verify every module README sequence matches its day files.
- [~] Verify prerequisites are taught before first use. Initial structure is sound; detailed content dependency audit remains.
- [ ] Verify beginner → intermediate → advanced → enterprise progression.
- [ ] Verify Pure Angular remains separated from later ecosystem topics.
- [ ] Verify every topic is introduced because the learner has a practical reason to use it.
- [ ] Verify repeated topics increase in depth instead of duplicating earlier lessons.

## B. Modern Angular 21 Alignment
- [ ] Verify Angular version assumptions throughout.
- [ ] Verify standalone components are primary.
- [ ] Verify modern built-in control flow is primary.
- [ ] Verify input(), output(), and model() are primary component APIs.
- [ ] Verify signal queries are covered.
- [ ] Verify Signals are taught before RxJS/state libraries.
- [ ] Verify inject() is primary DI syntax.
- [ ] Verify modern lifecycle utilities are covered.
- [ ] Verify Angular 21 zoneless model is correctly explained.
- [ ] Verify @defer and lazy loading.
- [ ] Verify SSR, hydration and rendering APIs are version-aware.
- [ ] Verify rapidly evolving APIs have maturity/version notes.
- [ ] Verify legacy APIs are taught mainly for maintenance/interview compatibility.

# Phase 2 — Module Review

## Module 01 — Angular Fundamentals
- [ ] Beginner explanations
- [ ] Angular 21 project commands
- [ ] Bootstrap/application flow
- [ ] Standalone architecture
- [ ] No premature routing/services/HTTP/RxJS
- [ ] Day 7 project uses only previously learned concepts

## Module 02 — Templates & Data Binding
- [ ] Interpolation
- [ ] Property binding
- [ ] Attribute/class/style binding
- [ ] Event binding
- [ ] Two-way binding
- [ ] Template expressions
- [ ] Project builds on Module 1

## Module 03 — Control Flow & Rendering
- [ ] Modern built-in control flow is primary
- [ ] @if
- [ ] @for
- [ ] @empty and track
- [ ] @switch
- [ ] Rendering/performance fundamentals
- [ ] Legacy *ngIf/*ngFor clearly contextualized only

## Module 04 — Routing & Navigation
- [ ] provideRouter
- [ ] RouterLink/programmatic navigation
- [ ] Route parameters
- [ ] Query parameters
- [ ] Nested routes/layouts
- [ ] Guards
- [ ] Lazy routes

## Module 05 — Component Communication
- [ ] input()
- [ ] output()
- [ ] model()
- [ ] Parent/child patterns
- [ ] Content projection
- [ ] Signal queries
- [ ] Communication boundaries
- [ ] No unnecessary global state

## Module 06 — Directives & Pipes
- [ ] Attribute directives
- [ ] Host bindings/listeners
- [ ] Legacy structural-directive concepts contextualized
- [ ] Built-in pipes
- [ ] Custom pipes
- [ ] Pipe purity/performance

## Module 07 — Component Composition
- [ ] Reusable UI components
- [ ] Projection/slots
- [ ] Template fragments
- [ ] Dynamic component rendering
- [ ] Component contracts
- [ ] Composition patterns
- [ ] Runtime dynamic rendering explained only when justified

## Module 08 — Services & Dependency Injection
- [ ] Injectable
- [ ] inject()
- [ ] Provider scope/lifetimes
- [ ] Component/route providers
- [ ] Service-owned signal state
- [ ] InjectionToken
- [ ] Provider recipes
- [ ] Facade/service boundaries

## Module 09 — Lifecycle
- [ ] Lifecycle sequence
- [ ] ngOnChanges
- [ ] View/content lifecycle concepts
- [ ] DestroyRef cleanup
- [ ] Render callbacks
- [ ] Performance implications
- [ ] Avoid lifecycle hooks where signals/computed are better

## Module 10 — Signals & Modern Reactivity
- [ ] signal()
- [ ] computed()
- [ ] Dependency tracking
- [ ] effect() correct usage
- [ ] Signals in templates
- [ ] Signal inputs/outputs/model
- [ ] Signal queries
- [ ] linkedSignal()
- [ ] resource() version/maturity note
- [ ] Signal state in services
- [ ] Reactive anti-patterns
- [ ] effect() not presented as replacement for computed()

## Module 11 — Forms [!]
- [ ] Template-driven forms
- [ ] Reactive forms
- [ ] FormControl/FormGroup/FormBuilder
- [ ] Validators/custom validators
- [ ] FormArray
- [ ] Cross-field validation
- [ ] ControlValueAccessor
- [ ] Form UX
- [ ] Form architecture
- [!] Add or properly position current Angular Signal Forms with version/status notes
- [ ] Recheck numbering if content is inserted or merged

## Module 12 — HTTP & API Integration
- [ ] HttpClient/provideHttpClient
- [ ] Typed requests/responses
- [ ] CRUD
- [ ] Params/headers/options
- [ ] Loading/success/empty/error states
- [ ] API service boundaries
- [ ] DTO → domain/UI model mapping
- [ ] Functional interceptors
- [ ] Auth request context
- [ ] HTTP errors/retry
- [ ] httpResource() version/maturity note
- [ ] Runtime API configuration
- [ ] Data-access architecture

## Module 13 — Authentication & Authorization
- [ ] Authentication vs authorization
- [ ] Login/logout/session
- [ ] Route guards
- [ ] Roles/permissions
- [ ] Interceptors/token flow
- [ ] Secure storage
- [ ] Expiry/error handling
- [ ] Authenticated shell
- [ ] Backend authorization remains authoritative

## Module 14 — Complete Angular Project
- [ ] Uses previous modules for real reasons
- [ ] Realistic requirements
- [ ] No concepts introduced prematurely
- [ ] Candidate/recruiter/admin flows
- [ ] API/auth/state boundaries
- [ ] Accessibility/responsive UX
- [ ] Deployment preparation
- [ ] Interview walkthrough

## Module 15 — TypeScript Deep Dive
- [ ] Explain why TypeScript is taught deeply after learners have already used it
- [ ] Types/interfaces/type aliases
- [ ] Unions/intersections/narrowing
- [ ] Generics
- [ ] Utility/mapped/conditional/template literal types
- [ ] unknown/never
- [ ] Angular API/form/domain models
- [ ] Avoid unnecessary TypeScript complexity

## Module 16 — RxJS Deep Dive
- [ ] RxJS introduced only after signals/forms/HTTP
- [ ] Observable/subscription/teardown
- [ ] Creation/operators
- [ ] Flattening operators with decision criteria
- [ ] Time-based operators
- [ ] Combination/error handling
- [ ] Subjects/hot/cold/multicasting
- [ ] HttpClient/forms integration
- [ ] toSignal/toObservable
- [ ] takeUntilDestroyed
- [ ] RxJS architecture/anti-patterns
- [ ] Testing/marble thinking
- [ ] Do not present RxJS as mandatory everywhere

## Module 17 — State Management
- [ ] State ownership before libraries
- [ ] Local vs shared state
- [ ] Signal-based service state
- [ ] Immutable updates
- [ ] Derived state/selectors
- [ ] Async state
- [ ] Facade patterns
- [ ] SignalStore fundamentals
- [ ] Collections/entity-like state
- [ ] Async SignalStore workflows
- [ ] Cross-feature boundaries
- [ ] Anti-patterns/performance
- [ ] Avoid unnecessary global state

## Module 18 — CDK, Material & Accessibility [!]
- [ ] Semantic HTML first
- [ ] CDK layout/responsive utilities
- [ ] Overlay
- [ ] Dialog/menu/popover patterns
- [ ] Portal
- [ ] DragDrop
- [ ] Clipboard/FocusMonitor/LiveAnnouncer/focus trap
- [ ] Material fundamentals/theming
- [ ] Accessible forms/navigation
- [ ] Angular Aria
- [!] Mark Angular Aria according to exact Angular version; do not present preview APIs as stable
- [ ] Accessibility testing

## Module 19 — Testing [!]
- [!] Replace generic/template-like explanations with topic-specific tutorials
- [ ] Vitest
- [ ] TestBed
- [ ] Service tests and dependency mocking
- [ ] Component DOM/user interaction tests
- [ ] Inputs/outputs/content projection
- [ ] Signals/forms/async state
- [ ] HTTP testing with provideHttpClientTesting() and HttpTestingController
- [ ] Routing testing with modern utilities such as RouterTestingHarness
- [ ] Directive/pipe/shared UI tests
- [ ] Coverage/CI/debugging
- [ ] Capstone tests
- [!] Each day has a distinct realistic scenario

## Module 20 — Performance [!]
- [ ] Performance mental model
- [ ] Rendering/change-detection cost
- [ ] Signal-driven rendering
- [ ] OnPush as compatibility/interview knowledge, not the whole modern story
- [ ] Angular 21 zoneless model
- [ ] @for track
- [ ] Lazy routes/@defer
- [ ] Bundle optimization
- [ ] Images/fonts/assets
- [ ] Network/cache performance
- [ ] Angular DevTools/browser profiling
- [ ] Performance architecture/anti-patterns
- [ ] Measurable before/after examples

## Module 21 — SSR, SSG & Hydration [!]
- [ ] CSR vs SSR vs SSG
- [ ] Angular SSR setup
- [ ] Server routes/render modes
- [ ] Server-compatible components
- [ ] Prerendering
- [ ] Hydration
- [ ] Hydration mismatch debugging
- [ ] Incremental hydration/event replay version awareness
- [ ] Transfer cache/data loading
- [ ] Caching/security boundaries
- [!] Verify claims against exact Angular version
- [ ] Explain hydration/rendering configuration constraints clearly

## Module 22 — Security
- [ ] XSS/sanitization/security contexts
- [ ] DomSanitizer and dangerous bypass APIs
- [ ] CSP/Trusted Types
- [ ] AOT/security benefits
- [ ] CSRF/XSRF/XSSI
- [ ] Auth/session security
- [ ] Cookies/storage/sensitive data
- [ ] Dependency/supply-chain security
- [ ] Production hardening
- [ ] Frontend authorization never replaces backend authorization

## Module 23 — Enterprise Architecture
- [ ] Feature/domain/shared/core boundaries
- [ ] Dependency direction
- [ ] Route/application boundaries
- [ ] API/data-access architecture
- [ ] State architecture
- [ ] Design-system boundaries
- [ ] Runtime configuration
- [ ] Observability/error architecture
- [ ] Enterprise auth/permissions
- [ ] Monorepo vs polyrepo tradeoffs
- [ ] ADR/governance
- [ ] Do not prescribe one folder structure as universally correct

## Module 24 — Micro Frontends
- [ ] Why/when MFE
- [ ] Modular app vs multi-app vs runtime MFE
- [ ] Host/remote responsibilities
- [ ] Native Federation concepts
- [ ] Remote routes/components/contracts
- [ ] Shared dependency strategy
- [ ] Shared UI/auth/platform contracts
- [ ] Runtime remote configuration
- [ ] Cross-MFE communication
- [ ] Deployment/caching/failure isolation
- [ ] Performance/security/governance
- [ ] Distributed-monolith warning
- [ ] Verify Native Federation examples against exact package/version

## Module 25 — Final Enterprise Project
- [ ] Every major previous topic is integrated for a reason
- [ ] Repository/application boundaries
- [ ] Design system
- [ ] Auth/session/authorization
- [ ] Runtime configuration
- [ ] Candidate/recruiter/admin features
- [ ] State/data-access boundaries
- [ ] MFE contracts
- [ ] Performance/observability
- [ ] Accessibility/security
- [ ] Automated tests
- [ ] CI/CD
- [ ] Production readiness
- [ ] Architecture walkthrough

## Module 26 — Interview Preparation [!]
- [!] Replace generic interview templates with topic-specific content
- [ ] Beginner questions
- [ ] Experienced-level questions
- [ ] Scenario questions
- [ ] Practical coding questions
- [ ] Debugging questions
- [ ] Follow-up interviewer questions
- [ ] Common traps/misconceptions
- [ ] Concise interview-ready answers
- [ ] Deeper why/tradeoff answers
- [ ] JobHub examples
- [ ] Angular 21-specific questions
- [ ] Legacy vs modern Angular distinctions
- [ ] Day 320 is a complete mock interview

# Phase 3 — Cross-Cutting Quality

## Beginner Experience
- [ ] Every tutorial has prerequisites
- [ ] Why before how
- [ ] Practical reason for every new API
- [ ] Basic → realistic → advanced examples
- [ ] No unexplained enterprise terminology in beginner modules
- [ ] No RxJS dependency before Module 16 unless explicitly justified
- [ ] No SignalStore/global state before Module 17
- [ ] No MFE before Module 24
- [ ] No advanced SSR/security assumptions before their modules

## Code Quality
- [ ] Strict TypeScript
- [ ] No any unless explicitly justified
- [ ] Standalone components
- [ ] inject()
- [ ] Modern control flow
- [ ] Signals where appropriate
- [ ] RxJS only where stream semantics are useful
- [ ] Avoid unnecessary effects
- [ ] Avoid unnecessary global state
- [ ] Correct cleanup
- [ ] Examples runnable with stated Angular version

## Tutorial Quality
Every detailed day should eventually contain:
- [ ] Learning goal
- [ ] Prerequisites
- [ ] Why
- [ ] Mental model
- [ ] Step-by-step explanation
- [ ] Basic example
- [ ] Real-world example
- [ ] Common mistakes
- [ ] Exercise
- [ ] Challenge
- [ ] Interview questions
- [ ] Expected outcome
- [ ] Useful previous/next lesson links

# Phase 4 — Publishing Readiness
- [ ] Run content validation
- [ ] Run content generation/sync
- [ ] Verify tutorial navigation
- [ ] Verify filenames/slugs
- [ ] Verify frontmatter consistency
- [ ] Verify internal links
- [ ] Verify code blocks
- [ ] Verify Angular version references
- [ ] Verify commands for selected Angular version
- [ ] Verify all 320 lessons render
- [ ] Verify mobile readability
- [ ] Verify Day 1 → 145 beginner path
- [ ] Verify Day 146 → 254 mastery path
- [ ] Verify Day 255 → 300 enterprise path
- [ ] Verify Day 301 → 320 interview path

# Execution Order
1. [ ] Global roadmap/numbering/prerequisite audit
2. [ ] Angular 21/version-sensitive API audit
3. [ ] Module 11 — Forms / Signal Forms
4. [ ] Module 18 — Angular Aria/version status
5. [ ] Module 19 — Testing content rewrite
6. [ ] Module 20 — Performance/Zoneless correction
7. [ ] Module 21 — SSR/Hydration correction
8. [ ] Module 24 — Native Federation/version-sensitive examples
9. [ ] Module 26 — Interview content rewrite
10. [ ] Cross-module duplication/dependency review
11. [ ] Tutorial quality/template review
12. [ ] Final validation and publishing check

# Continuation Rule

**User only needs to type Next.**

On each Next:
1. Read this checklist.
2. Find the first unchecked item ready to work on.
3. Review the relevant repository files.
4. Search official Angular documentation for version-sensitive topics.
5. Fix the repository directly when needed.
6. Mark the checklist item complete.
7. Report briefly what was reviewed/fixed.
8. Stop and wait for the next Next.

Do not ask the user to repeat the roadmap or explain which item comes next unless a genuine decision is required.
