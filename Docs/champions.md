# Módulo de Dados de Campeões (Champions)

## Propósito

O módulo de dados de campeões é responsável por buscar, armazenar e exibir informações detalhadas sobre os campeões de League of Legends. Isso inclui estatísticas, habilidades, e outras informações relevantes que podem ser utilizadas em várias partes da aplicação, como na criação de builds ou na visualização de tier lists.

## Fluxo de Dados de Campeões

1.  **Obtenção de Dados**: Os dados de campeões são obtidos diretamente da tabela `champions` no Supabase. O `useChampions` hook orquestra a recuperação desses dados, incluindo detalhes como `name`, `champion_key`, `role`, `tier`, `win_rate`, `pick_rate`, `ban_rate`, `trend` e `patch_version`.
2.  **Armazenamento em Cache**: O `useQuery` do `@tanstack/react-query` gerencia o cache dos dados de campeões, melhorando a performance ao evitar buscas repetitivas.
3.  **Exibição**: Os componentes de UI consomem esses dados para renderizar as informações dos campeões:
    *   `Champions.tsx`: Exibe uma lista geral de campeões.
    *   `ChampionCard.tsx`: Exibe um resumo de um único campeão, utilizando `champion_key` para carregar a imagem correspondente (`/public/champions/${championKey}.png`).
    *   `ChampionDetails.tsx`: Exibe informações detalhadas de um campeão específico, buscando builds e matchups relacionados dinamicamente.
4.  **Filtragem e Busca**: A aplicação pode permitir que os usuários filtrem ou busquem campeões por nome, função ou outras características, que são então passados como parâmetros para o `useChampions` hook.

## Componentes e Hooks Principais

-   `src/components/Champions.tsx`: Componente principal que exibe uma lista de campeões, possivelmente com opções de filtragem e ordenação.
-   `src/components/ChampionCard.tsx`: Componente reutilizável para exibir um resumo de um único campeão. Agora aceita `championKey` para renderização dinâmica da imagem.
-   `src/components/ChampionDetails.tsx`: Componente que mostra informações detalhadas de um campeão específico, agora busca dados reais de campeões, builds e matchups usando os hooks apropriados.
-   `src/hooks/useChampions.ts`: Hook personalizado que encapsula a lógica para buscar, processar e fornecer os dados de campeões do Supabase para os componentes.
-   `src/integrations/supabase/client.ts`: Utilizado para inicializar e interagir com o cliente Supabase.
-   `src/integrations/supabase/types.ts`: Define os tipos de dados para os campeões, builds e matchups, garantindo a tipagem correta ao lidar com os dados do Supabase.

## Dependências

-   **Supabase**: Fonte primária dos dados de campeões.
-   **Módulo de Builds**: Utiliza o `champion_id` para buscar builds específicas de um campeão.
-   **Módulo de Matchups**: Utiliza o `champion_id` para buscar matchups específicas de um campeão.
-   **@tanstack/react-query**: Utilizado para gerenciamento de estado assíncrono e cache de dados.

## Padrões de Arquitetura

-   **Custom Hooks**: O `useChampions` centraliza a lógica de dados, garantindo que os dados sejam buscados e gerenciados de forma consistente.
-   **Component-based Architecture**: A separação da UI em componentes promove a modularidade e reusabilidade.
-   **Data Fetching Layer**: Os hooks (`useChampions`, `useBuilds`, `useMatchups`) atuam como camadas de busca de dados, desacoplando a UI da origem dos dados.
-   **Single Source of Truth**: Os dados são gerenciados e fornecidos por hooks centralizados, evitando duplicação e inconsistência. 