# Architecture & System Design

## 10. Proposed Product Architecture

## 10.1 Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Framer Motion
- Tailwind CSS and shared design tokens
- Sentry browser SDK

### Backend

- Node.js 20+
- Express.js
- TypeScript preferred for backend consistency
- Mongoose ODM
- JWT-based authentication with refresh/session strategy
- Validation middleware using Zod, Joi, or express-validator
- Structured logging library such as Pino or Winston

### Database

- MongoDB Atlas preferred for managed production database

### Deployment

- Heroku app for runtime hosting
- Optional split deployment:
  - One Heroku app for API and frontend static delivery
- Or a unified deployment:
  - Build frontend
  - Serve static frontend and API from one Express app

Recommended approach for current scope:

- Use a unified MERN deployment on Heroku initially to keep operations simple.
- Serve the React build from the Express server.
- Connect Express to MongoDB Atlas.

## 10.2 High-Level System Design

### Public Surface

- Delivers portfolio pages
- Fetches projects/testimonials/content from API or static seed source
- Submits contact and project inquiry forms to backend

### Private Surface

- Requires authentication
- Consumes API for clients, projects, invoices, messages, activity, analytics, profile, and settings

### Backend Responsibilities

- Authentication and token issuance
- Authorization and route protection
- Input validation
- CRUD operations
- Audit/event recording
- Business rule enforcement
- Logging and health endpoints
- Rate limiting and abuse prevention

### Database Responsibilities

- Persistent storage for business entities
- Indexed querying
- Historical event storage
- Retention-ready document modeling

## 12. User Journeys

## 12.1 Public Portfolio Journey

1. User lands on home page.
2. User explores hero, about, expertise, tech stack, projects, testimonials, and contact CTA.
3. User clicks primary CTA or navigates to Start Project.
4. User fills inquiry form with name, email, project context, budget, and timeline.
5. User submits inquiry.
6. System validates input, stores inquiry, creates audit event, and returns success state.
7. Dashboard user can later review this inquiry or transformed lead record.

## 12.2 Dashboard User Journey

1. Admin visits login page.
2. Admin authenticates.
3. Backend validates credentials and issues secure session/token.
4. Admin accesses overview and operational modules.
5. Admin creates or updates clients, projects, invoices, messages, and notes.
6. Each write operation persists in MongoDB and logs activity history.
7. Dashboard analytics update based on persisted state.

## 12.3 Incident or Failure Journey

1. API request fails.
2. UI shows user-safe error message.
3. Error is logged with context.
4. Critical failures trigger alerting or incident review workflow.
