"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart";
import { Send } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

export const TabBar: React.FC = () => {
  const [sendTotal, setSendTotal] = useState(true);
  const { getTotalItems, getTotalPrice, items } = useCart();

  if (items.length === 0) return <></>;

  const sendOrder = () => {
    const url = "https://api.whatsapp.com/send";

    const order = items.map(({ code, amount }) => {
      if (amount > 1) {
        return `${code} x${amount}`;
      }

      return code;
    });

    if (sendTotal) {
      const total = getTotalPrice();
      order.push(`Total: R$${total}`);
    }

    const text = `Olá, gostaria de fazer o pedido:\n${order.join("\n")}`;
    const link = `${url}?text=${encodeURIComponent(text)}`;

    window.open(link, "_blank");
  };

  return (
    <div className="bg-slate-600 sticky bottom-0 w-full h-12 px-4 flex items-center justify-between drop-shadow-[0_-3px_3px_rgba(0,0,0,0.50)]">
      <div className="flex gap-2 items-center">
        <button
          onClick={sendOrder}
          className="flex items-center justify-center bg-green-500 rounded-full w-8 h-8"
        >
          <Send className="text-white" fontSize="small" />
        </button>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              color="default"
              defaultChecked={sendTotal}
              onChange={({ target }) => {
                setSendTotal(target.checked);
              }}
            />
          }
          label="Enviar total"
        />
      </div>
      <div className="flex gap-1">
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
