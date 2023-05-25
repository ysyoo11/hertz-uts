import { ReactNode } from 'react';

import Header from '@/components/core/Header';

interface Props {
  children: ReactNode;
}

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className='py-2 px-4'>{children}</main>
    </>
  );
}
