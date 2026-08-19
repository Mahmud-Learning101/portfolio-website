# Implementation Plan: Clean Architecture & Feature-Driven Portfolio + Admin CMS

A modular, enterprise-grade architecture for the Next.js and MongoDB portfolio monorepo, structured with **Clean Architecture principles (Domain, Use-Cases, Data Access, UI)** and organized **Feature-by-Feature** to ensure strict separation of concerns, testability, and maintainability.

---

## Progress Overview

| Phase | Milestone | Status | Completed Issues |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Foundation & Database Engine** | **COMPLETED** ✅ | `#BACKEND-01`, `#BACKEND-02`, `#BACKEND-03`, `#BACKEND-10`, `#BACKEND-11` |
| **Phase 2** | **Design System & Public Client Experience** | **COMPLETED** ✅ | `#CLIENT-01` to `#CLIENT-12` |
| **Phase 3** | **Secured Admin CMS & Security Suite** | **COMPLETED** ✅ | `#BACKEND-04` to `#09`, `#ADMIN-01` to `#09` |
| **Phase 4** | **Production Readiness & Vercel Deployment** | **COMPLETED** ✅ | Live Atlas DB Connection, Form Modals, Vercel Config |

---

## 1. Clean Architecture & Feature-Wise Directory Design

```mermaid
graph TD
    subgraph UI_Layer [Presentation Layer / UI]
        PublicPages["App Router (portfolio) Pages"]
        AdminPages["App Router (admin) Pages"]
        FeatureComponents["Feature UI Components (src/features/*/components)"]
        SharedUI["Shared UI Primitives (GlassCard, FloatingNav, Scrollytelling)"]
    end

    subgraph Controller_Layer [Interface Adapters / Controllers]
        APIRoutes["Route Handlers (src/app/api/*)"]
        ServerActions["Server Actions"]
    end

    subgraph UseCase_Layer [Application Business Rules / Use-Cases]
        UseCases["Feature Use-Cases (src/features/*/use-cases)"]
    end

    subgraph Domain_Layer [Enterprise Business Rules / Core Domain]
        Entities["Domain Models & Zod Schemas (src/features/*/domain)"]
        RepoInterfaces["Repository Interfaces (src/features/*/data/interfaces)"]
    end

    subgraph Data_Layer [Frameworks & Drivers / Data Access]
        MongoRepos["Mongoose Repositories (src/features/*/data/repositories)"]
        MongoModels["Mongoose Schemas (src/features/*/data/models)"]
        MongooseConn["Cached DB Connector (src/shared/lib/db.ts)"]
        ExternalServices["Cloudinary / Resend API Clients"]
    end

    PublicPages --> FeatureComponents
    AdminPages --> FeatureComponents
    FeatureComponents --> SharedUI
    APIRoutes --> UseCases
    ServerActions --> UseCases
    UseCases --> Entities
    UseCases --> RepoInterfaces
    MongoRepos -.->|Implements| RepoInterfaces
    MongoRepos --> MongoModels
    MongoModels --> MongooseConn
```
