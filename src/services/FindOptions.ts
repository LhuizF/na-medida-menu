export class FindOptions {
  private readonly limit = 20;
  constructor(
    private readonly menuRepository: IMenuRepository,
    private readonly optionRepository: IOptionRepository,
  ) { }

  async handle({ page, search, menuId }: FindOptionsParams) {
    if (menuId) {
      const menu = await this.menuRepository.getMenuById(menuId);

      if (!menu) {
        throw new Error("Menu not found");
      }
    }

    const params: FindOptionsParams = {
      page,
      search,
      menuId,
    };

    const options = await this.optionRepository.findOptions(params, this.limit);

    const totalOptions = await this.optionRepository.countOptions(params);

    return {
      totalPages: Math.ceil(totalOptions / this.limit),
      totalOptions,
      options,
    };
  }
}
