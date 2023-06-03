import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useRef } from 'react';

import displayPrice from '@/utils/display-price';

import type { Item } from '@/backend/order/model';

interface Props {
  show: boolean;
  close: () => void;
  car: Item | null;
}

const notToShow = [
  'id',
  'availability',
  'description',
  'imageSrc',
  'rentalDays',
  'pricePerDay',
] as Array<keyof Item>;

export function ItemDetailModal({ show, close, car }: Props) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 z-30 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={show}
        onClose={close}
      >
        <div className='flex min-h-screen items-center justify-center pt-32 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500/40 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='relative mx-4 inline-block w-full overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
              <button
                ref={cancelButtonRef}
                onClick={close}
                className='group absolute right-4 top-4'
              >
                <XMarkIcon className='h-6 w-6 text-gray-400 group-hover:text-gray-800' />
              </button>
              {car && (
                <div className='flex w-full flex-col items-center'>
                  <Image
                    src={car.imageSrc}
                    blurDataURL={car.imageSrc}
                    placeholder='blur'
                    alt={`${car.brand}-${car.model}`}
                    width={280}
                    height={280}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <div>
                    <p className='text-sm'>{car.description}</p>
                    <ul className='mt-2 grid grid-cols-2'>
                      {(
                        Object.entries(car) as Array<
                          [keyof Item, string | number | boolean]
                        >
                      ).map(([key, value], idx) =>
                        notToShow.includes(key) ? null : (
                          <li key={`car-detail-${idx}`}>
                            <strong>
                              {(key.charAt(0).toUpperCase() + key.slice(1))
                                .replace(/([A-Z])/g, ' $1')
                                .trim()}
                              :&nbsp;
                            </strong>
                            <span>
                              {key === 'range' ? `${value} km` : value}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                    <p className='text-right'>
                      <span className='text-lg font-medium'>
                        {displayPrice(car.pricePerDay)}
                      </span>
                      <span className='text-xs text-gray-500'>&nbsp;/ day</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
