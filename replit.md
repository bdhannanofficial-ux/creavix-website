# Creavix IT Solution — Portfolio Website

## Overview

This is a portfolio/agency website for **Creavix IT Solution**, a video production and editing company. The site showcases their video ad work, introduces the team, and provides a contact form with a star rating system. It is a full-stack TypeScript web application with a React frontend and an Express backend, using PostgreSQL (via Drizzle ORM) to store contact form submissions.

**Pages:**
- `/` — Portfolio (Home): Showcases YouTube video ad categories with lazy-loaded embeds
- `/team` — Team page: Founder and senior video editors with bios
- `/contact` — Contact form: Name, email, message, and 1–5 star rating, submitted to the backend

---

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture

- **Framework:** React 18 (SPA, not RSC), bootstrapped with Vite
- **Routing:** `wouter` (lightweight client-side routing)
- **Styling:** Tailwind CSS with CSS variables for theming (dark "premium agency" theme, amber/gold primary accent)
- **UI Components:** shadcn/ui (Radix UI primitives) with "new-york" style
- **Animations:** Framer Motion for page transitions and scroll-triggered animations
- **Icons:** `lucide-react` for general icons, `react-icons/fa6` for social media brand icons
- **Forms:** react-hook-form with Zod validation (schema shared with backend)
- **Data Fetching:** TanStack React Query (v5), with a custom `useCreateContact` mutation hook
- **Fonts:** DM Sans (body) and Outfit (display), loaded via Google Fonts

**Key frontend components:**
- `Layout.tsx` — Shared nav/footer wrapper, scroll-aware header, mobile menu
- `VideoEmbed.tsx` — Lazy YouTube embed with thumbnail preview and play button
- `StarRating.tsx` — Interactive 1–5 star rating input
- Pages: `Home`, `Team`, `Contact`, `not-found`

### Backend Architecture

- **Runtime:** Node.js with TypeScript, run via `tsx` in development
- **Framework:** Express 5
- **API:** REST; currently one endpoint:  
  `POST /api/contacts` — validates and saves a contact form submission
- **Schema validation:** Zod (input validated on both client and server using a shared schema in `shared/`)
- **Build:** esbuild bundles the server to `dist/index.cjs`; Vite builds the client to `dist/public`
- **Static serving:** In production, Express serves the Vite-built client from `dist/public` and falls through to `index.html` for SPA routing

**Key server files:**
- `server/index.ts` — App setup, middleware, HTTP server
- `server/routes.ts` — Route definitions using shared API spec
- `server/storage.ts` — `DatabaseStorage` class implementing `IStorage` interface
- `server/db.ts` — Drizzle ORM + pg Pool setup
- `server/vite.ts` — Dev mode Vite middleware integration

### Shared Code (`shared/`)

The `shared/` directory is a key architectural decision — it allows the frontend and backend to share:
- **Database schema** (`schema.ts`): Drizzle table definitions + Zod insert schemas via `drizzle-zod`
- **API contract** (`routes.ts`): Route paths, HTTP methods, input schemas, and response schemas are all defined once and used by both client hooks and server route handlers. This prevents drift between client and server.

### Data Storage

- **Database:** PostgreSQL (via `DATABASE_URL` env var, must be provisioned)
- **ORM:** Drizzle ORM with `drizzle-kit` for migrations (`db:push` command)
- **Schema:** Single `contacts` table with fields: `id`, `name`, `email`, `message`, `rating` (1–5), `createdAt`

### Authentication

No authentication or sessions are implemented in this project. The contact form is publicly accessible.

### Build & Dev Workflow

- **Dev:** `npm run dev` — runs Express with Vite middleware (HMR, runtime error overlay)
- **Build:** `npm run build` — runs `script/build.ts` which calls Vite (client) then esbuild (server)
- **Start (prod):** `node dist/index.cjs`
- **DB migration:** `npm run db:push`

---

## External Dependencies

### Databases
- **PostgreSQL** — Required via `DATABASE_URL` environment variable. Must be provisioned before running. Used for contact form storage.

### UI/Component Libraries
- **Radix UI** — Unstyled accessible primitives (full suite included)
- **shadcn/ui** — Component layer on top of Radix, "new-york" style
- **Framer Motion** — Animation library for page transitions and scroll effects
- **Embla Carousel** — Used for carousel components
- **Vaul** — Drawer component
- **cmdk** — Command palette component
- **react-day-picker** — Calendar/date picker component

### Form & Validation
- **react-hook-form** — Form state management
- **@hookform/resolvers** — Zod adapter for react-hook-form
- **Zod** — Schema validation (shared client/server)
- **drizzle-zod** — Auto-generates Zod schemas from Drizzle table definitions

### Data Fetching
- **TanStack React Query v5** — Server state management and mutation handling

### Icons & Fonts
- **react-icons** (fa6) — Social media brand icons (Facebook, LinkedIn, YouTube, Instagram, X/Twitter, WhatsApp)
- **lucide-react** — General UI icons
- **Google Fonts** — DM Sans, Outfit, Fira Code, Geist Mono, Architects Daughter

### External Media
- **YouTube** — Video portfolio is embedded via YouTube iframes using lazy-loading (thumbnail shown first, iframe loaded on click)

### Build Tools
- **Vite** — Frontend bundler and dev server
- **esbuild** — Server bundler for production
- **tsx** — TypeScript execution for dev server and build scripts
- **Drizzle Kit** — Database schema migration CLI

### Replit-specific Plugins (dev only)
- `@replit/vite-plugin-runtime-error-modal` — Shows runtime errors in dev
- `@replit/vite-plugin-cartographer` — Replit code navigation
- `@replit/vite-plugin-dev-banner` — Replit dev banner