# Inbox Type Filter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a type filter dropdown (message/comment) next to the platform filter in the inbox

**Architecture:** Add a `type` field to the `Conversation` interface, create a new `typeFilter` state, and update the filtering logic to include type selection alongside existing platform and search filters.

**Tech Stack:** React, TypeScript, shadcn/ui Select component

---

### Task 1: Add type field to Conversation interface

**Files:**
- Modify: `web/src/app/inbox/InboxContent.tsx:30-43`

**Step 1: Add type field to interface**

Find the `Conversation` interface and add the `type` field after `platform`:

```typescript
interface Conversation {
  id: string;
  platform: "instagram" | "tiktok" | "twitter" | "youtube";
  type: "message" | "comment"; // ADD THIS LINE
  sender: string;
  avatar: string;
  // ... rest of interface
}
```

**Step 2: Commit**

```bash
git add web/src/app/inbox/InboxContent.tsx
git commit -m "feat(inbox): add type field to Conversation interface"
```

---

### Task 2: Add TypeFilter type and state

**Files:**
- Modify: `web/src/app/inbox/InboxContent.tsx`

**Step 1: Add TypeFilter type**

After the `Platform` type definition (around line 21), add:

```typescript
type Platform = "all" | "instagram" | "tiktok" | "twitter" | "youtube";
type TypeFilter = "all" | "message" | "comment"; // ADD THIS LINE
```

**Step 2: Add typeFilter state**

In the `InboxContent` component function (around line 157), add state after `platform`:

```typescript
export function InboxContent() {
  const [platform, setPlatform] = useState<Platform>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all"); // ADD THIS LINE
  const [searchQuery, setSearchQuery] = useState("");
  // ...
}
```

**Step 3: Commit**

```bash
git add web/src/app/inbox/InboxContent.tsx
git commit -m "feat(inbox): add TypeFilter type and state"
```

---

### Task 3: Update mock data with type values

**Files:**
- Modify: `web/src/app/inbox/InboxContent.tsx:52-155`

**Step 1: Add type to each conversation**

Update `mockConversations` array - add `type` field to each conversation object. Conversations with `mediaPost` are comments, direct conversations are messages:

```typescript
const mockConversations: Conversation[] = [
  {
    id: "1",
    platform: "instagram",
    type: "comment", // Has mediaPost
    sender: "sarah_design",
    // ...
  },
  {
    id: "2",
    platform: "tiktok",
    type: "comment", // Has mediaPost
    sender: "mike_creator",
    // ...
  },
  {
    id: "3",
    platform: "twitter",
    type: "message", // Direct message
    sender: "tech_enthusiast",
    // ...
  },
  {
    id: "4",
    platform: "youtube",
    type: "comment", // Has mediaPost
    sender: "video_fan",
    // ...
  },
  {
    id: "5",
    platform: "instagram",
    type: "message", // Direct message
    sender: "brand_official",
    // ...
  },
  {
    id: "6",
    platform: "tiktok",
    type: "comment", // Has mediaPost
    sender: "dance_lover",
    // ...
  },
];
```

**Step 2: Commit**

```bash
git add web/src/app/inbox/InboxContent.tsx
git commit -m "feat(inbox): add type values to mock data"
```

---

### Task 4: Update filtering logic

**Files:**
- Modify: `web/src/app/inbox/InboxContent.tsx:163-173`

**Step 1: Update filteredConversations to include type filter**

Modify the `useMemo` for `filteredConversations`:

```typescript
const filteredConversations = useMemo(() => {
  return mockConversations.filter((conv) => {
    const matchesPlatform = platform === "all" || conv.platform === platform;
    const matchesType = typeFilter === "all" || conv.type === typeFilter; // ADD THIS LINE
    const matchesSearch =
      searchQuery === "" ||
      conv.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesType && matchesSearch; // ADD matchesType
  });
}, [platform, typeFilter, searchQuery]); // ADD typeFilter to deps
```

**Step 2: Commit**

```bash
git add web/src/app/inbox/InboxContent.tsx
git commit -m "feat(inbox): update filtering logic to include type"
```

---

### Task 5: Add type filter UI

**Files:**
- Modify: `web/src/app/inbox/InboxContent.tsx:205-218`

**Step 1: Add type filter select next to platform filter**

After the platform Select component (around line 217), add the type filter:

```typescript
{/* Platform Filter - Select */}
<Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="All Platforms" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Platforms</SelectItem>
    <SelectItem value="instagram">Instagram</SelectItem>
    <SelectItem value="tiktok">TikTok</SelectItem>
    <SelectItem value="twitter">Twitter</SelectItem>
    <SelectItem value="youtube">YouTube</SelectItem>
  </SelectContent>
</Select>

{/* ADD THIS: Type Filter - Select */}
<Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="All Types" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Types</SelectItem>
    <SelectItem value="message">Messages</SelectItem>
    <SelectItem value="comment">Comments</SelectItem>
  </SelectContent>
</Select>
```

**Step 2: Verify UI renders correctly**

Run dev server and check: `bun run dev` from `web/` directory

Expected: Two select dropdowns in header - "All Platforms" and "All Types"

**Step 3: Commit**

```bash
git add web/src/app/inbox/InboxContent.tsx
git commit -m "feat(inbox): add type filter dropdown UI"
```

---

### Task 6: Test the complete feature

**Files:**
- Test: Manual verification in browser

**Step 1: Start dev server**

```bash
cd web && bun run dev
```

**Step 2: Verify filtering works**

1. Navigate to `/inbox`
2. Select "Messages" from type filter → Only conversations with `type: "message"` should show
3. Select "Comments" → Only conversations with `type: "comment"` should show
4. Select "All Types" → All conversations should show
5. Test combined with platform filter (e.g., Instagram + Comments)

**Step 3: Final commit if needed**

If any fixes were needed during testing:

```bash
git add web/src/app/inbox/InboxContent.tsx
git commit -m "fix(inbox): address issues found during testing"
```

---

## Summary

This plan:
1. Adds `type` field to the data structure
2. Adds state management for type filtering
3. Updates mock data with type values
4. Updates filtering logic
5. Adds the UI dropdown component
6. Uses TDD-style verification with commits
