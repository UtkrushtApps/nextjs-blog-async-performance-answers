// Fetches dynamic counts for comments/likes for SSR
import { EngagementSSR } from '../types/blog';

// Emulate fast SSR fetch (in real app, fetch from DB/cache)
export async function fetchEngagement(
  slug: string,
  lang: string
): Promise<EngagementSSR> {
  // For demo, make counts deterministic
  const comments = (slug.length + lang.length) % 10 + 7;
  const likes = (slug.charCodeAt(0) * lang.charCodeAt(0)) % 100 + 17;
  await new Promise((res) => setTimeout(res, 80 + Math.random() * 80));
  return { comments, likes };
}
