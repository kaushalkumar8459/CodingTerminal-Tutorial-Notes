# Day 009 — WebSockets & Real-Time Browser Apps

## WebSocket Fundamentals

1. Explain the WebSocket connection lifecycle.
2. Open a WebSocket connection.
3. Handle open, message, error, and close events.
4. Send and receive messages.
5. Close a connection intentionally.

## Reconnection

6. Design exponential backoff for reconnect attempts.
7. Avoid reconnect storms.
8. Distinguish intentional close from unexpected disconnect.
9. Prevent duplicate active connections.

## Real-Time Design

10. Handle stale or out-of-order messages.
11. Add message IDs when acknowledgements are needed.
12. Design heartbeat/ping strategies.
13. Handle authentication and authorization at the application level.
14. Clean up the connection when the page/component lifecycle ends.

## Interview Questions

15. WebSocket vs HTTP polling?
16. WebSocket vs Server-Sent Events?
17. How would you implement reconnect?
18. How do you prevent duplicate messages?
19. What happens when the network changes?

## Practice

Build a browser chat client with connection status, reconnect backoff, message IDs, and cleanup.
