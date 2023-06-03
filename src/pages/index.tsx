import {
  Cog8ToothIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Battery100Icon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { type Item } from '@/backend/order/model';
import { useHertzStore } from '@/components/hertz-context';
import { useAssertiveStore } from '@/context/assertives';
import displayPrice from '@/utils/display-price';
import cars from 'public/cars.json';

export default function IndexPage() {
  const [showInfo, setShowInfo] = useState<number | null>(null);
  const { showModal, closeModal, showNoti } = useAssertiveStore();
  const { cartItems, setCartItems } = useHertzStore();

  const addToCart = useCallback(
    (car: Item) => {
      if (cartItems.length >= 4) {
        showModal({
          title: 'It has reached maximum number of renting cars',
          content:
            'Sorry, You cannot rent more than four cars at once. Please contact us if you would like to rent more than four cars.',
          actionButton: {
            label: 'Got it',
            onClick: closeModal,
          },
          variant: 'alert',
        });
        return;
      }
      showNoti({ title: `${car.brand} ${car.model} is added to your cart.` });
      setCartItems((prev) => [...prev, car]);
    },
    [cartItems, showModal, closeModal, setCartItems, showNoti]
  );

  return (
    <section className='mx-auto w-full max-w-7xl'>
      <h1 className='mt-4 text-2xl font-medium md:mt-6 md:text-3xl'>
        Hertz-UTS Rental Car. Let&apos;s Go!
      </h1>
      <div className='mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {(cars as Item[]).map((car, i) => (
          <div
            key={`car-${i}`}
            className='rounded-md border border-b-8 border-b-hertz px-4 pt-4 pb-2 shadow'
          >
            <div className='relative flex w-full justify-center'>
              <Image
                src={car.imageSrc}
                alt={`${car.brand}-${car.model}`}
                width={200}
                height={200}
                placeholder='blur'
                blurDataURL={car.imageSrc}
              />
              {car.fuel === 'electricity' && (
                <div className='absolute top-2 left-2 border border-green-700 bg-green-200 px-1 py-0.5 text-xs font-medium text-green-900'>
                  Electric Vehicle
                </div>
              )}
            </div>
            <div className='divide-y'>
              <div className='py-2'>
                <div className='relative flex items-center space-x-2 text-lg font-medium'>
                  <p>
                    {car.brand} {car.model}
                  </p>
                  <button className='group' onClick={() => setShowInfo(i)}>
                    <InformationCircleIcon className='h-5 w-5 group-hover:text-blue-500' />
                  </button>
                  <div
                    className={clsx(
                      'absolute left-4 top-8 z-[1] w-full max-w-xs rounded-md border bg-white p-3 text-sm text-gray-700 shadow-lg transition-opacity',
                      {
                        'opacity-100': showInfo === i,
                        'pointer-events-none opacity-0': showInfo !== i,
                      }
                    )}
                  >
                    <div className='flex w-full justify-end'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowInfo(null);
                        }}
                        className='text-gray-400 hover:text-gray-900'
                      >
                        <XMarkIcon className='h-4 w-4 stroke-2' />
                      </button>
                    </div>
                    <p>{car.description}</p>
                  </div>
                </div>
                <p className='text-gray-700'>{car.year}</p>
              </div>
              <div className='flex items-center justify-between py-2'>
                <div className='flex items-center space-x-1'>
                  <UserIcon className='h-5 w-5 text-gray-500' />
                  <span className='text-sm font-medium'>{car.seats}</span>
                </div>
                <div className='flex items-center space-x-1'>
                  <ShoppingBagIcon className='h-5 w-5 text-gray-500' />
                  <span className='text-sm font-medium'>{car.bags}</span>
                </div>
                <div className='flex items-center space-x-1'>
                  <Cog8ToothIcon className='h-5 w-5 text-gray-500' />
                  <span className='text-sm font-medium'>Auto</span>
                </div>
                {car.fuel === 'electricity' && (
                  <div className='flex items-center space-x-1'>
                    <Battery100Icon className='h-5 w-5 text-gray-500' />
                    <span className='text-sm font-medium'>
                      {car.range} km range
                    </span>
                  </div>
                )}
              </div>
              <div className='flex items-end pt-4 pb-2'>
                <div className='w-full space-x-1'>
                  <span className='text-xl font-semibold'>
                    {displayPrice(car.pricePerDay)}
                  </span>
                  <span className='text-xs text-gray-700'>/ day</span>
                </div>
                <button
                  className='font-mdeium w-full rounded-sm bg-hertz px-4 py-2 hover:opacity-80 disabled:pointer-events-none disabled:bg-gray-200 disabled:text-white'
                  disabled={!car.availability}
                  onClick={() => addToCart(car)}
                >
                  {car.availability ? 'Add to cart' : 'Not available'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
