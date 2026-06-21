import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Updating Pokemon images...");
  const pokemons = await prisma.pokemon.findMany();

  for (const p of pokemons) {
    // The id is the lowercase english name, perfect for pokemondb.net
    // Examples: charizard, garchomp, lucario
    const imgUrl = `https://img.pokemondb.net/sprites/home/normal/${p.id}.png`;
    
    await prisma.pokemon.update({
      where: { id: p.id },
      data: { imageUrl: imgUrl }
    });
    console.log(`Updated ${p.name_en} with image: ${imgUrl}`);
  }

  console.log("All Pokemon images updated!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
