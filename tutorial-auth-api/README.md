# Tutorial Auth API

Backend service for authentication and MongoDB lesson content.

## Features

- POST /auth/login validates credentials and returns JWT token + user role.
- GET /auth/validate checks token validity and returns user payload.
- GET /health for deployment health checks.
- HTML lesson endpoints load sanitized lesson content and backend-driven navigation.

## HTML lesson API

`GET /api/html-lessons/nav` returns active tracks, sections, modules, and lessons.
`GET /api/html-lessons/:track/:title` returns a sanitized HTML lesson.
Admin-only `POST /api/html-lessons/:track` and `PUT /api/html-lessons/:track/:title` create and edit lessons.
Coding practice records are served by `GET /api/lessons` from MongoDB.

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
