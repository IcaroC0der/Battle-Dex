import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const moves = await prisma.move.findMany({
    where: {
      short_desc_pt: {
        startsWith: '[Tradução PT-BR Automática]'
      }
    },
    take: 45, // Taking 45 to fit well within context
  });
  
  console.log(JSON.stringify(moves, null, 2));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
