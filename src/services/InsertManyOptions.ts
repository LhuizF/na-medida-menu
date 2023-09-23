import { MenuRepositories } from "../repositories/MenuRepositories";
import { OptionRepositories } from "../repositories/OptionRepositories";

export class InsertManyOptions {
  constructor(
    private readonly menuRepositories: MenuRepositories,
    private readonly optionRepositories: OptionRepositories

  ) { }

  async handle(menuName: string, options: any[]) {
    const menuId = await this.menuRepositories.getMenuIdByName(menuName);

    const optionsWithMenuId = options.map((option) => ({
      ...option,
      menuId
    }))

    const optionsCreated = await this.optionRepositories.insertManyOption(optionsWithMenuId);

    return optionsCreated;
  }
}
