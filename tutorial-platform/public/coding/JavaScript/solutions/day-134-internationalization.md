# Day 134 Solutions — JavaScript Internationalization

## 1. Currency

```js
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
});

console.log(formatter.format(150000));
```

## 2. Date and time

```js
const formatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata"
});

console.log(formatter.format(new Date()));
```

## 3. Locale-aware sorting

```js
const names = ["Émile", "Alice", "Álvaro"];

names.sort(new Intl.Collator("en").compare);
```

## 4. Relative time

```js
const relative = new Intl.RelativeTimeFormat("en", {
  numeric: "auto"
});

console.log(relative.format(-1, "day"));
```

## Interview Takeaway

Store canonical values such as timestamps and numeric amounts; format them only at the presentation boundary using the user's locale and required time zone.
