import Link from 'next/link';
import { useState } from 'react';

import CartButton from '@/components/custom/CartButton';
import CartModal from '@/components/custom/CartModal';

import Logo from './Logo';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className='sticky top-0 z-[2] flex items-center justify-between border-b-4 border-hertz bg-white p-4 shadow'>
        <Link href='/' className='block w-max'>
          <Logo />
        </Link>
        <CartButton onClick={() => setShowModal(true)} />
      </header>

      <CartModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
