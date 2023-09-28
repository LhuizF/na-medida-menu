interface IOption {
  code: string;
  name: string;
  weight: string;
  price: string;
  priceFloat: number;
  menuId: string;
}

interface IOptionDB extends IOption {
  id: string;
}

interface FindOptionsParams {
  page?: number;
  search?: string;
  menuId?: string;
}

interface IOptionRepository {
  insertManyOption(options: IOption[]): Promise<number>;
  findOptions(params: FindOptionsParams, limit: number): Promise<IOptionDB[]>;
  countOptions(params: FindOptionsParams): Promise<number>;
}
