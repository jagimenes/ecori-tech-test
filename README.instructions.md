## Pré-requisitos

[git](https://www.git-scm.com/downloads)

[Docker Engine](https://docs.docker.com/engine/install/)

[Docker Compose](https://docs.docker.com/compose/install/)

[NodeJs & NPM](https://nodejs.org/en/download)

## Instruções para iniciar o projeto

Inicialmente, faça o clone do repositório:

```bash
git clone https://github.com/aeliferr/ecori-tech-test.git
```

Para rodar os testes do back, execute:

```bash
cd echori-tech-test/backend
docker compose up -d
npm install
npm run test
```

Execute os comandos abaixo para executar a API:

```bash
cd echori-tech-test/backend
docker compose up -d
npm install
npm run dev
```

Em um novo terminal, execute os comandos abaixo para executar o front:

```bash
cd echori-tech-test/frontend
npm install
npm run dev
```
