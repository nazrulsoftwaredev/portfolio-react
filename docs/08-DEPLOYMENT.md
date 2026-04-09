# Deployment Strategy

## 11. Deployment Strategy for Heroku

## 11.1 Deployment Model

Recommended production model:

- Single Heroku web dyno type for Express app
- React frontend built during `heroku-postbuild`
- Express serves `/api/*` routes and static frontend assets
- MongoDB Atlas used as external managed database
- Config vars stored in Heroku

Why this is preferred:

- Simpler operations
- Simpler domain and CORS model
- Easier environment management
- Lower deployment complexity for initial release

## 11.2 Heroku Requirements

- Procfile if needed for clarity, though `npm start` may be sufficient
- Node engine pinned in `package.json`
- Build pipeline configured
- Config vars for secrets and URLs
- Log drains or monitoring add-ons if adopted
- Graceful shutdown handling for dyno restarts

## 11.3 Required Environment Variables

### Frontend

- `VITE_API_BASE_URL`
- `VITE_SENTRY_DSN`
- `VITE_ERROR_REPORTING`
- `VITE_ANALYTICS`
- `VITE_APP_ENV`

### Backend

- `NODE_ENV`
- `PORT`
- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_TTL`
- `JWT_REFRESH_TTL`
- `APP_BASE_URL`
- `FRONTEND_BASE_URL`
- `SENTRY_DSN`
- `LOG_LEVEL`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX_REQUESTS`
- `COOKIE_SECRET` if cookie middleware is used

## 11.4 Deployment Environments

- Local development
- Staging
- Production

Environment expectations:

- Staging mirrors production architecture as closely as possible
- Production secrets are isolated
- Production telemetry is enabled
- Feature flags can be toggled without code change when possible
