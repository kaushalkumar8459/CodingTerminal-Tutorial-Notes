# Day 108 — Solution: Memory and Performance

**1–3. Intl formatting**

```js
const price = 1234567.89;
for (const currency of ["USD", "EUR", "INR"])
  console.log(
    new Intl.NumberFormat("en", { style: "currency", currency }).format(price),
  );
const date = new Date();
for (const locale of ["en-US", "en-GB", "de-DE"])
  console.log(new Intl.DateTimeFormat(locale).format(date));
console.log(new Intl.NumberFormat("en-IN").format(price));
```

**4. Remove a listener**

```js
function handleResize() {
  console.log(innerWidth);
}
window.addEventListener("resize", handleResize);
window.removeEventListener("resize", handleResize);
```

**5–6. Lifetime review:** an ever-growing todo history, cache, or event array can retain data indefinitely; remove completed entries, cap history, expire cache items, and clean listeners. A counter closure intentionally keeps only its count alive; avoid accidentally closing over a huge dataset when a small derived value is enough.

**7. Bounded cache**

```js
class BoundedCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.values = new Map();
  }
  set(key, value) {
    this.values.delete(key);
    this.values.set(key, value);
    if (this.values.size > this.maxSize)
      this.values.delete(this.values.keys().next().value);
  }
  get(key) {
    const value = this.values.get(key);
    if (value !== undefined) {
      this.values.delete(key);
      this.values.set(key, value);
    }
    return value;
  }
}
```

**8. WeakMap metadata**

```js
const metadata = new WeakMap();
const element = {};
metadata.set(element, { rendered: true });
```

Removing the only strong reference to `element` allows its metadata to be collected.

## Interview-style questions

**9.** Long-running applications can accumulate listeners, duplicate work, and retained objects if old listeners are never removed.

**10.** Cap the size, expire entries, or use an eviction strategy such as LRU.

**11.** Intl handles locale conventions, grouping, currency symbols, calendars, and regional rules that manual formatting easily gets wrong.
