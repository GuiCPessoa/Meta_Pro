# Módulo de Gerenciamento de Builds (Builds)

## Propósito

O módulo de gerenciamento de builds permite aos usuários criar, visualizar, editar e excluir builds personalizadas para seus campeões favoritos. Ele integra-se com os dados de campeões e itens para oferecer uma experiência rica e interativa.

## Fluxo de Gerenciamento de Builds

1.  **Criação de Build**: Usuários selecionam um campeão, itens, runas e habilidades para criar uma nova build. Essa informação é então persistida no banco de dados via Supabase.
2.  **Visualização de Builds**: Usuários podem navegar por suas builds salvas ou por builds públicas criadas por outros usuários. As builds são exibidas em componentes dedicados, como `Builds.tsx` e no `ChampionDetails.tsx`. O hook `useFeaturedBuilds` é usado para buscar builds destacadas com informações aninhadas de campeões.
3.  **Edição e Exclusão**: Usuários autenticados podem modificar ou remover suas próprias builds.
4.  **Associação com Usuários e Campeões**: Cada build é associada a um usuário e a um campeão específico, permitindo filtros e exibições contextualizadas.

## Componentes e Hooks Principais

-   `src/components/Builds.tsx`: Principal componente de UI para exibir e interagir com as builds. Pode incluir subcomponentes para listagem, detalhes e formulários de criação/edição.
-   `src/components/ChampionCard.tsx`: Embora não seja exclusivo das builds, pode ser usado para exibir informações básicas do campeão associado a uma build.
-   `src/components/ChampionDetails.tsx`: Agora exibe as builds de um campeão específico, buscando-as dinamicamente via `useBuilds`.
-   `src/hooks/useBuilds.ts`: Hook personalizado que gerencia o estado e a lógica de CRUD (Create, Read, Update, Delete) para as builds. Ele interage com o banco de dados Supabase para persistir e recuperar dados. Contém também o `useFeaturedBuilds` para builds destacadas.
-   `src/integrations/supabase/client.ts`: Utilizado para todas as operações de banco de dados relacionadas a builds.
-   `src/integrations/supabase/types.ts`: Define os tipos de dados TypeScript para as tabelas de builds no Supabase. Os campos `items` são tipados como `string[]` e `runes` utilizam o tipo `RuneConfig` para uma estrutura detalhada de runas.

## Dependências

-   **Supabase Client**: Para todas as operações de banco de dados.
-   **Módulo de Campeões**: Para buscar e exibir informações de campeões associados às builds.
-   **Módulo de Autenticação**: Para garantir que apenas usuários autenticados possam criar ou modificar suas builds.
-   **@tanstack/react-query**: Para gerenciamento de estado assíncrono e cache de dados de builds.

## Padrões de Arquitetura

-   **Custom Hooks**: `useBuilds` e `useFeaturedBuilds` centralizam a lógica de negócios das builds, promovendo reusabilidade e testabilidade.
-   **Separation of Concerns**: A lógica de UI (em `Builds.tsx` e `ChampionDetails.tsx`) é separada da lógica de dados (em `useBuilds.ts`).
-   **Data Modeling**: O uso de `types.ts` para definir os modelos de dados do Supabase, incluindo `RuneConfig`, garante consistência e segurança de tipo em toda a aplicação. 