
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

Para inciar o WebApp será necessário configurar o endereço da API que foi disponibilizado ao iniciar o projeto API, para isso voce deve informar o endereço dentro do arquivo 

```bash
  character.service.ts
```
que está dentro do caminho

```bash
  EcoriTechTest.WebApp\src\app\character\services
```

e alterar a variável

```bash
  baseUrl = "https:localhost:7098";
```

depois de configurado o endereço do 'baseUrl' basta acessar o projeto WebApp via terminal apartiar do caminho raiz da aplicação com o comando

```bash
  cd EcoriTechTest.WebApp
```

e posteriormente dentro da pasta do projeto WebApp executar os comandos via terminal

```bash
  npm install
  ng serve -o
```