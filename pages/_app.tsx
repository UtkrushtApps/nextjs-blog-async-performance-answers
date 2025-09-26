import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import '../styles/globals.css';

const theme = {
  colors: {
    primary: '#0070f3',
    bg: '#f9f9f9',
    text: '#222',
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  // This is where we can set up i18n context/provider if needed
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
