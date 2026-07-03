// Shared TypeScript types for the Discussion Forum module.
// Other modules (FAQ, Admin Dashboard, Query Resolution, Escalation) will
// define their own types when they are built out.

export type Category =
  | "General"
  | "Technical"
  | "Account"
  | "Billing"
  | "Other";

export interface DiscussionInput {
  title: string;
  description: string;
  category: Category;
  tags?: string[];
  authorId: string;
}

export interface ReplyInput {
  discussionId: string;
  authorId: string;
  content: string;
}
