import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const moves = await prisma.move.findMany({
    where: {
      short_desc_pt: {
        startsWith: '[Tradução PT-BR Automática]'
      }
    }
  });
  
  console.log(`Found ${moves.length} moves to translate.`);
  
  const CHUNK_SIZE = 45;
  for (let i = 0; i < moves.length; i += CHUNK_SIZE) {
    const chunk = moves.slice(i, i + CHUNK_SIZE);
    const batchIndex = Math.floor(i / CHUNK_SIZE) + 1;
    fs.writeFileSync(`batch_${batchIndex}.json`, JSON.stringify(chunk, null, 2));
    console.log(`Wrote batch_${batchIndex}.json with ${chunk.length} moves.`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
