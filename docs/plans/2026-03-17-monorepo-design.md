# Monorepo Design: Next.js + Hono

**Date:** 2026-03-17
**Status:** Approved

## Overview

Monorepo dengan pnpm workspace berisi Next.js frontend dan Hono backend dengan shared package untuk types & utilities.

## Tech Stack

- **Monorepo:** pnpm workspace
- **Package Manager:** pnpm
- **Frontend:** Next.js (App Router)
- **Backend:** Hono (Node.js runtime)
- **Language:** TypeScript

## Structure

```
monorepo-app-v1/
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json        # base TSConfig
├── web/                 # Next.js app
├── server/              # Hono app
└── shared/              # Shared types & utilities
```

## Architecture

### web/ (Next.js)
- Frontend application
- App Router
- Consumes shared package

### server/ (Hono)
- API/Backend server
- Node.js runtime
- Consumes shared package

### shared/
- TypeScript types
- Shared utilities
- Common interfaces

## Workspace Config

`pnpm-workspace.yaml`:
```yaml
packages:
  - 'web'
  - 'server'
  - 'shared'
```

## Root Scripts

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm --filter web dev\" \"pnpm --filter server dev\"",
    "build": "pnpm --filter shared build && pnpm --filter web build && pnpm --filter server build",
    "lint": "pnpm -r lint"
  }
}
```

## Dependencies Flow

```
web  ──┐
       ├──> shared
server───┘
```

Both apps import from `shared` as workspace dependency via `pnpm add shared@workspace:*`.
