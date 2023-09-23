import { InsertManyOptions } from './InsertManyOptions';
import { MenuRepositories } from '@/repositories/MenuRepositories';
import { OptionRepositories } from '@/repositories/OptionRepositories';

const menuRepositories = new MenuRepositories();
const optionRepositories = new OptionRepositories();

export const insertManyOptions = new InsertManyOptions(menuRepositories, optionRepositories);

