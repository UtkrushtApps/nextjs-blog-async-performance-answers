// Utility blog types for the app

export interface BlogPostMeta {
  slug: string;
  lang: string;
  title: string;
  date: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  author: string;
}

export type EngagementSSR = { comments: number; likes: number };
