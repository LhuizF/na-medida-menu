import prisma from "@/libs/prisma"

export class MenuRepositories {
  async getMenuIdByName(name: string): Promise<string> {
    const menu = await prisma.menu.findFirstOrThrow({
      where: { name }
    })

    return menu.id
  }
}
