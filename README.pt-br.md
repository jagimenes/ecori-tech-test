[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/jagimenes/ecori-tech-test/blob/main/README.md)

## Teste técnico para integrar o time da Ecori ☀

<br>

## Criar uma API Rest e uma SPA que faça uso da API oficial [Marvel Comics API](https://developer.marvel.com/docs).

## :computer: Funcionalidades (Back-end)
🔴 Uma rota de **lista de personagens**, aceitando parâmetros como filtros e paginação;<br>
🔴 Uma rota de **detalhes do personagem**, recebendo o ID do personagem como parâmetro;<br>

## :computer: Funcionalidades (Front-end)
🔴 Uma página de **listagem de personagens**, usando parâmetros, filtros e paginação criados anteriormente;<br>
🔴 Uma página de **detalhes do personagem**, que exiba todos os dados retornados pelo backend, clicando em um personagem na lista criada anteriormente;<br>

## Tecnologias e ferramentas que você precisa utilizar:
☑️ [.Net 6](https://dotnet.microsoft.com/pt-br/) <br>
☑️ [Angular](https://angular.io/) <br>
☑️ Fique a vontade para usar qualquer outra ferramenta/tecnologia se precisar <br>

## Instruções para iniciar o projeto
- Faça um fork deste projeto
- Faça todas as tarefas para completar a aplicação
- Crie um README.md mostrando os passos para iniciar a sua aplicação
- Faça uma solicitação de merge na branch main
- Nos mande o link da solicitação de merge
Doc:
<h1 align="center">
  Ecori Teste Doc
</h1>
<div align="center" display="inline-block">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white"/>
  <img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white"/>
  <img src="https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/>
</div>

<h2 align="center">
  Como rodar: 
</h2>
<div align="center" display="inline-block">
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/>
</div>

```bash
#Faça clone
git clone <repo>

#Acesse a sln (solution)
cd ./MarvelComicsEcori

#Execute os comandos
dotnet restore
dotnet clean
dotnet build
#nesse momento pode demorar um pouco

#Por fim acesse o diretorio do domain app
cd ./MarvelComicsEcori.App

#Execute
dotnet run
```

<h2 align="center">
  Como rodar: 
</h2>
<div align="center" display="inline-block">
<img src="https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white"/>
</div>

```bash
#Faça clone
git clone <repo>
#Abra a soution no vs
#Selecione MarvelComicsEcori.App
#Rode a aplicação
#nesse momento vai baixar os pacotes pode demorar um pouco
```
---------------
<h2 align="center">
 Principais features:
</h2>
<h3>features back-end:</h3>
<ul>
  <li>
    Documentação no swagger
  </li>
  <li>Padrão CQRS implementado - nesse caso so tinha necessidade das querys para buscas</li>
  <li>
    DDD implementado, criando uma aplicação desacoplada, nesse caso o front e a API foram feitas no mesmo dominio mas seria simples desacoplar ja que toda a logica e manipulação ficou nos outros dominios, seria necessario apenas montar os controllers
  </li>
  <li>
    Serializando e deserializando dados que vem da API em um DTO, Tratando dados que vem da API
  </li>
  <li>
    Criada a logica de paginação (skip = pular, take = pegar)
  </li>
  <li>
    Listagem de todos os personagens da marvel com base em filtros
  </li>
  <li>
    Listagem de apenas um personagens da marvel com base no id
  </li>
  <li>
    Listagem de comics com base no id do personagem
  </li>
</ul>
<h3>Desafios da implementação back-end:</h3>
<p>O primeiro passo foi abstrair a ideia e identificar os pontos principais do projeto. Tirei um tempo para pensar em como seria a arquitetura, já que não possuía um banco de dados e, sim, um serviço externo (API Marvel). Criei os repositórios para consumir esse serviço e pude dar início à parte de modelagem dos dados. Deserializei o JSON de retorno em um DTO para conseguir manipular essa classe no projeto, caso necessário. Tudo foi criado pensando em escalabilidade, facilitando a adição de novas rotas e controllers devido ao padrão CQRS. Além disso, temos um domínio de infraestrutura bem definido e seria simples adicionar um banco de dados para armazenar personagens na própria aplicação, se assim necessitasse. Também á possibilidade de implementar testes para evitar retrabalho no futuro.</p>

------------------------
<h3>features front-end:</h3>
<ul>
  <li>Implementado a listagem de personagens</li>
  <li>
    Paginação de um em um ou escolher ir para o final ou ao começo.
  </li>
  <li>
    Filtros para pesquisar: nome sem erros do personagem, letras iniciais de personagens, data de modificação e ordenação de A-Z, Z-A, ultimos personagens modificados, e modificação mais antiga
  </li>
  <li>
    Criação de loading para melhorar a experiencia do usuario
  </li>
  <li>
    Modal de detalhes de cada personagem
  </li>
  <li>
    Listagem de Comics de um personagem
  </li>
  <li>
    Listagem de Series de um personagem
  </li>
</ul>
<h3>Desafios da implementação front-end:</h3>
<p>O desafio principal foi a tecnologia, nunca havia usado angular mas pude me virar bem não pareceu tão complicado.</p>

----------------------

<p>Nota: Os Endpoints estão hard coded pra facilitar os testes(a API da marvel pede para utilizar a encriptação md5 para gerar um hash): <a href="https://developer.marvel.com/documentation/authorization">+ info click aqui</a></p>
