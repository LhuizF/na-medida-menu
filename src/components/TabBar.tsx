"use client";
import { useCart } from "@/contexts/cart";

export const TabBar: React.FC = () => {
  const { getTotalItems, getTotalPrice, items } = useCart();

  if (items.length === 0) return <></>;

  return (
    <div className="bg-slate-600 sticky bottom-0 w-full h-12 px-4 flex items-center justify-end drop-shadow-[0_-3px_3px_rgba(0,0,0,0.50)]">
      <div className="flex gap-1  items-end">
        <p className="text-base font-semibold">Total: R${getTotalPrice()}</p>
        <div>
          <span className="text-xs">
            {getTotalItems()}/{getTotalItems() === 1 ? "item" : "items"}
          </span>
        </div>
      </div>
    </div>
  );
};
