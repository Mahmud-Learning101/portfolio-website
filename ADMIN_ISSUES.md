# Admin CMS Frontend Epic: GitHub Issues Breakdown
## Secured Headless Content Management Portal

This document provides a granular, GitHub-style issue tracker for all frontend features of the **Admin CMS Dashboard** (`/admin`).

---

### Issue #ADMIN-01: Admin Authentication Portal & JWT Session Guard
- **Status**: `[COMPLETED]` ✅
- **Labels**: `auth`, `security`, `admin-ui`, `frontend`
- **Priority**: P0 (Blocker)
- **Feature Area**: `src/app/(admin)/admin/login/page.tsx`, `src/middleware.ts`

#### Acceptance Criteria
- [x] Build frosted glass admin login card with email and password input fields.
- [x] Implement client-side validation using Zod and React Hook Form.
- [x] Store session token in HttpOnly cookie and redirect authenticated user to `/admin/dashboard`.
- [x] Next.js Edge Middleware protecting `/admin/dashboard` and subroutes.

---

### Issue #ADMIN-02: Secured CMS Shell, Sidebar Navigation & User Profile Menu
- **Status**: `[COMPLETED]` ✅
- **Labels**: `layout`, `navigation`, `admin-ui`, `frontend`
- **Priority**: P0 (Core Foundation)
- **Feature Area**: `src/app/(admin)/admin/layout.tsx`, `src/features/admin/components/AdminSidebar.tsx`

#### Acceptance Criteria
- [x] Persistent sidebar with active route highlighting (`Dashboard`, `Profile`, `Experience`, `Education`, `Projects`, `Testimonials`, `Messages`).
- [x] Top bar / header with live site preview link ("View Public Site ↗") and Logout button.

---

### Issue #ADMIN-03: Dashboard Overview, Stats & Recent Inquiries Widget
- **Status**: `[COMPLETED]` ✅
- **Labels**: `dashboard`, `analytics`, `widgets`, `admin-ui`
- **Priority**: P1
- **Feature Area**: `src/app/(admin)/admin/dashboard/page.tsx`

#### Acceptance Criteria
- [x] Metric cards displaying total counts across Work Experience, Education, Case Studies, and Testimonials.
- [x] Quick Action management cards for Bio, Case Studies, and Contact Messages.

---

### Issue #ADMIN-04: Profile, Bio, Hero Badges & Resume Asset Manager
- **Status**: `[COMPLETED]` ✅
- **Labels**: `profile`, `forms`, `file-upload`, `admin-ui`
- **Priority**: P1
- **Feature Area**: `src/app/(admin)/admin/profile/page.tsx`

#### Acceptance Criteria
- [x] Form for editing Name, Title, Short/Long Bio, Location, and Resume PDF URL.
- [x] Toast feedback notification on successful profile update.

---

### Issue #ADMIN-05: Work Experience CRUD & Milestone Reordering
- **Status**: `[COMPLETED]` ✅
- **Labels**: `experience`, `crud`, `admin-ui`
- **Priority**: P1
- **Feature Area**: `src/app/(admin)/admin/experience/page.tsx`

#### Acceptance Criteria
- [x] List view of all work experiences sorted by date order.
- [x] Delete button with confirm dialog and live table refresh.

---

### Issue #ADMIN-06: Academic Education & Certifications Manager
- **Status**: `[COMPLETED]` ✅
- **Labels**: `education`, `crud`, `forms`, `admin-ui`
- **Priority**: P2
- **Feature Area**: `src/app/(admin)/admin/education/page.tsx`

#### Acceptance Criteria
- [x] List view of existing educational qualifications with delete action.

---

### Issue #ADMIN-07: Projects & Case Studies CRUD Manager
- **Status**: `[COMPLETED]` ✅
- **Labels**: `projects`, `case-studies`, `admin-ui`
- **Priority**: P1
- **Feature Area**: `src/app/(admin)/admin/projects/page.tsx`

#### Acceptance Criteria
- [x] Project list table with title, category, tagline, slug preview, and action links.

---

### Issue #ADMIN-08: Testimonials & Client Reviews Manager
- **Status**: `[COMPLETED]` ✅
- **Labels**: `testimonials`, `social-proof`, `admin-ui`
- **Priority**: P2
- **Feature Area**: `src/app/(admin)/admin/testimonials/page.tsx`

#### Acceptance Criteria
- [x] Card grid of all testimonials showing Client Name, Company, Rating, and Quote text.

---

### Issue #ADMIN-09: Contact Inquiries Inbox & Status Workflow Tracker
- **Status**: `[COMPLETED]` ✅
- **Labels**: `inbox`, `messages`, `workflow`, `admin-ui`
- **Priority**: P1
- **Feature Area**: `src/app/(admin)/admin/messages/page.tsx`

#### Acceptance Criteria
- [x] Inbox view with split-pane design (Message list on left, message detail view on right).
- [x] Status tagging badges (`Unread`, `Read`, `Replied`, `Archived`).
- [x] "Reply via Email" mailto trigger and status update buttons.
