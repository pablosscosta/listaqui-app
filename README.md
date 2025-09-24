# Gerenciador de Listas de Compras

### Sobre o Projeto
Este é um **MVP (Produto Mínimo Viável)** de uma aplicação web full-stack para gerenciamento de listas de compras. O projeto foi desenhado com um escopo enxuto para validar as funcionalidades centrais antes de adicionar recursos mais complexos, como autenticação de usuários e colaboração.

### Tecnologias Utilizadas
* **Backend:** Python com o framework **Django**.
* **Frontend:** JavaScript com a biblioteca **React** e o bundler **Vite**.

### Escopo do MVP
O projeto nesta fase inicial foca em um fluxo de uso simples e direto, sem a necessidade de um sistema de usuários.
* **Acesso:** Não há login. A aplicação funciona para um único usuário e gerencia uma única casa.
* **Listas Automáticas:** Ao iniciar a aplicação, duas listas são criadas: "Mensal" e "Emergencial".
* **CRUD de Itens:** O usuário pode adicionar, visualizar, editar e remover itens das listas.
* **Marcar como Concluído:** Itens podem ser marcados como "comprados" ou finalizados.

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
    * Instale as dependências do Node.js.
2.  **Execução:**
    * Inicie o servidor de desenvolvimento. O frontend estará disponível no navegador.

### Próximos Passos
Após a aprovação deste `README.md`, o próximo passo é detalhar e implementar o modelo de dados para as listas e itens, bem como a definição das rotas da API.