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

interface FindOptionsParams {
  page?: number;
  search?: string;
  menuId?: string;
}

interface IOptionRepository {
  insertManyOption(options: IOption[]): Promise<number>;
  findOptions(params: FindOptionsParams): Promise<OptionDB[]>;
  countOptions(params: FindOptionsParams): Promise<number>;
}
