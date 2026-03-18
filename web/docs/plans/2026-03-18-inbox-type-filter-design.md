# Inbox Type Filter Design

**Date:** 2026-03-18
**Status:** Approved

## Overview

Add a secondary filter dropdown next to the existing platform filter that allows users to filter conversations by type (Message/Comment). Default shows all types.

## Requirements

- Add type filter dropdown next to platform filter
- Filter options: "All Types", "Messages", "Comments"
- Default state: Show all types
- Works alongside existing platform and search filters

## Data Structure Changes

### Update Conversation Interface

```typescript
interface Conversation {
  id: string;
  platform: "instagram" | "tiktok" | "twitter" | "youtube";
  type: "message" | "comment"; // NEW FIELD
  sender: string;
  avatar: string;
  isOnline: boolean;
  isRead: boolean;
  isStarred: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  mediaPost?: string;
}
```

## UI Layout

```
Header:
┌────────────────────────────────────────────────────┐
│ Inbox                    [Platform▼] [Type▼]       │
│ Manage conversations...                              │
└────────────────────────────────────────────────────┘
```

## State Management

```typescript
type TypeFilter = "all" | "message" | "comment";

const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
```

## Filtering Logic

```typescript
const filteredConversations = useMemo(() => {
  return mockConversations.filter((conv) => {
    const matchesPlatform = platform === "all" || conv.platform === platform;
    const matchesType = typeFilter === "all" || conv.type === typeFilter;
    const matchesSearch = /* ... existing search logic ... */;
    return matchesPlatform && matchesType && matchesSearch;
  });
}, [platform, typeFilter, searchQuery]);
```

## Components

### Type Filter Select

```tsx
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

## Files to Modify

1. `web/src/app/inbox/InboxContent.tsx`
   - Add `type` field to `Conversation` interface
   - Add `TypeFilter` type
   - Add `typeFilter` state
   - Update mock data with type values
   - Add type filter UI component
   - Update filtering logic

## Mock Data Updates

Each conversation in `mockConversations` needs a `type` field:
- Direct messages → `type: "message"`
- Comments on posts → `type: "comment"`
