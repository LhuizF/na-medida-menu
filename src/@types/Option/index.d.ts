interface IOption {
  code: string;
  name: string;
  weight: string;
  price: string;
  priceFloat: number;
  menuId: string;
}

interface OptionDB extends IOption {
  id: string;
}
