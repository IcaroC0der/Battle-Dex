import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const params = await props.params;
    const { id } = params;
    const body = await req.json();
    const { name, pokemons } = body;

    if (!name || !pokemons || !Array.isArray(pokemons)) {
      return NextResponse.json(
        { message: "Dados inválidos" },
        { status: 400 }
      );
    }

    // Verify team ownership
    const existingTeam = await prisma.team.findUnique({
      where: { id },
    });

    if (!existingTeam || existingTeam.userId !== (session.user as any).id) {
      return NextResponse.json({ message: "Equipe não encontrada ou não autorizada" }, { status: 404 });
    }

    // Delete existing TeamPokemons
    await prisma.teamPokemon.deleteMany({
      where: { teamId: id },
    });

    // Update Team Name and Recreate TeamPokemons
    const team = await prisma.team.update({
      where: { id },
      data: {
        name,
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

    return NextResponse.json({ message: "Equipe atualizada com sucesso", teamId: team.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao atualizar equipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const params = await props.params;
    const { id } = params;

    // Verify team ownership
    const existingTeam = await prisma.team.findUnique({
      where: { id },
    });

    if (!existingTeam || existingTeam.userId !== (session.user as any).id) {
      return NextResponse.json({ message: "Equipe não encontrada ou não autorizada" }, { status: 404 });
    }

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Equipe deletada com sucesso" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao deletar equipe" },
      { status: 500 }
    );
  }
}
