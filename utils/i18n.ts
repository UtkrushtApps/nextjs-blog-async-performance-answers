// Simple demo: can be replaced with next-i18n or react-intl
export const languages = ['en', 'fr'] as const;
export type Lang = typeof languages[number];

const messages = {
  en: {
    blog: 'Tech Blog',
    create_post: 'Create New Post',
    loading: 'Loading...',
    published_on: 'Published on',
    author: 'Author',
    comments: 'Comments',
    likes: 'Likes',
    title: 'Title',
    content: 'Content',
    save: 'Save',
    saving: 'Saving...',
    editor_success: 'Saved! (Demo only, not really persisted)',
    editor_error: 'Failed to save, try again',
  },
  fr: {
    blog: 'Blog Technique',
    create_post: 'Créer un article',
    loading: 'Chargement...',
    published_on: 'Publié le',
    author: 'Auteur',
    comments: 'Commentaires',
    likes: 'Likes',
    title: 'Titre',
    content: 'Contenu',
    save: 'Sauvegarder',
    saving: 'Sauvegarde...',
    editor_success: 'Enregistré ! (Démo, rien n\'est vraiment persisté)',
    editor_error: 'Échec de l\'enregistrement, réessayez',
  }
} as const;

export function t(key: keyof typeof messages['en'], fallback: string, lang: Lang = 'en') {
  // Try to detect lang from browser; fallback to 'en' if not found.
  try {
    if (typeof window !== 'undefined') {
      // e.g. window.navigator.language?
      const nlang = (window.navigator.language || '').slice(0, 2) as Lang;
      if (languages.includes(nlang)) lang = nlang;
    }
  } catch {}
  return messages[lang]?.[key] || fallback;
}
