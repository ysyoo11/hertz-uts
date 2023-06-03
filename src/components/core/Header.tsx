import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CartButton from '@/components/custom/CartButton';
import CartModal from '@/components/custom/CartModal';

import Logo from './Logo';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className='sticky top-0 z-[2] flex h-16 items-center justify-between border-b-4 border-hertz bg-white px-4 shadow'>
        <Link href='/' className='block w-max'>
          <Logo />
        </Link>
        {router.asPath !== '/checkout' && (
          <CartButton onClick={() => setShowModal(true)} />
        )}
      </header>

      <CartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
