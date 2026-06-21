import json
import os

input_file = r"C:\Users\icaro\.gemini\antigravity\scratch\pokemon_champions\web\batch_9.json"
output_file = r"C:\Users\icaro\.gemini\antigravity\scratch\pokemon_champions\web\translated_9.json"

translations = {
  "roar": {
    "short_desc_pt": "O alvo é afugentado, e um Pokémon diferente é forçado a entrar em combate. Na natureza, isso encerra a batalha co...",
    "effect_pt": "O alvo é afugentado, e um Pokémon diferente é forçado a entrar em combate. Na natureza, isso encerra uma batalha contra um único Pokémon.",
    "strategic_tips_pt": "Excelente para forçar a troca do oponente e anular aumentos de atributos ou interromper combos. Combina perfeitamente com armadilhas de campo (Entry Hazards) como Stealth Rock ou Spikes."
  },
  "draco-meteor": {
    "short_desc_pt": "Cometas são invocados dos céus em direção ao alvo. O recuo deste movimento reduz drasticamente o A...",
    "effect_pt": "Cometas são invocados dos céus em direção ao alvo. O recuo deste movimento reduz drasticamente o atributo Special Attack do usuário.",
    "strategic_tips_pt": "Um ataque devastador que funciona melhor como forma de finalizar o oponente ou causar danos maciços antes de trocar de Pokémon. Use em monstrinhos que não dependem de permanecer muito tempo em campo."
  },
  "knock-off": {
    "short_desc_pt": "O usuário arranca o item segurado pelo alvo, tornando-o inutilizável durante aquela batalha. Este movimento causa mais d...",
    "effect_pt": "O usuário arranca o item segurado pelo alvo, tornando-o inutilizável durante aquela batalha. Este movimento causa mais dano se o alvo estiver segurando um item.",
    "strategic_tips_pt": "Um dos ataques utilitários mais fortes do jogo. Além de causar dano adicional significativo contra inimigos com itens, privar o oponente de seus equipamentos pode mudar o rumo da partida."
  },
  "charge": {
    "short_desc_pt": "O usuário acumula energia, aumentando o poder do próximo movimento do tipo Elétrico que utilizar. Isso também aumen...",
    "effect_pt": "O usuário acumula energia, aumentando o poder do próximo movimento do tipo Elétrico que utilizar. Isso também aumenta o atributo de Special Defense do usuário.",
    "strategic_tips_pt": "Ótimo para Pokémon defensivos. Ao mesmo tempo que fortalece suas defesas especiais, garante que o seu próximo ataque Elétrico causará um dano massivo. Combine com ataques poderosos ou de cura."
  },
  "dream-eater": {
    "short_desc_pt": "O usuário devora os sonhos de um alvo adormecido. O HP do usuário é restaurado em até metade do dano sofrid...",
    "effect_pt": "O usuário devora os sonhos de um alvo adormecido. O HP do usuário é restaurado em até metade do dano sofrido pelo alvo.",
    "strategic_tips_pt": "Requer muita preparação, já que só funciona em alvos dormindo. Embora arriscado em batalhas competitivas rápidas, pode ser eficaz se aliado a golpes como Hypnosis ou Spore."
  },
  "charge-beam": {
    "short_desc_pt": "O usuário ataca o alvo com uma carga elétrica. A eletricidade residual também pode aumentar o atri...",
    "effect_pt": "O usuário ataca o alvo com uma carga elétrica. A eletricidade residual também pode aumentar o atributo Special Attack do usuário.",
    "strategic_tips_pt": "Um ataque de poder razoável, mas cujo verdadeiro valor está na alta chance (70%) de aumentar o Special Attack. Ideal para causar dano enquanto você se fortalece simultaneamente."
  },
  "life-dew": {
    "short_desc_pt": "O usuário espalha uma água misteriosa ao seu redor e restaura seu próprio HP e o de seus aliados atua...",
    "effect_pt": "O usuário espalha uma água misteriosa ao seu redor e restaura seu próprio HP e o de seus Pokémon aliados atualmente na batalha.",
    "strategic_tips_pt": "Uma excelente habilidade de suporte em batalhas em dupla. Ajuda a manter a longevidade de sua equipe ativa na arena."
  },
  "quash": {
    "short_desc_pt": "O usuário reprime o alvo e faz com que seu movimento seja o último....",
    "effect_pt": "O usuário reprime o alvo e faz com que seu movimento seja o último.",
    "strategic_tips_pt": "Exclusivo de batalhas em dupla, Quash é incrível contra oponentes rápidos ou fortalecidos. Forçar o inimigo a agir por último permite que seu parceiro o derrote ou aplique efeitos de status primeiro."
  },
  "drain-punch": {
    "short_desc_pt": "O usuário ataca com um soco que drena energia. O HP do usuário é restaurado em até metade do dano so...",
    "effect_pt": "O usuário ataca com um soco que drena energia. O HP do usuário é restaurado em até metade do dano sofrido pelo alvo.",
    "strategic_tips_pt": "O golpe perfeito para lutadores robustos. Proporciona bom dano e aumenta muito a sobrevivência do seu Pokémon ao curá-lo a cada acerto. Fica excelente após um ou dois Bulk Ups."
  },
  "hyper-voice": {
    "short_desc_pt": "O usuário ataca soltando um grito horrivelmente alto e retumbante....",
    "effect_pt": "O usuário ataca soltando um grito horrivelmente alto e retumbante.",
    "strategic_tips_pt": "Excelente movimento de área para batalhas em dupla, ignorando o Substitute do oponente. Torna-se letal em Pokémon com habilidades como Pixilate ou Aerilate."
  },
  "bullet-punch": {
    "short_desc_pt": "O usuário atinge o alvo com socos duros tão rápidos quanto balas. Este movimento ataca sempre primeir...",
    "effect_pt": "O usuário atinge o alvo com socos duros tão rápidos quanto balas. Este movimento ataca sempre primeiro.",
    "strategic_tips_pt": "Movimento de prioridade essencial para finalizar oponentes enfraquecidos antes que eles ataquem. Especialmente assustador em Pokémon com a habilidade Technician."
  },
  "icy-wind": {
    "short_desc_pt": "O usuário ataca com uma rajada de ar gelado. Isso também diminui o atributo de Speed dos Pokémon...",
    "effect_pt": "O usuário ataca com uma rajada de ar gelado. Isso também diminui o atributo de Speed dos Pokémon adversários.",
    "strategic_tips_pt": "Excelente controle de velocidade em batalhas em dupla. Atinge ambos os oponentes e garante que o seu time ataque antes no próximo turno."
  },
  "superpower": {
    "short_desc_pt": "O usuário ataca o alvo com grande poder. Isso também diminui os atributos de Attack e Defense do u...",
    "effect_pt": "O usuário ataca o alvo com grande poder. Isso também diminui os atributos de Attack e Defense do usuário.",
    "strategic_tips_pt": "Gera um dano físico imediato massivo, mas suas penalidades tornam o uso contínuo impossível. Melhor utilizado como um ataque de despedida ou para abater rapidamente um adversário problemático."
  },
  "secret-power": {
    "short_desc_pt": "Este movimento não pode ser usado. Recomenda-se que seja esquecido. Uma vez esquecido, este movi...",
    "effect_pt": "Este movimento não pode ser usado. Recomenda-se que seja esquecido. Uma vez esquecido, este movimento não poderá ser lembrado.",
    "strategic_tips_pt": "Atualmente inútil e indisponível em batalhas competitivas modernas. Se o seu Pokémon tem esse ataque, troque-o o mais rápido possível por um movimento útil."
  },
  "stun-spore": {
    "short_desc_pt": "O usuário espalha uma nuvem de pó entorpecente que paralisa o alvo....",
    "effect_pt": "O usuário espalha uma nuvem de pó entorpecente que paralisa o alvo.",
    "strategic_tips_pt": "Uma maneira de infligir paralisia sem depender de movimentos elétricos. É ótimo para cortar a velocidade de oponentes ofensivos pela metade, mas sua precisão de 75% o torna um pouco arriscado."
  },
  "electro-ball": {
    "short_desc_pt": "O usuário arremessa uma esfera elétrica no alvo. Quanto mais rápido for o usuário em relação ao al...",
    "effect_pt": "O usuário arremessa uma esfera elétrica no alvo. Quanto mais rápido for o usuário em relação ao alvo, maior será o poder do movimento.",
    "strategic_tips_pt": "Pode causar um estrago absurdo se usado por Pokémon muito rápidos ou combinado com Paralisia no oponente e aumentos de Velocidade no seu time."
  },
  "throat-chop": {
    "short_desc_pt": "O usuário ataca a garganta do alvo, e o sofrimento resultante impede o alvo de usar moviment...",
    "effect_pt": "O usuário ataca a garganta do alvo, e o sofrimento resultante impede o alvo de usar movimentos baseados em som por dois turnos.",
    "strategic_tips_pt": "Um bom ataque de dano físico Dark que também neutraliza estratégias baseadas em som (como Hyper Voice, Roar ou Perish Song). Ótimo para quebrar estratégias de Pokémon fadas ou normais ruidosos."
  },
  "shed-tail": {
    "short_desc_pt": "O usuário cria um substituto para si usando seu próprio HP antes de trocar de lugar com um Pokémon...",
    "effect_pt": "O usuário cria um substituto para si usando seu próprio HP antes de trocar de lugar com um Pokémon da equipe na reserva.",
    "strategic_tips_pt": "Um dos movimentos de suporte mais quebrados. Cria um Substitute com metade do seu HP máximo e permite colocar um aliado frágil em campo já protegido contra dano direto e condições de status."
  },
  "baneful-bunker": {
    "short_desc_pt": "Além de proteger o usuário de ataques, este movimento também envenena qualquer atacante que fa...",
    "effect_pt": "Além de proteger o usuário de ataques, este movimento também envenena qualquer atacante que faça contato direto.",
    "strategic_tips_pt": "Uma versão superior do Protect. Se o oponente tentar um ataque de contato, você não só bloqueia o dano, mas também o pune com o status de envenenamento (Poison). Use para frustrar atacantes físicos."
  },
  "rain-dance": {
    "short_desc_pt": "O usuário invoca uma chuva forte que cai por cinco turnos, fortalecendo ataques do tipo Água. A chu...",
    "effect_pt": "O usuário invoca uma chuva forte que cai por cinco turnos, fortalecendo ataques do tipo Água. A chuva também reduz o poder dos ataques do tipo Fogo.",
    "strategic_tips_pt": "O pilar das equipes de chuva (Rain Teams). Ótimo para ativar habilidades como Swift Swim, tornar Thunder 100% preciso, proteger Pokémon vulneráveis ao tipo Fogo ou potenciar seus ataques de Água."
  },
  "freeze-dry": {
    "short_desc_pt": "O usuário resfria rapidamente o alvo. Isso também pode deixar o alvo congelado. Este movimento é supe...",
    "effect_pt": "O usuário resfria rapidamente o alvo. Isso também pode deixar o alvo congelado. Este movimento é super efetivo em tipos Água.",
    "strategic_tips_pt": "Um ataque indispensável pela sua tipagem única. Quebra completamente a defesa de tipos Água que normalmente resistiriam a movimentos de Gelo (Ice). Perfeito contra Pokémon Água/Terra ou Água/Dragão."
  },
  "wide-guard": {
    "short_desc_pt": "O usuário e seus aliados são protegidos contra ataques de grande alcance (área) por um turno....",
    "effect_pt": "O usuário e seus aliados são protegidos contra ataques de grande alcance (área) por um turno.",
    "strategic_tips_pt": "Essencial em batalhas em dupla. Salva seu time de ataques destrutivos que atingem ambos os aliados, como Earthquake, Rock Slide ou Eruption. Diferente do Protect, pode ser usado turnos seguidos com sucesso."
  },
  "focus-blast": {
    "short_desc_pt": "O usuário aumenta seu foco mental e libera seu poder. Isso também pode reduzir o atributo Sp. Def...",
    "effect_pt": "O usuário aumenta seu foco mental e libera seu poder. Isso também pode reduzir o atributo Sp. Def do alvo.",
    "strategic_tips_pt": "Uma cobertura de dano Fighting valiosíssima para Pokémon focados em Special Attack. Apesar de muito forte, os 70% de precisão o tornam perigosamente inconsistente (famoso 'Focus Miss'). Use quando não houver outra opção."
  },
  "thief": {
    "short_desc_pt": "O usuário ataca e rouba o item segurado pelo alvo simultaneamente. O usuário não pode roubar n...",
    "effect_pt": "O usuário ataca e rouba o item segurado pelo alvo simultaneamente. O usuário não pode roubar nada se já estiver segurando um item.",
    "strategic_tips_pt": "Ótimo no modo história para conseguir itens raros de Pokémon selvagens. Competitivamente, Knock Off costuma ser preferível por causar mais dano, mas Thief pode ser útil se seu próprio Pokémon não usa itens."
  },
  "hard-press": {
    "short_desc_pt": "O alvo é esmagado com um braço, uma garra, ou similar para infligir dano. Quanto mais HP o alvo ai...",
    "effect_pt": "O alvo é esmagado com um braço, uma garra, ou similar para infligir dano. Quanto mais HP o alvo ainda tiver, maior será o poder do movimento.",
    "strategic_tips_pt": "Excelente golpe para se usar no início de um combate, quando o oponente está com a saúde cheia, causando danos brutais. Ele vai perdendo a força conforme a luta avança."
  },
  "dig": {
    "short_desc_pt": "O usuário cava e se esconde no subsolo no primeiro turno, depois ataca no turno seguinte....",
    "effect_pt": "O usuário cava e se esconde no subsolo no primeiro turno, depois ataca no turno seguinte.",
    "strategic_tips_pt": "Leva dois turnos, permitindo que o oponente mude de Pokémon ou use Protect. Competitivamente é fraco, a menos que combinado com um Power Herb para atacar instantaneamente em um turno."
  },
  "draining-kiss": {
    "short_desc_pt": "O usuário rouba o HP do alvo com um beijo. O HP do usuário é restaurado em mais da metade do dano s...",
    "effect_pt": "O usuário rouba o HP do alvo com um beijo. O HP do usuário é restaurado em mais da metade do dano sofrido pelo alvo.",
    "strategic_tips_pt": "Um ataque incrivelmente eficiente para sustento. Diferente de outros ataques de dreno, ele cura 75% do dano causado! Excelente se usado em Pokémon que aumentam rapidamente o Special Attack."
  },
  "drill-peck": {
    "short_desc_pt": "Um ataque em forma de saca-rolhas que atinge o alvo com um bico afiado atuando como uma broca....",
    "effect_pt": "Um ataque em forma de saca-rolhas que atinge o alvo com um bico afiado atuando como uma broca.",
    "strategic_tips_pt": "Um movimento Voador de poder respeitável e consistência de 100%. Não tem desvantagens de recuo, sendo a opção Flying mais segura e contínua para atacantes físicos alados."
  },
  "muddy-water": {
    "short_desc_pt": "O usuário ataca atirando água lamacenta nos Pokémon adversários. Isso também pode reduzir a precisã...",
    "effect_pt": "O usuário ataca atirando água lamacenta nos Pokémon adversários. Isso também pode reduzir a precisão deles.",
    "strategic_tips_pt": "Alternativa popular ao Surf em batalhas em dupla. Além de atingir apenas os oponentes (sem machucar o aliado), há uma chance valiosa (30%) de reduzir a precisão de ambos os inimigos."
  },
  "scald": {
    "short_desc_pt": "O usuário ataca atirando água fervente no alvo. Isso também pode deixar o alvo com uma que...",
    "effect_pt": "O usuário ataca atirando água fervente no alvo. Isso também pode deixar o alvo com uma queimadura (Burn).",
    "strategic_tips_pt": "Possivelmente o melhor movimento de tipo Água do jogo. Além de causar dano consistente, a chance de 30% de queimar (Burn) inutiliza completamente os atacantes físicos oponentes e ainda drena a vida deles."
  },
  "petal-blizzard": {
    "short_desc_pt": "O usuário agita uma violenta nevasca de pétalas e danifica tudo ao seu redor....",
    "effect_pt": "O usuário agita uma violenta nevasca de pétalas e danifica tudo ao seu redor.",
    "strategic_tips_pt": "Um forte ataque do tipo Planta (Grass) para causar dano em área em batalhas múltiplas, mas cuidado: atinge todos ao redor, incluindo seus aliados. Útil caso seu parceiro resista ou absorva dano Grass."
  },
  "avalanche": {
    "short_desc_pt": "O poder deste movimento é duplicado se o alvo tiver infligido dano ao usuário no mesmo turno....",
    "effect_pt": "O poder deste movimento é duplicado se o alvo tiver infligido dano ao usuário no mesmo turno.",
    "strategic_tips_pt": "Possui prioridade negativa, então você quase sempre atacará por último. É fenomenal em Pokémon lentos e resistentes; se você aguentar um golpe do oponente, Avalanche revidará com uma força esmagadora de 120."
  },
  "shadow-claw": {
    "short_desc_pt": "O usuário ataca cortando o alvo com uma garra afiada feita de sombras. Este movimento tem uma a...",
    "effect_pt": "O usuário ataca cortando o alvo com uma garra afiada feita de sombras. Este movimento tem uma alta chance de acertar um acerto crítico (Critical Hit).",
    "strategic_tips_pt": "Ataque Fantasma (Ghost) físico consistente e sem pontos fracos. Tem grande sinergia em Pokémon com a habilidade Super Luck ou segurando itens que aumentam ainda mais a chance de ataques críticos."
  },
  "fake-tears": {
    "short_desc_pt": "O usuário finge chorar para desconcertar o alvo. Isso reduz drasticamente o atributo de Sp. D...",
    "effect_pt": "O usuário finge chorar para desconcertar o alvo. Isso reduz drasticamente o atributo de Sp. Def do alvo.",
    "strategic_tips_pt": "Baixa a Special Defense em dois estágios. Excelente em batalhas de Raid (Tera Raids ou Max Raids) para preparar um grande ataque de um aliado, ou em duplas contra um oponente muito defensivo."
  },
  "nuzzle": {
    "short_desc_pt": "O usuário ataca esfregando suas bochechas eletrificadas contra o alvo. Isso também deixa o alvo c...",
    "effect_pt": "O usuário ataca esfregando suas bochechas eletrificadas contra o alvo. Isso também deixa o alvo com paralisia.",
    "strategic_tips_pt": "100% de chance de paralisar e ainda causa um pouco de dano (não é afetado por Taunt!). É, sem dúvida, a forma mais confiável e consistente de aplicar o status de Paralisia em qualquer alvo."
  },
  "mortal-spin": {
    "short_desc_pt": "O usuário executa um ataque giratório que também pode eliminar os efeitos de movimentos como Bi...",
    "effect_pt": "O usuário executa um ataque giratório que também pode eliminar os efeitos de movimentos como Bind, Wrap e Leech Seed. Isso também envenena os Pokémon adversários.",
    "strategic_tips_pt": "Remove todas as armadilhas do campo do seu lado e de quebra ainda envenena o oponente (sem falhar!). É excelente para limpar o terreno e desgastar os inimigos."
  },
  "rock-tomb": {
    "short_desc_pt": "O usuário arremessa pedregulhos no alvo para infligir dano. Isso também diminui o atributo Speed d...",
    "effect_pt": "O usuário arremessa pedregulhos no alvo para infligir dano. Isso também diminui o atributo Speed do alvo impedindo seus movimentos.",
    "strategic_tips_pt": "Útil em lutas no início do jogo para garantir que você será o mais rápido no turno seguinte. Na cena competitiva costuma ser ofuscado pelo Rock Slide, a não ser que você queira apoio com a queda de velocidade."
  },
  "double-edge": {
    "short_desc_pt": "Uma investida imprudente que arrisca a vida, onde o usuário avança sobre o alvo. Isso também causa...",
    "effect_pt": "Uma investida imprudente que arrisca a vida, onde o usuário avança sobre o alvo. Isso também causa bastante dano de recuo ao usuário.",
    "strategic_tips_pt": "Um dos ataques Normal físicos mais pesados que você pode encontrar. Ótimo em Pokémon com muito HP ou habilidade Rock Head (que anula totalmente o recuo)."
  },
  "hydro-cannon": {
    "short_desc_pt": "O alvo é atingido por uma explosão aquosa. O usuário não pode se mover no próximo turno....",
    "effect_pt": "O alvo é atingido por uma explosão aquosa. O usuário não pode se mover no próximo turno.",
    "strategic_tips_pt": "O dano é absurdo, mas a penalidade de perder o turno seguinte é brutalmente punitiva competitivamente. Use-o exclusivamente se for a única maneira absoluta de garantir o nocaute no último inimigo do oponente."
  },
  "smart-strike": {
    "short_desc_pt": "O usuário apunhala o alvo com um chifre afiado. Este ataque nunca erra....",
    "effect_pt": "O usuário apunhala o alvo com um chifre afiado. Este ataque nunca erra.",
    "strategic_tips_pt": "Dano Físico metálico (Steel) garantido que ignora esquivas e quedas de precisão (como Minimize ou Mud-Slap). Perfeito para eliminar fadas que dependem de atributos de evasão."
  },
  "pound": {
    "short_desc_pt": "O alvo é golpeado fisicamente com uma longa cauda, uma perna dianteira ou semelhante....",
    "effect_pt": "O alvo é golpeado fisicamente com uma longa cauda, uma perna dianteira ou semelhante.",
    "strategic_tips_pt": "Golpe básico inicial da jornada. Você deve esquecer e substituí-lo por algo melhor (como Tackle ou Scratch) o quanto antes."
  },
  "outrage": {
    "short_desc_pt": "O usuário se enfurece e ataca por dois a três turnos. Em seguida, o usuário fica confuso....",
    "effect_pt": "O usuário se enfurece e ataca por dois a três turnos. Em seguida, o usuário fica confuso.",
    "strategic_tips_pt": "O ápice do dano para o tipo Dragão físico. Equipar uma Lum Berry é uma ótima ideia para curar imediatamente a confusão no final da fúria. Cuidado se houver fadas no time inimigo, pois elas bloquearão o ataque."
  },
  "mud-slap": {
    "short_desc_pt": "O usuário joga lama no rosto do alvo para infligir dano e diminuir sua precisão....",
    "effect_pt": "O usuário joga lama no rosto do alvo para infligir dano e diminuir sua precisão.",
    "strategic_tips_pt": "Pode ser irritante no início da jornada ao forçar inimigos a errar. Muito ocasionalmente usado em lutas Tera Raid como suporte, mas extremamente fraco em combates comuns."
  },
  "tera-blast": {
    "short_desc_pt": "Se o usuário tiver ativado o fenômeno Terastal, ele libera energia do seu Tera Type. Este moviment...",
    "effect_pt": "Se o usuário tiver ativado o fenômeno Terastal, ele libera energia do seu Tera Type. Este movimento causa dano usando o atributo Attack ou Sp. Atk—o que for maior para o usuário.",
    "strategic_tips_pt": "O ataque definitivo para a mecânica Terastal. Sempre garante o melhor tipo de dano para cobrir as fraquezas do seu Pokémon. Imprescindível para monstros que não possuem cobertura natural (Coverage) em seu conjunto de habilidades."
  },
  "power-whip": {
    "short_desc_pt": "O usuário gira violentamente suas vinhas, tentáculos, ou similar para chicotear o alvo....",
    "effect_pt": "O usuário gira violentamente suas vinhas, tentáculos, ou similar para chicotear o alvo.",
    "strategic_tips_pt": "A principal arma física de Grama (Grass). Tem um dano formidável e nenhum efeito colateral negativo, embora sofra com uma precisão levemente instável (85%). Destruidor contra tipos Água, Terra ou Rocha lentos."
  }
}

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    move_id = item["id"]
    if move_id in translations:
        item["short_desc_pt"] = translations[move_id]["short_desc_pt"]
        item["effect_pt"] = translations[move_id]["effect_pt"]
        item["strategic_tips_pt"] = translations[move_id]["strategic_tips_pt"]

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Translation completed successfully!")
