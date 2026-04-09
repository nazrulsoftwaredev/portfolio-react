# Dashboard Product Requirements Document (One Page)

Product: Portfolio Operations Dashboard
Repository: portfolio-react
Document owner: Product + Engineering
Version: 2.0 (production-grade)
Date: 2026-04-08
Status: Approved for implementation hardening

## 1) Product Goal, Scope, and Success Metrics

Purpose: Provide one secure internal workspace to run daily operations (clients, projects, invoices, messages, analytics) while integrating lead intake from the public portfolio.

In scope:

- Authenticated dashboard under /dashboard with role-based admin access.
- API platform under /api/v1 (auth, clients, projects, invoices, messages, analytics, portfolio, system).
- MongoDB-backed persistence for operational entities and audit activity.

Out of scope for this release:

- Multi-tenant team roles beyond current admin flow.
- Full realtime event streaming.
- Fully autonomous job orchestration for reminders/digests.

Release KPIs:

- Login success rate >= 99.5% per day.
- CRUD success rate >= 99.0% on clients/projects/invoices/messages.
- P95 dashboard page data load <= 1.5s (warm path).
- P95 API latency <= 400ms for list/detail endpoints under normal load.
- 0 critical security issues open at release signoff.

## 2) Dashboard Data Flow (Collection -> Processing -> Display)

Data sources:

- Manual updates from authenticated admin users (forms, table actions, tab workflows).
- Public lead intake from /api/v1/portfolio/contact and /api/v1/portfolio/start-project.
- Derived operational state from persisted entities (activity history, counts, status aggregates).

Primary request/response flow:

1. User authenticates at /dashboard/login.
2. Frontend sends POST /api/v1/auth/login.
3. Backend validates credentials (bcrypt), runs bootstrap checks, and issues JWT access/refresh tokens (httpOnly cookies).
4. Frontend routes request protected /api/v1 resources through service and hook layers.
5. Route handlers call domain services; services enforce ownership, validation, normalization, and mutation policy.
6. Mongoose models persist/retrieve data from MongoDB.
7. API returns standardized envelope:
   - Success: { status: "success", data, message?, meta? }
   - Error: { status: "error", error: { code, message, details? } }
8. Frontend normalizes loading/error/data and renders lists, cards, tabs, charts, badges, and feedback states.

Processing model:

- Query processing: q/status/sort/page/pageSize parameters for deterministic list views.
- Business processing: entity normalization, archival rules, conflict checks, activity logging.
- Presentation processing: derived counts, table slices, status grouping, and refetch invalidation.

Update model:

- Manual: create/update/archive clients, message replies/read-state, profile/security updates.
- Automated: bootstrap admin, seed baseline clients, update lastLoginAt, append Activity on key mutations.

## 3) User Interaction Requirements

Navigation and shell:

- Sidebar: Overview, Clients, Invoices, Pipeline, Analytics, Messages, Activity, Settings, Help.
- TopBar: global search context, theme toggle, profile menu.
- Responsive behavior: mobile overlay sidebar; desktop sticky navigation.

Core interaction contracts:

- Buttons/CTAs:
  - Overview quick actions route to work areas (invoices/pipeline/clients).
  - Stat cards are actionable deep-links.
- Filters/Search:
  - Clients supports text query, status cycle, sort selection, pagination, reset, and export action.
  - URL query params are source of truth for list state.
- Table row actions:
  - Open detail, email, call, edit, delete, status toggle.
  - Bulk select and bulk delete with confirmation.
- Form behavior:
  - Client form enforces required fields and format checks before submit.
  - Validation is inline, field-level, and blocking for invalid payloads.
- Feedback surfaces:
  - ConfirmDialog required for destructive mutations.
  - Toast feedback required for success/error completion states.
- Detail workspace:
  - Client detail tabs: overview, projects, invoices, messages, activity.

Accessibility baseline:

- Keyboard operable controls, visible focus states, semantic form labels/errors.
- Responsive usability at mobile and desktop breakpoints.

## 4) UI Flow and User Paths

Primary path:

1. Login -> Overview dashboard.
2. Overview -> Clients list -> Client detail tabs -> Edit/Create actions.
3. Overview -> sibling modules (Invoices, Pipeline, Analytics, Messages, Activity).
4. Settings/Profile/Security -> policy updates -> return to module context.
5. Logout -> session clear -> redirect to login.

Hierarchy:

- L1: global dashboard shell.
- L2: module landing page.
- L3: detail workspace (entity-focused tabs/forms).
- L4: modal confirmation and toast completion.

Transitions:

- Lazy-loaded routes with loading fallback.
- Motion-enhanced page/shell transitions with reduced-motion compatibility.

## 5) System Architecture

Frontend:

- React + TypeScript + Vite; feature-based module boundaries.
- Service + hooks API access pattern; local/component state with shared context.
- Session helper state in browser, synchronized with backend auth model.

Backend:

- Express app with middleware chain: request logging, helmet, cors, cookie parsing, auth guards, centralized error handling.
- Domain routes under /api/v1: auth, clients, projects, invoices, messages, analytics, portfolio, system.
- Service layer encapsulates business logic and data-shaping.

Data platform:

- MongoDB Atlas via Mongoose.
- Core models: User, Client, Project, Invoice, Message, Activity, Inquiry, PortfolioProject, Testimonial.
- Indexed access patterns for list filtering, sorting, and uniqueness constraints.

Security model:

- JWT access/refresh lifecycle with secure cookie transport.
- Password hashing with bcrypt.
- Login rate limiting and redaction-safe structured logging.

## 6) Automation and Background Processing

Implemented now:

- ensureBootstrapAdmin() for first-run admin bootstrap.
- ensureClientsSeed() for baseline sample data.
- markLoginSuccess() to maintain auth audit metadata.
- Activity logging on key mutations.
- Build pipeline automation: TypeScript compile, Vite bundle, static serve.

Planned for production hardening:

- Scheduled jobs for reminder/digest/invoice status automation.
- Realtime/polling strategy for analytics/messages freshness.
- Automated alerting/SLO policy on top of health/logging telemetry.

## 7) Technical Stack (Detailed)

Frontend stack:

- React 19, React Router, TypeScript, Vite, Tailwind CSS, Framer Motion.
- Component primitives + utility styling; shared validation and UI utilities.

Backend stack:

- Node.js 20+, Express 5, TypeScript, tsx (dev runtime), compiled build output.
- cors, helmet, cookie-parser, express-rate-limit, jsonwebtoken, bcryptjs, pino, pino-http, zod.

Data and platform stack:

- MongoDB Atlas + Mongoose ODM.
- REST API versioning under /api/v1.
- Environment-driven configuration (JWT secrets, DB URI, CORS origin, cookie names, log levels).

Tooling/deployment:

- ESLint, PostCSS, Tailwind config, TypeScript project references.
- Unified deployment model where backend serves built frontend assets.

## 8) Non-Functional Requirements and Release Gates

Performance:

- API P95 <= 400ms for standard list/detail endpoints.
- Dashboard P95 data-render <= 1.5s for warm navigation.

Reliability:

- Health endpoint and readiness endpoint must be green before release.
- Error-rate SLO and retry-safe client behavior on transient failures.

Security:

- No default production credentials.
- Secure cookie flags configured by environment.
- Critical dependency vulnerabilities resolved before release.

Observability:

- Structured logs with request correlation.
- Error reporting integration active in production environment.
- Actionable dashboard for auth failures, 5xx rates, and latency percentiles.

Quality:

- Regression coverage for auth, client CRUD, and core navigation flows.
- Accessibility smoke checks and responsive checks on key breakpoints.

## 9) Current Reality, Gaps, and Next Milestone Definition

Current reality:

- Architecture, routing, models, and primary API/domain scaffolding are in place.
- Core dashboard interactions exist with a mix of persisted and synthetic data flows.

Known gaps to close for production grade:

- Remove remaining synthetic paths in detail modules.
- Reach full CRUD parity and validation consistency across entities.
- Finalize readiness/monitoring hardening and operational runbooks.
- Complete automated jobs strategy where business rules require scheduled processing.

Definition of done for next milestone:

- All core modules run on persisted backend data without synthetic fallbacks.
- Release KPIs and NFR gates pass in staging for 7 consecutive days.
- Security, observability, and reliability checks are signed off by engineering.

This PRD is the implementation contract for converting the current prototype into a production-ready dashboard platform while preserving existing UX flow and architecture direction.
