<p align="center">
  <img src="public/assets/app-icon.png" alt="BitFinance app icon" height="100">
</p>

# BitFinance

![React Version](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Latest Release](https://img.shields.io/github/v/release/gustmrg/bitfinance-frontend)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

BitFinance is a finance application, and this repository contains the frontend for the BitFinance project.

## Features

- Track bills and expenses by organization
- View dashboard summaries for upcoming bills and recent expenses
- Create, join, and manage organizations
- Invite organization members
- Upload and manage bill or expense documents
- Manage account profile and avatar settings
- Support authenticated sessions with refresh-token based API integration
- Provide installable PWA assets through Vite PWA

## Tech Stack

- **React 18** for the user interface
- **TypeScript** for static typing
- **Vite** for local development and production builds
- **React Router** for client-side routing
- **TanStack Query** for server state
- **Zustand** for shared auth and organization state
- **Axios** for API requests
- **Tailwind CSS** and **Radix UI** for styling and primitives
- **react-i18next** for internationalization
- **vite-plugin-pwa** for PWA manifest and assets

## Getting Started

### Prerequisites

- Node.js 22 or newer is recommended
- npm
- A running BitFinance backend API

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/gustmrg/bitfinance-frontend.git
   cd bitfinance-frontend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a local environment file.

   ```bash
   cp .env.development.example .env.local
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

The app runs at `http://localhost:3000` and expects the backend API at `http://localhost:8080/api/v1` by default.

## Environment Variables

Vite only exposes variables prefixed with `VITE_` to the browser.

| Variable | Description | Local default |
| --- | --- | --- |
| `VITE_API_URL` | Base URL for the BitFinance API | `http://localhost:8080/api/v1` |

Environment templates are included for common modes:

- `.env.example` for a generic template
- `.env.development.example` for local development
- `.env.production.example` for production builds

Use `.env.local` for personal overrides. Do not commit real `.env` files.

## Available Scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

## Project Structure

```text
src/
  api/           Feature-based API clients and shared API error handling
  auth/          Auth provider, Zustand store, and auth selector/action hooks
  components/    Reusable UI and layout components
  hooks/         Query, mutation, and utility hooks
  i18n/          i18next runtime configuration
  layouts/       Dashboard and navigation layouts
  lib/           Axios, query client, auth token, logger, and utilities
  pages/         Route-level page components
  utils/         General helpers
```

## API Organization

API modules are organized by feature under `src/api`.

```text
src/api/
  account/
  auth/
  bills/
  dashboard/
  expenses/
  organizations/
  shared/
```

Conventions:

- Import API clients from feature barrels such as `@/api/auth`, `@/api/bills`, and `@/api/expenses`.
- Use `camelCase + Async` for service methods, for example `billsService.listAsync`.
- Keep HTTP concerns inside service files.
- Keep shared API error normalization in `src/api/shared`.
- API error toasts are handled globally through Axios interceptors.

## Routing

Routes are defined in `src/routes.tsx`.

Main routes include:

- `/` for the public home page
- `/auth/sign-in` and `/auth/sign-up` for authentication
- `/dashboard` for the authenticated dashboard
- `/dashboard/bills` and `/dashboard/bills/:billId`
- `/dashboard/expenses` and `/dashboard/expenses/:expenseId`
- `/account/settings`, `/account/more`, and `/account/organization`
- `/account/create-organization`
- `/join-organization`

Authenticated pages are wrapped with `ProtectedRoute`.

## Build and Deployment

Create a production build with:

```bash
npm run build
```

Production builds use `VITE_API_URL=/api/v1` by default, which supports same-origin API routing behind a reverse proxy.

The included `Dockerfile` builds the Vite app and serves the generated `dist` directory on port `3000`.

Deployment automation lives in `.github/workflows/deploy.yml` and runs on pushes to `main`.

## Related Repository

- Backend API: `https://github.com/gustmrg/bitfinance-backend`

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
