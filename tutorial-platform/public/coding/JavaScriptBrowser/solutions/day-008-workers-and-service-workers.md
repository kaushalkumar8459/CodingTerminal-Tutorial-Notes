# Day 008 Solutions — Workers & Service Workers

## Web Worker

```js
const worker = new Worker("./worker.js");

worker.postMessage({ value: 100000 });

worker.onmessage = ({ data }) => {
  console.log(data);
};
```

Workers do not directly manipulate the page DOM.

## Service Worker Registration

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

## Cache Versioning

```js
const CACHE_NAME = "docs-v2";
```

A new cache name can allow an updated Service Worker to populate a new cache and remove obsolete caches during activation.

## Interview Takeaway

Web Workers are primarily for background computation. Service Workers act as programmable network/proxy-like workers for their controlled scope and enable capabilities such as offline caching.
