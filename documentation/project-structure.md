# Project Structure Documentation

## Root Directory Structure

```
warehouse_app/
├── documentation/         # Project documentation files
├── node_modules/         # Project dependencies
├── public/              # Static assets and public files
└── src/                 # Source code
```

## Source Code Directory (`src/`)

```
src/
├── assets/              # Images and static assets
│   └── warehouse.webp
├── components/          # React components
│   ├── common/          # Shared UI components
│   │   ├── Form/
│   │   ├── Input/
│   │   ├── LiProduct/
│   │   └── SubmitButton/
│   ├── layout/          # Layout components
│   │   ├── Menu/
│   │   └── NavigationBar/
│   └── features/        # Feature-specific components
│       └── products/
│           └── AddProductForm/
├── config/              # Configuration files
│   └── api.config.ts
├── context/             # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── ProductsPage.tsx
│   └── RegisterPage.tsx
├── routes/              # Route guards and route helpers
│   └── PrivateRoute.tsx
├── services/            # API services
│   └── api/
│       ├── authApi.ts
│       └── warehouseApi.ts
├── styles/              # Global styles and tokens
│   ├── _tokens.scss
│   └── global.scss
├── types/               # TypeScript type definitions
│   ├── api/
│   │   ├── ICredentials.ts
│   │   └── ILoginResponse.ts
│   └── models/
│       ├── IAuthContext.ts
│       ├── IInput.ts
│       ├── IProduct.ts
│       └── IUser.ts
├── utils/               # Utility functions and helpers
│   └── productValidators/
│       ├── productValidators.ts
│       └── productValidators.test.ts
├── App.tsx              # Root React component
├── App.css              # App-level styles
├── index.css            # Global CSS
└── main.tsx             # Application entry point
```

## Configuration Files (Root Level)

```
warehouse_app/
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

- `components/common/`: Reusable UI components
- `components/layout/`: Navigation and layout components
- `components/features/`: Feature-specific components

### Services

- `services/api/`: API integration services

### State Management

- `context/`: React Context definitions

### Types

- `types/models/`: Data model type definitions
- `types/api/`: API-related type definitions

## Notes

- Each component folder follows the component structure guidelines
- Feature modules are organized by domain
- Utility functions are grouped by purpose
- Type definitions are separated by domain
