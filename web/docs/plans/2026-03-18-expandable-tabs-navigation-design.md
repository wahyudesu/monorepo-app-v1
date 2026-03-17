# Expandable Tabs Navigation Design

**Date**: 2026-03-18
**Author**: Claude
**Status**: Approved

## Overview

Replace the existing `BottomDock` component with an `ExpandableTabs` component that provides a more modern, animated navigation experience with expandable labels.

## Current State

The `BottomDock` component (`src/components/layout/BottomDock.tsx`):
- Fixed position at bottom-center
- 5 navigation items with icons only
- Keyboard shortcuts (⌘1-5) with number badges
- 1-second delayed tooltips
- Navigation items: Post, Inbox, Analytics, AI Creator, Settings

## Proposed Design

### Approach

Create an `ExpandableTabs` component that:
1. Uses the existing `motion` package (v12.38.0) instead of `framer-motion`
2. Integrates with `usehooks-ts` for click-outside functionality
3. Preserves keyboard shortcuts via a wrapper component
4. Maintains the glass-morphism aesthetic

### Component Structure

```
src/components/ui/expandable-tabs.tsx    - Core expandable tabs component (adapted)
src/components/layout/ExpandableNav.tsx - Navigation wrapper with shortcuts
src/components/layout/AppLayout.tsx     - Updated to use ExpandableNav
```

### Navigation Items

| Route | Icon | Label | Shortcut |
|-------|------|-------|----------|
| /post | CalendarDays | Post | ⌘1 |
| /inbox | MessageSquare | Inbox | ⌘2 |
| /analytics | BarChart3 | Analytics | ⌘3 |
| /ai | Sparkles | AI | ⌘4 |
| /settings | Settings | Settings | ⌘5 |

### Dependencies to Install

- `usehooks-ts` - for `useOnClickOutside` hook

### Technical Details

#### expandable-tabs.tsx

Adapted from the provided component to use `motion` instead of `framer-motion`:

```typescript
// Key changes from original:
// - import { motion } from "motion" instead of framer-motion
// - All other logic remains the same
```

#### ExpandableNav.tsx

New wrapper component that:
- Wraps `ExpandableTabs` with keyboard shortcut handling
- Maps the current nav items to the tabs format
- Handles route-based active state

#### Styyling

- Fixed bottom positioning: `fixed bottom-4 left-1/2 -translate-x-1/2`
- Glass effect: `bg-foreground/95 backdrop-blur`
- Smooth animations for expand/collapse
- Active tab: shows icon + label
- Inactive tabs: shows icon only

## Implementation Plan

1. Install `usehooks-ts` dependency
2. Create `expandable-tabs.tsx` adapted for `motion` package
3. Create `ExpandableNav.tsx` wrapper with keyboard shortcuts
4. Update `AppLayout.tsx` to use the new component
5. Test navigation and keyboard shortcuts
6. Remove deprecated `BottomDock.tsx`

## Success Criteria

- [ ] Navigation works for all 5 routes
- [ ] Keyboard shortcuts (⌘1-5) function correctly
- [ ] Expandable animation is smooth
- [ ] Active tab state displays correctly
- [ ] Click-outside closes expanded tabs
- [ ] Mobile responsive
