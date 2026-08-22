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

This is a project day: the goal is not only to make the screen work, but to make the implementation explainable, testable, and maintainable.

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
- distinguish initial loading from background refresh
- keep derived weather values out of unnecessary state
- make the form keyboard-accessible
- explain why a client-side API key is not a secret
- test happy-path, failure-path, cancellation, and race scenarios

## Project Requirements

Build a Weather App with:

1. City search.
2. Enter-key submission.
3. Input validation.
4. Initial loading state.
5. Background refresh state.
6. Success state.
7. Empty/not-found state.
8. Error state with retry.
9. Request cancellation.
10. Stale-response protection.
11. Recent searches.
12. Accessible status/error messaging.
13. Responsive presentation.
14. No committed secrets.

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
const requestIdRef = useRef(0);
const lastSubmittedCityRef = useRef("");
```

Store source-of-truth state. Derive values such as rounded temperature, condition text, humidity labels, and display strings from `weather` during render.

A useful rule is:

> Store the minimum source-of-truth state; derive presentation from it.

## API Security

For a browser-only tutorial, an environment variable keeps configuration out of committed source, but **does not make a browser API key secret**. Anything delivered to the browser can be inspected by users.

For sensitive credentials, use a backend/proxy:

```text
Browser
   ↓
Your backend
   ↓ secret credential
Weather provider
```

Also follow the provider's terms and restrict browser keys by origin/quota where supported.

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
 └── cancellation → keep the current UI; no error
```

When refreshing existing data, do not automatically erase useful weather information. Model refresh separately from the initial empty loading screen when the product requires it.

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

Using `onSubmit` supports Enter-key submission and preserves form semantics.

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
    const message = body?.message || `Weather request failed (${response.status})`;
    throw new Error(message);
  }

  return body;
}
```

`URLSearchParams` handles query-string encoding. Do not put React state updates inside the service.

## Request Lifecycle

For a submit-driven request, `useRef` is appropriate for the active `AbortController` because it is an imperative resource and changing it should not trigger a render.

```jsx
controllerRef.current?.abort();
const controller = new AbortController();
controllerRef.current = controller;
const requestId = ++requestIdRef.current;
```

For a first request:

```jsx
setStatus("loading");
```

For a refresh while data already exists, the UI can preserve the existing weather and expose a separate `refreshing` indicator.

On success:

```jsx
setWeather(result);
setStatus("success");
```

On a real failure:

```jsx
setError(message);
setStatus("error");
```

On cancellation, do not replace the UI with an error message.

## Race Conditions and Cancellation

If the user searches `London` and immediately searches `Paris`, cancellation should stop the obsolete request where possible. Cancellation alone is not a correctness guarantee because an already-completed request cannot be retroactively cancelled.

Use request ownership when necessary:

```jsx
const requestId = ++requestIdRef.current;
const result = await getWeather(value, controller.signal);

if (requestId !== requestIdRef.current) return;
setWeather(result);
```

The rule is:

> Only the request that currently owns the UI may commit its result.

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
  const requestIdRef = useRef(0);
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
    const requestId = ++requestIdRef.current;
    lastSubmittedCityRef.current = value;

    const hasExistingWeather = weather !== null;
    setStatus(hasExistingWeather ? "refreshing" : "loading");
    setError(null);

    try {
      const result = await getWeather(value, controller.signal);

      if (controller.signal.aborted || requestId !== requestIdRef.current) return;

      if (!result || !result.main || !Array.isArray(result.weather)) {
        setWeather(null);
        setStatus("empty");
        return;
      }

      setWeather(result);
      setStatus("success");
      setRecentSearches((current) => [
        value,
        ...current.filter((item) => item.toLowerCase() !== value.toLowerCase()),
      ].slice(0, 5));
    } catch (requestError) {
      if (requestError?.name === "AbortError") return;
      if (requestId !== requestIdRef.current) return;

      setError(requestError instanceof Error ? requestError.message : "Request failed");
      setStatus("error");
    }
  }

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      requestIdRef.current += 1;
    };
  }, []);

  const temperature = weather ? Math.round(weather.main.temp) : null;
  const condition = weather?.weather?.[0]?.description ?? "Unknown condition";

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
        <button type="submit" disabled={status === "loading" || status === "refreshing"}>
          {status === "refreshing" || status === "loading" ? "Searching..." : "Search"}
        </button>
      </form>

      {status === "idle" && <p>Search for a city to see its weather.</p>}

      {(status === "loading" || status === "refreshing") && (
        <p role="status" aria-live="polite">
          {status === "refreshing" ? "Updating weather..." : "Loading weather..."}
        </p>
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

      {status === "empty" && (
        <p role="status">No usable weather data was returned for this search.</p>
      )}

      {weather && (status === "success" || status === "refreshing") && (
        <article aria-label={`Weather for ${weather.name}`}>
          <h2>{weather.name}</h2>
          <p>{temperature}°C</p>
          <p>{condition}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind?.speed ?? "Unknown"} m/s</p>
        </article>
      )}

      {recentSearches.length > 0 && (
        <section aria-labelledby="recent-searches-heading">
          <h2 id="recent-searches-heading">Recent searches</h2>
          <ul>
            {recentSearches.map((item) => (
              <li key={item.toLowerCase()}>
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

The user may edit the input after a failed request. Retry the request that actually failed, not whatever happens to be in the input now.

### 2. State updates are scheduled

Do not rely on this:

```jsx
setCity("Paris");
searchWeather(undefined, city);
```

Pass `"Paris"` directly when that is the intended request value.

### 3. Cleanup on unmount

Abort the active request and invalidate its request identity when the component unmounts.

### 4. Validate response shape

A successful HTTP response does not guarantee that the JSON has the fields your UI expects. Validate external data at the trust boundary when the application warrants it.

### 5. Refreshing is different from initial loading

Initial loading has no data to preserve. Refreshing can keep the current weather visible while showing progress. Do not automatically clear useful data just because a new request started.

## Weather Data Presentation

Prefer derived values:

```jsx
const temperature = Math.round(weather.main.temp);
const condition = weather.weather?.[0]?.description ?? "Unknown";
```

Do not duplicate these as independent state.

## Accessibility

- use a real `<form>`
- associate `<label>` with the input
- support keyboard submission
- use `role="status"` for non-critical progress
- use `role="alert"` for important errors
- keep retry and recent-search controls keyboard accessible
- do not communicate information through color alone
- keep focus behavior predictable
- provide meaningful names for interactive controls

## UX State Matrix

| State | Data | Progress | Error | Recommended UI |
|---|---|---|---|---|
| `idle` | none | no | no | Search instruction |
| `loading` | none | yes | no | Initial loader |
| `refreshing` | existing | yes | no | Keep data + refresh indicator |
| `success` | valid | no | no | Weather card |
| `empty` | unusable/none | no | no | No-data message |
| `error` | existing or none | no | yes | Safe error + retry |

## Testing Checklist

### Input

- [ ] Empty input does not send a request.
- [ ] Leading/trailing spaces are removed.
- [ ] Enter submits.
- [ ] Duplicate submission is prevented while the request is active.

### Success

- [ ] City name renders.
- [ ] Temperature renders correctly.
- [ ] Condition renders safely.
- [ ] Additional metrics render safely.

### Error

- [ ] Invalid city produces an actionable message.
- [ ] Retry uses the last submitted city.
- [ ] A new request clears the previous error.
- [ ] Cancellation does not become an error.

### Cancellation and races

- [ ] Previous request is aborted when a newer search starts.
- [ ] Stale responses cannot overwrite newer results.
- [ ] Request identity is checked before committing async results.
- [ ] Request is invalidated and aborted on unmount.

### Refreshing

- [ ] Existing weather is not unnecessarily erased during refresh.
- [ ] Refresh progress is visible.
- [ ] A refresh failure has an intentional product behavior.

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
5. Relying only on cancellation for race correctness.
6. Using a click-only search instead of a form.
7. Storing derived temperature/condition as separate state.
8. Using array indexes as keys.
9. Retrying the edited input instead of the last submitted request.
10. Clearing useful weather data for every refresh.
11. Forgetting cleanup when the component owns an active request.
12. Trusting arbitrary external JSON without considering response-shape validation.

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

The input changes after a failed request and Retry searches the new input.

**Fix:** retain the last submitted value separately.

### Bug 2 — stale city wins

London and Paris requests overlap, and London renders after Paris.

**Fix:** abort obsolete work and guard the result with request identity.

### Bug 3 — blank screen during refresh

The UI removes all weather information while refreshing.

**Fix:** distinguish initial loading from refreshing and preserve existing data when appropriate.

### Bug 4 — error shown after cancellation

The catch block treats `AbortError` as a real failure.

**Fix:** detect cancellation and return without changing the error state.

### Bug 5 — API key considered secure because it is in `.env`

**Fix:** explain the browser security boundary and move sensitive credentials behind a backend.

### Bug 6 — stale request commits after unmount

An async request resolves after the component has been removed.

**Fix:** abort during cleanup and invalidate request identity so obsolete work cannot commit.

## Hands-on Exercises

### Level 1 — Core Weather Search

Implement city search with idle, loading, success, empty/not-found, and error states.

### Level 2 — Recent Searches

Maintain the five most recent unique cities.

### Level 3 — Cancellation

Abort the previous request when a new search starts and abort on unmount.

### Level 4 — Race Protection

Write a test where two requests resolve in reverse order and prove stale data cannot win.

### Level 5 — Production Upgrade

Add schema validation, safe retry rules, cached searches, a backend proxy, and a refresh UI that preserves existing data.

For every exercise document:

- state ownership
- request trigger
- request lifecycle
- cancellation behavior
- race ownership
- error behavior
- accessibility behavior
- security boundary

## Assessment

1. Why use `URLSearchParams`?
2. Why doesn't `fetch` throw for HTTP 404 by default?
3. Why is a browser API key not actually secret?
4. Why does `AbortController` matter for rapid searches?
5. Why is an explicit status model often cleaner than several booleans?
6. Why should recent searches be capped?
7. Why should derived weather values not become duplicate state?
8. How can stale responses be prevented?
9. Why should Retry use the last submitted value?
10. Why should the active request be aborted on unmount?
11. When would you use a request-ID guard in addition to cancellation?
12. Why distinguish initial loading from refreshing?
13. Why is response-shape validation useful at an external API boundary?
14. Why should mutation retry rules be different from read-only weather GET requests?

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
11. When requests can overlap or cancellation cannot guarantee that an older result cannot resolve.
12. Initial loading has no existing data; refreshing can preserve useful data while showing progress.
13. External APIs are outside your runtime trust boundary; malformed data should not blindly crash presentation code.
14. GET requests are normally safe to repeat, while mutations can create duplicate side effects unless the API provides idempotency guarantees.

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

A submit-driven search is naturally event-driven. An effect is more appropriate when the request synchronizes with changing external state, such as a route/query parameter.

**When is cancellation insufficient?**

If requests can overlap and an older request can still resolve, request identity/ownership protection may be needed as well.

**Why use `useRef` for AbortController?**

The controller is an imperative resource; changing it should not itself trigger a render.

**How would you protect a weather API key?**

Use a backend/proxy that keeps the secret server-side; browser keys should be treated as public and restricted where possible.

**How would you model initial loading and refresh loading?**

Use an explicit state model that can represent progress while retaining existing data, rather than treating every request as a blank initial screen.

## Final Acceptance Criteria

- [ ] Complete controlled search form.
- [ ] Input validation.
- [ ] Idle/loading/refreshing/success/empty/error states.
- [ ] Safe HTTP and network error handling.
- [ ] Abort and request-identity protection.
- [ ] Abort and invalidate requests on unmount.
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

You should be able to explain the difference between **initial loading, refreshing, empty, error, and success**, and why cancellation and request identity solve related but different problems.

**Next:** Day 29 — `useRef`, mutable values, DOM references, and imperative escape hatches.
