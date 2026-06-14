# Getting Started Development Guide

This guide is your quick map for where to pick up development in BudgetManager.

## 1) Backend (Express API)

Main entry:

- `src/index.js`

What belongs where:

- `src/routes/`: define URL paths and attach controller handlers
- `src/controllers/`: keep request/response logic for each endpoint
- `src/config/`: DB connection, external services, shared configuration
- `src/middleware/`: reusable middleware (auth, validation, error handling)

Suggested pattern when adding a feature:

1. Create route file in `src/routes` (for example `budgetRoutes.js`)
2. Create controller file in `src/controllers` (for example `budgetController.js`)
3. Export route handler functions from controller
4. Mount route in `src/index.js` under `/api`
5. Add DB query/service utility in `src/config` or a new `src/services` folder if needed

Example future modules:

- budgets: CRUD for budgets
- transactions: income/expense operations
- categories: spending categories
- reports: monthly summaries

## 2) Database (PostgreSQL)

Current DB connection file:

- `src/config/db.js`

Current health check endpoint confirms DB connectivity via `SELECT 1`.

Recommended next steps:

1. Add schema migration tooling (for example: SQL migrations, Knex, or Sequelize)
2. Create tables for users, budgets, categories, transactions
3. Add indexes for transaction queries by date and category

## 3) Frontend (React + Vite)

Main app files:

- `client/src/main.jsx`: React bootstrap
- `client/src/App.jsx`: current landing page and API check button
- `client/src/App.css`: page-specific styles
- `client/src/index.css`: global styles and font tokens

Where to add future UI:

1. Add reusable components under `client/src/components`
2. Add page views under `client/src/pages`
3. Add API helpers under `client/src/api`
4. Add route handling with React Router when there are multiple pages

API access in frontend:

- Uses `VITE_API_URL` from `client/.env`
- In Docker/Nginx flow, `/api` is proxied to Express service

## 4) Docker and Deployment Layout

Files:

- `Dockerfile`: API image
- `client/Dockerfile`: frontend image (build + nginx serve)
- `client/nginx.conf`: SPA routing + `/api` proxy
- `docker-compose.yml`: all services and shared network

Services currently in compose:

- `client` (port 80)
- `api` (port 3000)
- `db` (port 5432)
- `adminer` (port 8080)

## 5) Daily Dev Workflow

1. Pull latest code
2. Update `.env` if needed
3. Run backend and frontend locally, or run `docker compose up --build`
4. Build client before merging major UI changes:

```bash
npm --prefix client run build
```

5. Keep features in isolated route/controller/component files

## 6) Where To Add What (Quick Cheat Sheet)

- New API endpoint: `src/routes` + `src/controllers` + mount in `src/index.js`
- New DB query logic: `src/config/db.js` or new service file
- New frontend page: `client/src/pages`
- New frontend reusable UI: `client/src/components`
- Global style tokens/themes: `client/src/index.css`
- Compose service changes: `docker-compose.yml`
- Frontend reverse proxy behavior: `client/nginx.conf`

## 7) Suggested Immediate Roadmap

1. Add auth (register/login + JWT middleware)
2. Implement budget and transaction CRUD endpoints
3. Add frontend forms + dashboard cards
4. Add validation and test coverage
5. Add CI for lint/build checks
