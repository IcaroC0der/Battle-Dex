import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching correct types from PokeAPI...");
  
  // 1. Update Pokemon types
  const pokemons = await prisma.pokemon.findMany();
  for (const p of pokemons) {
    try {
      // PokeAPI uses the exact same id format for almost all pokemon
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
      if (!res.ok) {
        console.log(`Failed to fetch ${p.id} from PokeAPI`);
        continue;
      }
      const data = await res.json();
      const type1 = data.types[0]?.type.name || null;
      const type2 = data.types[1]?.type.name || null;

      await prisma.$executeRawUnsafe(
        `UPDATE Pokemon SET type1 = ?, type2 = ? WHERE id = ?`,
        type1, type2, p.id
      );
      console.log(`Updated Pokemon ${p.name_en} -> [${type1}${type2 ? `, ${type2}` : ''}]`);
    } catch (e) {
      console.log(`Error updating ${p.id}`);
    }
  }

  // 2. Update Move types & categories
  const moves = await prisma.move.findMany();
  for (const m of moves) {
    try {
      // PokeAPI ids for moves usually replace spaces with hyphens
      const moveId = m.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const res = await fetch(`https://pokeapi.co/api/v2/move/${moveId}`);
      if (!res.ok) {
        console.log(`Failed to fetch move ${moveId}`);
        continue;
      }
      const data = await res.json();
      const type = data.type?.name || null;
      const category = data.damage_class?.name || null;

      await prisma.move.update({
        where: { id: m.id },
        data: { type, category }
      });
      console.log(`Updated Move ${m.name_en} -> Type: ${type}, Category: ${category}`);
    } catch (e) {
      console.log(`Error updating move ${m.name_en}`);
    }
  }

  console.log("All types updated successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
