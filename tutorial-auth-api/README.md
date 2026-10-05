# Tutorial Auth API

Separate backend service for authentication validation.

## Features

- POST /auth/login validates credentials and returns JWT token + user role.
- GET /auth/validate checks token validity and returns user payload.
- GET /health for deployment health checks.

## Tutorial content source

`CONTENT_SOURCE` selects how `GET /api/lessons` reads lessons:

- `database` (default): read from the configured MongoDB collection.
- `local`: read Markdown files from the shared local catalog in `tutorial-platform/public`.

Set `LOCAL_CONTENT_ROOT` to override the local content root. Paths in the catalog are relative to that directory. Add tracks and their local folders to `src/localContent.ts`.

Local mode is read-only for lesson content. `POST /api/lessons/save` returns HTTP 409 in local mode; switch back to `database` to save lessons to MongoDB.

## Run locally

1. Copy .env.example to .env and update values.
2. Install dependencies: npm install
3. Start dev server: npm run dev
4. Production build: npm run build ; npm run start

Default URL: http://localhost:4001

## Request examples

Login:

POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123",
  "role": "admin"
}

Validate:

GET /auth/validate
Authorization: Bearer <token>
