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

import { SAVED_CART_ITEMS } from '@/constant/session-storage-key';

export type Item = {
  id: string;
  category: 'suv' | 'sedan' | 'wagon';
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
};

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
  total: number;
};

export function HertzProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(hertzReducer, initialState);
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const total = cartItems.length;

  const value = useMemo<HertzStore>(
    () => ({
      ...state,
      cartItems,
      setCartItems,
      total,
    }),
    [state, cartItems, total]
  );

  useEffect(() => {
    const savedData = sessionStorage.getItem(SAVED_CART_ITEMS);
    if (!savedData) return;
    setCartItems(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(SAVED_CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

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
