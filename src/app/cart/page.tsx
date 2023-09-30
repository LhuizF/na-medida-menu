"use client";

import { useCart } from "@/contexts/cart";
import { ListOptions } from "@/components/ListOptions";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function Cart() {
  const { items } = useCart();
  return (
    <div className="flex flex-col min-h-screen bg-secondary p-5 relative ">
      <div className="text-black font-semibold text-xl text-center mb-3">
        Meu carrinho
      </div>
      <div className="flex justify-center mb-3 absolute">
        <Link href="/">
          <ArrowBack color="primary" />
        </Link>
      </div>

      {items.length > 0 ? (
        <ListOptions options={items} />
      ) : (
        <div>
          <div className="text-primary font-bold text-2xl text-center my-7">
            Seu carrinho está vazio
          </div>
          <div className="flex justify-center">
            <Link href="/">
              <div className="text-white font-semibold bg-primary w-fit px-8 py-2 rounded-lg">
                Menu
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
