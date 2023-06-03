export const carCategories = ['suv', 'sedan', 'wagon'] as const;
export type CarCategory = (typeof carCategories)[number];

export type Item = {
  id: string;
  category: CarCategory;
  availability: boolean;
  brand: string;
  model: string;
  year: string;
  mileage: number;
  fuel: 'electricity' | 'petrol';
  range?: number;
  seats: number;
  bags: number;
  pricePerDay: number;
  description: string;
  imageSrc: string;
  rentalDays: number;
};

export const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS'] as const;
export type State = (typeof states)[number];

export const paymentMethods = ['credit card', 'paypal', 'applePay'] as const;
export type Payment = (typeof paymentMethods)[number];

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
