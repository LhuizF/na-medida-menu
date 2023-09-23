interface IMenu {
  name: string;
}

interface MenuDB extends IMenu {
  id: string;
}

interface IMenuRepository {
  getMenuIdByName(name: string): Promise<string>;
  getMenuById(id: string): Promise<MenuDB>;
}
