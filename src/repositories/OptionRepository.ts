import prisma from "@/libs/prisma";
import { sensitiveRegex } from "@/utils";

export class OptionRepository implements IOptionRepository {
  async insertManyOption(options: IOption[]): Promise<number> {
    const optionsCreated = await prisma.option.createMany({
      data: options,
    });

    return optionsCreated.count;
  }

  async findOptions({
    page,
    search,
    menuId,
  }: FindOptionsParams): Promise<IOptionDB[]> {
    const limit = 20;
    const currentPage = page || 1;

    // const options = await prisma.option.findMany({
    //   where: {
    //     name: { mode: "insensitive", contains: search },
    //     menuId,
    //   },
    //   take: limit,
    //   skip: (currentPage - 1) * limit,
    // });

    const optionsRows: any = await prisma.option.findRaw({
      filter: this.createOptionFilter(search, menuId),
      options: {
        limit,
        skip: (currentPage - 1) * limit,
      },
    });

    const options: IOptionDB[] = optionsRows.map((option: any) => ({
      id: option._id.$oid,
      code: option.code,
      name: option.name,
      weight: option.weight,
      price: option.price,
      priceFloat: option.priceFloat,
      menuId: option.menuId.$oid,
    }));

    return options;
  }

  async countOptions(params: FindOptionsParams): Promise<number> {
    const totalOptions: any = await prisma.option.findRaw({
      filter: this.createOptionFilter(params.search, params.menuId),
    });

    return totalOptions?.length || 0;
  }

  private createOptionFilter(search?: string, menuId?: string) {
    const filter = {
      name: { $regex: sensitiveRegex(search), $options: "i" },
      menuId: menuId ? { $oid: menuId } : undefined,
    };

    return filter;
  }
}

/**
 * $queryRaw`
    db.User.find({ name: { $regex: new RegExp(${removeAccents(name), 'i'}) } });
  `
 */
