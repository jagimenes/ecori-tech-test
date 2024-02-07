# Getting Started

## Prerequisites

Certifique-se de que tem as seguintes ferramentas instaladas no seu sistema:

`Node.js (v14 or later)`
`NPM (Node Package Manager)`
`PostgreSQL`

# Instalação (server)

1. Clone este repositório para o seu computador:

```sh
git clone https://github.com/joaopaulosf/ecori-tech-test.git
```

2. Mude o seu diretório atual para a pasta do projeto:

```sh
cd ecori-tech-test/server
```

3. **Crie arquivo .env:**

exemplo: [example.env](https://github.com/joaopaulosf/ecori-tech-test/blob/main/server/example.env)

4. Instale as dependências do projeto usando o npm:

```sh
npm install

```

## Building the Project

Para criar a aplicação do gestor de tarefas para produção, utilize o seguinte comando:

```sh
npm run build
```

## Running the Server

```sh
npm run preview
```

**Saída do terminal**:

`Server running on port 3500`

# Instalação (client)

1. Mude o seu diretório atual para a pasta do projeto:

```sh
cd ecori-tech-test/client
```

2. Instale as dependências do projeto usando o npm:

```sh
npm install

```

## Building the Project

Para criar a aplicação do gestor de tarefas para produção, utilize o seguinte comando:

```sh
npm run build
```

## Running the Server

```sh
npm run preview
```

**Saída do terminal:**

`➜  Local:   http://127.0.0.1:4173/` <br>
`➜ Network: use --host to expose` <br>
`➜ press h + enter to show help`

# Endpois

`GET` **/tasks**

- Retorna todas as tarefas.

`GET` **/tasks/?pageSize=5&page=1**

- Retorna uma página específica de tarefas com tamanho de página personalizado.
- O tamanho padrão da página é 10 se não especificado.

`GET` **/tasks/?title=example&description=example&pageSize=2&page=1**

- Retorna tarefas com um título e descrição específicos e permite a paginação personalizada.

`POST` **/tasks**

- Cria uma nova tarefa.

`POST` **/upload?csv**

- Faz o upload de um arquivo CSV para processamento.

`PUT` **/tasks/:id**

- Atualiza uma tarefa com o ID especificado.

`PATCH` **/tasks/:id**

- Atualiza parcialmente uma tarefa com o ID especificado.

`DELETE` **/tasks/:id**

- Remove uma tarefa com o ID especificado.

`PUT` **/task/:id**

- Marca uma tarefa como concluída com o ID especificado.
