import { BlogPost, BlogPostMeta } from '../types/blog';

// Demo: simple in-memory post data (would be a database or CMS in real use)
const demoPosts: BlogPost[] = [
  {
    slug: 'introduction-next-js',
    lang: 'en',
    title: 'Introduction to Next.js',
    date: '2024-06-22',
    author: 'Alice',
    content: '<p>Next.js is a powerful React framework for production websites.</p><p>It supports SSG, SSR, API routes, and more.</p>'
  },
  {
    slug: 'introduction-next-js',
    lang: 'fr',
    title: 'Introduction à Next.js',
    date: '2024-06-22',
    author: 'Alice',
    content: '<p>Next.js est un framework React puissant pour les sites web de production.</p><p>Il supporte SSG, SSR, les routes API, etc.</p>'
  },
  {
    slug: 'async-strategies',
    lang: 'en',
    title: 'Async Rendering Strategies',
    date: '2024-06-19',
    author: 'Bob',
    content: '<p>Learn how to mix SSR, SSG, ISR and client-side rendering for best performance.</p>'
  },
  {
    slug: 'async-strategies',
    lang: 'fr',
    title: 'Stratégies de rendu asynchrone',
    date: '2024-06-19',
    author: 'Bob',
    content: '<p>Apprenez à combiner SSR, SSG, ISR et rendu côté client pour de bonnes performances.</p>'
  }
];

export async function getAllPostsMeta(lang: string): Promise<BlogPostMeta[]> {
  // In a real app, would filter database by lang
  return demoPosts.filter(p => p.lang === lang).map(post => ({
    slug: post.slug,
    lang: post.lang,
    title: post.title,
    date: post.date,
  }));
}

export async function getPostBySlug(slug: string, lang: string): Promise<BlogPost> {
  const post = demoPosts.find(
    p => p.slug === slug && p.lang === lang
  );
  if (!post) throw new Error('Post not found');
  return post;
}
