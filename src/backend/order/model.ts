import { Item, Payment, State } from '@prisma/client';

export const carCategories = ['suv', 'sedan', 'wagon'] as const;

export const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS'] as const;

export const paymentMethods = ['credit', 'paypal', 'applePay'] as const;

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  state: State;
  email: string;
  phone: string;
  payment: Payment;
};

export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  items: Item[];
  createdAt: Date;
}

export type PostOrder = Omit<Order, 'id' | 'createdAt'>;

export type PostOrderResponse = Pick<Order, 'id'>;
