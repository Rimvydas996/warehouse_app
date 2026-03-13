# Warehouse Management System Documentation

## Project Overview

This is a warehouse management system built using React and TypeScript. The system allows users to manage inventory, track products, and handle warehouse operations.

## Project Structure

```
warehouse_app/
├── src/
│   ├── components/      # React components
│   ├── context/         # React Context providers
│   ├── pages/           # Page components
│   ├── routes/          # Route guards
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Utility functions
├── public/             # Static files
└── documentation/      # Project documentation
```

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Technical Stack

- React
- TypeScript
- Vite
- React Router
- Material UI

## Environment Configuration

The project uses the following environment variables:

- `VITE_API_URL`: Base URL for the API (preferred)
- `VITE_API_BASE_URL`: Base URL for the API (fallback)

## Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Register page
- `/products` - Products page (protected)

## Component Documentation

Detailed documentation for main components and their usage will be added here.

## API Integration

Current API modules live in `src/services/api/`:

- `authApi.ts` for auth endpoints (`/auth/login`, `/auth/register`)
- `warehouseApi.ts` for warehouse endpoints (`/warehouse`)

## Deployment

Instructions for deploying the application will be added here.
