import NextNProgress from 'nextjs-progressbar';

import '@/assets/main.css';
import BaseLayout from '@/components/layout/Base';
import { AssertiveStoreProvider } from '@/context/assertives';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).layout || BaseLayout;

  return (
    <>
      <NextNProgress
        color='#FFCC01'
        showOnShallow={false}
        height={2}
        startPosition={0.3}
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
      />
      <AssertiveStoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AssertiveStoreProvider>
    </>
  );
}

export default MyApp;
