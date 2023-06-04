import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CustomerInfo, paymentMethods, states } from '@/backend/order/model';
import CartDetails from '@/components/custom/CartDetails';
import { useHertzStore } from '@/components/hertz-context';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown';
import Input from '@/components/ui/Input';
import { useAssertiveStore } from '@/context/assertives';
import submitOrder from '@/lib/submit-order';
import displayPrice from '@/utils/display-price';

const paymentArr = paymentMethods.map((p) => ({
  label: p.charAt(0).toUpperCase() + p.slice(1),
  value: p,
}));

const initialCustomerInfo: CustomerInfo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  postcode: '',
  state: 'NSW',
  email: '',
  phone: '',
  payment: 'credit',
};

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(initialCustomerInfo);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const router = useRouter();
  const { showAlert, showNoti } = useAssertiveStore();
  const { cartItems, setCartItems, totalPrice } = useHertzStore();

  const stateDropdownItems: DropdownItem[] = useMemo(
    () =>
      states.map((state) => ({
        label: state,
        onClick: () => {
          setCustomerInfo((prev) => ({ ...prev, state }));
        },
        current: customerInfo.state === state,
      })),
    [customerInfo.state]
  );

  const paymentDropdownItems: DropdownItem[] = useMemo(
    () =>
      paymentArr.map(({ label, value }) => ({
        label,
        onClick: () => setCustomerInfo((prev) => ({ ...prev, payment: value })),
        current: customerInfo.payment === value,
      })),
    [customerInfo.payment]
  );

  const debouncedSetCustomerInfo = useMemo(
    () =>
      debounce(
        (value: string, key: keyof CustomerInfo) =>
          setCustomerInfo((prev) => ({ ...prev, [key]: value })),
        200
      ),
    []
  );

  const confirmOrder = useCallback(async () => {
    setLoading(true);
    await submitOrder({ customerInfo, items: cartItems })
      .then(({ id }) => {
        showNoti({ title: 'Order placed!' });
        setCartItems([]);
        setConfirmedOrderId(id);
      })
      .catch((e) => {
        const { code, message } = JSON.parse(e)[0];
        showAlert({ name: `Code: ${code}`, message: message });
      })
      .finally(() => setLoading(false));
  }, [cartItems, setCartItems, customerInfo, showAlert, showNoti]);

  useEffect(() => {
    if (cartItems.length < 1 && !confirmedOrderId) {
      router.push('/');
    }
  }, [cartItems.length, confirmedOrderId, router]);

  if (confirmedOrderId) {
    return (
      <div className='mx-auto w-full max-w-3xl pb-36'>
        <h1 className='mt-8 text-4xl font-semibold'>Thank you!</h1>
        <p className='mt-12'>
          Your order is now confirmed!
          <br />
          Your order number is&nbsp;
          <span className='font-medium text-orange-500'>
            {confirmedOrderId}
          </span>
          .
        </p>
        <button
          className='group mt-12 flex items-center space-x-3 text-lg font-medium hover:underline'
          onClick={() => router.push('/')}
        >
          <span>Go back to home</span>
          <ArrowRightIcon className='h-5 w-5 transition-transform group-hover:translate-x-1.5' />
        </button>
      </div>
    );
  }

  return (
    <div className='mx-auto w-full max-w-3xl pb-36'>
      <h1 className='mt-8 text-4xl font-semibold'>Check out</h1>
      <section className='mt-12'>
        <h2 className='text-3xl font-semibold'>Order details</h2>
        <div className='my-4 h-1 w-full bg-hertz' />
        <CartDetails />
        <div className='mb-4 h-[1px] w-full bg-gray-300' />
        <p className='text-right text-2xl font-medium'>
          <span className='mr-4 text-xl'>Total</span>
          {displayPrice(totalPrice)}
        </p>
      </section>
      <section className='mt-12'>
        <h2 className='text-3xl font-semibold'>Customer Details and Payment</h2>
        <div className='my-4 h-1 w-full bg-hertz' />
        <form
          action='submit'
          className='space-y-1.5'
          onSubmit={(e) => {
            e.preventDefault();
            confirmOrder();
          }}
        >
          <div className='flex w-full space-x-4'>
            <Input
              onChange={(e) =>
                debouncedSetCustomerInfo(e.target.value, 'firstName')
              }
              label='First name'
              aria-label='First name'
              className='w-full'
              placeholder='John'
              disabled={loading}
            />
            <Input
              onChange={(e) =>
                debouncedSetCustomerInfo(e.target.value, 'lastName')
              }
              label='Last name'
              aria-label='Last name'
              className='w-full'
              placeholder='Doe'
              disabled={loading}
            />
          </div>
          <Input
            onChange={(e) => debouncedSetCustomerInfo(e.target.value, 'email')}
            label='Email'
            aria-label='Email'
            placeholder='hertz-uts@uts.edu.au'
            type='email'
            disabled={loading}
          />
          <Input
            onChange={(e) =>
              debouncedSetCustomerInfo(e.target.value, 'address1')
            }
            label='Address Line 1'
            aria-label='Address Line 1'
            disabled={loading}
          />
          <Input
            onChange={(e) =>
              debouncedSetCustomerInfo(e.target.value, 'address2')
            }
            label='Address Line 2'
            aria-label='Address Line 2'
            optional
            disabled={loading}
          />
          <div className='flex w-full space-x-4'>
            <Input
              onChange={(e) => debouncedSetCustomerInfo(e.target.value, 'city')}
              label='City'
              aria-label='City'
              className='w-full'
              disabled={loading}
            />
            <Dropdown
              label='State'
              buttonClassName='w-full'
              className='w-full'
              menuClassName='w-full'
              dropdownItems={stateDropdownItems}
              dropdownButton={
                <div className='flex w-full items-center justify-between'>
                  <p>{customerInfo.state}</p>
                  <ChevronDownIcon className='h-4 w-4' />
                </div>
              }
            />
          </div>
          <Input
            onChange={(e) =>
              debouncedSetCustomerInfo(e.target.value, 'postcode')
            }
            label='Postcode'
            aria-label='Postcode'
            disabled={loading}
          />
          <Input
            onChange={(e) => debouncedSetCustomerInfo(e.target.value, 'phone')}
            label='Phone'
            aria-label='Phone'
            type='tel'
            disabled={loading}
          />
          <Dropdown
            label='Payment type'
            buttonClassName='w-full'
            className='w-full'
            menuClassName='w-full'
            dropdownItems={paymentDropdownItems}
            dropdownButton={
              <div className='flex w-full items-center justify-between'>
                <p>
                  {
                    paymentArr.find((p) => p.value === customerInfo.payment)!
                      .label
                  }
                </p>
                <ChevronDownIcon className='h-4 w-4' />
              </div>
            }
          />
          <button
            className='!mt-6 w-full rounded-md bg-hertz py-3 hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white'
            disabled={cartItems.length < 1 || loading}
            onClick={confirmOrder}
          >
            Place Order
          </button>
        </form>
      </section>
    </div>
  );
}
