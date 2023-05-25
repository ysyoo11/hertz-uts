import NextNProgress from 'nextjs-progressbar';

import '@/assets/main.css';
import { HertzProvider } from '@/components/hertz-context';
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
        <HertzProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HertzProvider>
      </AssertiveStoreProvider>
    </>
  );
}

export default MyApp;
