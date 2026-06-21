import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BattleViewClient from "./BattleViewClient";

export default async function BattlePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user) {
    redirect("/login");
  }

  const team = await prisma.team.findUnique({
    where: { 
      id: id,
      userId: (session.user as any).id
    },
    include: {
      pokemons: {
        include: {
          pokemon: true,
          move1: true,
          move2: true,
          move3: true,
          move4: true
        }
      }
    }
  });

  if (!team) {
    redirect("/teams");
  }

  // Bypass Prisma generated client cache to get type1 and type2
  const rawTypes = await prisma.$queryRawUnsafe<Array<{ id: string, type1: string | null, type2: string | null }>>(`SELECT id, type1, type2 FROM Pokemon`);
  
  const teamWithTypes = {
    ...team,
    pokemons: team.pokemons.map((p: any) => {
      const raw = rawTypes.find(r => r.id === p.pokemon.id);
      return {
        ...p,
        pokemon: {
          ...p.pokemon,
          type1: raw?.type1 || null,
          type2: raw?.type2 || null,
        }
      };
    })
  };

  return (
    <div className="w-full">
      <BattleViewClient team={teamWithTypes} />
    </div>
  );
}
