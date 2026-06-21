import Link from "next/link";
import { ArrowRight, Shield, Zap, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      
      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl gb-box p-12 text-center mx-4">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 uppercase drop-shadow-md">
          Domine o <span className="text-red-600 block mt-2">Battle Dex</span>
        </h1>
        <p className="text-xl text-slate-700 leading-relaxed font-bold">
          Monte suas equipes, acesse instantaneamente as traduções dos ataques e receba dicas estratégicas diretamente na sua tela secundária durante a batalha.
        </p>
        <div className="flex items-center justify-center gap-4 pt-6">
          <Link href="/teams" className="px-8 py-4 border-4 border-slate-800 bg-red-600 hover:bg-red-500 text-white font-bold uppercase text-2xl transition-all-smooth flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            Começar Agora <ArrowRight size={24} />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12 px-4">
        <div className="gb-box p-6 text-left space-y-4 hover:-translate-y-1 transition-all-smooth">
          <div className="w-14 h-14 border-4 border-slate-800 bg-blue-100 flex items-center justify-center text-blue-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            <Shield size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 uppercase">Monte seu Time</h3>
          <p className="text-slate-700 text-lg">
            Escolha os Pokémon mais populares do meta e selecione os ataques específicos de cada um.
          </p>
        </div>
        
        <div className="gb-box p-6 text-left space-y-4 hover:-translate-y-1 transition-all-smooth">
          <div className="w-14 h-14 border-4 border-slate-800 bg-purple-100 flex items-center justify-center text-purple-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            <Search size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 uppercase">Tradução Instantânea</h3>
          <p className="text-slate-700 text-lg">
            Não perca tempo traduzindo efeitos de ataques mentalmente. Acesse a tradução completa em um clique.
          </p>
        </div>

        <div className="gb-box p-6 text-left space-y-4 hover:-translate-y-1 transition-all-smooth">
          <div className="w-14 h-14 border-4 border-slate-800 bg-amber-100 flex items-center justify-center text-amber-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            <Zap size={28} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 uppercase">Dicas Estratégicas</h3>
          <p className="text-slate-700 text-lg">
            Saiba quando e como usar cada ataque com as dicas táticas geradas por IA para o meta atual.
          </p>
        </div>
      </div>

    </div>
  );
}
