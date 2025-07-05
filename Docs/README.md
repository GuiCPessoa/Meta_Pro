# Documentação Técnica da Aplicação Meta Pro

## Visão Geral

Esta documentação técnica detalha a arquitetura, os módulos e as funcionalidades principais da aplicação Meta Pro. O objetivo é fornecer um guia compreensivo para desenvolvedores que desejam entender, manter e estender o projeto.

### Propósito da Aplicação

O Meta Pro é uma plataforma dedicada a jogadores de League of Legends, oferecendo ferramentas e recursos para otimizar a experiência de jogo. A aplicação permite aos usuários visualizar e gerenciar builds de campeões, tier lists, e outras informações relevantes para o meta do jogo.

### Tecnologias Principais

A aplicação é construída utilizando as seguintes tecnologias:

- **Frontend**: React (com Vite para bundling) e TypeScript.
- **Estilização**: Tailwind CSS.
- **Componentes UI**: Shadcn/ui.
- **Gerenciamento de Estado**: Hooks personalizados (useAuth, useBuilds, useChampions, etc.).
- **Backend/Banco de Dados**: Supabase (PostgreSQL para dados, autenticação e armazenamento de arquivos).
- **Gerenciamento de Pacotes**: Bun.

### Estrutura do Projeto

O projeto segue uma estrutura modular, com componentes e lógicas bem definidos para cada funcionalidade. As principais pastas incluem:

- `src/components`: Contém os componentes React reutilizáveis, incluindo a biblioteca de UI (`ui`).
- `src/hooks`: Contém os hooks personalizados para gerenciamento de lógica e estado.
- `src/integrations`: Contém as configurações e clientes para integração com serviços externos (ex: Supabase).
- `src/lib`: Contém utilitários e funções de ajuda.
- `src/pages`: Contém as páginas principais da aplicação.
- `supabase`: Contém as configurações e migrações do Supabase.

### Módulos Principais

Os módulos principais da aplicação são detalhados em arquivos Markdown separados, cobrindo áreas como autenticação, gerenciamento de builds, dados de campeões, e interação com o banco de dados. Cada módulo é projetado para ser coeso e de fácil manutenção. 