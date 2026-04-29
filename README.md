#  Streaming de Vídeos — Backend Project 01

Projeto desenvolvido para a disciplina **EC48B-C71 — Programação Web Back-End** (UTFPR).

Biblioteca de acesso ao MongoDB utilizando Node.js com foco em armazenamento e busca de vídeos, inspirado no YouTube.

---

##  Equipe

| Nome | RA |
|------|----|
| Mauricio Alves de Aquino | 2564556 |
| Leonardo Pereira Jorge | 2503689 |

---

##  Tecnologias

- **Node.js** — runtime JavaScript
- **MongoDB** — banco de dados NoSQL
- **Docker** — container do banco de dados
- **bcrypt** — hash de senhas
- **uuid v4** — geração de IDs únicos
- **dotenv** — variáveis de ambiente

---

##  Estrutura do projeto

```
src/
├── db/
│   └── connect.js          # Conexão singleton com o MongoDB
├── login/
│   └── login.js            # Autenticação com email e senha
├── users/
│   ├── insert-user.js
│   ├── find-user.js
│   ├── find-one-user.js
│   ├── update-user.js
│   └── delete-user.js
├── videos/
│   ├── insert-video.js
│   ├── find-video.js
│   ├── find-one-video.js
│   ├── update-video.js
│   └── delete-video.js
├── playlists/
│   ├── insert-playlist.js
│   ├── find-playlist.js
│   ├── find-one-playlist.js
│   ├── update-playlist.js
│   └── delete-playlist.js
├── favorites/
│   ├── insert-favorite.js
│   ├── find-favorite.js
│   └── delete-favorite.js
└── index.js                # Arquivo principal de testes
```

---

## Collections do banco de dados

### `users`
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `_id` | UUID v4 | ✔ |
| `name` | String | ✔ |
| `email` | String (único) | ✔ |
| `password` | String (hash bcrypt) | ✔ |
| `age` | Number | ✔ |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

### `videos`
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `_id` | UUID v4 | ✔ |
| `name` | String | ✔ |
| `url` | String | ✔ |
| `category` | String | ✔ |
| `duration` | Number (segundos) | ✔ |
| `count` | `{ like, dislike }` | auto |
| `userId` | UUID (ref. users) | ✔ |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

### `playlists`
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `_id` | UUID v4 | ✔ |
| `name` | String | ✔ |
| `userId` | UUID (ref. users) | ✔ |
| `videoId` | Array de UUIDs | auto |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

### `favorites`
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `_id` | UUID v4 | ✔ |
| `userId` | UUID (ref. users) | ✔ |
| `videoId` | UUID (ref. videos) | ✔ |
| `createdAt` | Date | auto |

---

## Como executar

### Pré-requisitos
- Node.js 18+
- Docker Desktop

### 1. Clone o repositório
```bash
git clone https://github.com/aqu1no1/backend-project-01-EC48B.git
cd backend-project-01-EC48B
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o `.env`
Crie um arquivo `.env` na raiz do projeto:
```env
MONGO_URI=mongodb://admin:admin123@localhost:27017/streaming?authSource=admin
MONGO_DB_NAME=streaming
PORT=3000
```

### 4. Suba o banco de dados
```bash
docker compose up -d
```

### 5. Execute os testes
```bash
node src/index.js
```

---

## Autenticação

O sistema valida login por **email e senha**. A senha é armazenada com hash `bcrypt` e nunca retornada nas consultas.

```js
const usuario = await login({ email: 'joao@email.com', password: 'senha123' });
```

Casos tratados:
- ✔ Login correto → retorna dados do usuário (sem senha)
- ✔ Senha errada → lança exceção
- ✔ Email inexistente → lança exceção

---

## Casos de uso implementados

| Funcionalidade | Descrição |
|----------------|-----------|
| Cadastrar usuário | Cria conta com email único e senha hasheada |
| Fazer login | Autentica com email e senha |
| Gerenciar perfil | Visualizar e atualizar dados do usuário |
| Enviar vídeo | Upload com título, URL, categoria e duração |
| Buscar vídeos | Listar todos ou buscar por filtro |
| Editar vídeo | Atualizar título, descrição, likes |
| Remover vídeo | Deletar vídeo do banco |
| Gerenciar favoritos | Adicionar e remover vídeos favoritos |
| Gerenciar playlist | Criar playlist e adicionar/remover vídeos |

<img width="535" height="731" alt="image" src="https://github.com/user-attachments/assets/03f32eb9-6547-4364-a1b5-318696d83180" />



---

