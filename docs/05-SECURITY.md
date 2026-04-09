# Security Requirements

## 16. Security Requirements

## 16.0 Authentication Flow Definition

The auth flow should be finalized before the backend build begins.

Recommended auth flow for current scope:

1. User submits email and password to `POST /api/v1/auth/login`.
2. Backend validates credentials against hashed password in MongoDB.
3. Backend issues:
   - short-lived access token
   - longer-lived refresh token or secure session equivalent
4. Frontend stores auth state according to the selected security model.
5. Frontend sends authenticated requests to protected endpoints.
6. Backend validates token/session on every protected request.
7. Frontend calls refresh endpoint when access token expires, if refresh model is used.
8. Logout invalidates local auth state and, where supported, revokes refresh/session state server-side.

Recommended production choice:

- Prefer HTTP-only secure cookies if frontend and backend are served from the same Heroku app.
- If bearer tokens are used instead, keep refresh handling server-aware and avoid insecure storage patterns.

Auth decisions to freeze early:

- Cookie-based auth versus bearer-token auth
- Access token TTL
- Refresh token TTL
- Rotation and revocation strategy
- Password hashing algorithm
- Role model and protected route matrix

## 16.1 Authentication Security

- Store passwords as salted hashes using bcrypt or Argon2.
- Never store plain text passwords.
- Keep JWT secrets in environment variables only.
- Apply access token expiration and refresh rotation strategy where possible.
- Prefer HTTP-only secure cookies if session architecture is selected.
- If bearer tokens are used, protect storage strategy carefully and avoid insecure persistence patterns.

## 16.2 Authorization Security

- Enforce authorization on the backend.
- Protect entity-level access where applicable.
- Do not trust frontend role checks alone.

## 16.3 Application Security

- Enable Helmet or equivalent security headers.
- Enforce HTTPS in production behind Heroku routing.
- Configure CORS intentionally if frontend and API are split.
- Sanitize and validate incoming payloads.
- Prevent mass assignment vulnerabilities by whitelisting fields.
- Disable stack trace exposure in production responses.
- Control source map exposure in production builds.

## 16.4 Abuse Prevention

- Apply rate limiting on auth and public form endpoints.
- Add basic bot/spam protection for inquiry forms.
- Log suspicious access patterns.

## 16.5 Secrets and Configuration

- No secrets in repository.
- No hardcoded admin credentials in production code.
- Separate staging and production secrets.
- Rotate secrets if leakage is suspected.

## 16.6 Security Acceptance Criteria

- AC-S-001: Protected endpoints reject unauthorized access.
- AC-S-002: Passwords are stored hashed, never plain text.
- AC-S-003: Security headers are present in production.
- AC-S-004: Public forms are protected by validation and rate limiting.
