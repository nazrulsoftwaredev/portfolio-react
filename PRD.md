# Product Requirements Document (PRD) – Master Index

Portfolio + Operations Dashboard Platform | Repository: `portfolio-react` | Version 2.0 | Date: 2026-04-08

## Quick Navigation

This PRD has been organized into 9 focused documents for easier reference and faster navigation. Use the index below to find what you need.

| Document | Purpose | Audience |
|----------|---------|----------|
| **[01-OVERVIEW.md](docs/01-OVERVIEW.md)** | Vision, objectives, scope, personas, principles, current state | Product owners, founders, all stakeholders |
| **[02-REQUIREMENTS.md](docs/02-REQUIREMENTS.md)** | Functional & non-functional requirements, acceptance criteria | Engineers, QA, product |
| **[03-DATA-MODEL.md](docs/03-DATA-MODEL.md)** | MongoDB schema, collections, entity definitions, indexing | Backend engineers, DevOps |
| **[04-API-SPEC.md](docs/04-API-SPEC.md)** | API design standards, endpoints, request/response schemas, pagination | Backend engineers, frontend engineers |
| **[05-SECURITY.md](docs/05-SECURITY.md)** | Authentication flow, authorization, headers, secrets, abuse prevention | Security, backend engineers |
| **[06-ARCHITECTURE.md](docs/06-ARCHITECTURE.md)** | Tech stack, system design, user journeys, responsibilities | All engineers |
| **[07-OPERATIONS.md](docs/07-OPERATIONS.md)** | Analytics, logging, monitoring, QA strategy, testing approach | QA, DevOps, engineers |
| **[08-DEPLOYMENT.md](docs/08-DEPLOYMENT.md)** | Heroku deployment strategy, environments, config management | DevOps, backend engineers |
| **[09-ROADMAP.md](docs/09-ROADMAP.md)** | Release phases, milestones, risks, next steps, implementation sequence | Product owners, engineers, stakeholders |

## About This Product

### Executive Summary

A dual-surface MERN application combining:
- **Public portfolio**: Showcase work, capture qualified leads, build credibility
- **Private dashboard**: Manage clients, projects, invoices, messages, activity, analytics

Current status: React frontend is polished; backend, authentication, and production readiness are incomplete.

**Immediate priority**: Backend completion, auth hardening, API contract definition, and operational readiness.

### What This Product Does

Solves tool fragmentation for solo consultants and small agencies by unifying brand presence, lead generation, and business operations in one secure, production-ready platform.

Product Vision: Create a premium digital presence and lightweight operating system for a solo consultant or small agency, combining brand presentation, lead generation, and internal business management in one product.

The product should feel premium on the public side, efficient on the dashboard side, secure in production, and maintainable for long-term growth.

---

## What Each Document Contains

### [01-OVERVIEW.md](docs/01-OVERVIEW.md)
Vision, business/product/engineering objectives, scope, target personas, product principles, and current state assessment. Start here to understand the big picture.

### [02-REQUIREMENTS.md](docs/02-REQUIREMENTS.md)
Comprehensive functional requirements (Portfolio, Auth, Dashboard, Platform) and non-functional requirements (Performance, Reliability, Scalability, Accessibility, Observability, Maintainability, UX). Read to understand what must be built and what success looks like.

### [03-DATA-MODEL.md](docs/03-DATA-MODEL.md)
MongoDB collections, entity definitions (User, Client, Project, Invoice, Message, Activity, Inquiry, Portfolio Project, Testimonial), data rules, and indexing strategy. Required for backend design.

### [04-API-SPEC.md](docs/04-API-SPEC.md)
RESTful API design standards, complete endpoint inventory, request/response schemas, pagination format, and error envelope specification. **Critical contract document—must be finalized before backend coding begins.**

### [05-SECURITY.md](docs/05-SECURITY.md)
Authentication flow (email/password with JWT), authorization rules, application security headers, abuse prevention, secrets management, and security acceptance criteria. Read before auth implementation.

### [06-ARCHITECTURE.md](docs/06-ARCHITECTURE.md)
Tech stack (React 19 + Vite frontend, Node.js + Express + Mongoose backend, MongoDB Atlas), high-level system design, and key user journeys (portfolio lead submission, dashboard login, incident handling).

### [07-OPERATIONS.md](docs/07-OPERATIONS.md)
Analytics events and KPIs, logging requirements, monitoring strategy, health checks, incident readiness, QA and test strategy (unit, integration, E2E, accessibility, performance).

### [08-DEPLOYMENT.md](docs/08-DEPLOYMENT.md)
Heroku deployment model (unified MERN dyno), environment variables, staging/production separation, and post-deployment expectations.

### [09-ROADMAP.md](docs/09-ROADMAP.md)
Release phases (MVP → Hardening → Growth), delivery milestones, open questions, risks and mitigations, and the exact engineering sequence required for implementation. **Read this last to understand the execution plan.**

---

## Key Starting Points

**For Product Owners & Stakeholders**: Read [01-OVERVIEW.md](docs/01-OVERVIEW.md) first, then [09-ROADMAP.md](docs/09-ROADMAP.md) for timeline and risks.

**For Backend Engineers**: Start with [04-API-SPEC.md](docs/04-API-SPEC.md) and [05-SECURITY.md](docs/05-SECURITY.md) to freeze contracts, then [03-DATA-MODEL.md](docs/03-DATA-MODEL.md) and [06-ARCHITECTURE.md](docs/06-ARCHITECTURE.md) for design.

**For Frontend Engineers**: Read [04-API-SPEC.md](docs/04-API-SPEC.md) for API contracts and [06-ARCHITECTURE.md](docs/06-ARCHITECTURE.md) for system design and user journeys.

**For QA & Test Engineers**: [02-REQUIREMENTS.md](docs/02-REQUIREMENTS.md) defines what to test; [07-OPERATIONS.md](docs/07-OPERATIONS.md) details the QA strategy.

**For Security & DevOps**: [05-SECURITY.md](docs/05-SECURITY.md) for auth/security, [08-DEPLOYMENT.md](docs/08-DEPLOYMENT.md) for infrastructure.

---

## Document Index by Section Number

- **Sections 1-9** → [01-OVERVIEW.md](docs/01-OVERVIEW.md)
- **Section 13** → [02-REQUIREMENTS.md](docs/02-REQUIREMENTS.md)
- **Sections 17-18** → [02-REQUIREMENTS.md](docs/02-REQUIREMENTS.md)
- **Section 14** → [03-DATA-MODEL.md](docs/03-DATA-MODEL.md)
- **Section 15** → [04-API-SPEC.md](docs/04-API-SPEC.md)
- **Section 16** → [05-SECURITY.md](docs/05-SECURITY.md)
- **Sections 10, 12** → [06-ARCHITECTURE.md](docs/06-ARCHITECTURE.md)
- **Sections 19-22** → [07-OPERATIONS.md](docs/07-OPERATIONS.md)
- **Section 11** → [08-DEPLOYMENT.md](docs/08-DEPLOYMENT.md)
- **Sections 23-32** → [09-ROADMAP.md](docs/09-ROADMAP.md)

---

## Next Steps

1. **Review [01-OVERVIEW.md](docs/01-OVERVIEW.md)** — Align on vision and scope
2. **Finalize [04-API-SPEC.md](docs/04-API-SPEC.md)** — Lock down API contracts before backend coding
3. **Finalize [05-SECURITY.md](docs/05-SECURITY.md)** — Decide on auth strategy (cookies vs. bearer tokens)
4. **Follow [09-ROADMAP.md](docs/09-ROADMAP.md)** — Execute in the prescribed order: Backend scaffold → Auth → Users → Clients → Projects → Invoices → Activity → Portfolio APIs → Platform hardening → Deploy

---

**Last Updated**: April 8, 2026  
**Status**: Ready for engineering handoff  
**Primary Blocker**: API schema finalization must complete before backend development begins
