# API Specification

## 15. API Requirements

## 15.1 API Design Standards

- Prefer RESTful JSON APIs
- Version APIs under `/api/v1`
- Use consistent response envelope
- Use pagination on list endpoints
- Validate request payloads before business logic
- Return machine-readable error codes and human-readable messages

### Standard Success Envelope

```json
{
  "status": "success",
  "data": {},
  "message": "Optional message",
  "meta": {}
}
```

### Standard Error Envelope

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid",
    "details": []
  }
}
```

## 15.2 Minimum Endpoint Inventory

### Auth

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`

### Portfolio

- `GET /api/v1/portfolio/projects`
- `GET /api/v1/portfolio/testimonials`
- `POST /api/v1/portfolio/contact`
- `POST /api/v1/portfolio/start-project`

### Dashboard Clients

- `GET /api/v1/clients`
- `POST /api/v1/clients`
- `GET /api/v1/clients/:id`
- `PATCH /api/v1/clients/:id`
- `DELETE /api/v1/clients/:id` or archive endpoint

### Dashboard Projects

- `GET /api/v1/projects`
- `POST /api/v1/projects`
- `GET /api/v1/projects/:id`
- `PATCH /api/v1/projects/:id`

### Dashboard Invoices

- `GET /api/v1/invoices`
- `POST /api/v1/invoices`
- `GET /api/v1/invoices/:id`
- `PATCH /api/v1/invoices/:id`

### Dashboard Messages

- `GET /api/v1/messages`
- `POST /api/v1/messages`
- `PATCH /api/v1/messages/:id`

### Dashboard Activity

- `GET /api/v1/activities`

### Dashboard Analytics

- `GET /api/v1/analytics/overview`

### System

- `GET /api/v1/health`
- `GET /api/v1/readiness`

## 15.3 API Behavior Requirements

- All protected endpoints require authentication.
- Mutating endpoints require request body validation.
- List endpoints support pagination and filtering where relevant.
- API timeouts should be handled gracefully on the client.
- Non-idempotent endpoints should not be blindly retried by the client.

## 15.4 API Schemas to Define Immediately

These schemas should be treated as implementation-blocking contracts and must be finalized before backend development proceeds.

### Standard Response Schemas

- Success response
  - `status`
  - `data`
  - `message`
  - `meta`
- Error response
  - `status`
  - `error.code`
  - `error.message`
  - `error.details`

### Auth Schemas

- Login request
  - `email`
  - `password`
- Login response
  - `accessToken`
  - `refreshToken` or secure session equivalent
  - `user`
  - `expiresAt`
- Current user response
  - `id`
  - `name`
  - `email`
  - `role`
  - `avatarUrl`

### User Schemas

- Create user request
  - `name`
  - `email`
  - `password`
  - `role`
- User response
  - `id`
  - `name`
  - `email`
  - `role`
  - `isActive`
  - `createdAt`
  - `updatedAt`

### Client Schemas

- Create/update client request
  - `name`
  - `company`
  - `email`
  - `phone`
  - `status`
  - `industry`
  - `notes`
  - `value`
- Client response
  - `id`
  - `name`
  - `company`
  - `email`
  - `phone`
  - `status`
  - `industry`
  - `notes`
  - `value`
  - `ownerUserId`
  - `createdAt`
  - `updatedAt`

### Project Schemas

- Create/update project request
  - `clientId`
  - `name`
  - `description`
  - `stage`
  - `value`
  - `startDate`
  - `targetDate`
- Project response
  - `id`
  - `clientId`
  - `name`
  - `description`
  - `stage`
  - `value`
  - `startDate`
  - `targetDate`
  - `completedAt`
  - `createdAt`
  - `updatedAt`

### Invoice Schemas

- Create/update invoice request
  - `clientId`
  - `projectId`
  - `code`
  - `amount`
  - `currency`
  - `status`
  - `issuedAt`
  - `dueAt`
  - `notes`
- Invoice response
  - `id`
  - `clientId`
  - `projectId`
  - `code`
  - `amount`
  - `currency`
  - `status`
  - `issuedAt`
  - `dueAt`
  - `paidAt`
  - `createdAt`
  - `updatedAt`

### Activity Log Schemas

- Activity response
  - `id`
  - `clientId`
  - `entityType`
  - `entityId`
  - `kind`
  - `label`
  - `meta`
  - `actorUserId`
  - `createdAt`

### Portfolio Schemas

- Inquiry request
  - `name`
  - `email`
  - `message`
  - `budgetRange`
  - `timelinePreference`
- Inquiry response
  - `id`
  - `name`
  - `email`
  - `message`
  - `budgetRange`
  - `timelinePreference`
  - `source`
  - `status`
  - `submittedAt`
- Portfolio project response
  - `id`
  - `title`
  - `slug`
  - `summary`
  - `description`
  - `category`
  - `tags`
  - `imageUrl`
  - `liveUrl`
  - `featured`
- Testimonial response
  - `id`
  - `clientName`
  - `clientRole`
  - `company`
  - `quote`
  - `avatarUrl`
  - `featured`

## 15.5 Standard Pagination Format

All list endpoints should use one consistent pagination contract.

### Request Format

- Query params
  - `page`
  - `pageSize`
  - `sort`
  - `order`
  - `q` for search where applicable
  - domain-specific filters such as `status`, `stage`, `clientId`

Example:

```text
/api/v1/clients?page=1&pageSize=20&sort=createdAt&order=desc&status=active&q=acme
```

### Response Format

```json
{
  "status": "success",
  "data": {
    "items": []
  },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 125,
    "totalPages": 7,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

Pagination rules:

- Default page should be `1`.
- Default page size should be `20`.
- Maximum page size should be capped, for example `100`.
- Empty result sets must still return valid pagination metadata.
- Pagination behavior must be deterministic under filtering and sorting.
