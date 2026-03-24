# AGENTS.md

## Project Setup

- Language: TypeScript (strict)
- Framework: configurable (React / Node.js)
- Linting: ESLint + Prettier

---

## Core Rules

### ✅ DO

- Use strict typing (no `any`, use `unknown` if needed)
- Use interfaces/types for all data
- Keep components small and focused
- Separate UI from business logic
- Centralize API logic
- Handle all async errors with try/catch
- Run `npm run format` on all modified files before committing
- Ensure all code matches `.prettierrc`

### ❌ DON'T

- Do not use `any`
- Do not mix UI and business logic
- Do not create large components (>300 lines)
- Do not hardcode config values
- Do not add unnecessary dependencies

---

## Naming

- Components: PascalCase
- Functions: camelCase
- Interfaces: `I` prefix
- Types: PascalCase
- Constants: UPPER_SNAKE_CASE

---

## Architecture

- Feature-based structure
- Use barrel exports
- Keep logic reusable and modular

---

## State

- Prefer local state
- Use context only when necessary
- Avoid prop drilling

---

## API

- Use service layer
- Use environment variables
- Always handle errors

---

## Testing

- Test logic and edge cases
- Keep tests readable

---

## Performance

- Use memoization only when needed
- Avoid unnecessary re-renders

---

## Accessibility

- Use semantic HTML
- Ensure keyboard navigation

---

## Security

- Validate inputs
- Never expose secrets

---

## Git

- Use conventional commits:
    - feat:
    - fix:
    - style:

---

## Scope Control

- Modify only relevant files
- Do not refactor unrelated code
- Do not rename files without request

---

## Formatting Rules

### ✅ DO

- Follow Prettier configuration (`.prettierrc`)
- Keep consistent indentation (4 spaces)
- Use consistent quotes and commas per config

### ❌ DON'T

- Do not manually override Prettier formatting
- Do not introduce inconsistent spacing or line breaks

### Final Step

- Ensure all generated or modified code matches Prettier format

---

## Auto-Refactor Rules

### Allowed

- Extract pure functions
- Remove unused code
- Improve naming clarity
- Deduplicate logic
- Split large components

### Ask First

- API changes
- New dependencies
- Large restructures

### Forbidden

- Changing business logic
- Modifying tests to pass
- Changing architecture

---

## Refactor Process

1. Smallest possible change
2. Preserve behavior
3. Keep diff minimal

---

## Agent Behavior

- Prefer small, focused changes
- Ask when unsure
- Suggest improvements when relevant
