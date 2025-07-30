import { create } from 'zustand';
import { Product } from '@/lib';

export type BasketItem = Product & { quantity: number };

export type BasketState = {
  items: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  emptyBasket: () => void;
  totalItems: () => number;
};

export const useBasketStore = create<BasketState>((set, get) => ({
    items: [],
    addToBasket: (product) => {
        const { items } = get();
        const itemInBasket = items.find((item) => item.id === product.id);

        if (itemInBasket) {
            const updatedItems = items.map((item) =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
            set({ items: updatedItems });
        } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
        }
    },
    removeFromBasket: (productId) => {
        const { items } = get();
        const itemInBasket = items.find((item) => item.id === productId);

        if (! itemInBasket) {
            return;
        }

        if (itemInBasket.quantity > 1) {
            const updatedItems = items.map((item) =>
                item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            );
            set({ items: updatedItems });
        } else {
            const updatedItems = items.filter((item) => item.id !== productId);
            set({ items: updatedItems });
        }
    },
    emptyBasket: () => {
        set({ items: [] });
    },
    totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
}));