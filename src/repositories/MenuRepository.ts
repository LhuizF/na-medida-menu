import prisma from "@/libs/prisma";

export class MenuRepository implements IMenuRepository {
  async getMenuIdByName(name: string): Promise<string> {
    const menu = await prisma.menu.findFirstOrThrow({
      where: { name },
    });

    return menu.id;
  }

  getMenuById(id: string): Promise<MenuDB> {
    return prisma.menu.findUniqueOrThrow({
      where: { id },
    });
  }
}
