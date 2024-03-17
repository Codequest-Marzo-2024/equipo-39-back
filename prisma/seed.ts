import { PrismaClient, Prisma } from '@prisma/client';
import { encryptData } from '../src/common/utils/encryptData';

const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
  {
    name: 'ADMIN',
  },
  {
    name: 'USER',
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    email: process.env.LOGIN_EMAIL || 'default@admin.com',
    password: encryptData(process.env.LOGIN_PASSWORD || 'defaultPassword1'),
    role: {
      connect: {
        id: 1,
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const r of roleData) {
    const role = await prisma.role.create({
      data: r,
    });
    console.log(`Created role with id: ${role.id}`);
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
