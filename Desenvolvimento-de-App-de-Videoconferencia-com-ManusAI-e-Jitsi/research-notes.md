# Notas Técnicas — Integração Jitsi Meet

**Autor:** Manus AI  
**Data:** 2026-05-04

## Síntese da abordagem

A primeira versão do **Language Meet** irá integrar o Jitsi Meet por URL, abrindo uma sala `https://meet.jit.si/{nome-da-sala}` com `expo-web-browser`. Esta abordagem é compatível com Expo gerido, evita dependências nativas complexas e mantém o app pronto para funcionar em iOS, Android e web. A documentação local do Expo confirma que `expo-web-browser` permite abrir URLs em navegador interno/sistema e recomenda tratar diferenças da plataforma web, onde o retorno pode ser diferente do nativo.

O Jitsi Meet permite iniciar uma reunião abrindo `https://meet.jit.si`, digitando um nome de conferência e entrando na sala. A documentação do Jitsi recomenda evitar caracteres especiais, espaços e acentos no nome da reunião, portanto o app deverá gerar slugs seguros, com letras, números e hífen. A documentação avançada do Jitsi também confirma que parâmetros de convite, UI, vídeo e áudio podem ser aplicados no fragmento da URL com prefixo `config.`, como `#config.defaultLanguage=en&config.prejoinConfig.enabled=true`.

## Decisões de implementação

| Tema | Decisão | Justificação |
|---|---|---|
| Integração Jitsi | Abrir sala por URL via `expo-web-browser` | Compatível com Expo SDK 54 e sem necessidade de SDK nativo específico |
| Nome de sala | Gerar slug único com propósito, idioma e timestamp curto | Evita caracteres problemáticos e reduz colisão entre sessões |
| Parâmetros | Usar `config.prejoinConfig.enabled=true`, `config.defaultLanguage=ptBR`, `config.startWithAudioMuted=false` e `config.startWithVideoMuted=false` | Mantém uma etapa de preparação de dispositivos e inicia com áudio/vídeo disponíveis |
| Matchmaking | Simulação local de parceiro aleatório | Entrega o fluxo solicitado sem criar infraestrutura em tempo real não pedida |
| Segurança | Mostrar orientação para não partilhar dados pessoais e permitir trocar de parceiro | Adequado para conversas aleatórias entre estudantes |

## Fontes consultadas

[1]: https://jitsi.github.io/handbook/docs/user-guide/user-guide-start-a-jitsi-meeting/ "Jitsi Meet Handbook — Start a Jitsi Meeting"
[2]: https://jitsi.github.io/handbook/docs/user-guide/user-guide-advanced/ "Jitsi Meet Handbook — Advanced options"
[3]: file:///home/ubuntu/language-meet-mobile_helper/docs/navigation/webbrowser/DOCS.md "Expo SDK 54 Local Docs — WebBrowser"
