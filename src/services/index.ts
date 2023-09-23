import { InsertManyOptions } from "./InsertManyOptions";
import { FindOptions } from "./FindOptions";
import { MenuRepository } from "@/repositories/MenuRepository";
import { OptionRepository } from "@/repositories/OptionRepository";

const menuRepository = new MenuRepository();
const optionRepository = new OptionRepository();

export const insertManyOptions = new InsertManyOptions(
  menuRepository,
  optionRepository,
);

export const findOptions = new FindOptions(menuRepository, optionRepository);
