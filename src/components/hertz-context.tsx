import {
  Dispatch,
  ReactNode,
  Reducer,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { type Item } from '@/backend/order/model';
import { SAVED_CART_ITEMS } from '@/constant/session-storage-key';

export type HertzState = {
  cartItems: Item[];
};

const initialState: HertzState = {
  cartItems: [],
};

type HertzAction = { type: 'SET_CART_ITEMS'; cartItems: Item[] };

export const HertzContext = createContext<HertzState>(initialState);

const hertzReducer: Reducer<HertzState, HertzAction> = (state, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.cartItems };
  }
};

type HertzStore = HertzState & {
  setCartItems: Dispatch<SetStateAction<Item[]>>;
  totalPrice: number;
};

export function HertzProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(hertzReducer, initialState);
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const totalPrice = useMemo(() => {
    const priceArray = cartItems.map((car) => car.pricePerDay * car.rentalDays);
    return priceArray.reduce((partialSum, a) => partialSum + a, 0);
  }, [cartItems]);

  useEffect(() => {
    const savedData = window.sessionStorage.getItem(SAVED_CART_ITEMS);
    if (savedData) {
      const parsedData = JSON.parse(savedData) as Array<Item>;
      const parsedItems = parsedData.map((item) => ({
        ...item,
        rentalDays: +item.rentalDays,
        mileage: +item.mileage,
        seats: +item.seats,
        bags: +item.bags,
        pricePerDay: +item.pricePerDay,
        range: item.range ? +item.range : undefined,
      }));
      setCartItems(parsedItems);
      return;
    }
    setCartItems([]);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(SAVED_CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo<HertzStore>(
    () => ({
      ...state,
      cartItems,
      setCartItems,
      totalPrice,
    }),
    [state, cartItems, totalPrice]
  );

  return (
    <HertzContext.Provider value={value}>{children}</HertzContext.Provider>
  );
}

export const useHertzStore = () => {
  const context = useContext(HertzContext);

  if (context === undefined) {
    throw new Error('useHertzStore must be used within HertzProvider.');
  }

  return context as HertzStore;
};
