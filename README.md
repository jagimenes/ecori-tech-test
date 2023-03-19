
## Como iniciar a aplicação

Para inciar a aplicação será necessário inciar o projeto API e o projeto WebApp

## Inciar a API

Para iniciar a API, via terminal acesse a pasta em que foi realizado o clone da aplicacao, e posteriormente acesse a pasta do projeto API com o comando:
```bash
  cd EcoriTechTest.Api
```

e depois dentro da pasta do projeto API execute o comando 
    
```bash
  dotnet run
```

## Inciar o WebApp

Para iniciar o WebApp é necessário configurar o arquivo

```bash
  character.service.ts
```
que está no caminho

```bash
  EcoriTechTest.WebApp\src\app\character\services
```
Para isso, inicie o projeto API, e o endereço que for exibido deverá ser copiado para a variável

```bash
  baseUrl = "https:localhost:7098";
```

depois de configurado o endereço do 'baseUrl' basta acessar o projeto WebApp via terminal a partir do caminho raiz da aplicação com o comando

```bash
  cd EcoriTechTest.WebApp
```

e posteriormente dentro da pasta do projeto WebApp executar os comandos via terminal

```bash
  npm install
  ng serve -o
```