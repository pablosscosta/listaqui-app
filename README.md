# ListAqui App

Uma aplicação web full stack para gerenciar listas de compras de forma colaborativa entre os membros de uma casa.

## Tecnologias Utilizadas

* **Backend**: Django, Django REST Framework (DRF)
* **Frontend**: React, Vite
* **Linguagem**: Python, JavaScript
* **Banco de Dados**: SQLite (desenvolvimento)

## Estrutura de Diretórios

O projeto é dividido em duas partes principais:

* **`backend/`**: Contém todo o código da API em Django.
* **`frontend/`**: (A ser implementado) Conterá o código da interface do usuário.

## Modelo de Dados

### Entidades e Seus Atributos

**Tabela `user`**
* `id` (inteiro, chave primária)
* `email` (texto, único)
* `name` (texto)
* `password` (texto, hash)
* `is_active` (booleano, `true` por padrão)
* `is_staff` (booleano, `false` por padrão)
* `is_superuser` (booleano, `false` por padrão)
* `date_joined` (timestamp)

**Tabela `house`**
* `id` (inteiro, chave primária)
* `name` (texto)
* `code` (texto, único)
* `created_at` (timestamp)

**Tabela `house_user` (tabela de ligação)**
* `id` (inteiro, chave primária)
* `user_id` (inteiro, chave estrangeira para `user`)
* `house_id` (inteiro, chave estrangeira para `house`)
* `is_admin` (booleano)

**Tabela `list` (a ser implementada)**
* `id` (inteiro, chave primária)
* `house_id` (inteiro, chave estrangeira para `house`)
* `title` (texto)
* `created_at` (timestamp)
* `updated_at` (timestamp)

**Tabela `item` (a ser implementada)**
* `id` (inteiro, chave primária)
* `list_id` (inteiro, chave estrangeira para `list`)
* `description` (texto)
* `amount` (número)
* `unit_of_measure` (texto, e.g., 'kg', 'litro', 'unidade')
* `is_completed` (booleano, `false` por padrão)
* `created_at` (timestamp)
* `updated_at` (timestamp)

### Diagrama de Entidade-Relacionamento

O diagrama do modelo de dados será incluído no futuro.

## Configuração do Ambiente

Para configurar o projeto localmente:

1.  **Clone o repositório**:
    `git clone <URL-do-seu-repositorio>`
    `cd listaqui-app/backend`

2.  **Crie e ative o ambiente virtual**:
    `python3 -m venv .venv`
    `source .venv/bin/activate`

3.  **Instale as dependências**:
    `pip install -r requirements.txt` (Este arquivo precisa ser criado com `pip freeze > requirements.txt`)

4.  **Rode as migrações**:
    `python manage.py makemigrations`
    `python manage.py migrate`

5.  **Crie um superusuário (opcional, para acessar o painel admin)**:
    `python manage.py createsuperuser`

6.  **Inicie o servidor**:
    `python manage.py runserver`

## Endpoints da API

* `GET /api/users/`: Lista todos os usuários.
* `POST /api/users/`: Cria um novo usuário.
* `GET /api/users/<id>/`: Recupera os dados de um usuário específico.
* `GET /api/houses/`: Lista todas as casas.
* `POST /api/houses/`: Cria uma nova casa.
* `GET /api/houses/<id>/`: Recupera os dados de uma casa específica.