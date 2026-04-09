# Release Roadmap & Next Steps

## 23. Release Strategy

## 23.1 Phase 1: Production Minimum Viable Release

- Implement Express backend
- Connect MongoDB Atlas
- Implement auth and protected APIs
- Replace local-only persistence with database-backed CRUD
- Implement public inquiry endpoints
- Add server validation, logging, and health endpoints
- Deploy to Heroku staging and production

Exit criteria:

- Users can log in securely
- Core dashboard flows persist to MongoDB
- Public forms work end-to-end
- Production deployment is stable

## 23.2 Phase 2: Quality and Hardening

- Add stronger observability
- Add rate limiting and anti-spam
- Improve analytics instrumentation
- Expand validation coverage
- Add automated tests into CI

Exit criteria:

- Operational telemetry is sufficient for incident triage
- Core flows are covered by automated checks
- Security baseline is verified

## 23.3 Phase 3: Scale and Feature Growth

- Add finer permissions
- Add reporting enhancements
- Add optional realtime and collaboration features
- Consider split frontend/backend deployment if needed

## 24. Delivery Milestones

- Milestone 1: Backend architecture approved
- Milestone 2: Auth and user model complete
- Milestone 3: Client/project/invoice/message/activity APIs complete
- Milestone 4: Portfolio inquiry flow connected
- Milestone 5: QA and staging sign-off
- Milestone 6: Production deployment on Heroku

## 25. Risks and Mitigations

- Risk: Backend scope may expand too quickly.
  - Mitigation: Prioritize auth, core CRUD, and inquiry capture before secondary features.

- Risk: Single-app Heroku deployment may become constrained at higher scale.
  - Mitigation: Start unified, design for future split deployment.

- Risk: Client-side assumptions may drift from backend contracts.
  - Mitigation: Define API schemas early and use typed contracts.

- Risk: Security debt may remain if mock patterns are partially retained.
  - Mitigation: Remove production use of hardcoded credentials and client-only auth logic entirely.

- Risk: Motion-rich UI could create performance regressions.
  - Mitigation: Maintain device-capability guards and reduced-motion fallbacks.

- Risk: Incomplete observability may slow debugging.
  - Mitigation: Add structured logging, request IDs, and error monitoring before launch.

## 26. Open Questions

- Will there be only one admin user at launch, or multiple dashboard users?
- Should authentication use cookies or bearer tokens for the first production release?
- Should public inquiries convert directly into client records, or remain separate as leads?
- Is file upload needed in the near-term roadmap?
- What analytics provider should be used for product event tracking?
- What retention policy is required for messages and activity history?

## 27. Dependencies

- MongoDB Atlas account and cluster
- Heroku app and pipeline setup
- Domain and DNS configuration
- Error monitoring provider configuration
- Analytics provider selection
- Security review for auth/session architecture

## 28. Approval Checklist

- Product sign-off on scope and priorities
- Engineering sign-off on MERN architecture
- Design sign-off on UX expectations
- QA sign-off on test scope
- Security sign-off on auth and headers
- Deployment sign-off on Heroku configuration

## 29. Implementation Notes Against Current Repository

Current repository evidence aligned to this PRD:

- App routing exists in `src/App.tsx`
- App bootstrap exists in `src/main.tsx`
- Portfolio routing exists in `src/features/portfolio/routes.tsx`
- Dashboard routing exists in `src/features/dashboard/routes.tsx`
- Dashboard service layer exists in `src/features/dashboard/api/services.ts`
- Portfolio service layer exists in `src/features/portfolio/api/services.ts`
- Portfolio endpoint constants exist in `src/features/portfolio/api/endpoints.ts`
- Theme system exists in `src/shared/theme/theme.ts`
- Motion configuration exists in `src/shared/constants/animations.ts`
- Environment config exists in `src/config/env.ts`
- Heroku-friendly frontend serving already exists in `server.js`
- Build/start scripts already exist in `package.json`

Important implementation gap:

- The current `server.js` only serves built frontend assets and does not yet implement the Express + MongoDB API layer required by this PRD.

## 30. Final Recommendation

This product should move forward as a unified MERN application deployed on Heroku, with React frontend and Express API served from one app in the first production release. MongoDB Atlas should be used for persistence. The immediate engineering priority is not visual redesign. It is backend completion, auth hardening, API contract definition, operational readiness, and removal of all mock-only production blockers.

## 31. What You Should Do NEXT (Very Important)

This is the required execution order for implementation. Do not change the sequence.

### Step 1: Do This NOW

Define these contracts before backend coding:

- API schemas
- Auth flow
- Pagination format

What must be finalized in Step 1:

- Request and response bodies for auth, users, clients, projects, invoices, activity logs, and portfolio endpoints
- Standard API success and error envelope
- Validation rules for every write endpoint
- Protected route access matrix by role
- Token/session lifecycle
- Pagination query params and response `meta` structure

Step 1 deliverables:

- API contract document
- Auth flow document
- Pagination specification
- Error code catalog

### Step 2

Create the backend using:

- Express + TypeScript
- MongoDB + Mongoose

Step 2 implementation expectations:

- Feature-based backend folder structure
- Central app bootstrap
- Environment config management
- MongoDB connection layer
- Shared error handling
- Shared response helpers
- Health and readiness endpoints

### Step 3

Build backend modules in this exact order:

1. Auth system
2. Users
3. Clients
4. Projects
5. Invoices
6. Activity logs
7. Portfolio APIs

Why this order is mandatory:

- Auth is the security foundation for everything private.
- Users must exist before ownership and role-based actions are reliable.
- Clients come before projects and invoices because they are the primary business parent entity.
- Activity logs depend on the write flows of the earlier modules.
- Portfolio APIs come last because they are operationally important but less foundational than secured dashboard infrastructure.

### Step 4

Add production platform concerns:

- Logging with Pino
- Rate limiting
- Validation with Zod

Step 4 expectations:

- Pino for application and request logging
- Request IDs and structured logs
- Rate limiting on login and public submission routes first
- Zod request validation for params, query, and body
- Shared validation error formatter

### Step 5

Deploy using:

- Heroku
- MongoDB Atlas

Step 5 expectations:

- Unified MERN deployment for first release
- Heroku config vars for secrets and database URI
- MongoDB Atlas network and credential configuration
- Staging environment before production
- Build verification and health checks post-deploy

## 32. Recommended Immediate Engineering Sequence

To keep execution practical, the first active engineering sprint should follow this order:

1. Freeze API schemas, auth flow, and pagination standard.
2. Scaffold Express + TypeScript app structure.
3. Connect MongoDB Atlas through Mongoose.
4. Add auth module and protected middleware.
5. Implement users module.
6. Implement clients module.
7. Implement projects module.
8. Implement invoices module.
9. Add activity log generation from write actions.
10. Implement portfolio public APIs.
11. Add Pino, Zod, and rate limiting.
12. Deploy to Heroku staging, then production.
