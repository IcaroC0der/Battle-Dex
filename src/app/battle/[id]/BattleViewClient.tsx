"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-stone-400 text-white", fire: "bg-red-500 text-white", water: "bg-blue-500 text-white", grass: "bg-emerald-500 text-white",
  electric: "bg-yellow-400 text-black", ice: "bg-cyan-300 text-black", fighting: "bg-orange-600 text-white",
  poison: "bg-purple-500 text-white", ground: "bg-amber-600 text-white", flying: "bg-indigo-300 text-black",
  psychic: "bg-pink-500 text-white", bug: "bg-lime-500 text-black", rock: "bg-yellow-700 text-white", ghost: "bg-indigo-700 text-white",
  dragon: "bg-indigo-600 text-white", dark: "bg-slate-700 text-white", steel: "bg-slate-400 text-white", fairy: "bg-pink-300 text-black"
};

const CLASS_COLORS: Record<string, string> = {
  physical: "bg-orange-600 text-white", special: "bg-indigo-600 text-white", status: "bg-slate-500 text-white"
};

const TypewriterText = ({ text, onComplete, speed = 5 }: { text: string, onComplete?: () => void, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default function BattleViewClient({ team }: { team: any }) {
  const [activePokemonId, setActivePokemonId] = useState<string | null>(
    team.pokemons.length > 0 ? team.pokemons[0].id : null
  );
  
  const [activeMove, setActiveMove] = useState<any>(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const activePokemon = team.pokemons.find((p: any) => p.id === activePokemonId);

  // Reset dialogue when active move or pokemon changes
  useEffect(() => {
    setIsTypingComplete(false);
  }, [activeMove, activePokemonId]);

  return (
    <div className="flex flex-col gap-6 w-full pb-24 text-slate-900 select-none">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/teams" className="inline-flex items-center gap-2 text-slate-600 hover:text-black mb-2 transition-all-smooth text-lg font-bold">
            <ArrowLeft size={18} /> FUGIR (Sair)
          </Link>
          <h1 className="text-4xl font-bold uppercase">
            Batalha: {team.name}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        {/* Left Side: Party Selection (Pokemon Menu) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="gb-box p-4 bg-slate-100 h-full">
            <h2 className="text-xl font-bold uppercase border-b-4 border-slate-300 pb-2 mb-4">Escolha um PkMn</h2>
            <div className="flex flex-col gap-2">
              {team.pokemons.map((p: any) => {
                const isActive = activePokemonId === p.id;
                return (
                  <div 
                    key={p.id}
                    onClick={() => setActivePokemonId(p.id)}
                    className={`p-3 border-2 cursor-pointer flex justify-between items-center transition-colors ${
                      isActive 
                        ? 'border-red-500 bg-white shadow-[2px_2px_0px_#ef4444]' 
                        : 'border-slate-500 bg-slate-200 hover:bg-white shadow-[2px_2px_0px_#64748b]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 flex justify-center text-red-600">
                        {isActive && <svg width="14" height="16" viewBox="0 0 14 16" className="fill-current animate-blink"><path d="M0 0L14 8L0 16V0Z" /></svg>}
                      </div>
                      <img 
                        src={`https://img.pokemondb.net/sprites/home/normal/${p.pokemon.name_en.toLowerCase()}.png`} 
                        alt={p.pokemon.name_en} 
                        className={`w-12 h-12 object-contain drop-shadow-md ${!isActive && 'grayscale opacity-70'}`} 
                      />
                      <h3 className={`font-bold text-xl uppercase ${isActive ? 'text-black' : 'text-slate-800'}`}>
                        {p.pokemon.name_pt || p.pokemon.name_en}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Active Pokemon Stats Panel */}
          {activePokemon && (
            <div className="gb-box p-4 bg-slate-100 flex flex-col gap-4">
              <h2 className="text-xl font-bold uppercase border-b-4 border-slate-300 pb-2">Status & Habilidades</h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-bold uppercase">
                <div className="flex justify-between border-b-2 border-slate-200"><span className="text-slate-500">HP</span><span>{activePokemon.pokemon.hp || '-'}</span></div>
                <div className="flex justify-between border-b-2 border-slate-200"><span className="text-slate-500">Atk</span><span>{activePokemon.pokemon.attack || '-'}</span></div>
                <div className="flex justify-between border-b-2 border-slate-200"><span className="text-slate-500">Def</span><span>{activePokemon.pokemon.defense || '-'}</span></div>
                <div className="flex justify-between border-b-2 border-slate-200"><span className="text-slate-500">Sp.Atk</span><span>{activePokemon.pokemon.spAttack || '-'}</span></div>
                <div className="flex justify-between border-b-2 border-slate-200"><span className="text-slate-500">Sp.Def</span><span>{activePokemon.pokemon.spDefense || '-'}</span></div>
                <div className="flex justify-between border-b-2 border-slate-200"><span className="text-slate-500">Spd</span><span>{activePokemon.pokemon.speed || '-'}</span></div>
              </div>
              
              <div className="flex flex-col gap-1 mt-2">
                {activePokemon.pokemon.ability1 && (
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase shrink-0">Habilidade 1</span>
                    <span className="text-sm font-bold uppercase leading-tight">{activePokemon.pokemon.ability1}</span>
                  </div>
                )}
                {activePokemon.pokemon.ability2 && (
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase shrink-0">Habilidade 2</span>
                    <span className="text-sm font-bold uppercase leading-tight">{activePokemon.pokemon.ability2}</span>
                  </div>
                )}
                {activePokemon.pokemon.hiddenAbility && (
                  <div className="flex items-start gap-2">
                    <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold uppercase shrink-0">Oculta (HA)</span>
                    <span className="text-sm font-bold uppercase leading-tight">{activePokemon.pokemon.hiddenAbility}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Battle Stage */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {activePokemon ? (
            <div className="gb-box bg-slate-50 flex flex-col overflow-hidden h-[600px]">
              
              {/* Battle Screen Area */}
              <div className="flex-1 bg-green-100 relative border-b-4 border-slate-800 p-6 flex flex-col justify-between" style={{ backgroundImage: 'linear-gradient(#e0f2fe 50%, #dcfce7 50%)' }}>
                
                {/* Opponent Placeholder / Info */}
                <div className="flex justify-end w-full">
                  <div className="gb-box p-3 bg-white min-w-[250px] shadow-lg border-2">
                    <h3 className="font-bold text-2xl uppercase border-b-2 border-slate-300 pb-1 mb-2">OPONENTE</h3>
                    <div className="flex justify-between items-center bg-slate-200 px-2 py-1 rounded border-2 border-slate-400">
                      <span className="font-bold text-yellow-600">HP</span>
                      <div className="flex-1 h-3 mx-2 bg-slate-700 rounded-full border-2 border-slate-800 p-0.5 flex">
                        <div className="bg-green-500 h-full w-full rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Pokemon and Stats */}
                <div className="flex justify-between items-end w-full">
                  <img 
                    src={`https://img.pokemondb.net/sprites/home/normal/${activePokemon.pokemon.name_en.toLowerCase()}.png`} 
                    alt={activePokemon.pokemon.name_en} 
                    className="w-48 h-48 object-contain drop-shadow-xl scale-125 origin-bottom-left"
                  />
                  
                  <div className="gb-box p-3 bg-white min-w-[300px] shadow-lg border-2 mb-8 mr-4">
                    <div className="flex justify-between items-end mb-2 border-b-2 border-slate-300 pb-1">
                      <h3 className="font-bold text-2xl uppercase">{activePokemon.pokemon.name_pt || activePokemon.pokemon.name_en}</h3>
                      <span className="font-bold">Lv50</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      {activePokemon.pokemon.type1 && <span className={`px-2 text-xs uppercase font-bold border border-slate-800 ${TYPE_COLORS[activePokemon.pokemon.type1.toLowerCase()] || 'bg-slate-600 text-white'}`}>{activePokemon.pokemon.type1}</span>}
                      {activePokemon.pokemon.type2 && <span className={`px-2 text-xs uppercase font-bold border border-slate-800 ${TYPE_COLORS[activePokemon.pokemon.type2.toLowerCase()] || 'bg-slate-600 text-white'}`}>{activePokemon.pokemon.type2}</span>}
                    </div>

                    <div className="flex justify-between items-center bg-slate-200 px-2 py-1 rounded border-2 border-slate-400">
                      <span className="font-bold text-yellow-600">HP</span>
                      <div className="flex-1 h-3 mx-2 bg-slate-700 rounded-full border-2 border-slate-800 p-0.5 flex">
                        <div className="bg-green-500 h-full w-full rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Interface: Text Box + Moves Menu */}
              <div className="h-48 flex bg-white relative cursor-pointer">
                
                {/* Dialogue Box */}
                <div className="flex-1 p-6 relative overflow-y-auto custom-scrollbar">
                  <div className="text-xl font-bold uppercase leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {!activeMove ? (
                      <TypewriterText 
                        text={`O que ${activePokemon.pokemon.name_pt || activePokemon.pokemon.name_en} deve fazer? Selecione um ataque para análise.`} 
                        onComplete={() => setIsTypingComplete(true)} 
                        speed={5}
                      />
                    ) : (
                      <TypewriterText 
                        text={`> ${activeMove.name_en}: \n${activeMove.effect_pt || activeMove.short_desc_pt}\n\nDICA: ${activeMove.strategic_tips_pt || 'Nenhuma dica disponível.'}`} 
                        onComplete={() => setIsTypingComplete(true)} 
                        speed={5}
                      />
                    )}
                  </div>
                </div>

                {/* FIGHT Menu */}
                <div className="w-[350px] border-l-4 border-slate-800 p-2 bg-slate-50 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-2 h-full">
                    {[activePokemon.move1, activePokemon.move2, activePokemon.move3, activePokemon.move4].map((move, idx) => {
                      if (!move) return (
                        <div key={idx} className="border-2 border-dashed border-slate-300 flex items-center justify-center font-bold text-slate-400">
                          -
                        </div>
                      );

                      const isActiveMove = activeMove?.id === move.id;

                      return (
                        <div 
                          key={idx}
                          onClick={() => setActiveMove(move)}
                          className={`border-2 p-2 cursor-pointer relative transition-colors ${
                            isActiveMove 
                              ? 'border-red-500 bg-white shadow-[inset_0_0_0_2px_#ef4444]' 
                              : 'border-slate-400 bg-slate-100 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold uppercase text-lg truncate pr-1">{move.name_en}</h4>
                            {move.type && (
                              <div className={`w-3 h-3 rounded-full border border-slate-800 ${TYPE_COLORS[move.type.toLowerCase()]?.split(' ')[0] || 'bg-slate-600'}`} title={move.type}></div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-end text-xs font-bold text-slate-600 mt-2">
                            <span>PP {move.pp}</span>
                            <span>PWR {move.power || '-'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="gb-box p-8 h-full flex items-center justify-center text-slate-500 font-bold text-2xl uppercase">
              SELECIONE UM POKÉMON
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
