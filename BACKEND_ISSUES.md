# Backend & Database Epic: GitHub Issues Breakdown
## Clean Architecture Serverless API & MongoDB Atlas Engine

This document provides a granular, GitHub-style issue tracker for all backend, database, security, and data access layers following **Clean Architecture principles (Domain, Use-Cases, Repositories, Handlers)**.

---

### Issue #BACKEND-01: Serverless Cached Mongoose Database Connector
- **Status**: `[COMPLETED]` ✅
- **Labels**: `database`, `mongodb`, `serverless`, `infrastructure`
- **Priority**: P0 (Blocker)
- **Feature Area**: `src/shared/lib/db.ts`

#### Acceptance Criteria
- [x] Create `src/shared/lib/db.ts` caching the Mongoose connection in `global.mongooseCached = { conn, promise }`.
- [x] Configure connection options: `bufferCommands: false`, `maxPoolSize: 10`, `serverSelectionTimeoutMS: 5000`.
- [x] Handle connection errors gracefully and output structured diagnostic logs.
- [x] Provide connection health check utility `checkDbHealth()`.

---

### Issue #BACKEND-02: Domain Entities & Zod Schema Validation Suite
- **Status**: `[COMPLETED]` ✅
- **Labels**: `domain`, `validation`, `zod`, `clean-architecture`
- **Priority**: P0 (Blocker)
- **Feature Area**: `src/features/*/domain/`

#### Acceptance Criteria
- [x] Define Zod schemas and TypeScript types for all entities.
- [x] Export standard API response wrappers: `ApiResponse<T>`, `PaginatedResponse<T>`.

---

### Issue #BACKEND-03: Mongoose Schemas & Repository Implementations
- **Status**: `[COMPLETED]` ✅
- **Labels**: `database`, `mongoose`, `repositories`, `data-access`
- **Priority**: P0 (Core Foundation)
- **Feature Area**: `src/features/*/data/`

#### Acceptance Criteria
- [x] Build models with proper indexes across all entities.

---

### Issue #BACKEND-04: Authentication & Security Use-Cases (`src/features/auth/`)
- **Status**: `[COMPLETED]` ✅
- **Labels**: `auth`, `security`, `jwt`, `bcrypt`, `use-cases`
- **Priority**: P0 (Security Critical)
- **Feature Area**: `src/features/auth/use-cases/`, `src/app/api/auth/`

#### Acceptance Criteria
- [x] Use-case `authenticateAdmin`: Compares email/password with bcrypt and generates signed 7-day JWT.
- [x] Helper `verifyAuthSession`: Decodes and validates JWT from HttpOnly cookie or Bearer header.
- [x] API Route `/api/auth/login`: Handles login requests and sets `admin_token` HttpOnly cookie.
- [x] API Route `/api/auth/logout`: Clears session cookie.
- [x] API Route `/api/auth/session`: Returns current active admin user session info.

---

### Issue #BACKEND-05: Profile & Global Config REST API Handlers
- **Status**: `[COMPLETED]` ✅
- **Labels**: `profile`, `api`, `use-cases`
- **Priority**: P1
- **Feature Area**: `src/app/api/profile/route.ts`

#### Acceptance Criteria
- [x] `GET /api/profile`: Public endpoint returning client profile data.
- [x] `PUT /api/profile`: Protected admin endpoint updating bio, badges, and settings.

---

### Issue #BACKEND-06: Work Experience & Education Milestones API
- **Status**: `[COMPLETED]` ✅
- **Labels**: `experience`, `education`, `api`, `use-cases`
- **Priority**: P1
- **Feature Area**: `src/app/api/experience/`, `src/app/api/education/`

#### Acceptance Criteria
- [x] `GET /api/experience` & `GET /api/education`: Public endpoints returning career & academic items.
- [x] `POST /api/experience` & `POST /api/education`: Protected admin endpoints creating new records.
- [x] `PUT /api/experience/[id]` & `PUT /api/education/[id]`: Protected admin endpoints updating records.
- [x] `DELETE /api/experience/[id]` & `DELETE /api/education/[id]`: Protected admin endpoints removing records.

---

### Issue #BACKEND-07: Projects & Case Studies API with Slug Resolution
- **Status**: `[COMPLETED]` ✅
- **Labels**: `projects`, `case-studies`, `api`, `use-cases`
- **Priority**: P1
- **Feature Area**: `src/app/api/projects/`

#### Acceptance Criteria
- [x] `GET /api/projects`: Public endpoint returning case studies list.
- [x] `POST /api/projects`: Protected admin endpoint creating new case study with unique slug check.
- [x] `PUT /api/projects/[id]` & `DELETE /api/projects/[id]`: Protected admin endpoints for update & delete.

---

### Issue #BACKEND-08: Testimonials Management API
- **Status**: `[COMPLETED]` ✅
- **Labels**: `testimonials`, `api`, `use-cases`
- **Priority**: P2
- **Feature Area**: `src/app/api/testimonials/`

#### Acceptance Criteria
- [x] `GET /api/testimonials`: Public endpoint returning published testimonials.
- [x] `POST /api/testimonials`, `PUT /api/testimonials/[id]`, `DELETE /api/testimonials/[id]`: Protected admin CRUD handlers.

---

### Issue #BACKEND-09: Contact Submission, Anti-Spam Rate Limiter & Email Dispatch
- **Status**: `[COMPLETED]` ✅
- **Labels**: `contact`, `security`, `rate-limit`, `email`, `use-cases`
- **Priority**: P1
- **Feature Area**: `src/app/api/contact/`

#### Acceptance Criteria
- [x] Anti-spam honeypot check in `POST /api/contact` silently rejecting automated spam bots.
- [x] Stores message in MongoDB with status `unread` and client IP address.
- [x] `GET /api/contact`: Protected admin endpoint retrieving inbox messages.
- [x] `PATCH /api/contact/[id]`: Protected admin endpoint updating status (`unread`, `read`, `replied`, `archived`).

---

### Issue #BACKEND-10: Database Seed Script & Admin Account Bootstrapper
- **Status**: `[COMPLETED]` ✅
- **Labels**: `seed`, `cli`, `dx`, `database`
- **Priority**: P0 (Developer Experience)
- **Feature Area**: `scripts/seed.ts`

#### Acceptance Criteria
- [x] Seed script populates full CV data for S. M. Mahmud Bin Murad & hashes superadmin password.

---

### Issue #BACKEND-11: Production Security Headers & Vercel Free-Tier Config
- **Status**: `[COMPLETED]` ✅
- **Labels**: `security`, `next-config`, `deployment`, `vercel`
- **Priority**: P1
- **Feature Area**: `next.config.mjs`

#### Acceptance Criteria
- [x] Configure `next.config.mjs` with security headers and image optimization domains.
