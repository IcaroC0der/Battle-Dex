import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamBuilderClient from "./TeamBuilderClient";

export default async function TeamBuilderPage({ searchParams }: { searchParams: { id?: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const sp = await searchParams;
  let initialTeam = null;
  if (sp?.id) {
    initialTeam = await prisma.team.findUnique({
      where: { id: sp.id },
      include: {
        pokemons: {
          include: { pokemon: true }
        }
      }
    });

    // Check ownership
    if (initialTeam && initialTeam.userId !== (session.user as any).id) {
      initialTeam = null;
    }
  }

  // Fetch all 50 available Pokemons with their allowed moves
  const pokemons = await prisma.pokemon.findMany({
    include: {
      moves: {
        include: {
          move: {
            select: {
              id: true,
              name_en: true,
              type: true,
              category: true,
              power: true,
              accuracy: true,
              pp: true,
              short_desc_pt: true,
            }
          }
        }
      }
    },
    orderBy: {
      name_en: 'asc'
    }
  });

  // Bypass Prisma generated client cache to get type1 and type2
  const rawTypes = await prisma.$queryRawUnsafe<Array<{ id: string, type1: string | null, type2: string | null }>>(`SELECT id, type1, type2 FROM Pokemon`);
  const pokemonsWithTypes = pokemons.map(p => {
    const raw = rawTypes.find(r => r.id === p.id);
    return {
      ...p,
      type1: raw?.type1 || null,
      type2: raw?.type2 || null,
    };
  });

  return (
    <div className="w-full">
      <TeamBuilderClient 
        pokemons={pokemonsWithTypes as any} 
        userId={(session.user as any).id}
        initialTeam={initialTeam as any}
      />
    </div>
  );
}
