# Gerenciador de Listas de Compras

### Sobre o Projeto
Este é um **MVP (Produto Mínimo Viável)** de uma aplicação web full-stack para gerenciamento de listas de compras. O projeto foi desenhado com um escopo enxuto para validar as funcionalidades centrais antes de adicionar recursos mais complexos, como autenticação de usuários e colaboração.

### Tecnologias Utilizadas
* **Backend:** Python com o framework **Django** e **Django REST Framework (DRF)**.
* **Frontend:** JavaScript com a biblioteca **React (TSX)** e o bundler **Vite**.

---

### Funcionalidades da V2: Autenticação (Sessões Seguras)
A aplicação agora possui a fundação para o sistema multi-usuário com controle de acesso completo. As funcionalidades da V1 só podem ser acessadas por usuários autenticados.
* **Registro de Usuários:** Endpoint e interface para a criação de novas contas.
* **Login/Logout Seguro:** Implementação de Login e Logout utilizando **Cookies HTTP-only** para o Refresh Token (proteção contra XSS) e controle do Access Token no estado do React.
* **Proteção de Rotas:** Utilização de um componente **PrivateRoute** para garantir que o Dashboard e as funcionalidades principais só sejam acessíveis após o Login.

---

### Como Rodar o Projeto
Este projeto é dividido em dois ambientes: backend (Django) e frontend (React). Ambos precisam ser configurados e executados separadamente.

#### Backend (Django)

1.  **Configuração do Ambiente:**
    * Navegue até o diretório do backend.
    * Crie e ative um ambiente virtual.
    * Instale as dependências do Python:
        ```bash
        pip install -r requirements.txt
        ```

2.  **Execução:**
    * Execute as migrações no banco de dados para garantir a criação inicial da Casa e das Listas:
        ```bash
        python manage.py migrate
        ```
    * Inicie o servidor Django:
        ```bash
        python manage.py runserver
        ```

#### Frontend (React com Vite)

1.  **Configuração do Ambiente:**
    * Navegue até o diretório do frontend.
    * Instale as dependências do Node.js:
        ```bash
        npm install
        ```
    * Instale o cliente HTTP (Axios) e verifique a configuração do **proxy** em `vite.config.js`:
        ```bash
        npm install axios
        ```

2.  **Execução:**
    * Inicie o servidor de desenvolvimento. O frontend estará disponível no navegador.
        ```bash
        npm run dev
        ```

---

### Próximos Passos

O escopo funcional e visual do Produto Mínimo Viável (MVP) está **completamente concluído**.

**Funcionalidades Implementadas:** CRUD de Itens, Edição do Nome da Casa e Layout responsivo de Dashboard.

As próximas etapas seriam consideradas melhorias e expansão do projeto, fora do escopo original do MVP:

1. **Manutenção de Sessão:** Implementar a lógica de interceptores do Axios e o **Refresh Automático** do Access Token para manter a sessão ativa.
2.  **Colaboração:** Permitir que múltiplos usuários compartilhem a mesma Casa e Listas.
3.  **Novas Funcionalidades:** Adicionar filtros e ordenação nas Listas.