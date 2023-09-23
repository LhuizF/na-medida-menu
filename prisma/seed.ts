import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await clean();
    await user();
    await menu();

    console.log(`\x1b[32m${'Done'}\x1b[0m`);
  } catch (error) {
    console.error(error);
    console.log(`\x1b[31m${'DEU RUIM AQUI'}\x1b[0m`);
  }
}

const clean = async () => {
  await prisma.option.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.user.deleteMany({});
}


const user = async () => {
  await prisma.user.create({
    data: {
      name: 'Luiz',
      email: 'luiz@email.com',
      password: '123456',
      role: 'ADMIN',
    }
  })
}

const menu = async () => {
  await prisma.menu.create({
    data: {
      name: 'Cardápio Porções',
    }
  })
}

main()
