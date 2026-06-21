import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pokemon = await prisma.pokemon.findFirst({
    include: {
      moves: {
        include: { move: true },
        take: 3
      }
    }
  });
  console.log(JSON.stringify(pokemon, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
