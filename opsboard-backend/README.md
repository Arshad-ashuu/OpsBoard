# OpsBoard – Internal Operations Dashboard

OpsBoard is a self-hosted internal monitoring dashboard built to help engineering and DevOps teams track the health of internal services.

The system allows teams to register services, automatically perform scheduled health checks, track failures, expose operational dashboards, and trigger alerts when services repeatedly fail.

This project is designed to simulate real-world internal tooling used by platform and DevOps teams.

---

## Problem Statement

In many organizations, internal services are deployed across environments (prod, staging, dev) but lack centralized visibility.

Teams often rely on:
- Manual checks
- Ad-hoc scripts
- Scattered logs

OpsBoard solves this by providing:
- A centralized service registry
- Automated health monitoring
- Failure tracking and alerting
- Dashboard APIs for operational visibility

---

## Key Features

- Service registration and discovery
- Automated scheduled health checks
- Service status tracking (UP / DOWN)
- Failure count tracking to avoid false alerts
- Timestamped health checks
- Alerting on repeated failures
- Dashboard APIs for monitoring
- Containerized application
- CI-ready pipeline

---

## Architecture Overview

```

Client / API Consumer
|
v
Express API (Bun Runtime)
|
v
Prisma ORM
|
v
PostgreSQL Database
|
v
Service Metadata & Health State

Background Job:
Scheduler (every 60s)
|
v
Health Check Job
|
v
Update Status & Failure Count
|
v
Alert Trigger

```
---

## Technology Stack

- Runtime: Bun
- Backend Framework: Express (Node.js)
- Database: PostgreSQL
- ORM: Prisma
- Scheduler: In-process background job
- Containerization: Docker
- CI/CD: Jenkins

---

## Data Model

### Service

| Field          | Type      | Description                          |
|----------------|-----------|--------------------------------------|
| id             | UUID      | Unique service identifier             |
| name           | String    | Service name                          |
| environment    | String    | prod / staging / dev                  |
| url            | String    | Service endpoint                      |
| status         | String    | UP / DOWN                             |
| failureCount   | Integer   | Consecutive failure counter           |
| lastCheckedAt  | DateTime  | Last health check timestamp           |
| createdAt      | DateTime  | Record creation time                  |

---

## Health Check Logic

- Health checks run automatically every 60 seconds
- Each service URL is pinged with a timeout
- Status is updated based on response
- Failure count increments on consecutive failures
- Failure count resets on success
- Alerts are triggered when failure count crosses a threshold (≥ 3)

This approach avoids false positives and noisy alerts.

---

## Alerting

- Alerts are triggered only after repeated failures
- Current implementation logs alerts to console
- Designed to be easily extended to:
  - Slack
  - Email
  - Webhooks

---

## API Endpoints

### Health
- `GET /health`
  - Returns application health status

### Services
- `POST /services/register`
  - Registers a new service
- `GET /services`
  - Lists all registered services

### Dashboard
- `GET /dashboard/summary`
  - Returns total services, UP count, DOWN count
- `GET /dashboard/services`
  - Lists services with status and metadata
  - Optional query: `?env=prod`

---

## Local Setup

### Prerequisites
- Bun
- PostgreSQL
- Docker (optional)

### Environment Variables

Create a `.env` file in the project root:



DATABASE_URL=postgresql://user:password@localhost:5432/opsboard



---

## Database Setup

```
bunx prisma migrate dev
bunx prisma generate
````

---

## Run Locally

```bash
bun run index.ts
```

Application will start on:

```
http://localhost:4000
```

---

## Docker

Build and run the container:

```bash
docker build -t opsboard .
docker run -p 4000:4000 --env-file .env opsboard
```

---

## CI Pipeline

A Jenkins pipeline is included to:

* Install dependencies
* Run a basic smoke test

This demonstrates CI readiness and deployment awareness.

---

## Design Decisions

* Failure-based alerting to reduce noise
* Scheduler-based health checks instead of manual triggers
* Simple REST APIs for extensibility
* Self-hosted architecture for internal use
* Focus on backend reliability over UI

---

## Future Enhancements

* Slack / Email alert integration
* Authentication and role-based access
* Web-based dashboard UI
* Deployment history tracking
* Cloud deployment (AWS EC2 / ECS)

---

## Why This Project?

OpsBoard demonstrates:

* Backend engineering skills
* DevOps and platform engineering concepts
* Automation and monitoring mindset
* Production-oriented system design

This project was built to reflect real internal tooling rather than tutorial-style demo applications.

---


