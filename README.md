# BudgetManager

Full-stack starter for a budget management app using:

- Express API (Node.js)
- React + Vite frontend
- PostgreSQL 15
- Docker Compose orchestration

## Tech Stack

- API: Express, pg, dotenv, cors
- Client: React, Vite
- Database: PostgreSQL 15
- Containers: Docker, Docker Compose, Nginx (frontend serving + API proxy)

## Project Structure

```
BudgetManager/
  src/
    config/
      db.js                # PostgreSQL connection + connectivity check
    controllers/
      healthController.js  # Health endpoint logic
    middleware/
      errorHandler.js      # Shared API error middleware
    routes/
      healthRoutes.js      # Health routes
    index.js               # API bootstrap + CORS + route mounting

  client/
    src/
      App.jsx              # Landing page + API status check action
      App.css              # Landing page styles
      index.css            # Global styles + design tokens
      main.jsx             # React entry point
    nginx.conf             # Serves SPA + proxies /api to Express
    Dockerfile             # Builds Vite app, serves via Nginx

  Dockerfile               # API Docker image
  docker-compose.yml       # API + client + postgres + adminer services
  .env.example             # Environment variable template
```

## Environment Setup

1. Copy the example file:

```bash
cp .env.example .env
```

2. Fill values in `.env`.

## Run Locally (without Docker)

1. Install API dependencies:

```bash
npm install
```

2. Install client dependencies:

```bash
npm --prefix client install
```

3. Start API:

```bash
npm run dev
```

4. Start client (new terminal):

```bash
npm --prefix client run dev
```

### Local URLs

- Frontend: http://localhost:5173
- API: http://localhost:3000/health

## Run with Docker

```bash
docker compose up --build
```

### Docker URLs

- Frontend: http://localhost
- API direct: http://localhost:3000/health
- API through proxy: http://localhost/api/health
- Adminer: http://localhost:8080

## Next Development Steps

- Read `GETTING_STARTED.md` for where to add routes, controllers, DB logic, and frontend features.
- Add domain modules under `src/routes`, `src/controllers`, and `src/config`.
- Add DB migrations/seeds strategy once models/tables are defined.
