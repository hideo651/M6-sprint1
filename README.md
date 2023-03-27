<h1 align="center">Documentação da API - Gerenciador de Contatos ☎️</h1>

<br/>

## ✅ Links da aplicação

- URL de teste: http://localhost:3333

<br/>

## 🦾 **Tecnologias utilizadas**

- **TypeScript**
- **NodeJS**
- **Express**
- **Express-async-errors**
- **PostgreSQL**
- **Bcrypt**
- **Json Web Token**
- **Class-transformer**
- **Dotenv**
- **TypeORM**

#

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

```
yarn install
```

<br>

**OBS: Configure as variáveis de ambiente no seu _.env_, passando as credenciais corretas para conectar em seu banco local.**

<br>

Com isso feito, para rodar sua aplicação, basta utilizar o comando

```
yarn dev
```

<br>

## ➡️ **Rotas da aplicação**

### Rotas do usuário

#

### 1) Criação do usuário - POST /users

<br>

`Exemplo de body`

```
    name: Hideo
    email: hideo@email.com
    cellphone: (11) 123345423
    password: Teste123@

```

`Exemplo de response - status 201`

```javascript
{
	"name": "Hideo",
	"email": "hideo@email.com",
	"cellphone": "(11) 123345423",
	"id": "84f350e7-21f6-4b59-80f7-61ada50ed586",
	"createdAt": "2023-03-25T23:09:45.951Z"
}
```

<br>

`Exemplo de response com e-mail já existente - status 409`

```javascript
{
	"message": "E-mail já cadastrado!"
}
```

#

### 2) Listar o usuário logado pelo Token - GET /users

<br>

Além de pegar as informações do usuário logado, ela retorna todos os contatos associados ao ID do usuário.

Essa rota só pode ser acessada por usuários autenticados (token).

`Exemplo de response - status 200`

```javascript
{
	"id": "84f350e7-21f6-4b59-80f7-61ada50ed586",
	"name": "Hideo",
	"email": "hideo@mail.com",
	"cellphone": "1234567",
	"createdAt": "2023-03-25T23:09:45.951Z",
	"contacts": []
}
```

<br>

`Exemplo de response caso o usuário não esteja autenticado - status 401`

```javascript
{
	"message": "Token inválido"
}
```

<br>

#

### 3) Editar as informações do usuário - PATCH /users/:id

Essa rota só pode ser acessada por usuários autenticados (token).

<br>

`Exemplo de body`

```
	name: Gustavo Ferreira
	email: gustavoferreira@email.com
	cellphone: (14) 96656234
    password: @Churros123
```

`Exemplo de response - status 200`

```javascript
{
	"id": "84f350e7-21f6-4b59-80f7-61ada50ed586",
	"name": "Gustavo Ferreira",
	"email": "gustavoferreira@email.com",
	"cellphone": "(14) 96656234",
	"createdAt": "2023-03-25T23:09:45.951Z"
}
```

<br>

`Exemplo de response caso o usuário não esteja autenticado - status 401`

```javascript
{
	"message": "Token inválido"
}
```

<br>

#

### 4) Pegar todos os usuários cadastrados - GET /users/all

Essa rota só pode ser acessada por usuários autenticados (token)

<br>

`Exemplo de response - status 200`

```javascript
[
  {
    id: "a0171f28-afce-4259-aa5b-2fe8f5882b3e",
    name: "jose",
    email: "lima@gmail.com",
    cellphone: "(12) 3433334",
    createdAt: "2023-03-23T21:34:21.495Z",
  },
  {
    id: "f4d59c5b-621d-4a00-8b95-9407782b2e45",
    name: "Mike",
    email: "mike@mail.com",
    cellphone: "(11) 34655700",
    createdAt: "2023-03-23T21:46:51.116Z",
  },
  {
    id: "8306df89-b8cf-4f27-b73b-55e3ec347219",
    name: "Teste03",
    email: "teste03@mail.com",
    cellphone: "(19) 34330700",
    createdAt: "2023-03-24T17:48:25.783Z",
  },
  {
    id: "84f350e7-21f6-4b59-80f7-61ada50ed586",
    name: "Gustavo Ferreira",
    email: "gustavoferreira@email.com",
    cellphone: "(43) 96656234",
    createdAt: "2023-03-25T23:09:45.951Z",
  },
];
```

#

## Rotas do Login

#

### 1) Login do usuário - POST /login

<br>

`Exemplo de body`

```
    email: hideo@email.com
    password: Teste123@
```

`Exemplo de response - status 200`

```javascript
{
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0ZjM1MGU3LTIxZjYtNGI1OS04MGY3LTYxYWRhNTBlZDU4NiIsImlhdCI6MTY3OTg1ODQ2MCwiZXhwIjoxNjc5OTQ0ODYwLCJzdWIiOiJoaWRlb0BtYWlsLmNvbSJ9.EKjgxpDQIlxinj93ESUXEnTD3-UAk9OkOrjvZvXCSkI"
}
```

`Exemplo de response caso erre a senha ou email do usuário`

```javascript
{
		"message": "Usuário ou senha inválido!"
}
```

### Rotas do Contato

#

### 1) Criação do contato - POST /contact

Essa rota só pode ser acessada por usuário autenticados, ao criar um novo contato, automaticamente o contato é associado ao ID do usuário logado

<br>

`Exemplo de body`

```
    name: Luna
    email: luna@mail.com
    cellphone: (11) 987979879

```

`Exemplo de response - status 201`

```javascript

{
	"name": "Luna",
	"email": "luna@mail.com",
	"cellphone": "(11) 987979879",
	"user": {
		"id": "84f350e7-21f6-4b59-80f7-61ada50ed586",
		"name": "Gustavo Ferreira",
		"email": "gustavoferreira@email.com",
		"cellphone": "(14) 96656234",
		"createdAt": "2023-03-25T23:09:45.951Z"
	},
	"id": "43de7ec6-2bf3-41a3-ad2c-5062da7e1706",
	"isActive": true,
	"createdAt": "2023-03-26T19:38:57.600Z"
}

```

<br>

`Exemplo de response caso o usuário não passe uma das informação necesssárias para criar um contato, por exemplo, o email - status 400`

```javascript

{
    "message": "Email obrigatório"
}

```

<br>

#

### 2) Deletar um contato - DELETE /contact/:id

Informe o ID do contato na URL da requisição, na rota não é enviado nada no body.

Essa rota só pode ser acessada por usuário autenticados(token)

Caso esteja tudo certo, essa rota irá retornar um status 204 (sem conteúdo)

`Exemplo de response caso o usuário não esteja autenticado - status 401`

```javascript
{
	"message": "Token inválido"
}
```

`Exemplo de response caso tente deletar um usuário inativo - status 409`

```javascript
{
	"message": "Contato inativo"
}
```

#

### 3) Update de um contato - PATCH /contact/:id

Informe o ID do contato na URL da requisição e informe no body se você quer alterar o name, email ou cellphone.

`Exemplo de body`

```
  email: luna.star@mail.com,
	name :Luna Star,
	cellphone: (11) 9785424

```

`Exemplo de response - status 200`

```javascript
{
	"id": "9a34408d-0ae7-4963-9f9e-90323ac87a92",
	"name": "Luna Star",
	"email": "luna.star@mail.com",
	"cellphone": "(11) 9785424",
	"isActive": true,
	"createdAt": "2023-03-27T20:18:32.557Z"
}

```
