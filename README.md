# Finance Wave

O Finance Wave é um front-end que simula a experiência de um app bancário simples: login, dashboard com saldo e histórico, e um fluxo de transferência com validação e atualização imediata da conta.

Ele nasceu como resposta para um desafio técnico de React Pleno, então a ideia aqui não foi inventar moda. O foco foi montar uma base organizada, agradável de navegar e fácil de evoluir se esse mock precisasse virar produto.

## O que dá para testar

- login com sessão persistida localmente
- rotas protegidas
- dashboard com saldo, entradas, saídas e histórico
- transferência com validação
- atualização instantânea do saldo e da lista de transações
- feedback visual de sucesso e erro via toast

Credenciais demo:

- `fulano@email.dev`
- `123456`

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Vitest

## Como rodar

```bash
npm install
npm run dev
```

Outros comandos úteis:

```bash
npm run build
npm run preview
npm run lint
npm run test
```

O comando `npm run test` roda a bateria de testes automatizados do projeto.

## Estrutura do projeto

O código está separado por responsabilidade, sem exagerar em camadas:

```text
src/
  components/   componentes reutilizáveis e blocos de interface
  hooks/        integração entre UI, store e dados
  lib/          utilitários compartilhados
  pages/        login, dashboard e transferência
  routes/       roteamento e proteção de acesso
  schemas/      validações com Zod
  services/     mocks e camada de acesso a dados
  store/        estado global com Zustand
  test/         testes de fluxo e regras de negócio
  utils/        funções auxiliares
```

## Algumas decisões do projeto

**React Query para carregar os dados iniciais**

Mesmo com dados mockados, preferi usar React Query para deixar o fluxo mais próximo de uma integração real. Isso já prepara o terreno para cache, loading, erro e troca futura por API de verdade.

**Zustand para sessão e estado financeiro**

A sessão mock fica persistida localmente, e o estado da conta responde na hora quando a transferência acontece. Para esse escopo, Zustand deixa tudo simples sem trazer peso desnecessário.

**React Hook Form + Zod no formulário**

O formulário de transferência ficou mais previsível com validação declarativa e tipada, sem espalhar regra manual pela tela.

**Rotas protegidas**

`/dashboard` e `/transfer` exigem autenticação. Se a sessão não existir, o usuário volta para o login e depois pode seguir para a rota que tentou acessar.

## Estado atual

Hoje o app trabalha com dados locais e uma autenticação fake, o que faz sentido para o desafio. Se a próxima etapa fosse aproximar isso de produção, eu seguiria por aqui:

- trocar os mocks por chamadas HTTP
- centralizar o client de API
- mover autenticação para backend
- parar de depender de persistência local para sessão

## Sobre segurança

Como todo front-end roda no navegador do usuário, o cliente nunca deve carregar segredo real. Nesse projeto isso já está tratado pelo próprio escopo: não existe backend real, dado sensível real nem credencial de verdade.

Num cenário de produção, a proteção principal estaria fora do front:

- regras críticas no backend
- HTTPS obrigatório
- tokens em cookies `HttpOnly` quando aplicável
- autorização por recurso no servidor
- nada sensível em `localStorage`

Obfuscação pode até dificultar leitura do bundle, mas não resolve segurança de verdade.

## Melhorias que fazem sentido depois

- integrar com API real
- persistir histórico financeiro fora da memória local
- adicionar mais cobertura de testes para o fluxo completo
- melhorar acessibilidade das mensagens de erro
- incluir skeleton/loading mais refinado no dashboard
- criar um layout compartilhado para a área autenticada

## Fechando

Esse projeto tenta ser direto ao ponto: uma experiência pequena, mas bem resolvida. Sem muita camada desnecessária, sem complexidade artificial, e com espaço para crescer se precisar.
