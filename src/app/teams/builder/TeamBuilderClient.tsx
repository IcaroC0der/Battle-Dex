"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, X, Swords, ArrowLeft, Search, FilterX, RefreshCcw } from "lucide-react";
import RetroDialog from "@/components/RetroDialog";
import Link from "next/link";

interface Move {
  id: string;
  name_en: string;
  type: string | null;
  category: string | null;
  power: string | null;
  accuracy: string | null;
  pp: string | null;
  short_description_pt: string | null;
  imageUrl: string | null;
  type1: string | null;
  type2: string | null;
}

interface PokemonWithMoves {
  id: string;
  name_en: string;
  name_pt: string | null;
  imageUrl: string | null;
  type1: string | null;
  type2: string | null;
  moves: { move: Move }[];
}

interface SelectedPokemon {
  pokemonId: string;
  pokemonName: string;
  moves: string[]; // array of move ids
}

const POKEMON_TYPES = [
  "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", 
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-stone-400 text-white", fire: "bg-red-500 text-white", water: "bg-blue-500 text-white", grass: "bg-emerald-500 text-white",
  electric: "bg-yellow-400 text-black", ice: "bg-cyan-300 text-black", fighting: "bg-orange-600 text-white",
  poison: "bg-purple-500 text-white", ground: "bg-amber-600 text-white", flying: "bg-indigo-300 text-black",
  psychic: "bg-pink-500 text-white", bug: "bg-lime-500 text-black", rock: "bg-yellow-700 text-white", ghost: "bg-indigo-700 text-white",
  dragon: "bg-indigo-600 text-white", dark: "bg-slate-700 text-white", steel: "bg-slate-400 text-white", fairy: "bg-pink-300 text-black"
};

const DAMAGE_CLASSES = ["physical", "special", "status"];
const CLASS_COLORS: Record<string, string> = {
  physical: "bg-orange-600 text-white", special: "bg-indigo-600 text-white", status: "bg-slate-500 text-white"
};

export default function TeamBuilderClient({ 
  pokemons, 
  userId, 
  initialTeam 
}: { 
  pokemons: PokemonWithMoves[], 
  userId: string,
  initialTeam?: any
}) {
  const router = useRouter();
  
  const [teamId, setTeamId] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("Meu Time Retro");
  const [selectedPokemons, setSelectedPokemons] = useState<SelectedPokemon[]>([]);
  
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [isSubstituting, setIsSubstituting] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    message: string;
    type: "alert" | "confirm";
  }>({
    isOpen: false,
    message: "",
    type: "alert",
  });
  
  // Filters
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [hideFull, setHideFull] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTeam) {
      setTeamId(initialTeam.id);
      setTeamName(initialTeam.name);
      
      const loadedPokemons: SelectedPokemon[] = initialTeam.pokemons.map((tp: any) => {
        const moves = [];
        if (tp.move1Id) moves.push(tp.move1Id);
        if (tp.move2Id) moves.push(tp.move2Id);
        if (tp.move3Id) moves.push(tp.move3Id);
        if (tp.move4Id) moves.push(tp.move4Id);
        
        return {
          pokemonId: tp.pokemonId,
          pokemonName: tp.pokemon.name_en,
          moves
        };
      });
      
      setSelectedPokemons(loadedPokemons);
      if (loadedPokemons.length > 0) {
        setActiveSlot(0);
      }
    }
  }, [initialTeam]);

  const addPokemon = (pokemon: PokemonWithMoves) => {
    if (activeSlot !== null && isSubstituting) {
      // Substitute the current slot
      const newArr = [...selectedPokemons];
      newArr[activeSlot] = { pokemonId: pokemon.id, pokemonName: pokemon.name_en, moves: [] };
      setSelectedPokemons(newArr);
      setIsSubstituting(false);
      setSearch("");
      setSelectedType("");
      return;
    }

    if (selectedPokemons.length >= 6) return;
    setSelectedPokemons([...selectedPokemons, { pokemonId: pokemon.id, pokemonName: pokemon.name_en, moves: [] }]);
    setActiveSlot(selectedPokemons.length);
    setSearch("");
    setSelectedType("");
    setIsSubstituting(false);
  };

  const removePokemon = (index: number) => {
    const newArr = [...selectedPokemons];
    newArr.splice(index, 1);
    setSelectedPokemons(newArr);
    setActiveSlot(null);
    setIsSubstituting(false);
  };

  const toggleMove = (pokemonIndex: number, moveId: string) => {
    const newArr = [...selectedPokemons];
    const p = newArr[pokemonIndex];
    
    if (p.moves.includes(moveId)) {
      p.moves = p.moves.filter(m => m !== moveId);
    } else if (p.moves.length < 4) {
      p.moves.push(moveId);
    }
    
    setSelectedPokemons(newArr);
  };

  const saveTeam = async () => {
    if (selectedPokemons.length === 0) {
      setDialogConfig({
        isOpen: true,
        message: "Selecione pelo menos um Pokémon",
        type: "alert"
      });
      return;
    }
    setLoading(true);

    const url = teamId ? `/api/teams/${teamId}` : "/api/teams";
    const method = teamId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName, pokemons: selectedPokemons }),
      });

      if (res.ok) {
        router.push("/teams");
        router.refresh();
      } else {
        const data = await res.json();
        setDialogConfig({
          isOpen: true,
          message: data.message || "Erro ao salvar equipe",
          type: "alert"
        });
      }
    } catch (e) {
      setDialogConfig({
        isOpen: true,
        message: "Erro de conexão",
        type: "alert"
      });
    } finally {
      setLoading(false);
    }
  };

  const activePokemon = activeSlot !== null && selectedPokemons[activeSlot] 
    ? pokemons.find(p => p.id === selectedPokemons[activeSlot].pokemonId) 
    : null;

  // Filter Pokemon List
  const filteredPokemons = pokemons.filter(p => {
    const matchesSearch = p.name_en.toLowerCase().includes(search.toLowerCase());
    const isFull = selectedPokemons.some(sp => sp.pokemonId === p.id && sp.moves.length === 4);
    const matchesType = selectedType === "" || p.type1?.toLowerCase() === selectedType.toLowerCase() || p.type2?.toLowerCase() === selectedType.toLowerCase();
    
    if (!matchesSearch) return false;
    if (!matchesType) return false;
    if (hideFull && isFull) return false;
    return true;
  });

  // Filter Moves List
  const filteredMoves = activePokemon?.moves.filter(({ move }) => {
    const matchesSearch = move.name_en.toLowerCase().includes(search.toLowerCase()) || 
                          (move.short_description_pt && move.short_description_pt.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === "" || move.type?.toLowerCase() === selectedType.toLowerCase();
    const matchesClass = selectedClass === null || move.category === selectedClass;
    return matchesSearch && matchesType && matchesClass;
  }).sort((a, b) => {
    const typeA = a.move.type || "";
    const typeB = b.move.type || "";
    if (typeA !== typeB) return typeA.localeCompare(typeB);
    return a.move.name_en.localeCompare(b.move.name_en);
  }) || [];

  return (
    <div className="flex flex-col gap-6 w-full pb-24 text-slate-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/teams" className="inline-flex items-center gap-2 text-slate-600 hover:text-black mb-2 transition-all-smooth text-lg font-bold">
            <ArrowLeft size={18} /> Voltar
          </Link>
          <h1 className="text-4xl font-bold uppercase flex items-center gap-3">
            <Swords className="text-red-500" /> {teamId ? "Editar Equipe" : "Montar Equipe"}
          </h1>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="flex-1 sm:w-64 px-4 py-2 border-4 border-slate-600 bg-white font-bold focus:outline-none focus:border-blue-500 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] uppercase"
            placeholder="Nome do Time"
          />
          <button 
            onClick={saveTeam}
            disabled={loading || selectedPokemons.length === 0}
            className="px-6 py-2 bg-red-500 border-4 border-red-700 hover:bg-red-400 text-white font-bold disabled:opacity-50 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] flex items-center gap-2 uppercase"
          >
            {loading ? "Salvando..." : <><Save size={18} /> Salvar</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="gb-box p-5 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold uppercase text-lg">Classe de Dano</h3>
              {selectedClass !== null && (
                <button onClick={() => setSelectedClass(null)} className="text-red-500 hover:text-red-700">
                  <FilterX size={20} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {DAMAGE_CLASSES.map(cls => {
                const isActive = selectedClass === cls;
                const colorClass = CLASS_COLORS[cls] || "bg-slate-600 text-white";
                return (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(isActive ? null : cls)}
                    className={`px-4 py-2 text-left font-bold uppercase border-2 transition-all-smooth ${
                      isActive ? `${colorClass} border-slate-800 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]` : 'bg-white text-slate-500 border-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {cls}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="gb-box p-5 bg-slate-50 space-y-4 mt-6">
            <h2 className="text-lg font-bold uppercase">Sua Equipe ({selectedPokemons.length}/6)</h2>
            <div className="space-y-2">
              {selectedPokemons.map((sp, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { setActiveSlot(idx); setIsSubstituting(false); }}
                  className={`gb-box p-3 cursor-pointer flex justify-between items-center transition-all-smooth ${activeSlot === idx && !isSubstituting ? 'border-red-500 shadow-[2px_2px_0px_#ef4444]' : 'bg-slate-50 border-slate-400'}`}
                >
                  <div>
                    <h3 className="font-bold text-lg uppercase">{sp.pokemonName}</h3>
                    <p className="text-sm text-slate-500 font-bold">{sp.moves.length}/4 Ataques</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removePokemon(idx); }}
                    className="p-1 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}

              {selectedPokemons.length < 6 && (
                <button 
                  onClick={() => { setActiveSlot(null); setSearch(""); setIsSubstituting(false); }}
                  className={`w-full p-3 border-4 border-dashed border-slate-400 text-slate-500 hover:text-slate-800 hover:bg-white font-bold uppercase flex items-center justify-center gap-2 text-lg ${activeSlot === null ? 'bg-slate-200 text-slate-800' : 'bg-slate-100'}`}
                >
                  <Plus size={20} /> Add Pokémon
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Area: Selection Panel */}
        <div className="lg:col-span-9">
          {(activeSlot === null || isSubstituting) ? (
            <div className="gb-box p-6 h-full min-h-[500px] bg-slate-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold uppercase">Pokédex</h2>
                  <p className="text-slate-500 font-bold">
                    {isSubstituting ? `Selecione para substituir o slot ${activeSlot! + 1}` : `Selecione o Pokémon para o slot ${selectedPokemons.length + 1}`}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Pesquisar Pokémon..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border-4 border-slate-800 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all-smooth font-bold"
                  />
                </div>
                
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="px-4 py-3 bg-white border-4 border-slate-800 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <option value="">Todos os Tipos</option>
                  {POKEMON_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                
                <button
                  onClick={() => setHideFull(!hideFull)}
                  className={`px-4 py-3 border-4 font-bold ${hideFull ? 'bg-blue-600 text-white border-blue-800' : 'bg-white border-slate-800'}`}
                >
                  {hideFull ? 'Ocultar Full' : 'Mostrar Full'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar pb-8">
                {filteredPokemons.map(p => {
                  const isSelected = selectedPokemons.some(sp => sp.pokemonId === p.id);
                  
                  return (
                    <div 
                      key={p.id}
                      onClick={() => (!isSelected || isSubstituting) && addPokemon(p)}
                      className={`p-3 border-2 flex items-center gap-4 transition-all-smooth ${isSelected && !isSubstituting ? 'bg-slate-200 border-slate-400 opacity-50 cursor-not-allowed' : 'bg-white border-slate-400 hover:border-blue-500 cursor-pointer'}`}
                    >
                      <div className="relative w-16 h-16 shrink-0 bg-slate-100 border-2 border-slate-300 rounded-lg p-1">
                        <img 
                          src={p.imageUrl || `https://img.pokemondb.net/sprites/home/normal/${p.name_en.toLowerCase()}.png`}
                          alt={p.name_en}
                          className="w-full h-full object-contain drop-shadow-md"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg uppercase flex items-center gap-2">
                          {p.name_en}
                        </h4>
                        <div className="flex gap-2 mt-1">
                          {p.type1 && <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold border border-slate-800 ${TYPE_COLORS[p.type1.toLowerCase()] || 'bg-slate-600 text-white'}`}>{p.type1}</span>}
                          {p.type2 && <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold border border-slate-800 ${TYPE_COLORS[p.type2.toLowerCase()] || 'bg-slate-600 text-white'}`}>{p.type2}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activePokemon ? (
            <div className="gb-box p-6 h-full min-h-[500px] bg-slate-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 border-b-4 border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white border-2 border-slate-300 flex items-center justify-center">
                    <img src={`https://img.pokemondb.net/sprites/home/normal/${activePokemon.name_en.toLowerCase()}.png`} alt={activePokemon.name_en} className="w-16 h-16 object-contain" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold uppercase">{activePokemon.name_en}</h2>
                    <div className="flex gap-2 mt-2">
                      {activePokemon.type1 && <span className={`px-2 py-0.5 uppercase font-bold text-xs border border-slate-800 ${TYPE_COLORS[activePokemon.type1] || 'bg-slate-600 text-white'}`}>{activePokemon.type1}</span>}
                      {activePokemon.type2 && <span className={`px-2 py-0.5 uppercase font-bold text-xs border border-slate-800 ${TYPE_COLORS[activePokemon.type2] || 'bg-slate-600 text-white'}`}>{activePokemon.type2}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => { setIsSubstituting(true); setSearch(""); }}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-yellow-600 font-bold uppercase shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                  >
                    <RefreshCcw size={16} /> Trocar Pokémon
                  </button>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar ataque..."
                      className="w-full pl-10 pr-4 py-2 border-2 border-slate-600 bg-white focus:outline-none focus:border-blue-500 font-bold uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-8 space-y-8">
                {Array.from(new Set(filteredMoves.map(m => m.move.type || 'unknown'))).map(type => (
                  <div key={type}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-1 bg-slate-800 flex-1"></div>
                      <span className={`px-4 py-1.5 uppercase font-bold text-xs border-2 border-slate-800 shadow-[2px_2px_0px_rgba(0,0,0,0.5)] ${TYPE_COLORS[type.toLowerCase()] || 'bg-slate-600 text-white'}`}>
                        {type}
                      </span>
                      <div className="h-1 bg-slate-800 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredMoves.filter(m => (m.move.type || 'unknown') === type).map(({ move }) => {
                        const isSelected = selectedPokemons[activeSlot].moves.includes(move.id);
                        const canSelect = isSelected || selectedPokemons[activeSlot].moves.length < 4;

                        return (
                          <div 
                            key={move.id}
                            onClick={() => canSelect && toggleMove(activeSlot, move.id)}
                            className={`p-4 border-2 flex flex-col justify-between ${isSelected ? 'border-red-500 bg-red-50 shadow-[4px_4px_0px_#ef4444]' : canSelect ? 'bg-white border-slate-400 hover:border-slate-800 hover:shadow-[4px_4px_0px_#1e293b] cursor-pointer' : 'bg-slate-200 border-slate-300 opacity-50 cursor-not-allowed'} transition-all-smooth relative`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-lg uppercase text-slate-800">{move.name_en}</h4>
                                <div className="flex gap-1 mt-1">
                                  {move.type && (
                                    <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold border border-slate-800 ${TYPE_COLORS[move.type.toLowerCase()] || 'bg-slate-600 text-white'}`}>
                                      {move.type}
                                    </span>
                                  )}
                                  {move.category && (
                                    <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold border border-slate-800 ${CLASS_COLORS[move.category.toLowerCase()] || 'bg-slate-600 text-white'}`}>
                                      {move.category}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col text-xs text-slate-600 items-end font-bold">
                                <span title="Power">PWR: {move.power || '-'}</span>
                                <span title="Accuracy">ACC: {move.accuracy || '-'}</span>
                                <span title="PP">PP: {move.pp || '-'}</span>
                              </div>
                            </div>
                            <p className="text-sm font-bold text-slate-700 leading-snug mt-2">
                              {move.short_desc_pt}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <RetroDialog
        isOpen={dialogConfig.isOpen}
        message={dialogConfig.message}
        type={dialogConfig.type}
        onConfirm={() => setDialogConfig(p => ({ ...p, isOpen: false }))}
      />
    </div>
  );
}
