# Data Model

## 14. Data Model Requirements

## 14.1 Core Collections

Recommended MongoDB collections:

- `users`
- `clients`
- `projects`
- `invoices`
- `messages`
- `activities`
- `leads` or `inquiries`
- `testimonials`
- `portfolio_projects`
- `settings`
- `sessions` or refresh-token records if token revocation is tracked server-side

## 14.2 Entity Definitions

### User

Minimum fields:

- `_id`
- `name`
- `email`
- `passwordHash`
- `role`
- `avatarUrl`
- `isActive`
- `lastLoginAt`
- `createdAt`
- `updatedAt`

### Client

Minimum fields:

- `_id`
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

### Project

Minimum fields:

- `_id`
- `clientId`
- `name`
- `description`
- `stage`
- `value`
- `startDate`
- `targetDate`
- `completedAt`
- `createdBy`
- `updatedAt`

### Invoice

Minimum fields:

- `_id`
- `clientId`
- `projectId` optional
- `code`
- `amount`
- `currency`
- `status`
- `issuedAt`
- `dueAt`
- `paidAt`
- `notes`
- `createdAt`
- `updatedAt`

### Message

Minimum fields:

- `_id`
- `clientId`
- `subject`
- `preview`
- `body` optional in current cycle
- `direction` optional for future inbound/outbound distinction
- `unread`
- `createdAt`
- `updatedAt`

### Activity

Minimum fields:

- `_id`
- `clientId`
- `entityType`
- `entityId`
- `kind`
- `label`
- `meta`
- `actorUserId`
- `createdAt`

### Inquiry / Lead

Minimum fields:

- `_id`
- `name`
- `email`
- `message`
- `budgetRange`
- `timelinePreference`
- `source`
- `status`
- `submittedAt`
- `createdAt`
- `updatedAt`

### Portfolio Project

Minimum fields:

- `_id`
- `title`
- `slug`
- `summary`
- `description`
- `category`
- `tags`
- `imageUrl`
- `liveUrl`
- `repoUrl` optional
- `status`
- `featured`
- `sortOrder`
- `createdAt`
- `updatedAt`

### Testimonial

Minimum fields:

- `_id`
- `clientName`
- `clientRole`
- `company`
- `quote`
- `avatarUrl`
- `featured`
- `sortOrder`
- `createdAt`
- `updatedAt`

## 14.3 Data Rules

- All mutable entities shall include `createdAt` and `updatedAt`.
- Status fields shall use controlled enums.
- Email fields shall be normalized to lowercase.
- IDs exposed publicly shall be safe to use in client-side URLs where needed.
- Delete operations should prefer soft delete or archive where business history matters.
- Activity records should be append-only where feasible.

## 14.4 Indexing Requirements

- Users by unique email
- Clients by status and name
- Projects by clientId and stage
- Invoices by clientId, status, and dueAt
- Messages by clientId and createdAt
- Activities by clientId and createdAt
- Inquiries by submittedAt, email, and status
- Portfolio projects by featured and sortOrder
