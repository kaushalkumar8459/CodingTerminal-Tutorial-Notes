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
