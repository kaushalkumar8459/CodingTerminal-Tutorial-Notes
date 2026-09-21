# Day 106 — Solution: Debounce

```js
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
const search = debounce((term) => console.log(`Searching for: ${term}`), 500);
search("j");
search("ja");
search("javascript");

const input = document.querySelector("#search");
const indicator = document.querySelector("#searching");
const debouncedSearch = debounce((term) => {
  console.log(`Searching for: ${term}`);
  indicator.hidden = true;
}, 500);
input.addEventListener("input", (event) => {
  indicator.hidden = false;
  debouncedSearch(event.target.value);
});
```

Short delays feel responsive but may still trigger frequent work; long delays reduce calls but feel less immediate. Debouncing also suits autosave, validation, and resize-driven layout work. A rejected simulated search should be handled with `try/catch` inside the debounced async callback.

## Interview-style questions

**9.** Debouncing waits for a quiet period, reducing many rapid events to one final action.

**10.** Each new call represents newer input, so resetting the timer avoids processing stale intermediate values instead of queueing them.

**11.** Autosave, live validation, window resize calculations, and filter requests are common examples.
