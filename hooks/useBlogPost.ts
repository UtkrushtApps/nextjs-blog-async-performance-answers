import useSWR from 'swr';
import { BlogPost } from '../types/blog';
import { fetcher } from '../utils/fetcher';
import { useMemo } from 'react';

// Transform API response with mapped/utility/conditional types

type ApiResp = {
  slug: string;
  lang: string;
  title: string;
  content: string;
  date: string;
  author: string;
};

// All string fields -> readonly except content is mutable

type MapResponse<T> = {
  readonly [K in keyof T as (K extends 'content' ? never : K)]: T[K];
} & { content: T['content'] };

export type UseBlogPostResponse = {
  data?: MapResponse<ApiResp>;
  error?: Error;
  isLoading: boolean;
};

// Fetch/caches post client-side (useful for preview or editing screens)
export function useBlogPost(slug: string, lang: string): UseBlogPostResponse {
  const { data, error, isLoading } = useSWR<BlogPost>(
    slug && lang ? `/api/posts/${lang}/${slug}` : null,
    fetcher, { revalidateOnFocus: false }
  );

  // Demonstrate useMemo to avoid extra re-renders
  const mapped = useMemo(() => {
    if (!data) return undefined;
    const { slug, lang, title, content, date, author } = data;
    return { slug, lang, title, author, date, content } as MapResponse<ApiResp>;
  }, [data]);

  return { data: mapped, error, isLoading };
}
