# 🛡️ Segurança e Governança em Aplicações No-Code — HelpDesk no Bubble

## 📝 Descrição do Projeto

Este projeto consiste no desenvolvimento de um **sistema de gerenciamento de chamados HelpDesk** construído na plataforma **Bubble.io**, com foco em boas práticas de **segurança de dados**, **prevenção de vazamentos**, **otimização de custos** e **governança de software**.

O laboratório aborda vulnerabilidades reais como exposição pública de dados e falhas de controle de acesso (OWASP), aplicando soluções práticas dentro do ambiente no-code do Bubble — e documentando uma estratégia de saída para mitigar o risco de Vendor Lock-in.

---

## 🎯 Objetivo

Construir um sistema HelpDesk funcional e seguro, garantindo que:

- **Usuários isolados** não consigam visualizar chamados de outros usuários
- **Regras de privacidade** estejam configuradas corretamente no banco de dados
- **Workflows** estejam organizados, documentados e auditáveis
- **Custos de infraestrutura** sejam otimizados desde o início
- **Uma estratégia de saída** esteja documentada caso o Bubble precise ser abandonado

---

## ⚠️ Problema Central — Vazamento de Dados em Aplicações No-Code

Plataformas como o Bubble criam tabelas com visibilidade pública por padrão (`Publicly visible`). Sem a configuração correta de regras de privacidade, **qualquer usuário autenticado pode acessar dados de outros usuários** — uma violação direta da vulnerabilidade **OWASP: Broken Object Level Authorization (BOLA)**.

> 🔴 **Risco real:** Chamados de suporte contendo informações sensíveis (senhas, dados pessoais, registros internos) ficam expostos a qualquer pessoa com acesso ao sistema.

---

## 🔐 Passo 5 — Segurança e Controle de Acesso

### Configuração de Privacidade no Banco de Dados

| Ação | Descrição |
|---|---|
| ❌ Deletar regra genérica | Remover a regra `Publicly visible` de todas as tabelas criadas pela IA |
| ✅ Criar regra "Apenas o Criador" | Condição: `This Chamado's Creator is Current User` |
| 🔒 Restringir campos | Apenas o criador pode visualizar os campos anexados e encontrar o registro em buscas |

**Vulnerabilidade mitigada:** `OWASP A01 — Broken Access Control` (representação indevida e exposição acidental de dados no lado do cliente)

---

## ⚡ Passo 6 — Desempenho e Otimização de Custos

### Otimização de Buscas (Work Units — WUs)
❌ ERRADO — Busca dentro de cada célula individual
Repeating Group
└── Cell → Do a search for Chamados (busca repetida N vezes)
✅ CORRETO — Busca única no Repeating Group
Repeating Group → Do a search for Chamados (1 única busca)
└── Cell → Current cell's Chamado (referência direta)

> 💸 Buscas redundantes multiplicam o consumo de WUs e podem **inviabilizar o projeto financeiramente** em produção.

### Otimização de API (Opcional — ChatGPT via API Connector)

Se integrado ao ChatGPT para geração automática de descrições de chamados, configurar obrigatoriamente:

```json
{
  "model": "gpt-4o-mini",
  "max_tokens": 300
}
```

> ⚠️ Sem o parâmetro `max_tokens`, um prompt malicioso pode gerar respostas extensas e custos inesperados de API.

---

## 🗂️ Passo 7 — Governança e Controle (Anti-Shadow IT)

### Organização de Workflows por Cores

| Cor | Significado |
|---|---|
| 🟢 Verde | Sucesso / Navegação |
| 🔴 Vermelho | Exclusão de Dados |
| 🔵 Azul | Integrações externas (APIs) |
| 🟡 Amarelo | Validações e condições |

### Documentação In-Platform

Cada Workflow complexo deve conter uma **Note** descrevendo:
- O que a lógica faz
- Por que foi implementada dessa forma
- Quais dados ela afeta

> 📌 **Princípio:** O sistema não deve ser uma caixa preta. Outro engenheiro deve conseguir assumir o projeto sem precisar de explicação verbal.

---

## 🚪 Passo 8 — Estratégia de Saída (Anti Vendor Lock-in)

### Limitação do Bubble

O Bubble **retém a posse do código-fonte** gerado pela plataforma. Em caso de encerramento do serviço, aumento de preços ou necessidade de migração, o código não pode ser exportado diretamente.

### Plano de Saída Documentado

Habilitar a Data API do Bubble
└── Settings > API > Enable Data API
Exportar tabelas via JSON
├── GET /api/1.1/obj/chamado
├── GET /api/1.1/obj/usuario
└── GET /api/1.1/obj/categoria
Reescrever em stack tradicional
├── Frontend: React.js
├── Backend: Node.js + Express
└── Banco: PostgreSQL (mapeando os campos exportados)


> 📄 Este documento deve ser salvo como `estrategia-de-saida.md` e entregue junto ao projeto.

---

## ✅ Critérios de Conclusão

O laboratório está concluído com sucesso quando:

- [ ] O sistema permite cadastro de chamados sem erros na interface
- [ ] Um usuário logado **não consegue visualizar** chamados criados por outro usuário
- [ ] Nenhum dado depende de textos manuais para definir status (uso correto de **Option Sets**)
- [ ] Os Workflows estão **coloridos e comentados** com Notes

---

## 📦 Checklist de Entrega

- [ ] **1. Link do Aplicativo** — URL pública da `version-test` para validar isolamento de dados entre usuários
- [ ] **2. Rascunho do Banco de Dados** — Print, PDF ou link (Planilha / Notion / Miro) com tabelas, relações e Option Sets planejados
- [ ] **3. Prints de Segurança e Governança:**
  - [ ] `Data > Privacy` — Regra `This Chamado's Creator is Current User` configurada
  - [ ] `Workflows` — Lógicas com cores organizadas e Notes comentadas
- [ ] **4. Estratégia de Saída** — Parágrafo em `.txt` ou `.pdf` descrevendo como exportar os dados via API caso o Bubble seja abandonado

---

## 🚀 Tecnologias Utilizadas

| Ferramenta | Função |
|---|---|
| [Bubble.io](https://bubble.io) | Plataforma no-code para desenvolvimento do HelpDesk |
| Data API do Bubble | Exportação de dados via JSON para migração futura |
| API Connector (Bubble) | Integração opcional com ChatGPT para geração de descrições |
| React + Node.js | Stack sugerida para eventual reescrita tradicional |

---

## ⚖️ Vulnerabilidades Mitigadas (OWASP)

| OWASP | Descrição | Solução Aplicada |
|---|---|---|
| A01 — Broken Access Control | Usuário acessa dados de outro usuário | Regra `Creator is Current User` |
| A05 — Security Misconfiguration | Tabelas públicas por padrão | Exclusão da regra `Publicly visible` |
| A04 — Insecure Design | Lógica sem documentação auditável | Notes + cores nos Workflows |

---

[Voltar ao início](https://github.com/Caique-Bezerra0)
