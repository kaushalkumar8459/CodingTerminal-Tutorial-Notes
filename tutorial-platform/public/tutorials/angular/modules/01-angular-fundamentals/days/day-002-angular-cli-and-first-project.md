---
title: Angular CLI and First Project
slug: day-002-angular-cli-and-first-project
dayLabel: Day 2
level: Beginner
estimatedMinutes: 60
order: 2
track: angular
youtubeVideos: []
---

# Day 2 [Beginner]: Angular CLI and First Project

## Goal

By the end of this lesson you should be able to:

- Explain the role of Node.js and npm.
- Explain Angular CLI.
- Create an Angular application.
- Start the development server.
- Make a first UI change.
- Build the application.

## Prerequisites

- Day 1 completed
- Basic HTML, CSS and JavaScript
- Code editor and terminal

## 1. Why Do We Need a Development Environment?

Yesterday we learned why Angular exists. Today we need to create an Angular application.

We need tools that can create projects, install dependencies, run a development server and build the application.

That is where Node.js, npm and Angular CLI become useful.

## 2. Node.js

Node.js provides a JavaScript runtime outside the browser. Angular development and build tooling runs in this environment.

Check it:

~~~bash
node -v
~~~

Use a currently supported Node.js LTS release for the Angular version used in the course.

## 3. npm

npm is a package manager commonly used with Node.js projects.

~~~bash
npm -v
~~~

npm installs packages and executes scripts defined by the project's package.json.

## 4. Angular CLI

Angular CLI is the command-line tool for creating and working with Angular projects.

Important commands:

~~~bash
ng new
ng serve
ng generate
ng build
~~~

We will learn each command when it becomes useful.

## 5. Create Your First Angular Application

Create the project:

~~~bash
ng new angular-day-02
~~~

Prefer the modern standalone Angular application approach.

Move into the project:

~~~bash
cd angular-day-02
~~~

If dependencies were not installed automatically:

~~~bash
npm install
~~~

## 6. Start the Development Server

Run:

~~~bash
ng serve
~~~

If the project defines a start script, this can also be used:

~~~bash
npm start
~~~

Open the local URL shown by the CLI.

## 7. Make Your First Change

Open the root component template and replace the starter UI with:

~~~html
<main>
  <h1>CodingTerminals Angular Course</h1>
  <p>My first Angular application.</p>
</main>
~~~

Save the file and observe the browser.

## 8. What Just Happened?

The high-level flow is:

    ng new
       ↓
    Angular project
       ↓
    Dependencies
       ↓
    ng serve
       ↓
    Development server
       ↓
    Browser

We will inspect the generated files in Day 3.

## 9. Important CLI Commands

### Create

~~~bash
ng new project-name
~~~

Creates a new Angular application/workspace.

### Run

~~~bash
ng serve
~~~

Starts the development server.

### Generate

~~~bash
ng generate component profile-card
~~~

Short form:

~~~bash
ng g c profile-card
~~~

Generates a component according to project configuration.

### Build

~~~bash
ng build
~~~

Creates a production build.

### Help

~~~bash
ng help
~~~

Shows CLI commands and options.

## Common Mistakes

### Running commands outside the project

Run project-specific commands from the Angular project directory.

### Confusing npm and Angular CLI

npm manages packages and scripts. Angular CLI provides Angular-specific commands.

### Changing generated files too early

First understand the project. Do not delete files just because they are unfamiliar.

### Installing packages without a requirement

Add dependencies only when the application actually needs them.

## Hands-on Practice

1. Check Node.js.
2. Check npm.
3. Create an Angular application.
4. Start it.
5. Change the root template.
6. Stop and restart the server.
7. Run a production build.

## Interview Questions

### What is Angular CLI?

A command-line tool for creating, developing, generating, building and maintaining Angular applications.

### What does ng new do?

It creates a new Angular workspace/application and its initial configuration.

### What does ng serve do?

It starts a development server and builds the application for local development.

### What is npm used for?

It manages packages and executes project scripts.

### Why is Node.js needed for Angular development?

Angular's development and build tooling runs in the Node.js environment.

## Assignment

Create a project named:

~~~text
angular-fundamentals
~~~

Then:

- Start it successfully.
- Change the welcome screen.
- Add your name.
- Run a production build.
- Explain ng new, ng serve, ng generate and ng build in your own words.

## Self Check

You should be able to explain Node.js, npm, Angular CLI and the four main CLI commands introduced today.

## Day 2 Outcome

You have created and run your first Angular application.

Next: **Angular Project Structure**.
