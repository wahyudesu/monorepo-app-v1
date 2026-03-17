# Expandable Tabs Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing BottomDock component with an ExpandableTabs component for animated, expandable navigation.

**Architecture:** Create an expandable-tabs component adapted to use the existing `motion` package (instead of framer-motion), wrap it with keyboard shortcut handling, and integrate into the app layout.

**Tech Stack:** React, TypeScript, motion v12.38.0, usehooks-ts, Next.js App Router, Tailwind CSS

---

## Task 1: Install usehooks-ts dependency

**Files:**
- Modify: `package.json`

**Step 1: Install the dependency**

Run: `bun add usehooks-ts`

Expected: Package added to dependencies

**Step 2: Verify installation**

Run: `grep usehooks-ts package.json`

Expected: `"usehooks-ts": "^x.x.x"` in dependencies

**Step 3: Commit**

```bash
git add package.json package-lock.json bun.lockb
git commit -m "deps: add usehooks-ts for useOnClickOutside hook"
```

---

## Task 2: Create expandable-tabs component

**Files:**
- Create: `src/components/ui/expandable-tabs.tsx`

**Step 1: Create the expandable-tabs component**

```typescript
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: "tab";
}

interface Separator {
  type: "separator";
}

export type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = {
  delay: 0.1,
  type: "spring" as const,
  bounce: 0,
  duration: 0.6,
};

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

Run: `bunx tsc --noEmit`

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ui/expandable-tabs.tsx
git commit -m "feat: add expandable-tabs component with motion animations"
```

---

## Task 3: Create ExpandableNav wrapper component

**Files:**
- Create: `src/components/layout/ExpandableNav.tsx`

**Step 1: Create the ExpandableNav component**

```typescript
"use client";

import { CalendarDays, BarChart3, Settings, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";

const navItems = [
  { to: "/post", icon: CalendarDays, label: "Post", shortcut: "1" },
  { to: "/inbox", icon: MessageSquare, label: "Inbox", shortcut: "2" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", shortcut: "3" },
  { to: "/ai", icon: Sparkles, label: "AI", shortcut: "4" },
  { to: "/settings", icon: Settings, label: "Settings", shortcut: "5" },
] as const;

export function ExpandableNav() {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Set initial selected index based on current path
  useEffect(() => {
    const index = navItems.findIndex((item) => item.to === pathname);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [pathname]);

  // Convert navItems to TabItem format
  const tabs: TabItem[] = navItems.map((item) => ({
    title: item.label,
    icon: item.icon,
    type: "tab" as const,
  }));

  const handleTabChange = (index: number | null) => {
    setSelectedIndex(index);
    if (index !== null) {
      // Navigate to the selected route
      window.location.href = navItems[index].to;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-white"
        className="bg-foreground/95 backdrop-blur-xl border-foreground/20"
        onChange={handleTabChange}
      />
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

Run: `bunx tsc --noEmit`

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/layout/ExpandableNav.tsx
git commit -m "feat: add ExpandableNav wrapper with route handling"
```

---

## Task 4: Update AppLayout to use ExpandableNav

**Files:**
- Modify: `src/components/layout/AppLayout.tsx:1-18`

**Step 1: Replace BottomDock import and usage**

Replace the entire file content with:

```typescript
import { ExpandableNav } from "./ExpandableNav";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1024px] flex-1 overflow-auto px-5 pb-24 pt-4">
        {children}
      </main>
      <ExpandableNav />
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

Run: `bunx tsc --noEmit`

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/layout/AppLayout.tsx
git commit -m "refactor: replace BottomDock with ExpandableNav"
```

---

## Task 5: Add keyboard shortcut support

**Files:**
- Modify: `src/components/layout/ExpandableNav.tsx`

**Step 1: Add keyboard shortcuts to ExpandableNav**

Replace the entire file content with:

```typescript
"use client";

import { CalendarDays, BarChart3, Settings, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";

const navItems = [
  { to: "/post", icon: CalendarDays, label: "Post", shortcut: "1" },
  { to: "/inbox", icon: MessageSquare, label: "Inbox", shortcut: "2" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", shortcut: "3" },
  { to: "/ai", icon: Sparkles, label: "AI", shortcut: "4" },
  { to: "/settings", icon: Settings, label: "Settings", shortcut: "5" },
] as const;

export function ExpandableNav() {
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Set initial selected index based on current path
  useEffect(() => {
    const index = navItems.findIndex((item) => item.to === pathname);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [pathname]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = typeof navigator !== "undefined"
      ? navigator.platform.toUpperCase().indexOf("MAC") >= 0
      : false;
    const modifierKey = isMac ? "metaKey" : "ctrlKey";

    if (e[modifierKey] && e.key >= "1" && e.key <= "5") {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      if (navItems[index]) {
        window.location.href = navItems[index].to;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Convert navItems to TabItem format
  const tabs: TabItem[] = navItems.map((item) => ({
    title: item.label,
    icon: item.icon,
    type: "tab" as const,
  }));

  const handleTabChange = (index: number | null) => {
    setSelectedIndex(index);
    if (index !== null) {
      // Navigate to the selected route
      window.location.href = navItems[index].to;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-white"
        className="bg-foreground/95 backdrop-blur-xl border-foreground/20"
        onChange={handleTabChange}
      />
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

Run: `bunx tsc --noEmit`

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/layout/ExpandableNav.tsx
git commit -m "feat: add keyboard shortcuts (Cmd/Ctrl + 1-5) to ExpandableNav"
```

---

## Task 6: Test the implementation

**Files:**
- None (verification only)

**Step 1: Start dev server**

Run: `bun dev`

Expected: Server starts without errors

**Step 2: Manual verification checklist**

1. Navigate to each route (Post, Inbox, Analytics, AI, Settings)
2. Verify the active tab is highlighted
3. Click on a tab and verify it expands to show the label
4. Click outside the tabs and verify they collapse
5. Test keyboard shortcuts (Cmd/Ctrl + 1-5)
6. Check mobile responsiveness

**Step 3: Commit any fixes if needed**

```bash
git add .
git commit -m "fix: any issues found during testing"
```

---

## Task 7: Remove deprecated BottomDock component

**Files:**
- Delete: `src/components/layout/BottomDock.tsx`

**Step 1: Remove the old component**

Run: `rm src/components/layout/BottomDock.tsx`

**Step 2: Verify no imports remain**

Run: `grep -r "BottomDock" src/`

Expected: No results (or only in git history)

**Step 3: Commit**

```bash
git add src/components/layout/BottomDock.tsx
git commit -m "chore: remove deprecated BottomDock component"
```

---

## Task 8: Final cleanup and verification

**Files:**
- None (verification only)

**Step 1: Run TypeScript check**

Run: `bunx tsc --noEmit`

Expected: No errors

**Step 2: Run linter**

Run: `bun run lint`

Expected: No errors

**Step 3: Build the project**

Run: `bun run build`

Expected: Build succeeds

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final cleanup after ExpandableNav integration"
```
