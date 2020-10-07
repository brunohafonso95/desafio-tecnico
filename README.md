# Desafio backend Sky

![Github Actions status](https://github.com/brunohafonso95/desafio-tecnico/workflows/Deployment%20Workflow/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Proposta

- Crie um aplicativo backend que irá expor uma API RESTful de criação de sing up/signin.
- Todos os endpoints devem somente aceitar e somente enviar JSONs. 
- O servidor Deverá retornar JSON para os casos de endpoint não encontrado também.
- O aplicativo deverá persistir os dados.

## Requisitos

- [x] Persistência de dados
- [x] Gestão de dependências via gerenciador de pacotes (npm)
- [x] Utilização de Eslint
- [x] API: Express, Hapi ou similares.
= [x] Utilizar banco nosql

## Requisitos desejáveis

- [x] JWT como token
- [ ] Testes unitários
- [x] Criptografia não reversível (hash) na senha e no token
- [x] Mongo

## Implementações extras

- [x] Graceful shutdown
- [x] Logger das requisições
- [x] Logger na aplicação
- [x] Middlewares de segurança
- [x] Middleware de rate limit para a rota de autentição
- [x] Validação das variaveis de ambiente no start da aplicação
- [x] Validação das variaveis de ambiente no start da aplicação
- [x] Validação dos dados enviados nos endpoints
- [x] Documentação com swagger
- [x] Utilização de uma arquitetura desacoplada de bibliotecas de baixo nível
- [x] Utilização do conventional commit para padronização das mensagens de commit
- [x] Utilização do github actions para deploy automático
- [x] Changelog do projeto com o histório de alterações
- [x] CI/CD local para validação das mensagens de commit e formatação do projeto

## Como rodar a aplicação localmente

1. Clonar o repositório com o comando a abaixo:

```bash
git clone https://github.com/brunohafonso95/desafio-tecnico.git
```

2. Instalar as dependencias com npm ou yarn com os seguintes comandos:

```bash
# npm
npm install

# yarn
yarn install
```

3. Configurar as variaveis de ambiente no arquivo .env com o seguinte conteúdo

```javascript
PORT=
NODE_ENV=
MONGODB_HOST=
MONGODB_PORT={optional}
MONGODB_SSL=
MONGODB_USER={optional}
MONGODB_PASSWORD={optional}
MONGODB_DATABASE=
AUTH_SECRET=
AUTH_EXPIRES_IN=
```

4. executar o comando abaixo para subir a aplicação

```
# npm
npm run start:local

# yarn

yarn start:local
```

## Rotas disponiveis

- /api/v1/signup
- /api/v1/signin
- /api/v1/user/:user_id
- /docs

Descritivo das rotas acessar o aplicação em /docs (swagger com a descrição de todas as rotas)

## Endereços públicos da aplicação

https://sky-challenge-api.herokuapp.com/docs
https://github.com/brunohafonso95/desafio-tecnico

