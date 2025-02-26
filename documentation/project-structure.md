# Project Structure Documentation

## Root Directory Structure

```
warehouse/
├── documentation/         # Project documentation files
├── node_modules/         # Project dependencies
├── public/              # Static assets and public files
└── src/                 # Source code
```

## Source Code Directory (`src/`)

```
src/
├── assets/              # Images, fonts, and other static resources
│   ├── images/
│   └── styles/
│
├── components/          # Reusable React components
│   ├── common/         # Shared components used across features
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   │
│   ├── layout/         # Layout components
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── Footer/
│   │
│   └── features/       # Feature-specific components
│       ├── products/
│       ├── inventory/
│       └── users/
│
├── config/             # Configuration files
│   ├── api.config.ts
│   └── routes.config.ts
│
├── contexts/           # React Context providers
│   ├── AuthContext/
│   └── ThemeContext/
│
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useForm.ts
│   └── useApi.ts
│
├── pages/              # Page components
│   ├── Dashboard/
│   ├── Products/
│   ├── Inventory/
│   └── Users/
│
├── services/           # API and other services
│   ├── api/
│   │   ├── products.ts
│   │   ├── inventory.ts
│   │   └── users.ts
│   └── utils/
│
├── store/             # State management
│   ├── actions/
│   ├── reducers/
│   └── types/
│
├── types/             # TypeScript type definitions
│   ├── models/
│   └── api/
│
├── utils/             # Utility functions and helpers
│   ├── formatting.ts
│   ├── validation.ts
│   └── helpers.ts
│
├── App.tsx            # Root React component
├── main.tsx          # Application entry point
└── vite-env.d.ts     # Vite type declarations
```

## Configuration Files (Root Level)

```
warehouse/
├── .eslintrc.json    # ESLint configuration
├── .gitignore        # Git ignore rules
├── .prettierrc       # Prettier configuration
├── index.html        # HTML entry point
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Documentation Directory

```
documentation/
├── project-docs.md           # General project documentation
├── coding-guidelines.md      # Coding standards and guidelines
└── project-structure.md      # This file - project structure
```

## Key Files Description

### Root Level

- `package.json`: Dependencies, scripts, and project metadata
- `tsconfig.json`: TypeScript compiler configuration
- `vite.config.ts`: Build tool configuration
- `index.html`: HTML template file

### Source Code

- `main.tsx`: Application entry point, React rendering setup
- `App.tsx`: Root component, routing setup
- `vite-env.d.ts`: Environment type declarations

### Components

- `common/`: Reusable UI components
- `layout/`: Page structure components
- `features/`: Feature-specific components

### Services

- `api/`: API integration services
- `utils/`: Helper functions and utilities

### State Management

- `contexts/`: React Context definitions
- `store/`: State management setup (if using Redux/other)

### Types

- `models/`: Data model type definitions
- `api/`: API-related type definitions

## Notes

- Each component folder follows the component structure guidelines
- Feature modules are organized by domain
- Utility functions are grouped by purpose
- Type definitions are separated by domain
