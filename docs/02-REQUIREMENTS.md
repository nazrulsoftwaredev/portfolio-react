# Functional & Non-Functional Requirements

## 13. Functional Requirements

## 13.1 Portfolio Requirements

- FR-P-001: The system shall expose public routes for Home and Start Project.
- FR-P-002: The Home page shall render hero, about, expertise, tech stack, projects gallery, testimonials, and contact CTA sections.
- FR-P-003: The project gallery shall display project metadata including title, category, summary, status, tags, image, and live link when available.
- FR-P-004: The system shall support content retrieval through structured frontend services and backend APIs.
- FR-P-005: The Start Project page shall capture at minimum name, email, project description, budget range, and preferred timeline.
- FR-P-006: The system shall validate form fields on the client before submission.
- FR-P-007: The backend shall validate the same fields server-side before persistence.
- FR-P-008: Submission flows shall expose pending, success, validation error, and system error states.
- FR-P-009: Portfolio forms shall create a persistent inquiry record in MongoDB.
- FR-P-010: Each inquiry submission shall generate an activity/audit event.
- FR-P-011: Motion-heavy UI behaviors shall degrade automatically for reduced-motion users and unsupported device classes.
- FR-P-012: Public pages shall provide graceful fallback behavior for missing routes and runtime failures.

### Portfolio Acceptance Criteria

- AC-P-001: Home and Start Project routes load correctly on mobile, tablet, and desktop.
- AC-P-002: Invalid required inputs prevent submission with field-level feedback.
- AC-P-003: Successful submission persists an inquiry record in the database.
- AC-P-004: API failure results in a visible non-technical error message.
- AC-P-005: Reduced-motion preferences disable non-essential motion behaviors.

## 13.2 Authentication and Authorization Requirements

- FR-A-001: The system shall support authenticated access for dashboard users.
- FR-A-002: Authentication shall not rely on hardcoded frontend credentials in production.
- FR-A-003: The backend shall issue signed access and refresh tokens or an equivalent secure session model.
- FR-A-004: Tokens or sessions shall expire according to configurable TTL rules.
- FR-A-005: Protected routes shall require valid authentication on the server side.
- FR-A-006: The system shall support only one roles in current scope: `admin`.
- FR-A-007: Authorization shall be enforced on protected API endpoints.
- FR-A-008: Logout shall invalidate active session state at the client and, where applicable, server/session store.
- FR-A-009: Failed login attempts shall return generic responses that do not reveal credential specifics.
- FR-A-010: The system should support future migration to stronger auth such as email OTP, password reset, or third-party identity providers.

### Authentication Acceptance Criteria

- AC-A-001: Invalid login does not create a session.
- AC-A-002: Expired session blocks protected dashboard access.
- AC-A-003: A user without sufficient permissions receives `403 Forbidden`.
- AC-A-004: Direct API access without a valid token receives `401 Unauthorized`.

## 13.3 Dashboard Requirements

- FR-D-001: The system shall expose dashboard routes for overview, clients, client detail, client form, pipeline, invoices, messages, activity, analytics, profile, settings, security, and help.
- FR-D-002: The dashboard shall load persisted data from backend APIs, not browser-only storage, in production mode.
- FR-D-003: The clients module shall support create, read, update, archive/deactivate, and status management flows.
- FR-D-004: Clients listing shall support search, filtering, sorting, pagination, and stable result counts.
- FR-D-005: Client detail shall aggregate client profile, related projects, invoices, messages, and activity timeline.
- FR-D-006: The pipeline view shall present project stages and stage-level visibility.
- FR-D-007: Projects shall support stage transitions across at minimum Discovery, Design, Build, Review, and Delivered.
- FR-D-008: Invoice records shall support lifecycle states Draft, Pending, Overdue, and Paid.
- FR-D-009: Message records shall support unread flag, preview text, timestamp, and client association.
- FR-D-010: Activity records shall support chronological display and filter by activity type.
- FR-D-011: Analytics shall compute and present key operational metrics from persisted data.
- FR-D-012: Profile and settings pages shall support editable user settings where enabled.
- FR-D-013: Security page shall expose security-relevant account information and actions appropriate to current scope.
- FR-D-014: Help page shall remain available as a support/reference route.

### Dashboard Acceptance Criteria

- AC-D-001: Authenticated users can access all permitted dashboard routes.
- AC-D-002: CRUD changes persist after reload and across devices.
- AC-D-003: Client detail aggregates related entities consistently.
- AC-D-004: Filtering and sorting produce deterministic results.
- AC-D-005: Analytics values reflect current database state.

## 13.4 Platform and Shared Requirements

- FR-X-001: Route configuration shall remain modular and feature-based.
- FR-X-002: Shared theme and provider composition shall initialize safely.
- FR-X-003: Error boundaries shall prevent blank-screen failures.
- FR-X-004: API endpoints shall be centrally defined and versionable.
- FR-X-005: The frontend shall support environment-based configuration.
- FR-X-006: The backend shall expose versioned APIs under a consistent namespace, preferably `/api/v1`.
- FR-X-007: The system shall return consistent JSON response envelopes for success and error flows.
- FR-X-008: The system shall support future extraction into separate frontend/backend deployables if scale demands it.

## 17. Non-Functional Requirements

## 17.1 Performance

- NFR-P-001: Public pages should load with strong perceived performance on typical mobile networks.
- NFR-P-002: Route-level code splitting shall be used where beneficial.
- NFR-P-003: Motion effects shall not significantly degrade input responsiveness.
- NFR-P-004: Dashboard list operations shall remain performant for expected current-scale datasets.

## 17.2 Reliability

- NFR-R-001: The application shall fail gracefully under API errors.
- NFR-R-002: Health endpoints shall accurately report service state.
- NFR-R-003: Session expiry behavior shall be deterministic.
- NFR-R-004: Writes shall either complete successfully or return explicit failure.

## 17.3 Scalability

- NFR-S-001: Architecture shall support growth from solo use to small-team use without a rewrite.
- NFR-S-002: API and database design shall support pagination and indexed queries.
- NFR-S-003: Deployment design shall support future separation of frontend and backend services.

## 17.4 Accessibility

- NFR-A11Y-001: Keyboard navigation shall work across key user journeys.
- NFR-A11Y-002: Focus indicators shall remain visible.
- NFR-A11Y-003: Reduced-motion preferences shall be respected.
- NFR-A11Y-004: Form errors shall be announced accessibly.
- NFR-A11Y-005: Semantic HTML and label associations shall be preserved.

## 17.5 Observability

- NFR-O-001: Production errors shall be captured with release and environment metadata.
- NFR-O-002: Backend logs shall include request context and severity levels.
- NFR-O-003: Core business events shall be trackable.
- NFR-O-004: Critical production failures shall be diagnosable using logs and telemetry.

## 17.6 Maintainability

- NFR-M-001: Frontend and backend code shall follow feature or domain-based organization.
- NFR-M-002: Data contracts shall be documented and versioned.
- NFR-M-003: Configuration shall be environment-driven.
- NFR-M-004: CI should run linting, tests, and build verification.

## 18. UX and Design Requirements

- UX-001: The portfolio must feel premium, intentional, and differentiated.
- UX-002: The dashboard must prioritize clarity, information density, and task completion.
- UX-003: Loading states must prevent layout shift and confusion.
- UX-004: Empty states must be helpful and actionable.
- UX-005: Error messages must be human-readable and context-specific.
- UX-006: Forms must provide inline validation and submit-state feedback.
- UX-007: Responsive behavior must work across mobile, tablet, laptop, and large desktop.
- UX-008: Navigation must make the separation between public and private surfaces obvious.
