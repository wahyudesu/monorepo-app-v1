// Shared types and utilities

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export function formatDate(date: Date): string {
  return date.toISOString();
}
