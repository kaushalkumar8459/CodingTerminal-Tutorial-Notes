---
title: Mini Project Weather App
slug: day-028-mini-project-weather-app
dayLabel: Day 28
level: Intermediate
estimatedMinutes: 120
order: 28
track: react
---
# Day 28 [Intermediate]: Mini Project — Weather App

## Goal

Build a realistic weather-search application that combines controlled forms, API requests, request-state modeling, cancellation, validation, accessibility, and derived presentation.

## Prerequisites

- Days 25–27
- `useState`, `useEffect`, async/await
- Fetch or Axios
- Loading/error/empty/success states

## Architecture

```text
WeatherApp
├── SearchForm
├── StatusMessage
├── WeatherCard
└── RecentSearches
```

State ownership:

```jsx
const [city, setCity] = useState("");
const [weather, setWeather] = useState(null);
const [status, setStatus] = useState("idle");
const [error, setError] = useState(null);
const [recentSearches, setRecentSearches] = useState([]);
```

Do not store display strings or temperature conversions that can be derived from the API response.

## API Key Security

For a browser-only tutorial, an environment variable keeps configuration out of the committed source code, but **does not make a browser API key secret**. Anything shipped to the browser can be inspected by users.

For sensitive credentials, call your own backend and keep the secret server-side.

## Search Flow

```text
idle
 ↓ submit
validate
 ↓
loading
 ├── success → weather card
 ├── success + invalid/empty result → empty state
 └── error → retryable error
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
      />
      <button type="submit" disabled={disabled}>
        {disabled ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
```

Using submit rather than only a click handler automatically supports Enter-key submission.

## API Function

Keep transport code separate from rendering:

```jsx
async function getWeather(city, signal) {
  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: import.meta.env.VITE_WEATHER_API_KEY,
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`,
    { signal }
  );

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Weather request failed");
  }

  return body;
}
```

`URLSearchParams` handles query-string encoding safely and clearly.

## Request Race Conditions

If the user searches `London` and immediately searches `Paris`, the London response could arrive after Paris. Without protection, stale London data could overwrite the newer Paris result.

Use `AbortController`:

```jsx
const controller = new AbortController();

try {
  const result = await getWeather(city, controller.signal);
} catch (error) {
  if (error.name !== "AbortError") {
    // show real failure
  }
}
```

In a component, store the active controller in a ref or use an effect cleanup when the request is effect-driven. For submit-driven requests, a ref is a practical approach.

## Complete Core Implementation

```jsx
import { useRef, useState } from "react";

async function getWeather(city, signal) {
  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: import.meta.env.VITE_WEATHER_API_KEY,
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`,
    { signal }
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Unable to find that city");
  }

  return body;
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const controllerRef = useRef(null);

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

    setStatus("loading");
    setError(null);

    try {
      const result = await getWeather(value, controller.signal);
      setWeather(result);
      setStatus("success");

      setRecentSearches((current) => [
        value,
        ...current.filter(
          (item) => item.toLowerCase() !== value.toLowerCase()
        ),
      ].slice(0, 5));
    } catch (error) {
      if (error.name === "AbortError") return;

      setWeather(null);
      setError(error instanceof Error ? error.message : "Request failed");
      setStatus("error");
    }
  }

  return (
    <main>
      <h1>Weather App</h1>

      <form onSubmit={searchWeather}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Searching..." : "Search"}
        </button>
      </form>

      {status === "idle" && <p>Search for a city to see its weather.</p>}
      {status === "loading" && (
        <p role="status" aria-live="polite">Loading weather...</p>
      )}
      {status === "error" && (
        <section role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => searchWeather(undefined, city)}>
            Retry
          </button>
        </section>
      )}
      {status === "success" && weather && (
        <article aria-label={`Weather for ${weather.name}`}>
          <h2>{weather.name}</h2>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </article>
      )}

      {recentSearches.length > 0 && (
        <section>
          <h2>Recent searches</h2>
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

## Important Implementation Note

The `Retry` action above reuses the current input. In a production app, preserve the last successful request separately if the user is allowed to edit the input after a failure.

Also, avoid calling `setCity` and immediately expecting `city` to contain the new value. React state updates are scheduled; pass the selected value directly to the request as shown.

## Weather Data Presentation

Prefer derived values:

```jsx
const temperature = Math.round(weather.main.temp);
const condition = weather.weather[0]?.description ?? "Unknown";
```

Do not duplicate these as state unless they represent independently editable or externally controlled information.

## Accessibility

- label the search input
- support Enter
- expose loading with `role="status"`
- expose errors with `role="alert"`
- use meaningful button text
- don't communicate weather state through color alone

## Testing Checklist

### Input

- [ ] Empty city does not send a request
- [ ] Spaces are trimmed
- [ ] Enter submits

### Success

- [ ] City name renders
- [ ] Temperature renders in the selected unit
- [ ] Condition renders
- [ ] Additional metrics render safely

### Error

- [ ] Invalid city produces an actionable message
- [ ] Retry works
- [ ] Previous error is cleared when a new request starts

### Race conditions

- [ ] Rapid searches do not allow stale results to overwrite newer results
- [ ] Aborted requests do not show an error message

### Recent searches

- [ ] Maximum five are shown
- [ ] Duplicate cities are collapsed
- [ ] Clicking one searches it

## Common Mistakes

1. Hardcoding an API key in source.
2. Forgetting `response.ok` because `fetch` resolves on HTTP 404/500.
3. Showing old weather during a new search without deciding whether that is intended.
4. Ignoring race conditions.
5. Using a click-only search instead of a form.
6. Storing derived temperature/condition as separate state.
7. Using array indexes as recent-search keys when identity can be represented by the city value.

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
- Tests for request races

## Assessment

1. Why use `URLSearchParams`?
2. Why doesn't `fetch` throw for HTTP 404 by default?
3. Why is a browser API key not actually secret?
4. Why does AbortController matter for rapid searches?
5. Why is `status` often cleaner than four booleans?
6. Why should recent searches be capped?
7. Why should state not duplicate derived weather fields?
8. How would you cache repeated city requests?

## Interview Questions

**How do you prevent stale search results?** Abort the previous request or associate each response with a request identity and ignore stale responses.

**Why check `response.ok`?** Fetch resolves for many HTTP error responses; application code must decide what counts as success.

**Should the API key be stored in `.env`?** Environment variables keep configuration out of committed source, but client-exposed variables are not secrets. Sensitive credentials require a server-side boundary.

**Would you use useEffect for this search?** A submit-driven search is naturally an event-driven action. An effect is appropriate if the request is a synchronization with changing external state, such as a route/query parameter.

## Final Acceptance Criteria

- [ ] Controlled form
- [ ] Validation
- [ ] Idle/loading/success/error states
- [ ] HTTP error handling
- [ ] Abort/race protection
- [ ] Accessible status UI
- [ ] Recent searches
- [ ] Stable keys
- [ ] No duplicated derived state
- [ ] No committed secret
- [ ] Clear API boundary

## Day 28 Outcome

You can build an end-to-end API application while making deliberate decisions about state ownership, request lifecycle, cancellation, accessibility, security boundaries, and user experience.

Day 29 moves from API state into `useRef` and imperative values.