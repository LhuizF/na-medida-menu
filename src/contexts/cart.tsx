"use client";
import { useContext, createContext, useState } from "react";

interface IItem extends IOptionDB {
  amount: number;
}

interface CartContextType {
  items: IItem[];
  addItem: (item: IOptionDB) => void;
  removeItem: (id: string) => void;
  getTotalItems: () => number;
  clearCart: () => void;
  getTotalPrice: () => string;
  getItemAmount: (id: string) => number;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<IItem[]>([]);

  const addItem = (item: IOptionDB) => {
    const itemIndex = items.findIndex((i) => i.id === item.id);
    if (itemIndex === -1) {
      setItems([...items, { ...item, amount: 1 }]);
      return;
    }

    const newItems = [...items];
    newItems[itemIndex].amount += 1;
    setItems(newItems);
  };

  const removeItem = (id: string) => {
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) return;

    const newItems = [...items];
    newItems[itemIndex].amount -= 1;
    if (newItems[itemIndex].amount === 0) {
      newItems.splice(itemIndex, 1);
    }
    setItems(newItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    const total = items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);

    return total;
  };

  const getTotalPrice = () => {
    const total = items.reduce((acc, item) => {
      return acc + item.priceFloat * item.amount;
    }, 0);

    const totalString = total.toFixed(2).replace(".", ",");

    return totalString;
  };

  const getItemAmount = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (!item) return 0;

    return item.amount;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        getTotalItems,
        clearCart,
        getTotalPrice,
        getItemAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("CartContext error");
  }
  return context;
};
