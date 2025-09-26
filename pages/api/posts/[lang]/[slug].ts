import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostBySlug } from '../../../../utils/posts';
import { BlogPost } from '../../../../types/blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogPost | { error: string }>) {
  const { slug, lang } = req.query as { slug: string; lang: string };
  if (!slug || !lang) {
    res.status(400).json({ error: 'Missing slug/lang' });
    return;
  }
  try {
    const post = await getPostBySlug(slug, lang);
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
  }
}
