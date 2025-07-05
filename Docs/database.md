# Módulo de Banco de Dados (Supabase)

## Propósito

Este módulo descreve a integração da aplicação com o Supabase, que serve como o backend completo, incluindo banco de dados PostgreSQL, autenticação e armazenamento de arquivos. Ele centraliza as configurações e a lógica de interação com os serviços do Supabase.

## Estrutura e Fluxo de Dados

1.  **Inicialização do Cliente**: O cliente Supabase é inicializado em `src/integrations/supabase/client.ts` com as chaves de API e URL do projeto.
2.  **Definição de Tipos**: As interfaces e tipos TypeScript para as tabelas do banco de dados são definidos em `src/integrations/supabase/types.ts`, garantindo tipagem segura em todas as operações de dados.
3.  **Operações CRUD**: Os hooks personalizados (ex: `useBuilds`, `useChampions`, `useAuth`) utilizam a instância do cliente Supabase para realizar operações de Criação, Leitura, Atualização e Exclusão (CRUD) nos dados.
4.  **Migrações**: O diretório `supabase/migrations` contém os scripts SQL para gerenciar o esquema do banco de dados, permitindo a evolução controlada do modelo de dados.

## Componentes e Arquivos Principais

-   `src/integrations/supabase/client.ts`: Arquivo central para a configuração e exportação da instância do cliente Supabase. Todos os outros módulos que precisam interagir com o Supabase importam esta instância.
-   `src/integrations/supabase/types.ts`: Contém as definições de tipo geradas a partir do esquema do banco de dados Supabase, geralmente usando ferramentas como `supabase gen types typescript --db-url <URL> > types.ts`.
-   `supabase/config.toml`: Arquivo de configuração do projeto Supabase CLI.
-   `supabase/migrations/`: Diretório contendo os arquivos de migração SQL que definem as tabelas, colunas, chaves estrangeiras e outras restrições do banco de dados.

## Dependências

-   **`@supabase/supabase-js`**: Biblioteca JavaScript oficial para interagir com o Supabase.
-   **Dotenv/Variáveis de Ambiente**: Para carregar as chaves de API e URL do Supabase de forma segura (normalmente via variáveis de ambiente configuradas no `.env`).

## Padrões de Arquitetura

-   **Service Layer**: O `client.ts` atua como uma camada de serviço, abstraindo a complexidade de conexão e interação direta com a API do Supabase dos componentes e hooks da aplicação.
-   **Type Safety**: O uso de `types.ts` promove a segurança de tipo em todas as operações de banco de dados, reduzindo erros em tempo de execução e melhorando a manutenibilidade.
-   **Database as a Service (DBaaS)**: O Supabase fornece uma abordagem de DBaaS, onde a aplicação se concentra na lógica de negócios e na UI, enquanto o Supabase cuida da infraestrutura do banco de dados.
-   **Versionamento de Esquema (Migrations)**: As migrações SQL no diretório `supabase/migrations` garantem que o esquema do banco de dados possa ser versionado e aplicado de forma consistente em diferentes ambientes. 