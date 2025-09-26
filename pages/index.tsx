import Link from 'next/link';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import { getAllPostsMeta } from '../utils/posts';
import { languages, t } from '../utils/i18n';
import { BlogPostMeta } from '../types/blog';

const IndexContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.bg};
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

interface HomeProps {
  postsByLang: Record<string, BlogPostMeta[]>;
}

export default function Home({ postsByLang }: HomeProps) {
  return (
    <IndexContainer>
      <h1>{t('blog', 'Tech Blog')}</h1>
      {languages.map((lang) => (
        <section key={lang}>
          <h2>Language: {lang.toUpperCase()}</h2>
          <ul>
            {postsByLang[lang].map((post) => (
              <li key={post.slug}>
                <Link href={`/${lang}/posts/${post.slug}`}>{post.title}</Link> - {new Date(post.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Link href="/editor">
        <a style={{ marginTop: '2rem', display: 'block' }}>{t('create_post', 'Create New Post')}</a>
      </Link>
    </IndexContainer>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const postsByLang: Record<string, BlogPostMeta[]> = {};
  for (const lang of languages) {
    postsByLang[lang] = await getAllPostsMeta(lang);
  }
  return {
    props: { postsByLang },
  };
};
