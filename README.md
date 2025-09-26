# Gerenciador de Listas de Compras

### Sobre o Projeto
Este é um **MVP (Produto Mínimo Viável)** de uma aplicação web full-stack para gerenciamento de listas de compras. O projeto foi desenhado com um escopo enxuto para validar as funcionalidades centrais antes de adicionar recursos mais complexos, como autenticação de usuários e colaboração.

### Tecnologias Utilizadas
* **Backend:** Python com o framework **Django** e **Django REST Framework (DRF)**.
* **Frontend:** JavaScript com a biblioteca **React (TSX)** e o bundler **Vite**.

---

### Funcionalidades da V2: Autenticação (Registro)
A aplicação agora inclui a fundação para a autenticação multi-usuário. A V1 é o núcleo central de gerenciamento de listas.

* **Configuração Inicial:** Uma única **Casa** é criada automaticamente na primeira execução do `migrate`, juntamente com as listas **"Mensal"** e **"Emergencial"**.
* **CRUD de Itens:** O usuário pode **Adicionar**, **Visualizar**, **Atualizar** (marcar como comprado) e **Deletar** itens em ambas as listas.
* **Estrutura de API:** A comunicação é feita via endpoints RESTful.
* **Registro de Usuários:** Endpoint e interface inicial para a criação de novas contas, base para a funcionalidade multi-usuário.

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

1. **Autenticação de Usuário:** Finalizar Login e Logout com JWT.
2.  **Colaboração:** Permitir que múltiplos usuários compartilhem a mesma Casa e Listas.
3.  **Novas Funcionalidades:** Adicionar filtros e ordenação nas Listas.