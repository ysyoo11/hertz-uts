import { TrashIcon } from '@heroicons/react/24/outline';
import { type Item } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import { useHertzStore } from '@/components/hertz-context';
import { useAssertiveStore } from '@/context/assertives';
import { MAX_RENTAL_DAYS } from '@/defines/policy';
import displayPrice from '@/utils/display-price';

import { ItemDetailModal } from './ItemDetailModal';

interface Props {
  className?: string;
}

export default function CartDetails({ className }: Props) {
  const [showDetail, setShowDetail] = useState<{
    show: boolean;
    car: Item | null;
  }>({ show: false, car: null });
  const { showModal } = useAssertiveStore();
  const { cartItems, setCartItems } = useHertzStore();

  return (
    <>
      <table className={clsx('w-full divide-y divide-gray-300', className)}>
        <thead>
          <tr>
            <th
              scope='col'
              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
            >
              Car Detail
            </th>
            <th
              scope='col'
              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
            >
              Rental Days
            </th>
            <th
              scope='col'
              className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
            >
              Price
            </th>
            <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0' />
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {cartItems.map((car, idx) => (
            <tr key={`${car.id}-${idx}`}>
              <td className='relative flex items-center whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:space-x-4 sm:pl-0'>
                <div className='hidden sm:block'>
                  <Image
                    src={car.imageSrc}
                    alt={`${car.brand}-${car.model}`}
                    width={96}
                    height={96}
                    blurDataURL={car.imageSrc}
                    placeholder='blur'
                  />
                </div>
                <button
                  className='flex flex-col hover:underline'
                  onClick={() => setShowDetail({ show: true, car })}
                >
                  <span>
                    {car.brand} {car.model}
                  </span>
                  <span className='text-xs text-gray-700'>({car.year})</span>
                </button>
              </td>
              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                <select
                  name='rental days'
                  id='rental days'
                  value={car.rentalDays}
                  onChange={(e) => {
                    const newCartItems = cartItems.map((elem) => {
                      if (elem.id === car.id) {
                        return {
                          ...elem,
                          rentalDays: +e.target.value,
                        };
                      }
                      return elem;
                    });
                    setCartItems(newCartItems);
                  }}
                  className='rounded-md border border-gray-400 bg-gray-100 p-1 text-xs sm:text-sm'
                >
                  {Array.from(Array(MAX_RENTAL_DAYS).keys()).map((i) => (
                    <option key={`quantity-option-${i + 1}`}>{i + 1}</option>
                  ))}
                </select>
              </td>
              <td className='whitespace-nowrap px-3 py-4 text-right text-sm font-medium text-gray-900 sm:text-base'>
                {displayPrice(car.pricePerDay * car.rentalDays)}
              </td>
              <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                <button
                  className='group'
                  onClick={() =>
                    showModal({
                      title: 'Would you like to remove the item?',
                      content: '',
                      variant: 'alert',
                      actionButton: {
                        label: 'Yes',
                        onClick: () =>
                          setCartItems((prev) =>
                            prev.filter((_, elemIdx) => elemIdx !== idx)
                          ),
                      },
                      cancelButton: {
                        label: 'No',
                      },
                    })
                  }
                >
                  <TrashIcon className='h-4 w-4 text-gray-500 group-hover:text-red-500' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ItemDetailModal
        show={showDetail.show}
        close={() => setShowDetail((prev) => ({ ...prev, show: false }))}
        car={showDetail.car}
      />
    </>
  );
}
