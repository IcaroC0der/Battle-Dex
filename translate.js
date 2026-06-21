const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/icaro/.gemini/antigravity/scratch/pokemon_champions/web/batch_3.json', 'utf8'));

const translations = {
  'rage-powder': {
    short_desc_pt: 'O usuário espalha um pó irritante para atrair a atenção para si. Os Pokémon oponentes focam apenas...',
    effect_pt: 'O usuário espalha um pó irritante para atrair a atenção para si. Os Pokémon oponentes focam seus ataques apenas no usuário.',
    strategic_tips_pt: 'Excelente em batalhas em dupla (VGC) para proteger um aliado crucial enquanto ele se fortalece ou ataca livremente. Cuidado com Pokémon imunes a ataques de pó (tipo Planta ou com o item Safety Goggles).'
  },
  'double-hit': {
    short_desc_pt: 'O usuário atinge o alvo com a cauda ou similar. O alvo é atingido duas vezes seguidas.',
    effect_pt: 'O usuário atinge o alvo com a cauda ou similar. O alvo é atingido duas vezes seguidas.',
    strategic_tips_pt: 'Golpes de múltiplos acertos são ideais para quebrar Substitute, Focus Sash ou a habilidade Sturdy do oponente.'
  },
  'skill-swap': {
    short_desc_pt: 'O usuário usa seu poder psíquico para trocar de Habilidade com o alvo.',
    effect_pt: 'O usuário usa seu poder psíquico para trocar de Habilidade com o alvo.',
    strategic_tips_pt: 'Uma ótima ferramenta tática para remover habilidades problemáticas (como Huge Power ou Levitate) do oponente ou passar uma habilidade benéfica para o seu parceiro em batalhas em dupla.'
  },
  'encore': {
    short_desc_pt: 'O usuário obriga o alvo a repetir o último movimento usado por três turnos.',
    effect_pt: 'O usuário obriga o alvo a repetir o último movimento usado por três turnos.',
    strategic_tips_pt: 'Extremamente poderoso para prender o oponente em movimentos de status (como Protect ou Swords Dance), forçando-o a trocar de Pokémon e dando a você turnos livres.'
  },
  'spit-up': {
    short_desc_pt: 'A energia acumulada usando o movimento Stockpile é liberada de uma vez em um ataque. Quanto mais...',
    effect_pt: 'A energia acumulada usando o movimento Stockpile é liberada de uma vez em um ataque. Quanto mais energia for acumulada, maior o poder do movimento.',
    strategic_tips_pt: 'Requer preparação prévia com Stockpile. Use apenas se você estiver focado em uma estratégia durável, mas geralmente é melhor manter os aumentos defensivos.'
  },
  'grassy-glide': {
    short_desc_pt: 'Deslizando pelo chão, o usuário ataca o alvo. Este movimento sempre ataca primeiro em Grassy Terrain.',
    effect_pt: 'Deslizando pelo chão, o usuário ataca o alvo. Este movimento sempre ataca primeiro se houver Grassy Terrain em campo.',
    strategic_tips_pt: 'Quase obrigatório se você tiver Grassy Terrain. Garante um ataque prioritário de alto dano, sendo excelente para finalizar oponentes rápidos.'
  },
  'astonish': {
    short_desc_pt: 'O usuário ataca o alvo gritando de forma assustadora. Isso também pode fazer o alvo recuar (flinch).',
    effect_pt: 'O usuário ataca o alvo gritando de forma assustadora. Isso também pode fazer o alvo recuar (flinch).',
    strategic_tips_pt: 'Dano muito baixo, servindo apenas para tentar a sorte com o recuo nos estágios iniciais do jogo. Substitua por ataques mais fortes assim que possível.'
  },
  'power-swap': {
    short_desc_pt: 'O usuário usa seu poder psíquico para trocar as alterações nos atributos de Attack e Sp. Atk com o alvo.',
    effect_pt: 'O usuário usa seu poder psíquico para trocar as alterações nos atributos de Attack e Sp. Atk com o alvo.',
    strategic_tips_pt: 'Excelente para neutralizar oponentes que já se buffaram (como com Swords Dance) ou para transferir reduções nos seus próprios atributos para o inimigo.'
  },
  'trick-room': {
    short_desc_pt: 'O usuário cria uma área bizarra na qual os Pokémon mais lentos atacam primeiro por cinco turnos.',
    effect_pt: 'O usuário cria uma área bizarra na qual os Pokémon mais lentos atacam primeiro por cinco turnos.',
    strategic_tips_pt: 'Fundamental em equipes lentas e defensivas, revertendo a vantagem de velocidade. Ideal para usar com atacantes de baixa velocidade para garantir que ajam primeiro.'
  },
  'uproar': {
    short_desc_pt: 'O usuário ataca fazendo um escândalo por três turnos. Durante esse tempo, nenhum Pokémon pode dormir.',
    effect_pt: 'O usuário ataca fazendo um escândalo por três turnos. Durante esse tempo, nenhum Pokémon pode cair no sono.',
    strategic_tips_pt: 'Útil para causar dano consistente enquanto bloqueia estratégias de sono (como Spore ou Yawn) do oponente, mas te prende a este golpe por turnos repetidos.'
  },
  'substitute': {
    short_desc_pt: 'O usuário cria um substituto usando parte do seu próprio HP. O substituto serve como isca do usuário.',
    effect_pt: 'O usuário cria um substituto usando parte do seu próprio HP. O substituto serve como isca e recebe os danos no lugar do usuário.',
    strategic_tips_pt: 'Excelente para bloquear mudanças de status (como Toxic ou Will-O-Wisp) e evitar o impacto direto de ataques previsíveis. Exige cuidado com a perda de HP ao usar.'
  },
  'sky-attack': {
    short_desc_pt: 'O usuário ataca no turno seguinte ao uso deste movimento. Este movimento tem uma chance maior de...',
    effect_pt: 'O usuário ataca no turno seguinte ao uso deste movimento. Este movimento tem uma chance maior de acerto crítico e também pode fazer o alvo recuar (flinch).',
    strategic_tips_pt: 'Muito poderoso, mas leva dois turnos para atacar. Geralmente combinado com o item Power Herb para executá-lo em apenas um turno e causar um impacto surpresa massivo.'
  },
  'signal-beam': {
    short_desc_pt: 'Este movimento não pode ser usado. É recomendado que ele seja esquecido. Uma vez esquecido, este...',
    effect_pt: 'Este movimento não pode ser usado. É recomendado que ele seja esquecido. Uma vez esquecido, este movimento não poderá ser lembrado.',
    strategic_tips_pt: 'Movimento removido nos jogos mais recentes (como Scarlet & Violet). Se presente, tem o pequeno benefício de uma chance de confundir, mas perdeu funcionalidade na geração atual.'
  },
  'quick-guard': {
    short_desc_pt: 'O usuário protege a si mesmo e a seus aliados de ataques com prioridade.',
    effect_pt: 'O usuário protege a si mesmo e a seus aliados de ataques com prioridade.',
    strategic_tips_pt: 'Essencial no VGC para bloquear movimentos vitais como Fake Out, Extreme Speed, Prankster Taunt e Grassy Glide, protegendo sua equipe inteira.'
  },
  'toxic': {
    short_desc_pt: 'Um movimento que deixa o alvo gravemente envenenado. O dano de veneno piora a cada turno.',
    effect_pt: 'Um movimento que deixa o alvo gravemente envenenado. O dano de veneno piora gradativamente a cada turno.',
    strategic_tips_pt: 'A principal forma de derrotar Pokémon muito defensivos. O dano escalonado pressiona fortemente a durabilidade inimiga, forçando trocas constantes.'
  },
  'overheat': {
    short_desc_pt: 'O usuário ataca o alvo com toda a sua força. O recuo deste movimento reduz severamente o Sp. Atk...',
    effect_pt: 'O usuário ataca o alvo com toda a sua força. O recuo deste movimento reduz severamente o Sp. Atk do usuário.',
    strategic_tips_pt: 'Um golpe nuclear de uso único, ótimo para derrubar ameaças críticas rapidamente. Como seu Sp. Atk cai drasticamente depois, esteja preparado para recuar seu Pokémon logo em seguida.'
  },
  'imprison': {
    short_desc_pt: 'Se Pokémon oponentes conhecerem algum movimento que o usuário também conheça, eles serão impedidos...',
    effect_pt: 'Se Pokémon oponentes conhecerem algum movimento que o usuário também conheça, eles serão impedidos de usá-lo.',
    strategic_tips_pt: 'Uma ferramenta fantástica em combates duplos (VGC) para bloquear ataques como Trick Room ou Protect. Monte um conjunto de ataques comuns para maximizar as opções inimigas travadas.'
  },
  'close-combat': {
    short_desc_pt: 'O usuário luta contra o alvo de perto, causando dano sem se defender. Isso também diminui a Defe...',
    effect_pt: 'O usuário luta contra o alvo de perto, causando dano sem se defender. Isso também diminui a Defense e Sp. Def do usuário.',
    strategic_tips_pt: 'Dano avassalador com 100% de precisão. O preço de reduzir suas defesas vale a pena para assegurar um nocaute, mas evite usar se precisar que seu Pokémon aguente golpes depois.'
  },
  'stone-edge': {
    short_desc_pt: 'O usuário apunhala o alvo com pedras afiadas. Este movimento tem uma chance maior de acerto crítico.',
    effect_pt: 'O usuário apunhala o alvo com pedras afiadas. Este movimento tem uma chance maior de conseguir um acerto crítico.',
    strategic_tips_pt: 'Possui excelente cobertura ofensiva, mas a precisão de 80% o torna arriscado. Pode virar jogos devido à alta taxa de crítico, porém não confie cegamente nele em momentos vitais.'
  },
  'electro-shot': {
    short_desc_pt: 'O usuário acumula eletricidade no primeiro turno, aumentando seu Sp. Atk, e dispara um tiro de alta...',
    effect_pt: 'O usuário acumula eletricidade no primeiro turno, aumentando seu Sp. Atk, e dispara um tiro de alta voltagem no próximo turno. Sob chuva, o tiro é disparado imediatamente.',
    strategic_tips_pt: 'Fenomenal em equipes de chuva. Você ganha um aumento gratuito de Sp. Atk e ataca no mesmo turno com dano massivo, evitando a espera natural de dois turnos do golpe.'
  },
  'spikes': {
    short_desc_pt: 'O usuário coloca uma armadilha de espinhos aos pés da equipe oponente. Os espinhos causarão dano aos Po...',
    effect_pt: 'O usuário coloca uma armadilha de espinhos aos pés da equipe oponente. Os espinhos causarão dano aos Pokémon oponentes que entrarem na batalha.',
    strategic_tips_pt: 'Um dos melhores "Entry Hazards". Você pode acumular até 3 camadas para causar até 25% de dano residual a cada vez que o oponente colocar um novo Pokémon (não-voador) em campo.'
  },
  'rapid-spin': {
    short_desc_pt: 'O usuário executa um ataque giratório que também pode eliminar os efeitos de movimentos como Bind, Wr...',
    effect_pt: 'O usuário executa um ataque giratório que também pode eliminar os efeitos de movimentos como Bind, Wrap e Leech Seed, além de limpar armadilhas (Hazards). Isso também aumenta a Speed do usuário.',
    strategic_tips_pt: 'Vital para remover armadilhas perigosas (como Stealth Rock e Spikes) do seu lado do campo. Ao mesmo tempo, ele aumenta a sua velocidade, sendo excelente tanto tática quanto ofensivamente.'
  },
  'magnet-rise': {
    short_desc_pt: 'O usuário levita usando magnetismo gerado eletricamente por cinco turnos.',
    effect_pt: 'O usuário levita usando magnetismo gerado eletricamente por cinco turnos, tornando-se imune a ataques tipo Terrestre.',
    strategic_tips_pt: 'Uma ótima tática surpresa para Pokémon do tipo Elétrico ou Metálico vulneráveis a Earthquake. Use no momento certo e transforme uma fraqueza de 4x em uma imunidade temporária.'
  },
  'endeavor': {
    short_desc_pt: 'O usuário causa dano reduzindo o HP do alvo para que fique igual ao HP atual do usuário.',
    effect_pt: 'O usuário causa dano reduzindo o HP do alvo para que fique igual ao HP atual do usuário.',
    strategic_tips_pt: 'Uma tática surpreendente (como a estratégia F.E.A.R.). Com um Pokémon muito frágil segurando Focus Sash para resistir com 1 de HP, você pode usar Endeavor para também reduzir o oponente a 1 de HP.'
  },
  'focus-energy': {
    short_desc_pt: 'O usuário respira fundo e foca para que seus próximos ataques tenham uma chance maior de acerto crí...',
    effect_pt: 'O usuário respira fundo e foca para que seus próximos ataques tenham uma chance maior de acertos críticos.',
    strategic_tips_pt: 'Usado em nichos muito específicos (como Sniper Kingdra) acompanhado de itens como Scope Lens, garantindo que todo ataque a partir de agora seja sempre um acerto crítico, ignorando defesas.'
  },
  'sandstorm': {
    short_desc_pt: 'Uma tempestade de areia de cinco turnos é invocada para causar dano a todos os Pokémon, exceto tipo Pe...',
    effect_pt: 'Uma tempestade de areia de cinco turnos é invocada para causar dano a todos os Pokémon, exceto tipo Pedra, Terrestre e Metálico. Ela também aumenta a Sp. Def dos tipo Pedra.',
    strategic_tips_pt: 'Quase sempre ativado por habilidades (como Sand Stream), mas invocar manualmente pode ajudar a controlar o clima e aumentar a Sp. Def dos seus Pokémon tipo Pedra em 50%.'
  },
  'brave-bird': {
    short_desc_pt: 'O usuário recolhe suas asas e investe em baixa altitude. Isso também fere bastante o usuário.',
    effect_pt: 'O usuário recolhe suas asas e investe em baixa altitude. Isso também fere o próprio usuário devido ao recuo (recoil).',
    strategic_tips_pt: 'Dano imediato violento do tipo Voador. O forte recuo drena seu próprio HP rapidamente, então geralmente requer usar para garantir abates importantes e aceitar o sacrifício inevitável do usuário.'
  },
  'circle-throw': {
    short_desc_pt: 'O alvo é arremessado e um Pokémon diferente é arrastado para fora. Na natureza, isso encerra uma bata...',
    effect_pt: 'O alvo é arremessado e um Pokémon diferente é arrastado para a batalha. Na natureza, isso encerra uma batalha contra um único Pokémon.',
    strategic_tips_pt: 'Ataque com prioridade negativa, ou seja, ataca por último. Muito bom defensivamente, forçando a saída de Pokémon inimigos que estão aumentando seus próprios atributos para recomeçar o jogo deles.'
  },
  'waterfall': {
    short_desc_pt: 'O usuário investe contra o alvo e pode fazê-lo recuar (flinch).',
    effect_pt: 'O usuário investe contra o alvo e pode fazê-lo recuar (flinch).',
    strategic_tips_pt: 'Um ataque excelente de tipo Água, forte e com precisão de 100%. A chance de 20% de flinch é ótima para Pokémon de alta velocidade superarem adversários irritantes.'
  },
  'supercell-slam': {
    short_desc_pt: 'O usuário eletrifica seu corpo e cai sobre o alvo para causar dano. Se este movimento errar, o usu...',
    effect_pt: 'O usuário eletrifica seu corpo e cai sobre o alvo para causar dano. Se este movimento errar, o usuário receberá dano em vez do oponente.',
    strategic_tips_pt: 'Dano fortíssimo, mas arriscado. Bater e errar, ou bater e acertar Protect do oponente, causará 50% de dano a si mesmo. Tente prever o oponente antes de cometer esse ataque.'
  },
  'assurance': {
    short_desc_pt: 'O poder deste movimento dobra se o alvo já tiver recebido algum dano no mesmo turno.',
    effect_pt: 'O poder deste movimento dobra se o alvo já tiver recebido algum dano no mesmo turno.',
    strategic_tips_pt: 'Brilha muito em VGC (Duplas), sendo ótimo para combinar com um atacante mais rápido no seu lado que acerte o alvo primeiro ou dano residual como Stealth Rock.'
  },
  'wave-crash': {
    short_desc_pt: 'O usuário se envolve em água e colide contra o alvo com o corpo inteiro. Isso também danifica bastante...',
    effect_pt: 'O usuário se envolve em água e colide contra o alvo com o corpo inteiro para causar dano. Isso também causa bastante dano de recuo ao usuário.',
    strategic_tips_pt: 'Dano extremo do tipo Água com 100% de precisão. O alto custo de recuo compensa o grande aumento de dano em relação ao Waterfall, ideal para garantir abates que seriam impossíveis de outra forma.'
  },
  'shadow-punch': {
    short_desc_pt: 'O usuário dá um soco a partir das sombras. Este ataque nunca erra.',
    effect_pt: 'O usuário dá um soco a partir das sombras. Este ataque nunca erra.',
    strategic_tips_pt: 'Movimento situacional bom apenas contra oponentes que abusam de aumentos de Evasão (como Double Team ou Minimize). Para outros casos, há golpes mais poderosos disponíveis.'
  },
  'volt-switch': {
    short_desc_pt: 'Após realizar seu ataque, o usuário volta rapidamente para trocar de lugar com um Pokémon na reserva.',
    effect_pt: 'Após realizar seu ataque, o usuário volta rapidamente para trocar de lugar com um Pokémon da equipe que esteja na reserva.',
    strategic_tips_pt: 'Um dos melhores movimentos de pivot do jogo. Ele permite dar dano e manter a iniciativa das trocas, prevendo a estratégia do oponente de forma proativa. Não funciona contra os do tipo Terrestre!'
  },
  'frost-breath': {
    short_desc_pt: 'O usuário ataca soprando seu hálito frio no alvo. Este movimento sempre acerta um ataque crítico.',
    effect_pt: 'O usuário ataca soprando seu hálito frio no alvo. Este movimento sempre resulta em um acerto crítico.',
    strategic_tips_pt: 'Excelente forma de ignorar aumentos de defesa ou Calm Mind do oponente e ignora quedas do seu Sp. Atk, mas atenção à sua precisão de 90% que pode te deixar na mão em horas cruciais.'
  },
  'thrash': {
    short_desc_pt: 'O usuário ataca enfurecidamente de dois a três turnos. Em seguida, o usuário fica confuso.',
    effect_pt: 'O usuário ataca enfurecidamente por dois a três turnos seguidos. O usuário então fica confuso após terminar a sequência.',
    strategic_tips_pt: 'Alto risco por ser do tipo Normal e te travar em campo, tornando-o suscetível à Pokémon do tipo Fantasma entrarem de graça na batalha sem tomar dano. Útil apenas no começo do jogo (in-game).'
  },
  'bounce': {
    short_desc_pt: 'O usuário salta alto no primeiro turno e depois cai sobre o alvo no turno seguinte. Isso também...',
    effect_pt: 'O usuário salta alto no primeiro turno e depois cai sobre o alvo no turno seguinte. Isso também pode causar paralisia ao alvo.',
    strategic_tips_pt: 'Combinar com Dinamax ou usar o Z-Move converte isso para um dano imenso de turno único. Fora isso, sua natureza de dois turnos dá tempo para o inimigo reagir livremente.'
  },
  'hex': {
    short_desc_pt: 'Este ataque implacável causa danos massivos a um alvo afetado por condições de status.',
    effect_pt: 'Este ataque implacável causa danos massivos a um alvo que esteja afetado por condições de status (veneno, paralisia, queimadura, etc).',
    strategic_tips_pt: 'Dobra de poder de 65 para 130 se o oponente tiver uma condição de status. Funciona espetacularmente bem em Pokémon tipo Fantasma com acesso a movimentos como Will-O-Wisp e Thunder Wave.'
  },
  'night-shade': {
    short_desc_pt: 'O usuário faz o alvo ver uma miragem assustadora. Causa um dano fixo igual ao nível do usuário.',
    effect_pt: 'O usuário faz o alvo ver uma miragem assustadora. Causa um dano fixo exatamente igual ao nível do usuário.',
    strategic_tips_pt: 'Movimento essencial para Pokémon puramente defensivos (como Dusclops). Dano fixo (100 no nível 100) ignora aumentos na defesa especial do oponente ou fraquezas ofensivas do seu Pokémon.'
  },
  'horn-drill': {
    short_desc_pt: 'O usuário apunhala o alvo com um chifre que gira como uma broca. O alvo desmaia instantaneamente...',
    effect_pt: 'O usuário apunhala o alvo com um chifre que gira como uma broca. O alvo desmaia instantaneamente (OHKO) se este ataque acertar.',
    strategic_tips_pt: 'Um ataque de OHKO. Depende inteiramente de RNG com seus meros 30% de chance de acerto. É muito arriscado usar em cenários competitivos devido a falta de confiabilidade consistente.'
  },
  'mystical-fire': {
    short_desc_pt: 'O usuário ataca soprando um fogo especial e quente. Isso também diminui o Sp. Atk do alvo.',
    effect_pt: 'O usuário ataca soprando um fogo especial e escaldante. Isso também diminui o atributo de Sp. Atk do alvo em um nível.',
    strategic_tips_pt: 'Oportunidade tática brilhante de cobertura. Para fadas e psíquicos é essencial quebrar tipos Aço e causar impacto nas chances de atacantes especiais adversários quebrarem o seu time.'
  },
  'dive': {
    short_desc_pt: 'O usuário mergulha no primeiro turno, depois flutua e ataca no turno seguinte.',
    effect_pt: 'O usuário mergulha no primeiro turno, depois volta à superfície e ataca no turno seguinte.',
    strategic_tips_pt: 'Um ataque de dois turnos, sendo evitado em competições pois dá a chance de troca ou proteção para o alvo. Mais utilizado no percurso principal do jogo como meio de navegação.'
  },
  'switcheroo': {
    short_desc_pt: 'O usuário troca de item segurado com o alvo mais rápido do que os olhos podem acompanhar.',
    effect_pt: 'O usuário troca seu próprio item segurado pelo item do alvo mais rápido do que os olhos podem acompanhar.',
    strategic_tips_pt: 'Destruidor de defesas! Passar um Choice Scarf ou Choice Band para um Pokémon puramente defensivo (como Blissey ou Toxapex) neutralizará quase por completo o papel deles na partida.'
  },
  'body-slam': {
    short_desc_pt: 'O usuário ataca caindo sobre o alvo com todo o peso do corpo. Isso também pode paralisar o alvo.',
    effect_pt: 'O usuário ataca caindo sobre o alvo com todo o peso do seu corpo. Isso também pode deixar o alvo com paralisia.',
    strategic_tips_pt: 'Ataque muito seguro com seus agradáveis 30% de chance de paralisia, um bônus bem-vindo que frequentemente atrapalha a velocidade de inimigos rápidos que pudessem representar um problema.'
  },
  'low-kick': {
    short_desc_pt: 'Um chute baixo poderoso que faz o alvo cair. Quanto mais pesado o alvo, maior o poder deste...',
    effect_pt: 'Um chute baixo poderoso que derruba o alvo. Quanto mais pesado for o alvo, maior será o poder final do movimento.',
    strategic_tips_pt: 'Incrível para perfurar Snorlax, Tyranitar, Aggron e outros Pokémon enormes e lentos onde você não tem acesso à Close Combat, alcançando até base de 120 de poder na maioria dos casos pesados.'
  }
};

const updatedData = data.map(move => {
  if (translations[move.id]) {
    move.short_desc_pt = translations[move.id].short_desc_pt;
    move.effect_pt = translations[move.id].effect_pt;
    move.strategic_tips_pt = translations[move.id].strategic_tips_pt;
  }
  return move;
});

fs.writeFileSync('C:/Users/icaro/.gemini/antigravity/scratch/pokemon_champions/web/translated_3.json', JSON.stringify(updatedData, null, 2), 'utf8');
console.log('Translation completed and saved successfully.');
