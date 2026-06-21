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

  return (
    <div className="w-full">
      <TeamBuilderClient 
        pokemons={pokemons as any} 
        userId={(session.user as any).id}
        initialTeam={initialTeam as any}
      />
    </div>
  );
}
