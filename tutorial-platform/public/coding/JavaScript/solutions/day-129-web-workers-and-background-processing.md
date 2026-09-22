# Day 129 Solutions — Web Workers & Background Processing

## 1. Worker communication

```js
// main.js
const worker = new Worker("./worker.js", { type: "module" });

worker.addEventListener("message", ({ data }) => {
  console.log("result:", data);
});

worker.postMessage({ value: 40 });

worker.addEventListener("error", console.error);
```

```js
// worker.js
self.addEventListener("message", ({ data }) => {
  self.postMessage(data.value * 2);
});
```

## 2. Terminate the Worker

```js
worker.terminate();
```

## 3. Transfer an ArrayBuffer

```js
const buffer = new ArrayBuffer(1024);

worker.postMessage(buffer, [buffer]);
```

The buffer is transferred rather than cloned; ownership moves to the Worker.

## Interview Takeaway

A Promise changes how asynchronous work is coordinated. A Worker changes **where CPU work executes**. They solve different problems.
