import prisma from '@/libs/prisma';

export class OptionRepositories {
  async insertManyOption(options: IOption[]): Promise<number> {
    const optionsCreated = await prisma.option.createMany({
      data: options
    })

    return optionsCreated.count;
  }
}
