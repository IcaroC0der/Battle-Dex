import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const allMoves = [];
  
  // Read all 10 JSON files
  for (let i = 1; i <= 10; i++) {
    try {
      const fileContent = fs.readFileSync(`translated_${i}.json`, 'utf-8');
      const moves = JSON.parse(fileContent);
      allMoves.push(...moves);
      console.log(`Loaded translated_${i}.json with ${moves.length} moves.`);
    } catch (e) {
      console.error(`Failed to read translated_${i}.json:`, e);
    }
  }
  
  console.log(`Total moves to update: ${allMoves.length}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  // Update in database
  for (const move of allMoves) {
    try {
      await prisma.move.update({
        where: { id: move.id },
        data: {
          short_desc_pt: move.short_desc_pt,
          effect_pt: move.effect_pt,
          strategic_tips_pt: move.strategic_tips_pt
        }
      });
      successCount++;
    } catch (e) {
      console.error(`Failed to update move ${move.id}:`, e);
      errorCount++;
    }
  }
  
  console.log(`Done! Successfully updated ${successCount} moves. Errors: ${errorCount}`);
  
  // Verify if there are any remaining moves with [Tradução PT-BR Automática]
  const remaining = await prisma.move.count({
    where: {
      short_desc_pt: {
        startsWith: '[Tradução PT-BR Automática]'
      }
    }
  });
  console.log(`Remaining un-translated moves: ${remaining}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
