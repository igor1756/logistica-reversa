import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const matricula = '0000001';
  const senha = 'Admin@123';

  const existe = await prisma.usuario.findUnique({ where: { matricula } });
  if (existe) {
    console.log('Admin já existe:', matricula);
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await prisma.usuario.create({
    data: {
      matricula,
      nome: 'Admin do Sistema',
      tipo: 'ADMIN',
      senhaHash,
      setor: 'TI',
    },
  });

  console.log('Admin criado com sucesso');
  console.log('matricula:', matricula);
  console.log('senha:', senha);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
