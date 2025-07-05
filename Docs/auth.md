# Módulo de Autenticação (Auth)

## Propósito

O módulo de autenticação é responsável por gerenciar o acesso dos usuários à aplicação. Ele lida com o registro, login, logout e a gestão de sessões, garantindo que apenas usuários autorizados possam acessar funcionalidades protegidas.

## Fluxo de Autenticação

1.  **Registro de Usuário**: Novos usuários se registram fornecendo credenciais (e-mail, senha). O Supabase gerencia a criação de usuários e envia e-mails de verificação, se configurado.
2.  **Login de Usuário**: Usuários existentes fazem login com suas credenciais. O Supabase valida as credenciais e retorna um token de sessão.
3.  **Gestão de Sessão**: O token de sessão é armazenado de forma segura no navegador. O `useAuth` hook monitora o estado da sessão (usuário logado, carregando, etc.) e atualiza a UI conforme necessário.
4.  **Logout**: O usuário pode encerrar a sessão, o que invalida o token e limpa os dados da sessão.

## Componentes e Hooks Principais

-   `src/components/Auth.tsx`: Componente React responsável pela interface de usuário para registro e login.
-   `src/hooks/useAuth.ts`: Hook personalizado que encapsula a lógica de autenticação, interagindo com o cliente Supabase. Ele fornece funções para login, registro, logout e acesso ao estado do usuário autenticado.
-   `src/integrations/supabase/client.ts`: Arquivo que inicializa o cliente Supabase e exporta a instância do cliente para ser utilizada em toda a aplicação. Este é o ponto de contato principal com o serviço de autenticação do Supabase.

## Dependências

-   **Supabase Client**: Utilizado para interagir com o serviço de autenticação do Supabase.
-   **React Context API**: O `useAuth` hook provavelmente utiliza o Context API para prover o estado de autenticação para todos os componentes que precisam dele.

## Padrões de Arquitetura

-   **Custom Hooks**: O uso de `useAuth` como um custom hook centraliza a lógica de autenticação, tornando-a reutilizável e fácil de testar. Isso segue o princípio de separação de preocupações, onde a lógica de negócio é separada da UI.
-   **Single Responsibility Principle**: Cada componente e hook tem uma responsabilidade clara, por exemplo, `Auth.tsx` é responsável pela UI de autenticação, enquanto `useAuth.ts` é responsável pela lógica.
-   **Service Layer**: O `supabase/client.ts` atua como uma camada de serviço, abstraindo os detalhes da comunicação com o Supabase. 