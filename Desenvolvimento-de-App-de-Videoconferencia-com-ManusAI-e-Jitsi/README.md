<div align="center">

# 🌉 TalkBridge

**App móvel multiplataforma · Expo Router · tRPC · Manus Runtime**

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

</div>

---

## 1. 🚀 Proposta de Valor

> **Por que o TalkBridge é único?**

O **TalkBridge** combina o melhor de dois mundos: a flexibilidade do **Expo Router** para navegação nativa multiplataforma (iOS, Android e Web) com a segurança de tipo ponta-a-ponta do **tRPC** — garantindo que cliente e servidor sempre falem a mesma linguagem.

| Diferencial | Descrição |
|---|---|
| ⚡ **Manus Runtime integrado** | Cookie injection automático do container pai, sem configuração manual |
| 📐 **Safe Area inteligente** | Adaptação dinâmica de insets para web e mobile com padding mínimo garantido (`top ≥ 16px`, `bottom ≥ 12px`) |
| 🎨 **ThemeProvider + NativeWind** | Theming consistente em todas as plataformas sem duplicação de código |
| 🗺️ **Stack de navegação pré-configurada** | Rotas `(tabs)`, `oauth/callback` e `rating` prontas, com headers ocultos por padrão |
| ⚙️ **React Query otimizado** | Sem refetch no focus, retry único e clientes criados uma única vez para máxima performance |

---

## 2. 📸 Capturas de Tela


| iOS | Android | Web |
|:---:|:---:|:---:|
| `[ |[Ver Projeto](https://github.com/Caique-Bezerra0/portfolio-caique-bezerra-de-oliveira/tree/bf3caa4704a9dd4c0af67af013f734cc6fa8ab28/Desenvolvimento-de-App-de-Videoconferencia-com-ManusAI-e-Jitsi/Screenshot-Iphone) |]` | `[|[Ver Projeto](https://github.com/Caique-Bezerra0/portfolio-caique-bezerra-de-oliveira/tree/3e2b676c6ad972cc99e6e59d3e012f933a711280/Desenvolvimento-de-App-de-Videoconferencia-com-ManusAI-e-Jitsi/Screenshot-Android) |]` | `[ screenshot ]` |

---

## 3. 🛠️ Instruções de Uso

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+**
- **Expo CLI** instalado globalmente (`npm install -g expo-cli`)
- Dispositivo físico, emulador (iOS/Android) ou navegador para Web
- Backend tRPC configurado e acessível

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/talkbridge.git
cd talkbridge

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua URL de API:
# EXPO_PUBLIC_API_URL=https://sua-api.com

# 4. Inicie o servidor de desenvolvimento
npx expo start
```

### Rotas disponíveis

| Rota | Descrição |
|---|---|
| `(tabs)` | Tela principal com abas de navegação |
| `oauth/callback` | Retorno do fluxo OAuth (sem header nativo) |
| `rating` | Tela de avaliação de experiência do usuário |

### Manus Runtime

O `initManusRuntime()` é inicializado automaticamente no layout raiz. Em ambientes **web**, os insets de safe area são sincronizados via `subscribeSafeAreaInsets` com o container pai — nenhuma configuração adicional é necessária.

```tsx
// Isso já acontece automaticamente em _layout.tsx
useEffect(() => {
  initManusRuntime();
}, []);
```

---

## 4. 📱 Preview

Escaneie o QR Code abaixo com seu dispositivo para abrir o preview do app diretamente no Manus:

<div align="center">

![QR Code Preview](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://manus.im/app-preview/CmvzfsjTJJiKwyV3meToMz?sessionId=bJnDdHAkjGKQTmTgokc9Dm)

🔗 **[Abrir Preview no Manus](https://manus.im/app-preview/CmvzfsjTJJiKwyV3meToMz?sessionId=bJnDdHAkjGKQTmTgokc9Dm)**

</div>

---

<div align="center">

Feito com ❤️ usando **Expo** · **tRPC** · **React Native** · **Manus**

</div>
