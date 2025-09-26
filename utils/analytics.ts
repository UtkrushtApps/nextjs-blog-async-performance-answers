// Mocks background analytics submission
export async function postAnalytics({ slug, lang }: { slug: string; lang: string }) {
  // Do not block page load!
  if (typeof window !== 'undefined') {
    (async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          body: JSON.stringify({
            slug,
            lang,
            time: Date.now(),
          }),
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        // Ignore analytics error (background)
      }
    })();
  }
}
