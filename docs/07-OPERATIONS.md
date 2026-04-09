# Operations & Quality Assurance

## 19. Analytics and Telemetry Requirements

### Product Analytics Events

- Portfolio home viewed
- Section viewed
- CTA clicked
- Start Project opened
- Start Project validation failed
- Start Project submitted successfully
- Start Project submit failed
- Login attempted
- Login succeeded
- Login failed
- Client created
- Client updated
- Project stage changed
- Invoice status changed
- Message marked read/unread

### KPI Suggestions

- Lead submission conversion rate
- Portfolio CTA click-through rate
- Login success rate
- Average time to create/update a client
- Percentage of invoices overdue
- Dashboard usage frequency per week

## 20. Reporting and Dashboard Metrics

The analytics overview should support at minimum:

- Total clients
- Active clients
- Pipeline value
- Total invoice amount
- Paid invoice amount
- Overdue invoice count
- Recent activity volume
- Optional trend deltas over selected time windows

## 21. Operational Requirements

## 21.1 Logging

- Backend logs must be structured.
- Logs should include request method, path, response status, latency, user id where available, and request id.
- Sensitive values must be redacted.

## 21.2 Monitoring

- Monitor error rate
- Monitor request latency
- Monitor uptime
- Monitor failed login spikes
- Monitor contact form failure rate

## 21.3 Health Checks

- `/health` for basic liveness
- `/readiness` for dependency readiness such as MongoDB connectivity

## 21.4 Incident Readiness

- Define baseline alert thresholds
- Define ownership for production issues
- Preserve logs long enough for debugging

## 22. QA and Test Strategy

## 22.1 Unit Tests

- Validation utilities
- Service-layer transforms
- Permission utilities
- Metric calculations

## 22.2 Integration Tests

- Auth flows
- Protected route behavior
- CRUD API behavior
- Validation middleware
- Database persistence behavior

## 22.3 End-to-End Tests

- Public lead submission
- Login and dashboard access
- Client CRUD
- Invoice status update
- Activity reflection after write actions

## 22.4 Accessibility Tests

- Keyboard navigation
- Focus states
- Reduced motion
- Form labels and errors
- Color contrast checks

## 22.5 Performance and Regression Checks

- Build size review
- Route load profiling
- Mobile responsiveness testing
- Browser sanity checks
