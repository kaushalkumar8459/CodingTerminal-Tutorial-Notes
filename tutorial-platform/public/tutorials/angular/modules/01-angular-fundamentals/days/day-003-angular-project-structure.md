---
title: Angular Project Structure
slug: day-003-angular-project-structure
dayLabel: Day 3
level: Beginner
estimatedMinutes: 60
order: 3
track: angular
youtubeVideos: []
---

# Day 3 [Beginner]: Angular Project Structure

## Goal

Understand the important files in an Angular application and trace the application entry point.

## Prerequisites

- Day 1 and Day 2 completed
- Working Angular project

## 1. Why Learn Project Structure Now?

On Day 2 we created a project. Now we have a reason to inspect it.

Do not memorize every generated file. Learn the responsibility of the important files.

A typical modern standalone project looks similar to:

~~~text
angular-fundamentals/
├── public/
├── src/
│   ├── app/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
└── .gitignore
~~~

The exact structure can vary between Angular versions and CLI options.

## 2. src/

The src folder contains application source code.

Important files:

### main.ts

The browser entry point that starts the Angular bootstrap process.

A modern application commonly has:

~~~ts
bootstrapApplication(AppComponent, appConfig);
~~~

### app/

Contains application components and application-specific code.

### index.html

The host HTML document in which the Angular application starts.

### styles.scss

Commonly used for global styles.

Component-specific styles should generally stay with their component.

## 3. Application Entry Flow

At a high level:

~~~text
Browser
  ↓
index.html
  ↓
main.ts
  ↓
bootstrapApplication(...)
  ↓
Root Component
  ↓
Angular Application
~~~

## 4. package.json

Contains project metadata, scripts and dependencies.

A simplified example:

~~~json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build"
  }
}
~~~

Dependencies and devDependencies describe packages used by the project.

## 5. package-lock.json

Records the resolved npm dependency tree and helps make installations more reproducible.

Normally update it through npm rather than editing it manually.

## 6. angular.json

Contains Angular CLI workspace/project configuration such as build options, assets, global styles and scripts.

Modify it only when a real project requirement exists.

## 7. TypeScript Configuration

Files such as:

~~~text
tsconfig.json
tsconfig.app.json
~~~

contain TypeScript compiler configuration.

You do not need to understand every option today.

## 8. public/

Contains static assets that can be served directly.

The exact generated assets vary by Angular version and configuration.

## 9. .gitignore

Defines files that Git should normally ignore.

Typical generated/local content includes:

~~~text
node_modules/
dist/
~~~

Sensitive environment configuration should not be committed.

## 10. What Should We Edit?

During normal development you will frequently edit:

~~~text
src/app/
src/styles.scss
src/index.html
~~~

Configuration should be changed only when the application has a requirement for it.

## Hands-on Exploration

Open your Day 2 project and find:

1. src/main.ts
2. src/index.html
3. The root component under src/app/
4. package.json
5. angular.json
6. tsconfig.json
7. .gitignore

Write one sentence explaining each.

## Common Mistakes

- Memorizing every configuration property.
- Editing configuration without a reason.
- Putting all component CSS into global styles.
- Committing node_modules.
- Assuming the exact generated tree never changes between Angular versions.

Learn responsibilities rather than memorizing a version-specific file tree.

## Interview Questions

### What is main.ts?

The application entry point that starts Angular bootstrap.

### What is index.html?

The host HTML document in which Angular starts the application.

### What is angular.json?

Angular CLI workspace/project configuration.

### What is package.json?

Project metadata, scripts and package dependencies.

### Why is package-lock.json important?

It records the resolved dependency tree to improve installation reproducibility.

## Assignment

Create project-structure-notes.txt and explain:

- src/
- src/app/
- src/main.ts
- src/index.html
- styles.scss
- package.json
- package-lock.json
- angular.json
- tsconfig.json
- public/
- .gitignore

## Self Check

Trace this flow in your own project:

~~~text
Browser
  ↓
index.html
  ↓
main.ts
  ↓
bootstrapApplication
  ↓
Root component
  ↓
Application UI
~~~

## Day 3 Outcome

You now understand the major responsibilities inside an Angular project.

Next: **Standalone Components**.
