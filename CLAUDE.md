# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit website integrated with Convex as the backend/database. The project uses:

- **SvelteKit 2** with Svelte 5 (using runes syntax like `$props()`, `@render`)
- **Convex** for backend functions and database (via convex-svelte integration)
- **Tailwind CSS 4** (via Vite plugin)
- **Node.js adapter** for deployment
- **Bun** as the package manager (see bun.lock)
- **Doppler** for environment variable management in development

## Development Commands

### Running the Development Server

```bash
bun run dev
# Uses doppler to inject environment variables - requires doppler CLI configured
```

### Building

```bash
bun run build
# Creates production build using adapter-node
```

### Type Checking

```bash
bun run check          # Run once
bun run check:watch    # Watch mode
```

### Linting and Formatting

```bash
bun run lint           # Run prettier check and eslint
bun run format         # Auto-format all files with prettier
```

### Convex

```bash
bunx convex dev         # Run Convex development server
bunx convex deploy      # Deploy Convex functions
bunx convex -h          # See all Convex CLI commands
bunx convex docs        # Open Convex documentation
```

## Architecture

### Frontend (SvelteKit)

- Routes defined in `src/routes/` using SvelteKit file-based routing
- Shared components and utilities in `src/lib/` (accessible via `$lib` alias)
- Global layout at `src/routes/+layout.svelte` includes `layout.css` for Tailwind
- Uses Svelte 5 syntax (`$props()`, `@render children()`, etc.)

### Backend (Convex)

- Convex functions in `src/convex/` (configured in convex.json)
- Generated types in `src/convex/_generated/` (do not edit manually)
- Import from generated server: `import { query, mutation } from "./_generated/server"`
- Use `convex-svelte` package for Svelte integration (not React hooks)
- Validators from `convex/values` for type-safe arguments

### UI Components

- **shadcn-svelte** for UI components - use `bunx shadcn-svelte@latest add <component>` to add new components
- Components are installed to `src/lib/components/ui/`
- **runed** for Svelte utilities and composables
- Always prefer shadcn-svelte components over custom implementations when available

### Styling

- Tailwind CSS 4 via `@tailwindcss/vite` plugin
- Configuration in `src/routes/layout.css` (referenced in prettier config)
- Prettier plugin auto-sorts Tailwind classes

### Code Style

- **Tabs for indentation** (not spaces)
- Single quotes for strings
- No trailing commas
- 100 character print width
- TypeScript throughout
- `no-undef` ESLint rule disabled (TypeScript handles this)

## Key Integration Points

### Convex + Svelte

When using Convex in Svelte components, use `convex-svelte` bindings (not React's useQuery/useMutation). The integration pattern differs from the React examples in `src/convex/README.md`.

### Environment Variables

Development uses Doppler (`doppler run --`) to inject secrets. Ensure Doppler CLI is configured before running `bun run dev`.

### Adapter

Uses `@sveltejs/adapter-node` for Node.js deployment. The build output is a standalone Node app.
