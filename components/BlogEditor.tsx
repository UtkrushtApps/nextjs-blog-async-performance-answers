import React, { useState } from 'react';
import styled from 'styled-components';
import { t } from '../utils/i18n';

const Label = styled.label`
  display: block;
  margin: 1em 0 0.4em 0;
`;
const Input = styled.input`
  padding: 0.3em;
  width: 100%;
`;
const TextArea = styled.textarea`
  min-height: 120px;
  width: 100%;
  padding: 0.5em;
`;
const Button = styled.button`
  margin-top: 1.5em;
  padding: 0.5em 2em;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
`;

const Msg = styled.div`
  margin: 1em 0;
  font-weight: bold;
  color: #008800;
`;

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 800));
      setMsg(t('editor_success', 'Saved! (Demo only, not really persisted)'));
      setTitle('');
      setContent('');
    } catch (e) {
      setMsg(t('editor_error', 'Failed to save, try again'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Label>
        {t('title', 'Title')}
        <Input value={title} onChange={e => setTitle(e.target.value)} required minLength={4} />
      </Label>
      <Label>
        {t('content', 'Content')}
        <TextArea value={content} onChange={e => setContent(e.target.value)} required minLength={12} />
      </Label>
      <Button type="submit" disabled={loading}>{loading ? t('saving', 'Saving...') : t('save', 'Save')}</Button>
      {msg && <Msg>{msg}</Msg>}
    </form>
  );
}
