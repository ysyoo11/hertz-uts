import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { useHertzStore } from '@/components/hertz-context';

interface Props {
  onClick: () => void;
}

export default function CartButton({ onClick }: Props) {
  const { cartItems } = useHertzStore();

  return (
    <button
      className='relative flex w-max flex-col items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100'
      onClick={onClick}
    >
      <ShoppingCartIcon className='h-6 w-6' />
      <div
        className={clsx(
          'absolute right-0 -top-1 h-5 w-5 rounded-full bg-red-500 text-white',
          {
            hidden: cartItems.length < 1,
          }
        )}
      >
        <span className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-xs'>
          {cartItems.length}
        </span>
      </div>
    </button>
  );
}
