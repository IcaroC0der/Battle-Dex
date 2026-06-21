const fs = require('fs');
const path = 'C:/Users/icaro/.gemini/antigravity/scratch/pokemon_champions/web/batch_5.json';
const outPath = 'C:/Users/icaro/.gemini/antigravity/scratch/pokemon_champions/web/translated_5.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

const translations = {
  'acid-spray': {
    short: 'O usuário ataca cuspindo um fluido que derrete o alvo. Isso também reduz drasticamente...',
    eff: 'O usuário ataca cuspindo um fluido que derrete o alvo. Isso também reduz drasticamente a Special Defense do alvo.',
    tips: 'Use Acid Spray para forçar a redução da Defesa Especial do inimigo, abrindo caminho para que você ou um aliado cause danos mágicos altíssimos.'
  },
  'iron-defense': {
    short: 'O usuário endurece a superfície do seu corpo como ferro, aumentando drasticamente sua Defense...',
    eff: 'O usuário endurece a superfície do seu corpo como ferro, aumentando drasticamente sua Defense.',
    tips: 'Perfeito para transformar seu Pokémon em uma muralha física, tornando quase impossível que o adversário o derrote com golpes físicos.'
  },
  'wish': {
    short: 'Um turno após usar este movimento, o HP do usuário ou de seu substituto é restaurado em até met...',
    eff: 'Um turno após usar este movimento, o HP do usuário ou de seu substituto é restaurado em até metade do HP máximo do usuário.',
    tips: 'Use Wish e depois troque de Pokémon para curar aliados enfraquecidos com segurança, mantendo a longevidade da sua equipe.'
  },
  'copycat': {
    short: 'O usuário imita o movimento usado imediatamente antes dele. O movimento falha se nenhum outro m...',
    eff: 'O usuário imita o movimento usado imediatamente antes dele. O movimento falha se nenhum outro movimento tiver sido usado ainda.',
    tips: 'Exige muita leitura do oponente. Pode ser útil para roubar buffs ou ataques poderosos recém-usados na partida.'
  },
  'dragon-pulse': {
    short: 'O alvo é atacado com uma onda de choque gerada pela boca escancarada do usuário...',
    eff: 'O alvo é atacado com uma onda de choque gerada pela boca escancarada do usuário.',
    tips: 'Um ataque Dragon confiável, sem desvantagens. Excelente para causar dano consistente em alvos que não sejam do tipo Fada ou Aço.'
  },
  'chilling-water': {
    short: 'O usuário ataca o alvo banhando-o com uma água tão fria que drena seu poder. Is...',
    eff: 'O usuário ataca o alvo banhando-o com uma água tão fria que drena seu poder. Isso também diminui o Attack do alvo.',
    tips: 'Ótimo para prejudicar atacantes físicos adversários. Ao reduzir o Attack deles, você garante mais sobrevivência para o seu time.'
  },
  'amnesia': {
    short: 'O usuário esvazia temporariamente a mente para esquecer suas preocupações. Isso aumenta d...',
    eff: 'O usuário esvazia temporariamente a mente para esquecer suas preocupações. Isso aumenta drasticamente a Special Defense do usuário.',
    tips: 'Use contra oponentes focados em dano especial. Com a Defesa Especial dobrada, os ataques mágicos farão cócegas.'
  },
  'hypnosis': {
    short: 'O usuário emprega sugestão hipnótica para fazer o alvo adormecer...',
    eff: 'O usuário emprega sugestão hipnótica para fazer o alvo adormecer.',
    tips: 'Tem baixa precisão, mas se acertar, desabilita completamente um oponente por alguns turnos. Muito útil para criar aberturas.'
  },
  'spite': {
    short: 'O usuário libera seu rancor no último movimento usado pelo alvo, cortando 4 PP dele...',
    eff: 'O usuário libera seu rancor no último movimento usado pelo alvo, cortando 4 PP dele.',
    tips: 'Especialmente eficaz contra ataques fortes de baixo PP. Pode inutilizar o melhor movimento de dano do oponente muito rapidamente.'
  },
  'flame-burst': {
    short: 'Este movimento não pode ser usado. Recomenda-se que seja esquecido. Uma vez esquecid...',
    eff: 'Este movimento não pode ser usado. Recomenda-se que seja esquecido. Uma vez esquecido, este movimento não pode ser lembrado.',
    tips: 'Este é um ataque obsoleto, então foque em substituí-lo o mais rápido possível por opções mais viáveis e modernas.'
  },
  'last-respects': {
    short: 'O usuário ataca para vingar seus aliados. Quanto mais aliados derrotados houver na equip...',
    eff: 'O usuário ataca para vingar seus aliados. Quanto mais aliados derrotados houver na equipe do usuário, maior será o poder do movimento.',
    tips: 'O grande trunfo de fim de jogo. Guarde o Pokémon com esse ataque para ser o último vivo, causando danos avassaladores.'
  },
  'protect': {
    short: 'Este movimento permite que o usuário se proteja de todos os ataques. A chance de falh...',
    eff: 'Este movimento permite que o usuário se proteja de todos os ataques. A chance de falhar aumenta se for usado em sucessão.',
    tips: 'Essencial em batalhas em dupla ou para gastar turnos de climas, terrenos, ou veneno adversário. Não use várias vezes seguidas.'
  },
  'heat-wave': {
    short: 'O usuário ataca exalando um hálito quente nos Pokémon oponentes. Isso também pode dei...',
    eff: 'O usuário ataca exalando um hálito quente nos Pokémon oponentes. Isso também pode deixá-los com queimadura.',
    tips: 'Incrível em batalhas de dupla, pois atinge ambos os oponentes de uma vez, com a chance adicional de aplicar queimadura.'
  },
  'nasty-plot': {
    short: 'O usuário estimula seu cérebro pensando em coisas ruins. Isso aumenta drasticame...',
    eff: 'O usuário estimula seu cérebro pensando em coisas ruins. Isso aumenta drasticamente o Special Attack do usuário.',
    tips: 'Transforma Pokémon com ataques mágicos em máquinas de destruição. Use em momentos que você saiba que o oponente irá trocar de Pokémon ou usar um golpe fraco.'
  },
  'meteor-beam': {
    short: 'O usuário coleta energia do espaço e aumenta seu Special Attack no primeiro turno, depo...',
    eff: 'O usuário coleta energia do espaço e aumenta seu Special Attack no primeiro turno, depois ataca no próximo turno.',
    tips: 'Use com o item Power Herb para pular o turno de carga, ganhando o aumento de Special Attack e causando um dano devastador no mesmo turno.'
  },
  'rock-slide': {
    short: 'Grandes rochas são arremessadas contra os Pokémon oponentes para causar dano. Isso ta...',
    eff: 'Grandes rochas são arremessadas contra os Pokémon oponentes para causar dano. Isso também pode fazer os Pokémon oponentes recuarem (flinch).',
    tips: 'Movimento clássico de batalhas em dupla. Com Pokémon velozes, a chance dupla de causar "flinch" nos oponentes pode mudar o rumo da partida.'
  },
  'rising-voltage': {
    short: 'O usuário ataca com eletricidade que sobe do chão. O poder deste movimento é dob...',
    eff: 'O usuário ataca com eletricidade que sobe do chão. O poder deste movimento é dobrado se o alvo estiver em Eletric Terrain.',
    tips: 'Absolutamente mortal se o Electric Terrain estiver ativo. Combine isso com parceiros que invocam o terreno para desintegrar oponentes.'
  },
  'shell-smash': {
    short: 'O usuário quebra sua concha, o que reduz suas Defense e Sp. Def, mas aumenta dra...',
    eff: 'O usuário quebra sua concha, o que reduz suas Defense e Sp. Def, mas aumenta drasticamente seus status de Attack, Sp. Atk e Speed.',
    tips: 'Um dos melhores buffs do jogo! O Pokémon fica frágil, mas rápido e letal. Tente combinar com o item White Herb para curar as reduções de defesa.'
  },
  'aqua-ring': {
    short: 'O usuário se envolve em um véu feito de água. Ele recupera um pouco de HP a cad...',
    eff: 'O usuário se envolve em um véu feito de água. Ele recupera um pouco de HP a cada turno.',
    tips: 'Muito útil para táticas lentas e de sobrevivência (stall), especialmente se combinado com itens de cura passiva como Leftovers.'
  },
  'power-gem': {
    short: 'O usuário ataca com um raio de luz que brilha como se fosse feito de pedras preciosa...',
    eff: 'O usuário ataca com um raio de luz que brilha como se fosse feito de pedras preciosas.',
    tips: 'Uma das melhores opções ofensivas especiais do tipo Pedra. Extremamente consistente, com 100% de precisão e sem efeitos negativos.'
  },
  'seismic-toss': {
    short: 'O alvo é arremessado usando o poder da gravidade. Causa dano igual ao nível do us...',
    eff: 'O alvo é arremessado usando o poder da gravidade. Causa dano igual ao nível do usuário.',
    tips: 'Ótimo para Pokémon defensivos. Independe dos seus status de ataque, causando sempre um valor fixo e previsível, o que é excelente para furar muralhas.'
  },
  'poison-fang': {
    short: 'O usuário morde o alvo com presas tóxicas. Isso também pode deixar o alvo gravemen...',
    eff: 'O usuário morde o alvo com presas tóxicas. Isso também pode deixar o alvo gravemente envenenado (badly poisoned).',
    tips: 'A chance de aplicar "Toxic" envenenamento (dano progressivo) é fantástica, excelente para minar oponentes resistentes a longo prazo.'
  },
  'ice-fang': {
    short: 'O usuário morde com presas infundidas de frio. Isso também pode fazer o alvo recu...',
    eff: 'O usuário morde com presas infundidas de frio. Isso também pode fazer o alvo recuar (flinch) ou deixá-lo congelado.',
    tips: 'Bom para cobertura ofensiva. Apesar do poder não ser tão alto, as chances de congelamento ou recuo podem salvar partidas.'
  },
  'rock-polish': {
    short: 'O usuário polir seu corpo para reduzir a resistência do ar. Isso aumenta drastica...',
    eff: 'O usuário polir seu corpo para reduzir a resistência do ar. Isso aumenta drasticamente o Speed do usuário.',
    tips: 'Ideal para Pokémon fortes, mas lentos. Com a Velocidade dobrada, eles podem ultrapassar toda a equipe adversária e dominar a batalha.'
  },
  'cross-chop': {
    short: 'O usuário desfere um golpe duplo com os antebraços cruzados. Este movimento tem um...',
    eff: 'O usuário desfere um golpe duplo com os antebraços cruzados. Este movimento tem uma chance elevada de acertar um acerto crítico.',
    tips: 'Forte, com boa chance de crítico que fura melhorias defensivas. No entanto, sua precisão não é perfeita, então assuma os riscos ao usá-lo.'
  },
  'sludge-wave': {
    short: 'O usuário atinge tudo ao seu redor inundando a área com uma onda gigante de lodo. ...',
    eff: 'O usuário atinge tudo ao seu redor inundando a área com uma onda gigante de lodo. Isso também pode envenenar quem for atingido.',
    tips: 'Extremamente forte em combates em dupla, mas lembre-se: ele atinge também seu parceiro! Use com aliados do tipo Aço ou com a habilidade Telepathy.'
  },
  'pounce': {
    short: 'O usuário ataca saltando sobre o alvo. Isso também reduz o status de Speed do alv...',
    eff: 'O usuário ataca saltando sobre o alvo. Isso também reduz o status de Speed do alvo.',
    tips: 'Muito útil para controlar a velocidade da batalha. Permite que Pokémon lentos ganhem vantagem nos turnos seguintes prejudicando o alvo.'
  },
  'gyro-ball': {
    short: 'O usuário ataca o alvo com um giro em alta velocidade. Quanto mais lento for o u...',
    eff: 'O usuário ataca o alvo com um giro em alta velocidade. Quanto mais lento for o usuário em relação ao alvo, maior será o poder do movimento.',
    tips: 'Excepcional em Pokémon lentos como Ferrothorn ou Bronzong, além de punir times adversários velozes com danos imensos.'
  },
  'role-play': {
    short: 'O usuário imita o alvo completamente, copiando a Habilidade do alvo...',
    eff: 'O usuário imita o alvo completamente, copiando a Habilidade do alvo.',
    tips: 'Excelente em partidas em dupla para copiar Habilidades cruciais (como Intimidate ou Weather setters) e usar estratégias surpresa contra os adversários.'
  },
  'low-sweep': {
    short: 'O usuário faz um ataque rápido nas pernas do alvo, o que diminui a Speed do alvo...',
    eff: 'O usuário faz um ataque rápido nas pernas do alvo, o que diminui a Speed do alvo.',
    tips: 'Útil para punir alvos mais rápidos, reduzindo sua velocidade para garantir vantagem tática para a sua equipe nos turnos subsequentes.'
  },
  'zen-headbutt': {
    short: 'O usuário concentra sua força de vontade na cabeça e ataca o alvo. Isso também ...',
    eff: 'O usuário concentra sua força de vontade na cabeça e ataca o alvo. Isso também pode fazer o alvo recuar (flinch).',
    tips: 'Ótima cobertura física do tipo Psíquico. A chance de "flinch" pode arruinar os planos de um inimigo se você for mais rápido.'
  },
  'icicle-crash': {
    short: 'O usuário ataca lançando grandes sincelos de gelo no alvo. Isso também pode faz...',
    eff: 'O usuário ataca lançando grandes sincelos de gelo no alvo. Isso também pode fazer o alvo recuar (flinch).',
    tips: 'Movimento físico do tipo Gelo mais consistente. Combine com a agilidade do seu Pokémon para conseguir flinches no oponente que podem virar o jogo.'
  },
  'cosmic-power': {
    short: 'O usuário absorve um poder místico do espaço para aumentar suas estatísticas de...',
    eff: 'O usuário absorve um poder místico do espaço para aumentar suas estatísticas de Defense e Sp. Def.',
    tips: 'Muito poderoso em setups defensivos. Usado repetidas vezes, torna seu Pokémon praticamente imortal a menos que oponente tenha ataques críticos frequentes.'
  },
  'dragon-tail': {
    short: 'O alvo é jogado para longe, e um Pokémon diferente é arrastado para fora. Na natu...',
    eff: 'O alvo é jogado para longe, e um Pokémon diferente é arrastado para fora. Na natureza, isso encerra uma batalha contra um único Pokémon.',
    tips: 'O movimento age no final do turno, e é excelente para impedir que adversários preparem melhorias (buffs) de ataque. Force trocas constantes para acumular dano de Stealth Rock ou Spikes.'
  },
  'discharge': {
    short: 'O usuário atinge tudo ao seu redor soltando uma faísca de eletricidade. Isso ta...',
    eff: 'O usuário atinge tudo ao seu redor soltando uma faísca de eletricidade. Isso também pode paralisar aqueles que forem atingidos.',
    tips: 'Cuidado ao usá-lo em batalhas em dupla, pois fere também seu aliado. Combine-o com Pokémon do tipo Terrestre ou com a habilidade Volt Absorb!'
  },
  'crush-claw': {
    short: 'O usuário corta o alvo com garras duras e afiadas. Isso também pode reduzir a D...',
    eff: 'O usuário corta o alvo com garras duras e afiadas. Isso também pode reduzir a Defense do alvo.',
    tips: 'Muito subestimado. A possibilidade alta de cortar a defesa física do alvo ajuda atacantes em equipe a derrubar facilmente tanques físicos.'
  },
  'stockpile': {
    short: 'O usuário armazena poder e aumenta suas Defense e Sp. Def. Este movimento po...',
    eff: 'O usuário armazena poder e aumenta suas Defense e Sp. Def. Este movimento pode ser usado até três vezes.',
    tips: 'Excelente aumento defensivo em um só turno. Muitas vezes combado com Swallow (para curar) ou Spit Up (para dano explosivo).'
  },
  'brick-break': {
    short: 'O usuário ataca com um golpe rápido. Este movimento também pode quebrar barr...',
    eff: 'O usuário ataca com um golpe rápido. Este movimento também pode quebrar barreiras, como Light Screen e Reflect.',
    tips: 'Uma resposta incrível se você perceber que o time adversário usa barreiras para tentar suportar seus ataques. Quebre as defesas logo de cara!'
  },
  'screech': {
    short: 'Um grito ensurdecedor diminui drasticamente a Defense do alvo...',
    eff: 'Um grito ensurdecedor diminui drasticamente a Defense do alvo.',
    tips: 'Corta a defesa adversária pela metade. Útil quando você está contra inimigos extremamente resistentes fisicamente, mas sua precisão baixa requer cuidado.'
  },
  'after-you': {
    short: 'O usuário ajuda o alvo e faz com que ele use seu movimento logo após o usuário...',
    eff: 'O usuário ajuda o alvo e faz com que ele use seu movimento logo após o usuário.',
    tips: 'Maravilhoso em duplas! Permite que um aliado lento com ataque avassalador haja imediatamente após um parceiro bastante rápido e suporte.'
  },
  'strength-sap': {
    short: 'O usuário restaura seu próprio HP na mesma quantidade do status de Attack do alvo...',
    eff: 'O usuário restaura seu próprio HP na mesma quantidade do status de Attack do alvo. Em seguida, reduz o status de Attack do alvo.',
    tips: 'Uma cura fenomenal que ao mesmo tempo invalida totalmente atacantes físicos. Use contra quem concentra força física e divirta-se frustrando-os.'
  },
  'ancient-power': {
    short: 'O usuário ataca com um poder pré-histórico. Isso também pode aumentar todas as ...',
    eff: 'O usuário ataca com um poder pré-histórico. Isso também pode aumentar todas as estatísticas do usuário de uma só vez.',
    tips: 'O poder base não é grande, mas a chance de 10% de aumentar todas as suas estatísticas pode vencer partidas instantaneamente se acontecer.'
  },
  'raging-fury': {
    short: 'O usuário se enfurece e cospe chamas por dois a três turnos. O usuário então fic...',
    eff: 'O usuário se enfurece e cospe chamas por dois a três turnos. O usuário então fica confuso.',
    tips: 'Uma força brutal, mas muito perigosa. Bloqueia suas outras ações e confunde no final. Reserve para situações onde a vitória é garantida.'
  },
  'whirlpool': {
    short: 'O usuário prende o alvo dentro de um redemoinho violento que inflige dano por q...',
    eff: 'O usuário prende o alvo dentro de um redemoinho violento que inflige dano por quatro a cinco turnos.',
    tips: 'Impede o inimigo de fugir, excelente para aprisionar alvos valiosos e abatê-los de forma consistente, ou para abusar da técnica Perish Song.'
  },
  'wrap': {
    short: 'Um corpo longo, videiras ou algo semelhante são usados para envolver e aperta...',
    eff: 'Um corpo longo, videiras ou algo semelhante são usados para envolver e apertar o alvo por quatro a cinco turnos.',
    tips: 'Atrapalha movimentações inimigas impedindo a troca enquanto causa dano constante, porém seu dano é bastante baixo e depende de táticas de controle.'
  }
};

data.forEach(item => {
  if(translations[item.id]) {
    item.short_desc_pt = translations[item.id].short;
    item.effect_pt = translations[item.id].eff;
    item.strategic_tips_pt = translations[item.id].tips;
  }
});

fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Successfully translated " + data.length + " items to " + outPath);
