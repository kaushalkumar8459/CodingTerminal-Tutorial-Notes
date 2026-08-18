---
title: Mini Project Weather App
slug: day-028-mini-project-weather-app
dayLabel: Day 28
level: Intermediate
estimatedMinutes: 150
order: 28
track: react
---
# Day 28 [Intermediate]: Mini Project — Weather App

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Project Requirements](#project-requirements)
- [Architecture](#architecture)
- [State Ownership](#state-ownership)
- [API Security](#api-security)
- [Search Flow](#search-flow)
- [Controlled Search Form](#controlled-search-form)
- [API Layer](#api-layer)
- [Request Lifecycle](#request-lifecycle)
- [Race Conditions and Cancellation](#race-conditions-and-cancellation)
- [Complete Reference Implementation](#complete-reference-implementation)
- [Important Implementation Notes](#important-implementation-notes)
- [Weather Data Presentation](#weather-data-presentation)
- [Accessibility](#accessibility)
- [UX States](#ux-states)
- [Testing Checklist](#testing-checklist)
- [Common Mistakes](#common-mistakes)
- [Extensions](#extensions)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Final Acceptance Criteria](#final-acceptance-criteria)
- [Day 28 Outcome](#day-28-outcome)

## Goal

Build a realistic weather-search application that combines controlled forms, API requests, request-state modeling, cancellation, validation, accessibility, derived presentation, and a deliberate API-key security boundary.

This is a **project day**: the goal is not only to make the screen work, but to make the implementation explainable, testable, and maintainable.

## Prerequisites

- Days 25–27
- `useState`, `useRef`, `useEffect` basics
- async/await and promises
- Fetch or Axios
- loading/error/empty/success states
- controlled forms

## Learning Outcomes

By the end, you can:

- build an end-to-end weather search flow
- validate input before making a request
- separate API transport from UI rendering
- use query parameters safely
- handle HTTP, network, and cancellation failures
- prevent stale responses from winning
- distinguish initial loading from refreshing
- keep derived weather values out of unnecessary state
- make the form keyboard-accessible
- explain why a client-side API key is not a secret
- test the important happy-path and failure-path scenarios

## Project Requirements

Build a Weather App with:

1. City search.
2. Enter-key submission.
3. Input validation.
4. Loading state.
5. Success state.
6. Empty/not-found state.
7. Error state with retry.
8. Request cancellation.
9. Stale-response protection.
10. Recent searches.
11. Accessible status/error messaging.
12. Responsive presentation.
13. No committed secrets.

## Architecture

```text
WeatherApp
├── SearchForm
├── StatusMessage
├── WeatherCard
├── RecentSearches
└── weatherService
        ↓
     Weather API
```

A practical responsibility split:

| Layer | Responsibility |
|---|---|
| `SearchForm` | Input and submit interaction |
| `WeatherApp` | UI state and orchestration |
| `weatherService` | HTTP request/response handling |
| `WeatherCard` | Weather presentation |
| `RecentSearches` | Recent-search interaction |

## State Ownership

```jsx
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [status, setStatus] = useState("idle");
const [error, setError] = useState(null);
const [recentSearches, setRecentSearches] = useState([]);
const controllerRef = useRef(null);
```

Do not store values that can be derived from `weather`, such as:

- rounded temperature
- condition text
- humidity labels
- display strings

A useful rule is:

> Store the minimum source-of-truth state; derive presentation from it.

## API Security

For a browser-only tutorial, an environment variable keeps configuration out of committed source, but **does not make a browser API key secret**. Anything delivered to the browser can be inspected by users.

For sensitive credentials, use a backend/proxy that keeps the secret server-side:

```text
Browser
   ↓
Your backend
   ↓  secret credential
Weather provider
```

Also check the provider's terms and key restrictions. If a browser key is unavoidable, restrict it by origin/quota where the provider supports it.

## Search Flow

```text
idle
 ↓ submit
validate
 ↓
loading
 ├── success + data → weather card
 ├── success + no usable result → empty state
 ├── HTTP/network error → error + retry
 └── cancellation → no user-facing error
```

## Controlled Search Form

```jsx
function SearchForm({ city, onChange, onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="city">City</label>
      <input
        id="city"
        value={city}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. London"
        autoComplete="address-level2"
        aria-describedby="city-help"
      />
      <p id="city-help">Enter a city name and submit to search.</p>
      <button type="submit" disabled={disabled}>
        {disabled ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
```

Using `onSubmit` instead of only a click handler supports Enter-key submission and keeps form semantics correct.

## API Layer

Keep transport code separate from rendering.

```jsx
export async function getWeather(city, signal) {
  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: import.meta.env.VITE_WEATHER_API_KEY,
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`,
    { signal }
  );

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(body?.message || "Weather request failed");
  }

  return body;
}
```

`URLSearchParams` handles query-string encoding and keeps the request construction readable.

Do not put UI state updates inside `weatherService`. The service should communicate request results; the component decides how the UI represents them.

## Request Lifecycle

For a submit-driven request, `useRef` is appropriate for holding the currently active controller because the controller is an imperative resource and changing it should not itself cause a render.

```jsx
controllerRef.current?.abort();
const controller = new AbortController();
controllerRef.current = controller;
```

Then:

```jsx
setStatus("loading");
setError(null);
```

On success:

```jsx
setWeather(result);
setStatus("success");
```

On a real failure:

```jsx
setWeather(null);
setError(message);
setStatus("error");
```

On cancellation, do not replace the UI with an error message.

## Race Conditions and Cancellation

If the user searches `London` and immediately searches `Paris`:

```text
London request A starts
        ↓
Paris request B starts
        ↓
A is aborted
        ↓
B succeeds
        ↓
show Paris
```

Cancellation is valuable, but robust applications should also consider request ownership. A request that has already completed before `abort()` is called cannot be retroactively cancelled.

For more complex concurrent workflows, use a request ID/version guard:

```jsx
const requestIdRef = useRef(0);

async function search() {
  const requestId = ++requestIdRef.current;
  const result = await getWeather(...);

  if (requestId !== requestIdRef.current) return;
  setWeather(result);
}
```

Use this pattern when overlapping requests are intentionally possible and the latest request must own the UI.

## Complete Reference Implementation

```jsx
import { useEffect, useRef, useState } from "react";
import { getWeather } from "./weatherService";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const controllerRef = useRef(null);
  const lastSubmittedCityRef = useRef("");

  async function searchWeather(event, requestedCity = city) {
    event?.preventDefault();

    const value = requestedCity.trim();
    if (!value) {
      setError("Enter a city name.");
      setStatus("error");
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    lastSubmittedCityRef.current = value;

    setStatus("loading");
    setError(null);

    try {
      const result = await getWeather(value, controller.signal);

      if (controller.signal.aborted) return;

      setWeather(result);
      setStatus("success");
      setRecentSearches((current) => [
        value,
        ...current.filter(
          (item) => item.toLowerCase() !== value.toLowerCase()
        ),
      ].slice(0, 5));
    } catch (error) {
      if (error?.name === "AbortError") return;

      setWeather(null);
      setError(error instanceof Error ? error.message : "Request failed");
      setStatus("error");
    }
  }

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return (
    <main>
      <h1>Weather App</h1>

      <form onSubmit={searchWeather}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          autoComplete="address-level2"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Searching..." : "Search"}
        </button>
      </form>

      {status === "idle" && (
        <p>Search for a city to see its weather.</p>
      )}

      {status === "loading" && (
        <p role="status" aria-live="polite">Loading weather...</p>
      )}

      {status === "error" && (
        <section role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => searchWeather(undefined, lastSubmittedCityRef.current || city)}
          >
            Retry
          </button>
        </section>
      )}

      {status === "success" && weather && (
        <article aria-label={`Weather for ${weather.name}`}>
          <h2>{weather.name}</h2>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather?.[0]?.description ?? "Unknown condition"}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </article>
      )}

      {status === "success" && !weather && (
        <p>No weather data was returned for this search.</p>
      )}

      {recentSearches.length > 0 && (
        <section aria-labelledby="recent-searches-heading">
          <h2 id="recent-searches-heading">Recent searches</h2>
          <ul>
            {recentSearches.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => {
                    setCity(item);
                    searchWeather(undefined, item);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
```

## Important Implementation Notes

### 1. Retry should use the last submitted value

The user may edit the input after a failed request. Retrying the current input can accidentally search a different city. Store the last submitted value separately when retry semantics matter.

### 2. State updates are scheduled

Do not rely on this pattern:

```jsx
setCity("Paris");
searchWeather(undefined, city); // city may still be the old value
```

Pass `"Paris"` directly or trigger work from a state synchronization boundary.

### 3. Cleanup on unmount

The component owns the active request. Abort it when the component unmounts so the request does not remain unnecessarily active.

### 4. Validate response shape

A successful HTTP response does not guarantee the exact JSON shape your UI expects. Production code should validate external data at a trust boundary when the risk warrants it.

## Weather Data Presentation

Prefer derived values:

```jsx
const temperature = Math.round(weather.main.temp);
const condition = weather.weather?.[0]?.description ?? "Unknown";
```

Do not duplicate these as state unless they represent independently editable or externally controlled information.

## UX States

### Initial

Show a clear instruction:

```text
Search for a city to see its weather.
```

### Loading

Disable duplicate submission and expose progress:

```jsx
<p role="status" aria-live="polite">Loading weather...</p>
```

### Success

Show useful information without forcing the user to decode raw API JSON.

### Not found / empty

Treat “city not found” or a valid response with no usable weather data as an actionable empty/not-found state, not as a mysterious blank screen.

### Error

Provide a safe message and a retry action.

## Accessibility

- use a real `<form>`
- associate `<label>` with the input
- support keyboard submission
- use `role="status"` for non-critical progress
- use `role="alert"` for important errors
- make retry and recent-search controls keyboard accessible
- do not communicate information through color alone
- keep focus behavior predictable

## Testing Checklist

### Input

- [ ] Empty input does not send a request.
- [ ] Leading/trailing spaces are removed.
- [ ] Enter submits.
- [ ] Search button is disabled while loading.

### Success

- [ ] City name renders.
- [ ] Temperature renders correctly.
- [ ] Condition renders safely.
- [ ] Additional metrics render safely.

### Error

- [ ] Invalid city produces an actionable message.
- [ ] Retry uses the last submitted city.
- [ ] Previous error is cleared when a new request starts.

### Cancellation/races

- [ ] Previous request is aborted when a newer search starts.
- [ ] Aborted requests do not show an error.
- [ ] Stale responses cannot overwrite a newer request when concurrency is possible.
- [ ] Request is aborted on unmount.

### Recent searches

- [ ] Maximum five are shown.
- [ ] Duplicate cities are collapsed case-insensitively.
- [ ] Clicking one searches it.
- [ ] Keys represent stable city identity.

## Common Mistakes

1. Hardcoding an API key in source.
2. Assuming `.env` makes a browser key secret.
3. Forgetting `response.ok` because `fetch` resolves on HTTP 404/500.
4. Treating cancellation as a user-facing error.
5. Ignoring race conditions.
6. Using a click-only search instead of a form.
7. Storing derived temperature/condition as separate state.
8. Using array indexes as keys when a stable city identity is available.
9. Retrying the edited input instead of the last submitted request.
10. Forgetting cleanup when the component owns an active request.
11. Trusting arbitrary external JSON without considering response-shape validation.

## Extensions

### Level 1

- Celsius/Fahrenheit toggle
- Weather icon
- Min/max temperature

### Level 2

- Geolocation
- Recent-search persistence
- Debounced autocomplete
- Query-library caching

### Level 3

- Backend proxy
- Server-side API-key protection
- Request deduplication
- Offline fallback
- Request-race tests
- Response-schema validation

## Debugging Lab

### Bug 1 — stale input on retry

The input is changed after a failed request and Retry searches the new input.

**Fix:** retain the last submitted value separately.

### Bug 2 — stale city wins

London and Paris requests overlap, and London renders after Paris.

**Fix:** abort the old request and, for intentionally concurrent workflows, guard updates with request identity.

### Bug 3 — blank screen during loading

The UI removes all weather information while refreshing.

**Fix:** decide whether the product wants initial loading and refresh loading to behave differently; preserve useful existing data during background refresh where appropriate.

### Bug 4 — error shown after cancellation

The catch block treats `AbortError` as a real failure.

**Fix:** detect cancellation and return without changing the error state.

### Bug 5 — API key considered secure because it is in `.env`

**Fix:** explain the browser security boundary and move sensitive credentials behind a backend.

## Hands-on Exercises

### Level 1 — Core Weather Search

Implement city search with loading, success, empty/not-found, and error states.

### Level 2 — Recent Searches

Maintain the five most recent unique cities.

### Level 3 — Cancellation

Abort the previous request when a new search starts and abort on unmount.

### Level 4 — Race Protection

Write a test or simulation where two requests resolve in reverse order and prove stale data cannot win.

### Level 5 — Production Upgrade

Add schema validation, retry rules for safe failures, cached searches, and a backend proxy for sensitive credentials.

For every exercise document:

- state ownership
- request trigger
- request lifecycle
- cancellation behavior
- error behavior
- accessibility behavior
- security boundary

## Assessment

1. Why use `URLSearchParams`?
2. Why doesn't `fetch` throw for HTTP 404 by default?
3. Why is a browser API key not actually secret?
4. Why does `AbortController` matter for rapid searches?
5. Why is `status` often cleaner than several booleans?
6. Why should recent searches be capped?
7. Why should derived weather values not become duplicate state?
8. How can stale responses be prevented?
9. Why should Retry use the last submitted value?
10. Why should the active request be aborted on unmount?
11. When would you use a request-ID guard in addition to cancellation?
12. Why is response-shape validation useful at an external API boundary?

### Answers

1. It serializes and encodes query parameters clearly.
2. Fetch resolves for many HTTP error responses; check `response.ok`.
3. Browser-delivered values can be inspected by users.
4. It stops obsolete requests where possible and reduces stale work.
5. One explicit state model avoids impossible boolean combinations.
6. It prevents unbounded UI state and keeps the recent list useful.
7. They can be derived from the source response and otherwise create synchronization problems.
8. Abort obsolete requests and/or associate responses with request identity.
9. The user may edit the input after the failure.
10. The component owns the request resource and should release it when unmounted.
11. When requests can intentionally overlap or cancellation cannot guarantee that an older result cannot resolve.
12. External APIs are outside your type/runtime trust boundary; malformed data should not blindly crash presentation code.

## Interview Questions

### Beginner

**Why use a form instead of only a button click?**

A form gives correct submit semantics and keyboard support.

**Why check `response.ok`?**

Fetch resolves for many HTTP error statuses, so application code must decide whether the response is successful.

### Intermediate

**How do you prevent stale search results?**

Abort obsolete requests where possible and/or associate each result with a request identity so only the current request can update the UI.

**Why separate the API function from the component?**

It reduces coupling, makes transport code reusable, and simplifies testing.

**Why isn't a client-side environment variable a secret?**

The resulting value is delivered to the browser and can be inspected.

### Advanced

**Would you use `useEffect` for this search?**

A submit-driven search is naturally an event-driven action. An effect is more appropriate when the request synchronizes with changing external state, such as a route/query parameter.

**When is cancellation insufficient?**

If requests can overlap and an older request can still resolve, request identity/ownership protection may be needed as well.

**Why use `useRef` for AbortController?**

The controller is an imperative resource; changing it should not itself trigger a render.

**How would you protect a weather API key?**

Use a backend/proxy that keeps the secret server-side; browser keys should be treated as public and restricted where possible.

## Final Acceptance Criteria

- [ ] Complete controlled search form.
- [ ] Input validation.
- [ ] Idle/loading/success/empty/error states.
- [ ] Safe HTTP and network error handling.
- [ ] Abort/race protection.
- [ ] Abort on unmount.
- [ ] Accessible status and error UI.
- [ ] Recent searches with stable identity.
- [ ] No duplicated derived state.
- [ ] No committed secret.
- [ ] Clear API boundary.
- [ ] Retry targets the last submitted search.
- [ ] External response shape is handled defensively.
- [ ] Core flows are testable.

## Day 28 Outcome

You can now build an end-to-end React API project while making deliberate decisions about state ownership, request lifecycle, cancellation, race conditions, accessibility, security boundaries, and user experience.

**Next:** Day 29 — `useRef`, mutable values, DOM references, and imperative escape hatches.