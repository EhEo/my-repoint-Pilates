/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();

  const email = process.env.ADMIN_EMAIL || 'admin@repoint.local';
  const password = process.env.ADMIN_PASSWORD || 'admin1234';

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash, role: 'admin' },
    create: { email, password: passwordHash, role: 'admin' },
  });

  console.log('[seed] admin user ready:', { id: user.id, email: user.email, role: user.role });

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


