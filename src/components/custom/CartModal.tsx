import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import { validateItems } from '@/backend/item/validation';
import { Item, useHertzStore } from '@/components/hertz-context';
import { useAssertiveStore } from '@/context/assertives';
import { MAX_RENTAL_DAYS } from '@/defines/policy';
import displayPrice from '@/utils/display-price';

import { ItemDetailModal } from './ItemDetailModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: Props) {
  const [showDetail, setShowDetail] = useState<{
    show: boolean;
    car: Item | null;
  }>({ show: false, car: null });
  const { showModal, showAlert } = useAssertiveStore();
  const router = useRouter();

  const { cartItems, setCartItems, totalPrice } = useHertzStore();

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[3]' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/30' />
          </Transition.Child>
          <div className='fixed inset-0 flex justify-end overflow-visible'>
            <div className='flex min-h-full w-full items-center justify-center md:max-w-xl'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300 transition transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='ease-in-out duration-200 transition transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='flex h-screen w-full transform flex-col bg-white text-left align-middle shadow-xl transition-all'>
                  <div className='relative flex h-full flex-col overflow-y-auto'>
                    <div className='sticky top-0 z-[1] flex h-max items-center justify-between border-b bg-white p-6'>
                      <Dialog.Title as='div' className='text-2xl font-semibold'>
                        <h3>Cart</h3>
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className='rounded-full border border-transparent p-1.5 text-black hover:border-gray-700 hover:bg-gray-100'
                      >
                        <XMarkIcon className='h-5 w-5' />
                      </button>
                    </div>

                    <>
                      {cartItems.length > 0 ? (
                        <>
                          <div className='flow-root h-full overflow-y-auto overflow-x-hidden p-6'>
                            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                              <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                                <table className='w-full divide-y divide-gray-300'>
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
                                      <th
                                        scope='col'
                                        className='relative py-3.5 pl-3 pr-4 sm:pr-0'
                                      />
                                    </tr>
                                  </thead>
                                  <tbody className='divide-y divide-gray-200'>
                                    {cartItems.map((car) => (
                                      <tr key={car.id}>
                                        <td className='relative flex items-center whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:space-x-4 sm:pl-0'>
                                          <div className='hidden sm:block'>
                                            <Image
                                              src={car.imageSrc}
                                              alt={`${car.brand}-${car.model}`}
                                              width={96}
                                              height={96}
                                            />
                                          </div>
                                          <button
                                            className='flex flex-col hover:underline'
                                            onClick={() =>
                                              setShowDetail({ show: true, car })
                                            }
                                          >
                                            <span>
                                              {car.brand} {car.model}
                                            </span>
                                            <span className='text-xs text-gray-700'>
                                              ({car.year})
                                            </span>
                                          </button>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                          <select
                                            name='rental days'
                                            id='rental days'
                                            value={car.rentalDays}
                                            onChange={(e) => {
                                              const newCartItems =
                                                cartItems.map((elem) => {
                                                  if (elem.id === car.id) {
                                                    return {
                                                      ...elem,
                                                      rentalDays:
                                                        +e.target.value,
                                                    };
                                                  }
                                                  return elem;
                                                });
                                              setCartItems(newCartItems);
                                            }}
                                            className='rounded-md border border-gray-400 bg-gray-100 p-1 text-xs sm:text-sm'
                                          >
                                            {Array.from(
                                              Array(MAX_RENTAL_DAYS).keys()
                                            ).map((i) => (
                                              <option
                                                key={`quantity-option-${i + 1}`}
                                              >
                                                {i + 1}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-right text-sm font-medium text-gray-900 sm:text-base'>
                                          {displayPrice(
                                            car.pricePerDay * car.rentalDays
                                          )}
                                        </td>
                                        <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                                          <button
                                            className='group'
                                            onClick={() =>
                                              showModal({
                                                title:
                                                  'Would you like to remove the item?',
                                                content: '',
                                                variant: 'alert',
                                                actionButton: {
                                                  label: 'Yes',
                                                  onClick: () =>
                                                    setCartItems((prev) =>
                                                      prev.filter(
                                                        (elem) =>
                                                          elem.id !== car.id
                                                      )
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
                              </div>
                            </div>
                          </div>
                          <div className='flex w-full justify-center py-6'>
                            <button
                              className='flex items-center space-x-1.5 text-red-500 hover:underline'
                              onClick={() =>
                                showModal({
                                  title:
                                    'Would you like to remove every item from the cart?',
                                  content: '',
                                  variant: 'alert',
                                  actionButton: {
                                    label: 'Yes',
                                    onClick: () => setCartItems([]),
                                  },
                                  cancelButton: {
                                    label: 'No',
                                  },
                                })
                              }
                            >
                              <TrashIcon className='h-6 w-6 stroke-2' />
                              <span className='text-sm font-medium'>
                                Remove all items
                              </span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className='flex h-96 w-full items-center justify-center'>
                          <p className='md:text-lg'>Your cart is empty</p>
                        </div>
                      )}
                    </>
                  </div>
                  <div>
                    <div className='flex justify-between px-6 py-4'>
                      <div className='space-y-1'>
                        <span className='text-xl font-semibold'>Total</span>
                        <p className='text-xs text-gray-500'>
                          Excludes service and bagging fees
                        </p>
                      </div>
                      <span className='text-xl font-semibold'>
                        {displayPrice(totalPrice)}
                      </span>
                    </div>
                    <div className='px-6 pb-4'>
                      <button
                        className='w-full rounded-md bg-hertz py-3 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white'
                        disabled={cartItems.length < 1}
                        onClick={async () => {
                          await validateItems(cartItems)
                            .then(() => {
                              onClose();
                              router.push('/checkout');
                            })
                            .catch(showAlert);
                        }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ItemDetailModal
        show={showDetail.show}
        close={() => setShowDetail((prev) => ({ ...prev, show: false }))}
        car={showDetail.car}
      />
    </>
  );
}
