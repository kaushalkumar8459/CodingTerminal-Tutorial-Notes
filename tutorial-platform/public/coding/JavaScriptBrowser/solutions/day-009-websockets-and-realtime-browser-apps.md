# Day 009 Solutions — WebSockets & Real-Time Browser Apps

## Basic Client

```js
const socket = new WebSocket("wss://example.com/socket");

socket.addEventListener("open", () => {
  socket.send(JSON.stringify({ type: "subscribe", channel: "jobs" }));
});

socket.addEventListener("message", ({ data }) => {
  console.log(JSON.parse(data));
});

socket.addEventListener("close", () => {
  console.log("Disconnected");
});
```

## Exponential Backoff

A practical strategy:

```js
const delay = Math.min(1000 * 2 ** attempt, 30000);
```

Add jitter in production to reduce synchronized reconnects.

## Prevent Stale Results

Include a monotonically increasing request/message ID and only apply a response when it is still current.

## Interview Takeaway

WebSockets provide bidirectional communication over a persistent connection. SSE is server-to-client streaming over HTTP and can be simpler when the browser only needs server-originated updates.
