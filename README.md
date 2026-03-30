# Finance Wave

Aplicação front-end que simula um app bancário simples, construída como solução para o desafio técnico da vaga React Pleno.

O projeto cobre o fluxo principal pedido no desafio:

- login mock com persistência de sessão
- rotas protegidas
- dashboard com saldo e transações mockadas
- formulário de transferência com validação
- atualização imediata do saldo e da lista de transações

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui + Radix
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Vitest

## Arquitetura

A aplicação foi organizada por responsabilidade para manter o código previsível e fácil de evoluir.

```text
src/
  components/
    ui/                  # componentes base do shadcn/ui
  hooks/                 # hooks de integração e composição
  lib/                   # utilitários compartilhados e query client
  pages/
    login/               # tela de autenticação mock
    dashboard/           # visão principal da conta
    transfer/            # formulário de transferência
  routes/                # router e guards de autenticação
  schemas/               # validações com Zod
  services/              # camada de acesso a dados/mock
  store/                 # estado global com Zustand
```

### Responsabilidades por camada

- `pages`: composição das telas e orquestração do fluxo do usuário.
- `routes`: definição das rotas e proteção de acesso.
- `store`: estado global da autenticação e do domínio financeiro.
- `services`: fonte de dados mockada, desacoplada da UI.
- `hooks`: integração entre React Query e Zustand.
- `schemas`: regras de validação dos formulários.
- `components/ui`: primitives reutilizáveis para consistência visual.

## Decisões técnicas

### 1. React Query para dados remotos/mocados

As transações iniciais são carregadas via React Query para manter o fluxo próximo de uma integração real com API. Isso facilita:

- cache
- estados de loading e erro
- futura substituição do mock por backend real

### 2. Zustand para estado global de sessão e conta

Zustand foi escolhido para dois tipos de estado globais:

- autenticação, com persistência em `localStorage`
- estado financeiro local, usado para refletir instantaneamente transferências no dashboard

Essa divisão evita misturar regras de sessão com regras do domínio bancário.

### 3. React Hook Form + Zod para o fluxo de transferência

O formulário de transferência usa:

- `react-hook-form` para controle eficiente e simples dos campos
- `zod` para validação declarativa e tipada

Isso reduz duplicação entre validação de UI e tipagem de domínio.

### 4. React Router com rotas protegidas

As páginas `dashboard` e `transfer` só podem ser acessadas por usuários autenticados. Caso a sessão não exista, o usuário é redirecionado para `login`.

Além da proteção, o fluxo preserva a rota originalmente solicitada para navegação após autenticação.

### 5. shadcn/ui para base de interface

Os componentes do `shadcn/ui` foram usados como base para:

- padronização visual
- consistência de interação
- composição rápida sem acoplamento a um framework pesado de UI

## Fluxo principal implementado

### Login

- autenticação mock
- persistência de sessão com Zustand + `localStorage`

### Dashboard

- leitura de transações mockadas
- cálculo e exibição de saldo
- listagem de lançamentos

### Transferência

- formulário com validação
- criação de nova transação de saída
- atualização imediata do saldo
- retorno ao dashboard com dados atualizados

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview local da build

```bash
npm run preview
```

### Verificação de lint

```bash
npm run lint
```

## Estado atual da implementação

Hoje o projeto está operando com dados mockados locais na camada de `services`.

Em uma integração real, a evolução natural seria:

- substituir o mock por chamadas HTTP
- usar `axios` como client centralizado
- configurar interceptors para autenticação, tratamento de erro e refresh de sessão

## Segurança

O desafio pede uma explicação de como a aplicação seria protegida contra engenharia reversa e vazamento de dados. Abaixo está a abordagem recomendada para um cenário de produção.

### 1. Engenharia reversa

Como qualquer aplicação front-end roda no navegador do usuário, o código entregue ao cliente nunca deve conter segredos reais.

Medidas recomendadas:

- nunca expor tokens privados, secrets, chaves administrativas ou credenciais no front-end
- mover regras críticas de negócio para o backend
- tratar o front-end apenas como camada de apresentação e entrada de dados
- usar variáveis públicas apenas para configuração não sensível
- minimizar detalhes internos em mensagens de erro e logs exibidos ao usuário
- aplicar source maps apenas onde realmente necessário, e evitar publicá-los em produção aberta

Ponto importante:

Obfuscação pode aumentar o custo da análise, mas não deve ser tratada como mecanismo real de segurança.

### 2. Vazamento de dados

Para evitar exposição indevida de dados sensíveis, a proteção principal deve estar no backend e no transporte dos dados.

Medidas recomendadas:

- usar HTTPS obrigatoriamente
- armazenar tokens em cookies `HttpOnly`, `Secure` e `SameSite`, quando aplicável
- evitar persistir dados sensíveis em `localStorage` ou `sessionStorage`
- trafegar apenas os dados estritamente necessários para cada tela
- mascarar informações sensíveis quando possível
- implementar autorização por recurso no backend, e não apenas no front-end
- registrar auditoria para operações críticas
- sanitizar inputs e padronizar tratamento de erros

No estado atual do projeto:

- a persistência local é usada apenas para a sessão mock do desafio
- não existem dados bancários reais, backend real ou credenciais sensíveis

Em produção, esse armazenamento local deveria ser substituído por um fluxo seguro de autenticação baseado em backend.

## Melhorias futuras

- integrar API real com `axios`
- adicionar testes cobrindo o fluxo `login -> dashboard -> transferência`
- criar feedback visual de sucesso/erro com toast
- adicionar máscara monetária no campo de valor
- persistir transações do domínio financeiro
- melhorar acessibilidade com mensagens de erro associadas via `aria-describedby`
- adicionar loading skeleton no dashboard
- criar layout compartilhado para páginas autenticadas

## Observações finais

O foco desta implementação foi demonstrar organização, clareza arquitetural e um fluxo funcional completo, priorizando legibilidade e evolução incremental do projeto.
