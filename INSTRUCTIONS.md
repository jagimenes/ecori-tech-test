<h1 align="center" id="topo">Teste Técnico - Ecori ☀</h1>

### 🏷️ Descrição do Teste:

Criar um Todo List: desenvolver no front-end com ReactJS, no back-end com NodeJS e banco de dados com Postgres.

⚡ [Clique aqui](https://ecori-tech-test.netlify.app) 🔗 live demo!

Obs: front-end hospedado na [netlify](https://www.netlify.com/) e back-end hospedado no [render](https://render.com/)

---

### 👩‍💻 Tecnologias Utilizadas:

- React.js
- Node.js
- Postgres

### 🚀 Funcionalidades Completadas:

#### Back-end

✔ Uma rota de **listagem de tasks**, aceitando parâmetros como filtros (_title_ ou _description_) e paginação (_page_ e _pageSize_);<br>
✔ Uma rota de **Criação de uma task**, recebendo os campos, _title_, _description_. O objeto completo, na base de dados (PostgreSQL), deve ter mais 3 campos: _completed_at_ (para controlar quando uma task foi marcada como completa), _created_at_ (para controlar quando a task foi criada) e _updated_at_ (para controlar quando a task foi modificada);<br>
✔ Uma rota de **atualizar uma task**, passando na rota o _id_ da task, e aceitando parâmetros como _title_, _description_;<br>
✔ Uma rota de **Remover uma task**, passando na rota o _id_ da task;<br>
✔ Uma rota de **Marcar uma task como concluída**, passando na rota o _id_ da task;<br>

#### Front-end

✔ Implementar, todas as funcionalidades do backend;
✔ Bonus: CSS responsivo;

---

### 🔩 Instruções:

Para configurar o banco de dados, acesse [ElephantSQL](https://www.elephantsql.com/) => PostgreSQL as a Service.

Após criar uma conta, crie um nova instância e em "Details" copie a URL de conexão.

Na pasta 'server' crie um arquivo `.env` na raiz e defina as variáveis:

```
PORT=5000
POSTGRES_URL=***  // Substitua *** pelo URL copiado no ElephantSQL
```

Obs: a aplicação backend irá criar a tabela TASKS

No diretório do projeto instale as dependências em cada pasta:

Na pasta 'server'

```
npm install
```

Após instalar as dependências:

```
npm run dev
```

Na pasta 'client'

```
npm install
```

Após instalar as dependências:

```
npm run dev
```

🎉 Back-end => acesse http://localhost:5000/api/v1/tasks

🎉 Front-end => acesse http://localhost:5173

---

> Copyright &copy; 2024 by **Bruno Seghese**

---
