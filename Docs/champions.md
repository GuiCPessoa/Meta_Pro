# Módulo de Dados de Campeões (Champions)

## Propósito

O módulo de dados de campeões é responsável por buscar, armazenar e exibir informações detalhadas sobre os campeões de League of Legends. Isso inclui estatísticas, habilidades, lore e outras informações relevantes que podem ser utilizadas em várias partes da aplicação, como na criação de builds ou na visualização de tier lists.

## Fluxo de Dados de Campeões

1.  **Obtenção de Dados**: Os dados de campeões podem ser obtidos de uma API externa (como a Riot Games API ou uma base de dados pública de LoL) ou de uma tabela no Supabase. O `useChampions` hook orquestra a recuperação desses dados.
2.  **Armazenamento em Cache (Opcional)**: Para melhorar a performance, os dados de campeões podem ser armazenados em cache localmente ou em uma solução de cache no Supabase.
3.  **Exibição**: Os componentes de UI, como `Champions.tsx`, `ChampionCard.tsx` e `ChampionDetails.tsx`, consomem esses dados para renderizar as informações dos campeões.
4.  **Filtragem e Busca**: A aplicação pode permitir que os usuários filtrem ou busquem campeões por nome, função ou outras características.

## Componentes e Hooks Principais

-   `src/components/Champions.tsx`: Componente principal que exibe uma lista de campeões, possivelmente com opções de filtragem e ordenação.
-   `src/components/ChampionCard.tsx`: Componente reutilizável para exibir um resumo de um único campeão, usado em listas ou grids.
-   `src/components/ChampionDetails.tsx`: Componente que mostra informações detalhadas de um campeão específico quando selecionado.
-   `src/hooks/useChampions.ts`: Hook personalizado que encapsula a lógica para buscar, processar e fornecer os dados de campeões para os componentes.
-   `src/integrations/supabase/client.ts`: Pode ser utilizado se os dados dos campeões forem armazenados no Supabase.
-   `src/integrations/supabase/types.ts`: Define os tipos de dados para os campeões, garantindo a tipagem correta ao lidar com os dados.

## Dependências

-   **API Externa ou Supabase**: Fonte dos dados de campeões.
-   **Módulo de Builds/Tier List**: Consomem os dados de campeões para suas funcionalidades.

## Padrões de Arquitetura

-   **Custom Hooks**: O `useChampions` centraliza a lógica de dados, garantindo que os dados sejam buscados e gerenciados de forma consistente.
-   **Component-based Architecture**: A separação da UI em componentes como `Champions.tsx`, `ChampionCard.tsx` e `ChampionDetails.tsx` promove a modularidade e reusabilidade.
-   **Data Fetching Layer**: O hook `useChampions` atua como uma camada de busca de dados, desacoplando a UI da origem dos dados.
-   **Single Source of Truth**: Os dados de campeões são gerenciados em um único local (o hook), evitando duplicação e inconsistência. 