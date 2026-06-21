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

  return (
    <div className="w-full">
      <BattleViewClient team={team as any} />
    </div>
  );
}
