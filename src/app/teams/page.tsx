import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Users, Swords } from "lucide-react";
import DeleteTeamButton from "@/components/DeleteTeamButton";

export default async function TeamsDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const teams = await prisma.team.findMany({
    where: { userId: (session.user as any).id },
    include: {
      pokemons: {
        include: { pokemon: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="w-full space-y-8 text-slate-900 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3 uppercase">
            <Users className="text-red-500" size={32} /> Minhas Equipes
          </h1>
          <p className="text-slate-600 mt-1 font-bold uppercase">Gerencie seus times para a batalha</p>
        </div>
        <Link 
          href="/teams/builder" 
          className="px-6 py-3 border-4 border-slate-800 bg-white hover:bg-slate-100 font-bold uppercase transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] flex items-center gap-2"
        >
          <Plus size={20} /> Nova Equipe
        </Link>
      </div>

      {teams.length === 0 ? (
        <div className="gb-box w-full py-16 flex flex-col items-center justify-center text-center bg-slate-50">
          <div className="w-20 h-20 border-4 border-slate-800 bg-white flex items-center justify-center text-red-500 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            <Users size={40} />
          </div>
          <h3 className="text-2xl font-bold uppercase mb-2">Nenhuma equipe encontrada</h3>
          <p className="text-slate-600 max-w-md font-bold uppercase">
            Você ainda não montou nenhuma equipe. Clique no botão acima para criar seu primeiro time campeão.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} className="gb-box p-6 space-y-4 bg-slate-50 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start border-b-4 border-slate-800 pb-2">
                <h3 className="text-2xl font-bold uppercase truncate pr-4">{team.name}</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 py-4">
                {team.pokemons.map((tp, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-white border-2 border-slate-300 p-2 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                    <img 
                      src={`https://img.pokemondb.net/sprites/home/normal/${tp.pokemon.name_en.toLowerCase()}.png`} 
                      alt={tp.pokemon.name_en}
                      className="w-12 h-12 object-contain drop-shadow-md mb-1"
                    />
                    <span className="text-[10px] uppercase font-bold text-slate-600 truncate w-full text-center">
                      {tp.pokemon.name_en}
                    </span>
                  </div>
                ))}
                {team.pokemons.length === 0 && (
                  <div className="col-span-3 text-slate-500 font-bold uppercase text-center py-4">
                    Equipe vazia
                  </div>
                )}
                
                {/* Fill empty slots visually */}
                {Array.from({ length: Math.max(0, 6 - team.pokemons.length) }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="flex flex-col items-center bg-slate-200 border-2 border-dashed border-slate-400 p-2 opacity-50">
                    <div className="w-12 h-12 flex items-center justify-center text-slate-400 font-bold">?</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-3">
                <Link 
                  href={`/battle/${team.id}`}
                  className="flex-1 py-3 border-4 border-red-700 bg-red-500 hover:bg-red-400 text-white font-bold uppercase flex justify-center items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                >
                  <Swords size={20} /> Batalhar
                </Link>
                <Link 
                  href={`/teams/builder?id=${team.id}`}
                  className="px-6 py-3 border-4 border-slate-800 bg-white hover:bg-slate-100 font-bold uppercase text-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                >
                  Editar
                </Link>
                <DeleteTeamButton teamId={team.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
