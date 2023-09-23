export class InsertManyOptions {
  constructor(
    private readonly menuRepository: IMenuRepository,
    private readonly optionRepository: IOptionRepository,
  ) {}

  async handle(menuName: string, options: any[]) {
    const menuId = await this.menuRepository.getMenuIdByName(menuName);

    const optionsWithMenuId = options.map((option) => ({
      ...option,
      menuId,
    }));

    const optionsCreated =
      await this.optionRepository.insertManyOption(optionsWithMenuId);

    return optionsCreated;
  }
}
