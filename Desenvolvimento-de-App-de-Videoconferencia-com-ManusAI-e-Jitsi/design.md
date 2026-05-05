# Plano de Design — Language Meet

**Autor:** Manus AI  
**Orientação-alvo:** retrato móvel 9:16  
**Princípio de interação:** uso confortável com uma mão, com ações primárias no terço inferior do ecrã.

## Visão de Produto

O **Language Meet** é uma aplicação móvel para estudantes de idiomas que querem praticar conversação com outra pessoa de forma rápida. A experiência central é simples: o estudante escolhe o idioma que está a aprender, informa o idioma que pode ajudar a praticar, toca em **Encontrar parceiro**, recebe um par simulado de conversação aleatória e entra numa sala Jitsi Meet criada para aquela sessão.

A primeira versão será local e sem autenticação, porque o pedido do utilizador se concentra na integração de videoconferência e na experiência de pareamento. O fluxo será desenhado para parecer nativo em iOS, com hierarquia visual clara, cartões arredondados, tipografia espaçada, botões grandes, estados de carregamento e feedback tátil discreto quando disponível.

## Lista de Ecrãs

| Ecrã | Conteúdo principal | Funcionalidade essencial | Observações de layout |
|---|---|---|---|
| Início / Matchmaking | Cabeçalho, seletores de idioma, nível de fluência, objetivo da conversa, botão de procura, estado do parceiro e botão Jitsi | Configurar preferências, gerar parceiro aleatório, criar sala Jitsi e abrir videoconferência | Uma única página vertical, com cartões empilhados e botão primário próximo do polegar |
| Sessão pronta | Card embutido no ecrã inicial após o pareamento | Mostrar nome do parceiro, idioma, tópico sugerido, nome da sala e botão para entrar | Evita navegação desnecessária e reduz fricção |
| Orientações rápidas | Secção curta no ecrã inicial | Sugerir regras de boa conversa e alternância de idiomas | Conteúdo compacto, abaixo da ação principal |

## Conteúdo e Funcionalidade por Ecrã

O ecrã principal começa com uma saudação curta e uma promessa clara: **praticar conversação real em poucos segundos**. Logo abaixo, um cartão de configuração permite escolher o idioma que o estudante quer praticar, o idioma que pode oferecer e o nível atual. Como a aplicação deve funcionar sem cadastro nesta versão, estes dados ficam apenas em estado local durante a sessão.

O botão **Encontrar parceiro** fica em destaque no fim do cartão de configuração. Ao tocar, a aplicação muda para um estado de procura por alguns instantes e depois apresenta um parceiro gerado de forma aleatória a partir de uma lista local. O objetivo é demonstrar o fluxo completo de produto sem depender de backend, filas em tempo real ou contas de utilizador.

Quando o parceiro é encontrado, um segundo cartão exibe o nome do parceiro, os idiomas de interesse, o tópico sugerido e a sala Jitsi criada. O botão **Entrar na chamada Jitsi** abre uma sala `https://meet.jit.si/...` no navegador interno/sistema, usando um nome de sala único e legível. Um botão secundário permite procurar outro parceiro.

## Fluxos Principais

| Fluxo | Passos | Resultado esperado |
|---|---|---|
| Procurar parceiro | O estudante abre o app, escolhe idioma-alvo, escolhe idioma que oferece, seleciona nível e toca em **Encontrar parceiro** | O app mostra estado de procura e depois apresenta um parceiro compatível simulado |
| Entrar na videoconferência | Após o parceiro aparecer, o estudante toca em **Entrar na chamada Jitsi** | O app abre uma sala Jitsi Meet criada para a sessão de estudo |
| Reiniciar pareamento | O estudante toca em **Procurar outro parceiro** | O estado da sessão é limpo e uma nova procura pode começar |
| Preparar conversa | O estudante lê o tópico sugerido e as orientações rápidas | A conversa começa com contexto e regras simples de respeito e alternância de idiomas |

## Escolhas de Cor

A marca visual combina confiança, aprendizagem e comunicação. A cor primária será um azul-petróleo vivo, associada a tecnologia e clareza, com tons suaves de fundo para manter legibilidade durante o uso prolongado.

| Token | Cor clara | Cor escura | Uso |
|---|---:|---:|---|
| Primária | `#0F8B8D` | `#3BD4CF` | Botões principais, destaques e elementos ativos |
| Fundo | `#F7FBFA` | `#101819` | Base do ecrã |
| Superfície | `#FFFFFF` | `#182426` | Cartões e blocos de conteúdo |
| Texto | `#102022` | `#EEF7F6` | Títulos e texto principal |
| Texto secundário | `#5D7275` | `#A5B8BA` | Descrições e metadados |
| Sucesso | `#18A058` | `#53D58C` | Estado de parceiro encontrado |
| Aviso | `#F59E0B` | `#FBBF24` | Recomendações e cuidados |
| Erro | `#D92D20` | `#FF7A70` | Falhas ao abrir link ou estados inválidos |

## Decisões de Interface

A navegação será mínima, com apenas uma aba principal chamada **Conversar**, porque a proposta central do produto é o pareamento rápido. O design evita menus profundos e concentra a interação em cartões. Os componentes interativos terão altura generosa, cantos arredondados e espaçamento suficiente para toque com o polegar. A ação principal será colocada no centro inferior do conteúdo visível, enquanto informações de contexto ficam acima e abaixo dela.

A integração com Jitsi será apresentada como entrada numa sala de estudo, não como um link técnico. O nome da sala será exibido em texto pequeno para transparência, mas a ação principal usará linguagem humana: **Entrar na chamada Jitsi**. Caso a chamada não abra, a interface deverá mostrar uma mensagem de erro clara em vez de falhar silenciosamente.

## Referências

[1]: https://developer.apple.com/design/human-interface-guidelines/ "Apple Human Interface Guidelines"
[2]: https://jitsi.github.io/handbook/docs/user-guide/user-guide-start-a-jitsi-meeting/ "Jitsi Meet Handbook — Start a Jitsi Meeting"
