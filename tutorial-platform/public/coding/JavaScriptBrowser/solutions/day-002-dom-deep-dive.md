# Day 002 Solutions — DOM Deep Dive

## Dynamic List

```js
const list = document.querySelector("#list");
const fragment = document.createDocumentFragment();

for (const name of ["Angular", "JavaScript", "TypeScript"]) {
  const item = document.createElement("li");
  item.textContent = name;
  fragment.append(item);
}

list.append(fragment);
```

A DocumentFragment lets multiple nodes be assembled before insertion.

## Safe Text

```js
item.textContent = userProvidedValue;
```

Use textContent when the input should be displayed as text. Treat innerHTML as an HTML parsing boundary and never inject untrusted HTML without appropriate sanitization.

## Interview Takeaway

The DOM is an object representation of the document. DOM operations can have rendering costs, so batch work where practical.
