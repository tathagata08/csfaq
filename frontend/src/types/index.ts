export type Category = "General" | "Technical" | "Account" | "Billing" | "Other";

export const CATEGORIES: Category[] = [
  "General",
  "Technical",
  "Account",
  "Billing",
  "Other",
];

export interface Discussion {
  _id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  authorId: string;
  acceptedReplyId?: string | null;
  flagged: boolean;
  promotedToFaq: boolean;
  createdAt: string;
  updatedAt: string;
  // Present only on feed list responses (server-computed).
  replyCount?: number;
  upvoteTotal?: number;
  hasAcceptedAnswer?: boolean;
}

export interface Reply {
  _id: string;
  discussionId: string;
  authorId: string;
  content: string;
  upvoteCount: number;
  upvotedBy: string[];
  approved: boolean;
  accepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionDetail extends Discussion {
  replies: Reply[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
