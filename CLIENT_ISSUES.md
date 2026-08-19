# Public Client Frontend Epic: GitHub Issues Breakdown
## Modern Portfolio Experience with Apple-Inspired Frosted Glass & Scrollytelling

This document provides a granular, GitHub-style issue tracker for all frontend features of the **Public Client Experience**.

---

### Issue #CLIENT-01: Global Design System, Glassmorphic Tokens & Typography Setup
- **Status**: `[COMPLETED]` ✅
- **Labels**: `design-system`, `tailwind`, `core-ui`, `frontend`
- **Priority**: P0 (Blocker)
- **Feature Area**: `src/shared/`, `src/app/globals.css`

#### Acceptance Criteria
- [x] Configure `tailwind.config.ts` with custom brand colors, glass shadows, blur backdrops, and radial gradients.
- [x] Implement utility classes in `src/app/globals.css` for `.glass-surface`, `.glass-pill`, `.glass-card-hover`, and `.text-gradient-cyan`.
- [x] Configure Google Font variables in `src/app/layout.tsx` with zero layout shift.
- [x] Add dark mode default variables and selection highlighting.

---

### Issue #CLIENT-02: Lenis Smooth Scrolling Engine & Viewport Physics Hook
- **Status**: `[COMPLETED]` ✅
- **Labels**: `animation`, `performance`, `hooks`, `frontend`
- **Priority**: P0 (Core Foundation)
- **Feature Area**: `src/shared/hooks/useLenis.ts`, `src/app/(portfolio)/layout.tsx`

#### Acceptance Criteria
- [x] Create `useLenis.ts` hook with duration, easing curve, and `requestAnimationFrame` cleanup.
- [x] Configure Lenis CSS in `globals.css` (`html.lenis`, `html.lenis body`, `.lenis-smooth`).
- [x] Verify zero memory leaks when unmounting or navigating client routes.

---

### Issue #CLIENT-03: Floating Apple-Inspired Translucent Pill Navbar & Footer
- **Status**: `[COMPLETED]` ✅
- **Labels**: `navigation`, `components`, `glassmorphism`, `frontend`
- **Priority**: P1
- **Feature Area**: `src/shared/components/FloatingNav.tsx`, `src/shared/components/Footer.tsx`

#### Acceptance Criteria
- [x] Render floating pill navbar with logo/avatar, navigation links (Home, About, Experience, Education, Projects, Testimonials, Contact), and "Let's Talk" CTA.
- [x] Highlight active route dynamically based on current pathname.
- [x] Implement responsive mobile navigation sheet with spring motion transitions.
- [x] Build global glassmorphism footer with social media links and direct contact reach.

---

### Issue #CLIENT-04: 3-Phase 3D Scrollytelling Showcase Section (`ScrollyShowcase.tsx`)
- **Status**: `[COMPLETED]` ✅
- **Labels**: `scrollytelling`, `framer-motion`, `3d-transforms`, `flagship`
- **Priority**: P0 (Key Differentiator)
- **Feature Area**: `src/features/projects/components/ScrollyShowcase.tsx`

#### Acceptance Criteria
- [x] **Phase 1 (0% - 30%)**: Central showcase card scales down from `1.2` to `1.0` with staggered caption fade-in (`opacity: 0 -> 1`, `y: 30 -> 0`).
- [x] **Phase 2 (30% - 70%)**: Central card tilts in 3D space (`rotateX`, `rotateY`) as 2 orbiting frosted glass metric badges dock into position.
- [x] **Phase 3 (70% - 100%)**: Transition into a 3-column Bento grid with blur-to-clear text reveal (`blur(8px) -> blur(0px)`).
- [x] Mouse hover interactive radial spotlight following cursor coordinates on card border.
- [x] Ensure 60fps performance with `will-change: transform` and `transformStyle: preserve-3d`.

---

### Issue #CLIENT-05: Home Landing Page Assembly & Bento Highlights Grid
- **Status**: `[COMPLETED]` ✅
- **Labels**: `pages`, `bento-grid`, `hero`, `frontend`
- **Priority**: P1
- **Feature Area**: `src/app/(portfolio)/page.tsx`, `src/features/projects/components/BentoGrid.tsx`

#### Acceptance Criteria
- [x] Fetch initial profile and featured projects data from Server Component API layers.
- [x] Render animated Hero with glowing badge ("Open to Opportunities"), title, and dual CTA buttons.
- [x] Embed `<ScrollyShowcase />` seamlessly between Hero and Bento Grid.
- [x] Render responsive Bento Grid showcasing key strengths, architecture metrics, and tech stack tags.

---

### Issue #CLIENT-06: About Page & Core Architectural Philosophy
- **Status**: `[COMPLETED]` ✅
- **Labels**: `about`, `skills`, `pages`, `frontend`
- **Priority**: P1
- **Feature Area**: `src/app/(portfolio)/about/page.tsx`, `src/features/profile/components/AboutBio.tsx`

#### Acceptance Criteria
- [x] Display rich biography with high-resolution avatar and frosted glass framing.
- [x] Interactive skill tabs with animated hover micro-interactions and proficiency tags.
- [x] Core engineering & strategy pillars section.
- [x] Direct download button for PDF resume.

---

### Issue #CLIENT-07: Expandable Work Experience Timeline
- **Status**: `[COMPLETED]` ✅
- **Labels**: `experience`, `timeline`, `micro-interactions`, `frontend`
- **Priority**: P1
- **Feature Area**: `src/app/(portfolio)/experience/page.tsx`, `src/features/experience/components/ExperienceTimeline.tsx`

#### Acceptance Criteria
- [x] Render vertical glowing timeline path with active node dots for each milestone.
- [x] Implement `<ExperienceTimeline />` with Framer Motion for height expansion on click.
- [x] Display company name, role, employment duration, location, and employment type badges.
- [x] Toggle between collapsed summary and expanded key achievements and outcomes.

---

### Issue #CLIENT-08: Academic & Certification Timeline (`education/page.tsx`)
- **Status**: `[COMPLETED]` ✅
- **Labels**: `education`, `timeline`, `pages`, `frontend`
- **Priority**: P2
- **Feature Area**: `src/app/(portfolio)/education/page.tsx`, `src/features/education/components/EducationTimeline.tsx`

#### Acceptance Criteria
- [x] Render academic timeline with date markers and degree details.
- [x] Display degree title, university, field of study, graduation year, and GPA/honors.

---

### Issue #CLIENT-09: Filterable Case Studies Hub & Detail Page (`projects/[slug]`)
- **Status**: `[COMPLETED]` ✅
- **Labels**: `projects`, `case-studies`, `dynamic-routes`, `seo`
- **Priority**: P1
- **Feature Area**: `src/app/(portfolio)/projects/`, `src/features/projects/components/ProjectCard.tsx`

#### Acceptance Criteria
- [x] Project preview cards with title, summary, tech badges, and metrics.
- [x] Dynamic case study route `projects/[slug]/page.tsx` rendering summary, challenge, solution, and outcome sections.

---

### Issue #CLIENT-10: Testimonial Showcase & Interactive Carousel
- **Status**: `[COMPLETED]` ✅
- **Labels**: `testimonials`, `social-proof`, `carousel`, `frontend`
- **Priority**: P2
- **Feature Area**: `src/app/(portfolio)/testimonials/page.tsx`, `src/features/testimonials/components/TestimonialsCarousel.tsx`

#### Acceptance Criteria
- [x] Testimonial cards with client avatar initial, name, designation, company, and quote.
- [x] Display star ratings and executive endorsements from JP Morgan & Prime Bank PLC leaders.

---

### Issue #CLIENT-11: Glassmorphism Contact Page & Real-Time Form Validation
- **Status**: `[COMPLETED]` ✅
- **Labels**: `contact`, `forms`, `react-hook-form`, `zod`, `frontend`
- **Priority**: P1
- **Feature Area**: `src/app/(portfolio)/contact/page.tsx`, `src/features/contact/components/GlassContactForm.tsx`

#### Acceptance Criteria
- [x] Form fields: Name, Email, Subject, Message, Honeypot (hidden).
- [x] Client-side Zod validation with inline error messages.
- [x] Animated submission button with loading spinner and success checkmark celebration state.
- [x] Display client contact information (Direct Email, Phones, Location).

---

### Issue #CLIENT-12: SEO Metadata, OpenGraph Cards & Performance Audit
- **Status**: `[COMPLETED]` ✅
- **Labels**: `seo`, `opengraph`, `performance`, `sitemap`
- **Priority**: P1
- **Feature Area**: `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`

#### Acceptance Criteria
- [x] Implement dynamic OpenGraph and Twitter card metadata for all pages.
- [x] Generate dynamic `sitemap.ts` and `robots.ts`.
