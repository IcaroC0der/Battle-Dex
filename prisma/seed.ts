import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || "file:./dev.db"
});

// Utility for creating a synthetic PT-BR strategic tip based on move data
function generateStrategicTip(move: any) {
  let tip = '';
  if (move.category === 'Status') {
    tip = `Excelente movimento de suporte do tipo ${move.type || 'Desconhecido'}. Use para ganhar vantagem tática ou enfraquecer o oponente antes de atacar.`;
  } else {
    const pwr = parseInt(move.power) || 0;
    if (pwr > 100) {
      tip = `Ataque extremamente poderoso! Cuidado com possíveis desvantagens (como errar ou perder turnos). Ideal para finalizar oponentes.`;
    } else if (pwr >= 70) {
      tip = `Um golpe sólido e confiável. Bom para causar dano consistente no decorrer da batalha.`;
    } else {
      tip = `Ataque fraco, mas geralmente vem com um efeito secundário forte. Aproveite esse efeito a seu favor.`;
    }
  }
  return tip;
}

// Basic english-to-portuguese translations for testing
function translateShortDesc(effect: any) {
  if (!effect) return 'Sem descrição.';
  // A real integration would call an LLM API here.
  return '[Tradução PT-BR Automática] ' + effect.substring(0, 100) + '...';
}

async function main() {
  console.log('Starting seed...');

  const pokemonPath = path.join(__dirname, '../../scraper/raw_pokemon.json');
  const movesPath = path.join(__dirname, '../../scraper/raw_moves.json');

  if (!fs.existsSync(pokemonPath) || !fs.existsSync(movesPath)) {
    console.error('Raw JSON files not found. Did the scraper finish?');
    process.exit(1);
  }

  const rawPokemon = JSON.parse(fs.readFileSync(pokemonPath, 'utf8'));
  const rawMoves = JSON.parse(fs.readFileSync(movesPath, 'utf8'));

  console.log(`Seeding ${rawMoves.length} moves...`);
  
  // Create Moves
  for (const move of rawMoves) {
    try {
      await prisma.move.upsert({
        where: { id: move.id },
        update: {},
        create: {
          id: move.id,
          name_en: move.name_en,
          name_pt: move.name_en, // Placeholder for PT-BR name
          short_desc_pt: translateShortDesc(move.effect_en),
          effect_pt: '[Tradução completa] ' + (move.effect_en || 'Sem efeito listado.'),
          power: move.power,
          accuracy: move.accuracy,
          pp: move.pp,
          type: move.type,
          category: move.category,
          strategic_tips_pt: generateStrategicTip(move),
        },
      });
    } catch (e: any) {
      console.error(`Failed to seed move ${move.id}:`, e.message || e);
    }
  }

  console.log(`Seeding ${rawPokemon.length} pokemon...`);

  // Create Pokemons
  for (const pkmn of rawPokemon) {
    try {
      await prisma.pokemon.upsert({
        where: { id: pkmn.id },
        update: {},
        create: {
          id: pkmn.id,
          name_en: pkmn.name_en,
          name_pt: pkmn.name_en,
          description_pt: 'Um Pokémon formidável do Champions.',
          imageUrl: pkmn.imageUrl,
          type1: pkmn.types && pkmn.types.length > 0 ? pkmn.types[0] : null,
          type2: pkmn.types && pkmn.types.length > 1 ? pkmn.types[1] : null,
          hp: pkmn.hp || 0,
          attack: pkmn.attack || 0,
          defense: pkmn.defense || 0,
          spAttack: pkmn.spAttack || 0,
          spDefense: pkmn.spDefense || 0,
          speed: pkmn.speed || 0,
          ability1: pkmn.ability1 || null,
          ability2: pkmn.ability2 || null,
          hiddenAbility: pkmn.hiddenAbility || null,
        },
      });

      // Map Pokemon to Moves
      for (const moveId of pkmn.moves) {
        // Ensure the move exists before linking
        const moveExists = rawMoves.find((m: any) => m.id === moveId);
        if (moveExists) {
          await prisma.pokemonMove.upsert({
            where: {
              pokemonId_moveId: {
                pokemonId: pkmn.id,
                moveId: moveId,
              },
            },
            update: {},
            create: {
              pokemonId: pkmn.id,
              moveId: moveId,
            },
          });
        }
      }
    } catch (e: any) {
      console.error(`Failed to seed pokemon ${pkmn.id}:`, e.message || e);
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
