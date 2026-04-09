# Overview

## 1. Document Control

- Product Name: Portfolio + Operations Dashboard Platform
- Repository: `portfolio-react`
- Product Type: Public portfolio website + private business dashboard
- PRD Type: Master implementation PRD
- Version: 2.0
- Status: Expanded draft for engineering, product, design, QA, and deployment handoff
- Date: 2026-04-08
- Target Stack: MERN
- Target Deployment: Heroku
- Primary Audience: Founder, product owner, frontend engineer, backend engineer, QA, DevOps, security reviewer

## 2. Executive Summary

The product is a dual-surface web application:

- A public portfolio experience that builds credibility, showcases work, and captures qualified inbound leads.
- A private dashboard for managing clients, projects, invoices, messages, activity, profile settings, and business operations.

The current repository contains a polished React frontend with portfolio pages, dashboard pages, local/mock service layers, animation systems, shared UI components, error states, and Heroku-compatible static serving. The product is not yet production-ready because persistence, authentication, authorization, backend APIs, data validation, rate limiting, auditability, and operational readiness are incomplete.

This PRD upgrades the product definition into an industrial-grade implementation document for a MERN-based production system deployed on Heroku. It specifies functional requirements, non-functional requirements, architecture, data model, API boundaries, security, observability, DevOps expectations, QA strategy, rollout phases, risks, and acceptance criteria.

## 3. Product Vision

Create a premium digital presence and lightweight operating system for a solo consultant or small agency, combining brand presentation, lead generation, and internal business management in one product.

The product should feel premium on the public side, efficient on the dashboard side, secure in production, and maintainable for long-term growth.

## 4. Product Objectives

### 4.1 Business Objectives

- Increase inbound lead quality and lead conversion from portfolio traffic.
- Reduce operational overhead for managing clients, projects, invoices, and communication.
- Present a high-trust brand identity that supports premium positioning.
- Centralize business records and activity history in one authenticated system.
- Prepare the product for production hosting, scaling, maintenance, and future feature growth.

### 4.2 Product Objectives

- Deliver a responsive, accessible, visually strong public portfolio.
- Deliver a secure, authenticated dashboard with persistent CRUD workflows.
- Replace local-only data handling with MongoDB-backed persistence.
- Replace mock auth with real authentication and server-side authorization.
- Establish a deployment model suitable for Heroku with reliable CI/CD and environment management.

### 4.3 Engineering Objectives

- Use a clear MERN architecture with separation of frontend and backend responsibilities.
- Define stable API contracts and error envelope standards.
- Make behavior observable through logs, monitoring, health endpoints, and error reporting.
- Enforce validation, access control, and secure defaults at the server layer.
- Keep the codebase modular enough for future scale.

## 5. Problem Statement

Freelancers and small agencies often use fragmented tools:

- A separate portfolio website
- Form tools for lead capture
- Spreadsheets or simple CRMs for clients
- Manual invoice tracking
- Ad hoc message tracking
- No single operational source of truth

This fragmentation creates several problems:

- Leads are captured without structured downstream follow-up.
- Client data becomes inconsistent across tools.
- Revenue and activity visibility is weak.
- Administrative work increases as business volume grows.
- Security and operational discipline are often missing from self-built systems.

The current implementation already solves the UX shell of this problem, but it still lacks production backend depth.

## 6. Product Scope

### 6.1 In Scope

- Public portfolio website
- Public project inquiry and contact capture
- Authenticated dashboard
- Client management
- Project management
- Invoice tracking
- Message tracking
- Activity timeline
- Analytics overview
- User profile and settings
- Role-based access at a basic level
- MERN backend implementation
- Heroku deployment readiness
- Monitoring, logging, and operational safeguards

### 6.2 Out of Scope for Current Release

- Native mobile apps
- Advanced multi-tenant SaaS architecture
- Complex team collaboration and enterprise-grade RBAC
- Payment gateway processing
- Automated email campaigns
- AI-assisted CRM workflows
- Real-time chat infrastructure
- Deep accounting integrations

### 6.3 Future Expansion Candidates

- Fine-grained permissions
- Realtime notifications
- Payment integrations
- Proposal generation
- Client portal access
- Attachment uploads
- Search across entities
- Revenue forecasting and reporting

## 7. Target Users and Personas

### 7.1 Primary Persona: Solo Consultant

Profile:

- Independent consultant or freelancer
- Needs a premium public image
- Needs simple but powerful internal tools
- Prioritizes speed, clarity, and low maintenance

Core needs:

- Showcase work professionally
- Capture qualified leads
- Track clients and active work
- Monitor invoices and communication
- Avoid tool sprawl

### 7.2 Secondary Persona: Small Agency Owner

Profile:

- Runs a small service team
- Needs a simple internal operating dashboard
- Requires visibility into client and revenue workflows

Core needs:

- Manage multiple clients
- Track project stages
- Understand invoice status
- Monitor team-facing activity history

### 7.3 Tertiary Persona: Prospective Client

Profile:

- Visits the portfolio website
- Evaluates trust, credibility, expertise, and fit
- Wants an easy way to start a conversation

Core needs:

- Clear proof of capability
- Modern and trustworthy presentation
- Fast access to portfolio content
- A structured inquiry flow

## 8. Product Principles

- Premium presentation: The public experience must reinforce quality and trust.
- Operational clarity: The dashboard must optimize task completion over visual novelty.
- Security by default: No protected action should rely only on frontend logic.
- Progressive enhancement: High-end motion and interaction should never block access.
- Maintainability: Architecture and requirements must support iterative growth.
- Observability: Production behavior must be diagnosable quickly.

## 9. Current State Assessment

The repository already includes:

- React 19 + Vite frontend
- Portfolio routes and sections
- Dashboard routes and pages
- Local/mock dashboard persistence via browser storage
- Shared components and theme system
- Motion and interaction effects
- Error boundaries and fallback pages
- Environment-gated error reporting hooks
- Heroku-compatible `start` and `heroku-postbuild` scripts
- Static `server.js` for serving the built frontend

Current gaps:

- No Express backend yet
- No MongoDB persistence layer
- No real authentication
- No server-side authorization
- No request validation layer for production
- No audit trail persistence for lead and dashboard actions
- No rate limiting or abuse protection
- No health/readiness endpoints
- No formal deployment topology for MERN on Heroku
