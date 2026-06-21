import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { name, pokemons } = body;

    if (!name || !pokemons || !Array.isArray(pokemons)) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      );
    }

    // Create team and link pokemons with their moves
    const team = await prisma.team.create({
      data: {
        name,
        userId: (session.user as any).id,
        pokemons: {
          create: pokemons.map((p: any) => ({
            pokemonId: p.pokemonId,
            move1Id: p.moves[0] || null,
            move2Id: p.moves[1] || null,
            move3Id: p.moves[2] || null,
            move4Id: p.moves[3] || null,
          })),
        },
      },
    });

    return NextResponse.json({ message: "Equipe salva com sucesso", teamId: team.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao salvar equipe" },
      { status: 500 }
    );
  }
}
