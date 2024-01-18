[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/jagimenes/ecori-tech-test/blob/main/README.md)

## Teste técnico para integrar o time da Ecori ☀

<br>

## Criar uma API Rest e uma SPA, de gerenciamento de tasks.

## :computer: Funcionalidades (Back-end)
🔴 Uma rota de **listagem de tasks**, aceitando parâmetros como filtros (_title_ ou _description_) e paginação (_page_ e _pageSize_);<br>
🔴 Uma rota de **Criação de uma task**, recebendo os campos, _title_, _description_. O objeto completo, na base de dados (PostgreSQL), deve ter mais 3 campos: _completed_at_ (para controlar quando uma task foi marcada como completa), _created_at_ (para controlar quando a task foi criada) e _updated_at_ (para controlar quando a task foi modificada);<br>
🔴 Uma rota de **atualizar uma task**, passando na rota o _id_ da task, e aceitando parâmetros como _title_, _description_;<br>
🔴 Uma rota de **Remover uma task**, passando na rota o _id_ da task;<br>
🔴 Uma rota de **Marcar uma task como concluída**, passando na rota o _id_ da task;<br>
**Opcionais**<br>
🟢 **Bonûs 1**: Importar tasks, com uma lista de _title_ e _description_, de um CSV;<br>
🟢 **Bonûs 2**: Controle de login;<br>

## :computer: Funcionalidades (Front-end)
🔴Implementar, todas as funcionalidades do backend <br>

## Tecnologias e ferramentas que você precisa utilizar:
☑️ [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) <br>
☑️ [Node.js](https://nodejs.org/) <br>
☑️ [React](https://react.dev/) <br>
☑️ [PostgreSQL](https://www.postgresql.org/) <br>
☑️ Fique a vontade para usar qualquer outra ferramenta/tecnologia se precisar <br>
❗ Seria incrível, se pudesse nos entregar uma aplicação com **testes** <br>
❗ Seria incrível, se você implementasse nas rotas de atualização do dado, algum tratamento para concorrência 

## Instruções para iniciar o projeto
- Faça um fork deste projeto
- Faça todas as tarefas para completar a aplicação
- Crie um README.md mostrando os passos para iniciar a sua aplicação
- Faça uma solicitação de merge na branch main
- Nos mande o link da solicitação de merge
