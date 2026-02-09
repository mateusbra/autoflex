import { execSync } from "child_process";
import prisma from "../lib/prisma";

beforeAll(() => {
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL
    }
  })
})

beforeEach(async () => {
  await prisma.productMaterial.deleteMany();
  await prisma.rawMaterial.deleteMany();
  await prisma.product.deleteMany();


});

afterAll(async () => {
  await prisma.$disconnect();
});