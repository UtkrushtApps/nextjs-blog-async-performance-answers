import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import { t } from '../utils/i18n';

const EditorComponent = dynamic(() => import('../components/BlogEditor'), {
  loading: () => <div>Loading editor...</div>,
  ssr: false,
});

const EditorContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  background: ${({ theme }) => theme.colors.bg};
  padding: 2rem;
`;

export default function EditorPage() {
  return (
    <EditorContainer>
      <h1>{t('create_post', 'Create New Post')}</h1>
      <EditorComponent />
    </EditorContainer>
  );
}
