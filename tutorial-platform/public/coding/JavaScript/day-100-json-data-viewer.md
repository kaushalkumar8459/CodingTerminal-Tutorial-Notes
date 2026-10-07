# Day 100 — JSON Data Viewer

Matches Tutorial Day 100 (JSON In Depth). No limit on how far you extend this.

## Basic

1. Convert a plain object to a JSON string with `JSON.stringify()` and log it.
2. Convert that JSON string back to an object with `JSON.parse()` and confirm it
   matches the original.
3. Try `JSON.stringify()` on an object containing a function, `undefined`, and a
   `Date` — confirm exactly what happens to each value.
4. Pretty-print a nested object using `JSON.stringify(obj, null, 2)`.
5. Try `JSON.parse()` on deliberately broken JSON text (e.g. missing a closing brace)
   and confirm it throws — then wrap it in `try/catch` to handle it gracefully.

## Project: JSON Data Viewer

6. Build a small page with a `<textarea>` where a user can paste ANY JSON text.
7. Add a "Parse & Display" button that safely parses the input (using `try/catch`)
   and displays the resulting data as a readable, nested list/tree on the page
   (recursively rendering objects/arrays/values).
8. If the input isn't valid JSON, show a clear error message instead of crashing.
9. Add a "Pretty Print" button that reformats the textarea's content using
   `JSON.stringify(JSON.parse(text), null, 2)`.
10. Add a "Minify" button that removes all extra whitespace/indentation from the
    JSON text (hint: `JSON.stringify(JSON.parse(text))` without the `space` argument).

## Interview-style questions

11. Why does `JSON.stringify()` silently DROP `undefined` values and functions,
    rather than throwing an error?
12. What real-world scenario would need you to write a RECURSIVE function to display
    JSON data (hint: think about how deeply nested real JSON data can be)?
13. Why should you always validate/handle errors when calling `JSON.parse()` on data
    from an external source (user input, Local Storage, an API)?

## Notes

- Building a JSON viewer that RECURSIVELY renders nested objects/arrays is genuinely
  useful practice — the same recursive-rendering technique reappears in real UI
  frameworks constantly.
- Test your viewer with deeply nested, "ugly" real-world JSON (like an actual API
  response) to make sure your recursive rendering handles arbitrary depth correctly.

<!-- codingterminal-solution:start -->

# Day 100 — Solution: JSON Data Viewer

```js
const value = { name: "Asha", skills: ["JS", "DOM"], active: true };
const json = JSON.stringify(value);
const parsed = JSON.parse(json);
console.log(parsed);
console.log(
  JSON.stringify({ fn() {}, missing: undefined, date: new Date("2026-01-01") }),
);
console.log(JSON.stringify(value, null, 2));
try {
  JSON.parse('{"broken": true');
} catch (error) {
  console.error("Invalid JSON", error.message);
}
```

**6–10. Recursive viewer**

```js
const input = document.querySelector("#json");
const output = document.querySelector("#output");
function renderValue(value) {
  const element = document.createElement("li");
  if (value !== null && typeof value === "object") {
    const label = document.createElement("strong");
    label.textContent = Array.isArray(value) ? "array" : "object";
    element.append(label);
    const children = document.createElement("ul");
    for (const [key, child] of Object.entries(value)) {
      const row = document.createElement("li");
      row.textContent = `${key}: `;
      const nested = renderValue(child);
      row.append(nested);
      children.append(row);
    }
    element.append(children);
  } else element.append(document.createTextNode(String(value)));
  return element;
}
function parseInput() {
  try {
    output.replaceChildren(renderValue(JSON.parse(input.value)));
    document.querySelector("#error").textContent = "";
  } catch (error) {
    output.replaceChildren();
    document.querySelector("#error").textContent =
      `Invalid JSON: ${error.message}`;
  }
}
document.querySelector("#display").addEventListener("click", parseInput);
document.querySelector("#pretty").addEventListener("click", () => {
  try {
    input.value = JSON.stringify(JSON.parse(input.value), null, 2);
  } catch {
    document.querySelector("#error").textContent = "Invalid JSON";
  }
});
document.querySelector("#minify").addEventListener("click", () => {
  try {
    input.value = JSON.stringify(JSON.parse(input.value));
  } catch {
    document.querySelector("#error").textContent = "Invalid JSON";
  }
});
```

## Interview-style questions

**11.** JSON is a data format that cannot represent functions or `undefined`, so stringify omits those values rather than encoding unsupported data.

**12.** Arbitrarily nested API responses, configuration files, and trees require recursion because each object or array can contain another object or array.

**13.** External data can be malformed or tampered with; catching parse errors prevents the application from crashing and lets it show a useful message.

<!-- codingterminal-solution:end -->

