# Warehouse App (Frontend)

React + TypeScript + Vite frontend for the Warehouse Management System.

## Requirements

- Node.js 18+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env`:

```bash
VITE_API_URL=http://localhost:3000
```

`VITE_API_BASE_URL` is also supported as a fallback if `VITE_API_URL` is not set.

3. Start the dev server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run test` - Run tests (Vitest)

## Project Structure (src)

- `components/` - Reusable UI components
- `context/` - React Context providers
- `pages/` - Page-level components
- `routes/` - Route guards
- `services/api/` - API calls
- `styles/` - Global styles and tokens
- `types/` - TypeScript types
- `utils/` - Utilities and validators

## Routes

- `/` - Home
- `/login` - Login
- `/register` - Register
- `/products` - Products (protected)

## API Modules

- `services/api/authApi.ts` - Auth endpoints (`/auth/login`, `/auth/register`)
- `services/api/warehouseApi.ts` - Warehouse endpoints (`/warehouse`)

## Tests

Vitest is used for unit tests. See `src/**/*.test.ts(x)`.
