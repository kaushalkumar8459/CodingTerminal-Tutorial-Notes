---
title: Core HTML Capstone Project and Review
slug: day-010-html-capstone-project-and-review
dayLabel: Day 10
level: Advanced
estimatedMinutes: 60
order: 10
track: html
---

# Day 10 [Advanced]: Core HTML Capstone Project and Review

## Goal

Plan and build a small, accessible multi-section website using the HTML skills from the full 10-day course, then evaluate it with a production-minded checklist.

## Prerequisites

- Days 1 through 9 completed
- A text editor and browser

## Explanation

The capstone is a **community workshop page**. It will have a useful document head, semantic page regions, an event description, a schedule, speaker details, a registration form, and an optional media section. The exercise emphasizes decisions: every element should have a reason, and the page should remain understandable without visual styling or JavaScript.

## Topic by Topic

### Topic 1: Start with a semantic content outline

Before writing tags, list the content and relationships: site identity and navigation, one page heading, event overview, schedule, speaker profile, registration controls, and contact information. Decide which content is a standalone article, which sections need headings, and whether each image is informative or decorative.

Create the page structure first:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web Foundations Workshop | Example Learning</title>
    <meta name="description" content="Join a practical one-day workshop on building accessible web pages.">
  </head>
  <body>
    <header>
      <a href="/">Example Learning</a>
      <nav aria-label="Primary"><a href="#schedule">Schedule</a><a href="#register">Register</a></nav>
    </header>
    <main>
      <article>
        <h1>Web Foundations Workshop</h1>
        <p>Build a clear, accessible page with semantic HTML.</p>
        <p><time datetime="2026-11-14">November 14, 2026</time></p>

        <section id="schedule" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading">Schedule</h2>
          <table>
            <caption>Workshop sessions</caption>
            <thead><tr><th scope="col">Time</th><th scope="col">Session</th></tr></thead>
            <tbody><tr><th scope="row">09:00</th><td>HTML structure and semantics</td></tr></tbody>
          </table>
        </section>

        <section id="register" aria-labelledby="register-heading">
          <h2 id="register-heading">Register</h2>
          <form action="/registrations" method="post">
            <label for="attendee-name">Name</label>
            <input id="attendee-name" name="name" autocomplete="name" required>
            <label for="attendee-email">Email</label>
            <input id="attendee-email" name="email" type="email" autocomplete="email" required>
            <button type="submit">Request a place</button>
          </form>
        </section>
      </article>
    </main>
    <footer><p>Questions? <a href="mailto:learn@example.com">Email the organizers</a>.</p></footer>
  </body>
</html>
```

This example demonstrates a structure, not a functioning backend: `/registrations` must be implemented by a server or service before form submissions can be processed. Replace the sample date, links, and content with real project data before publishing.

### Topic 2: Advanced native patterns

Use `details` and `summary` for a simple disclosure that should work without JavaScript:

```html
<details>
  <summary>What should I bring?</summary>
  <p>Bring a laptop, its charger, and a modern browser.</p>
</details>
```

The `dialog` element can represent a dialog, but showing, dismissing, focus management, and modality normally require JavaScript. A `template` stores inert markup for later use by a script; it does not render as visible content by itself. Use these features when their behavior fits the interaction, and test keyboard focus and accessible names whenever scripting is involved.

For advanced media, use `picture` or `srcset` to offer responsive assets, `track` for captions, and restrictive iframe permissions. These features complement semantic structure; they do not replace alternatives, captions, or secure server-side handling.

### Topic 3: Final quality review

Review the completed site against these checks:

- Every page has a doctype, language, encoding, viewport, and meaningful unique title.
- Headings form an understandable hierarchy and each page has one clear main region.
- Links describe their destination; images have appropriate alternative text and dimensions.
- Tables describe data with captions and headers; forms have labels, names, and useful constraints.
- All controls work with a keyboard, focus is visible, and errors are explained in text.
- Media has controls and text alternatives; embedded content has a title and limited permissions.
- Paths work from every page, markup validates, and the layout remains usable on a narrow screen.
- Server-side code validates submitted data and does not trust hidden fields or browser constraints.

## Recap

- HTML quality comes from preserving meaning, relationships, and native behavior.
- Native features such as disclosure widgets reduce custom code when they match the requirement.
- Validation, keyboard testing, content review, responsive testing, and server-side checks cover different risks.

## Practice

Complete the workshop site with a speaker figure and meaningful alt text, a registration choice group, a details-based FAQ, and one responsive image. Run the final review checklist, fix the highest-impact issue you find, and explain why each major semantic element was selected.

## What's Next

This capstone completes the core markup sequence. The following lessons extend the syllabus into styling integration, responsive layout, XHTML and encoding, advanced forms, graphics, embeds, and JavaScript-driven browser APIs.