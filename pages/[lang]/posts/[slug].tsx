import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { getAllPostsMeta, getPostBySlug } from '../../../utils/posts';
import { fetchEngagement } from '../../../utils/engagement';
import { postAnalytics } from '../../../utils/analytics';
import { BlogPost, BlogPostMeta, EngagementSSR } from '../../../types/blog';
import { languages, t } from '../../../utils/i18n';

const PostContainer = styled.div`
  max-width: 700px;
  margin: 3rem auto 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  padding: 2rem 2rem;
  color: ${({ theme }) => theme.colors.text};
`;
const MetaInfo = styled.div`
  font-size: 0.85em;
  color: #666;
  margin-bottom: 1.5em;
`;

interface PostPageProps {
  post: BlogPost;
  engagement: EngagementSSR;
}

export default function PostPage({ post, engagement }: PostPageProps) {
  const router = useRouter();
  useEffect(() => {
    // analytic submission - non-blocking
    postAnalytics({ slug: post.slug, lang: post.lang });
  }, [post.slug, post.lang]);

  if (router.isFallback) {
    return <PostContainer>{t('loading', 'Loading...')}</PostContainer>;
  }
  return (
    <PostContainer>
      <h1>{post.title}</h1>
      <MetaInfo>
        {t('published_on', 'Published on')} {new Date(post.date).toLocaleDateString()} | <b>{t('author', 'Author')}</b>: {post.author}
      </MetaInfo>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
      <hr />
      <MetaInfo>
        {t('comments', 'Comments')}: {engagement.comments} | 
        {t('likes', 'Likes')}: {engagement.likes}
      </MetaInfo>
    </PostContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { slug: string; lang: string } }[] = [];
  for (const lang of languages) {
    const posts = await getAllPostsMeta(lang);
    paths = paths.concat(
      posts.map((p) => ({ params: { slug: p.slug, lang } }))
    );
  }
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (ctx) => {
  const { slug, lang } = ctx.params as { slug: string; lang: string };
  try {
    const post = await getPostBySlug(slug, lang);
    // SSR for engagement (must be up to date)
    const engagement = await fetchEngagement(slug, lang);
    return {
      props: {
        post,
        engagement,
      },
      revalidate: 10, // ISR for freshness
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
