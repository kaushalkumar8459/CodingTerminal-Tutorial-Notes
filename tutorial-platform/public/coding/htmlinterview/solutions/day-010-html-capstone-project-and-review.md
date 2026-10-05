# Day 010 — Solution: Core HTML Capstone

This is a compact reference implementation. Replace placeholder paths and connect a real server endpoint before using the form.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web Foundations Workshop | Example Learning</title>
    <meta name="description" content="Join a practical HTML workshop in your community.">
  </head>
  <body>
    <a href="#main">Skip to main content</a>
    <header>
      <a href="/">Example Learning</a>
      <nav aria-label="Primary"><a href="#schedule">Schedule</a><a href="#register">Register</a></nav>
    </header>
    <main id="main">
      <article>
        <h1>Web Foundations Workshop</h1>
        <p>Join us on <time datetime="2026-11-14">November 14, 2026</time>.</p>
        <figure>
          <img src="images/speaker.jpg" alt="Workshop instructor demonstrating a page outline" width="800" height="600">
          <figcaption>Instructor Maya Chen introduces semantic page structure.</figcaption>
        </figure>
        <section id="schedule" aria-labelledby="schedule-title">
          <h2 id="schedule-title">Schedule</h2>
          <table>
            <caption>Workshop sessions</caption>
            <thead><tr><th scope="col">Time</th><th scope="col">Session</th></tr></thead>
            <tbody><tr><th scope="row">09:00</th><td>Document structure</td></tr></tbody>
          </table>
        </section>
        <section id="register" aria-labelledby="register-title">
          <h2 id="register-title">Register</h2>
          <form action="/registrations" method="post">
            <label for="name">Name</label>
            <input id="name" name="name" autocomplete="name" required>
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
            <fieldset>
              <legend>Session preference</legend>
              <label><input type="radio" name="session" value="morning" checked> Morning</label>
              <label><input type="radio" name="session" value="afternoon"> Afternoon</label>
            </fieldset>
            <button type="submit">Request a place</button>
          </form>
        </section>
        <section aria-labelledby="faq-title">
          <h2 id="faq-title">Frequently asked question</h2>
          <details><summary>Do I need experience?</summary><p>No prior HTML experience is required.</p></details>
        </section>
      </article>
    </main>
    <footer><a href="mailto:learn@example.com">Contact the organizers</a></footer>
  </body>
</html>
```

## Review Answers

**7. Article:** The workshop announcement is a self-contained item that could be shared independently.

**8. Image purpose:** The instructor image conveys information and receives descriptive alt text. A purely decorative accent would use `alt=""`.

**9. Server checks:** Validate field values, authorization, request origin/CSRF protections as appropriate, and any persisted data. Browser constraints are not security controls.

**10. Keyboard path:** Use native links, inputs, radios, disclosure, and buttons; preserve logical document order and visible focus.