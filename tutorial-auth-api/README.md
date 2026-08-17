# Tutorial Auth API

Separate backend service for authentication validation.

## Features

- POST /auth/login validates credentials and returns JWT token + user role.
- GET /auth/validate checks token validity and returns user payload.
- GET /health for deployment health checks.

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
