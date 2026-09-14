# Dhira Industries - Commerce Platform

Modular-monolith Next.js application for the Dhira Industries e-commerce
platform. Phase 1 establishes the technical/visual foundation only.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript (strict)
- Tailwind CSS with the Dhira design tokens (`tailwind.config.ts`)
- PostgreSQL + Prisma ORM (`prisma/schema.prisma`)
- Zod + `@t3-oss/env-nextjs` for validated environment config (`src/config/env.ts`)
- Vitest + React Testing Library

## Local development

1. Copy `.env.example` to `.env` (a working `.env` with local Docker
   defaults is already included for development).
2. Start local Postgres + Redis:
   ```bash
   docker compose up -d
   ```
3. Install dependencies and generate the Prisma client:
   ```bash
   npm install
   npm run db:generate
   ```
4. Apply migrations and seed development data:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Run the app:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` / `build` / `start` - Next.js app
- `npm run lint` / `typecheck` / `test` - quality gates
- `npm run db:migrate` / `db:seed` / `db:studio` - Prisma workflows

## Architecture notes

- All server-side data access flows through `src/server/db.ts` (the single
  Prisma client) and domain services under `src/server/services/*`.
- The data rule for this project: **Admin -> API/service layer -> PostgreSQL
  -> Storefront**. Storefront components must never hardcode business data.
- Seed data in `prisma/seed.ts` is explicitly DEVELOPMENT-only demo data.
