"use client";

import { ButtonGroup, IconButton } from "@mui/material";
import { Remove, Add, DeleteForever } from "@mui/icons-material";
import { useCart } from "@/contexts/cart";

interface Props {
  options: IOptionDB[];
  totalOptions?: number;
}

export const ListOptions: React.FC<Props> = ({ options, totalOptions }) => {
  const { addItem, removeItem, getItemAmount } = useCart();

  return (
    <div className="flex flex-col gap-4">
      {totalOptions && (
        <div className="flex justify-between text-black">
          <p className="text-black text-lg font-semibold">Opções</p>
          {totalOptions}
        </div>
      )}
      {options.map((option) => {
        const totalItem = getItemAmount(option.id);

        return (
          <div
            key={option.id}
            className="bg-white p-2 rounded-md font-semibold drop-shadow-md"
          >
            <div>
              <div>
                <p className="text-black">{option.name}</p>
                <div className="flex">
                  <p className="text-xs text-gray-600">
                    {option.code} {option.weight}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-green-400">R$ {option.price}</p>
                <ButtonGroup size="small" variant="contained">
                  {totalItem > 0 && (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => removeItem(option.id)}
                      >
                        {totalItem === 1 ? (
                          <DeleteForever color="primary" />
                        ) : (
                          <Remove color="primary" />
                        )}
                      </IconButton>
                      <div className="p-[5px]">
                        <div className="text-black text-base w-6 h-6 text-center">
                          {totalItem}
                        </div>
                      </div>
                    </>
                  )}
                  <IconButton size="small" onClick={() => addItem(option)}>
                    <Add color="primary" />
                  </IconButton>
                </ButtonGroup>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
