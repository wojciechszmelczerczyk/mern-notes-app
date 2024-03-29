# Speech Notes App

## Description

The project target is helping hearing impaired students during the lessons they attend. But potentially can be used by any student.

The project aims to introduce a speech to text system able to transcript the voice of the professor into a text on the screen of the student pc or mobile phone.

Students can record teacher voice by clicking a button which will transcrypt voice to text for their better understandment.

Registered user will have premium feature to store the transcriptions online and save them to a file (txt or pdf format).

Students will be able to change speech language.

Students will be able to search lessons by title they provide before transcryption to text.

Server side of application will be made in `Node` using `Express` framework.

Data will be saved to `Mongo` database.

Data will be cached in `Redis` cache.

Tests will be written in `Cypress` and `Supertest`.

Client side will be created in `React` using `Tailwindcss` framework.

<br/>

## Table of content

- [Techstack](#techstack)
- [Requirements](#requirements)
- [Usage](#usage)
  - [Clone repository](#clone-repository)
  - [Install dependencies](#install-dependencies)
  - [Run app](#run-app)
- [Architectures](#architectures)

  - [App Architecture](#app-architecture)
  - [Database Architecture](#database-architecture)

- [Client routing](#client-routing)
- [API Endpoints](#api-endpoints)

- [Tests](#tests)
  - [E2E](#e2e)
  - [API](#api)

## Techstack

- `React`
- `Tailwindcss`
- `TypeScript`
- `Express`
- `MongoDB`
- `Mongoose`
- `Redis`
- `Jest`
- `Supertest`
- `Cypress`

## Requirements

- install `node`
- install `mongo`
- install `redis`

## Usage

### Clone repository

```
git clone https://github.com/wojciechszmelczerczyk/express-notes-app.git
```

### Navigate to project folder

```sh
cd /mern-notes-app
```

### Install dependencies

```
npm i
```

### Run app

#### Run React server

```
npm run client
```

#### Run Express REST API

```sh
npm run server
```

#### Run both servers concurrently

```sh
npm run app
```

### Env setup

```dockerfile
# Uri to mongo database
DB_URI=

# Speech key for Microsoft Cognitive Services
SPEECH_KEY=

# Speech region for Microsoft Cognitive Services
SPEECH_REGION=

# Port
PORT=

# Token for test purposes
JWT=

# Access token secret
ACCESS_TOKEN_SECRET=

# Refresh token secret
REFRESH_TOKEN_SECRET=

# Access token expiration time
ACCESS_TOKEN_EXP=

# Refresh token expiration time
REFRESH_TOKEN_EXP=
```

## Architectures

### App Architecture

<details>
<summary>
App implements Rest API style architecture. App includes Speech-to-text API.
</summary>
<img src="./.github/img/arch.png">

</details>

### Database Architecture

[![](https://mermaid.ink/img/pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)](https://mermaid.live/edit#pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)

## Client routing

| Endpoint      | Authenticated |      Component       | Description                                 |
| :------------ | :-----------: | :------------------: | ------------------------------------------- |
| `/`           |      \*       |  NoteListComponent   | Note list of current auth user              |
| `/register`   |       -       |  RegisterComponent   | Register form                               |
| `/login`      |       -       |    LoginComponent    | Login form                                  |
| `/note/:id`   |      \*       | NoteDetailsComponent | Single note details, speech-to-text service |
| `/createNote` |      \*       | CreateNoteComponent  | Set note title                              |

## API Endpoints

### User:

| Method |                             Endpoint                             |
| :----: | :--------------------------------------------------------------: |
|  GET   |               [`/user`](./server/docs/user/get.md)               |
|  POST  |              [`/user`](./server/docs/user/post.md)               |
|  POST  |     [`/user/authenticate`](./server/docs/user/post-auth.md)      |
|  GET   | [`/user/refresh-token`](./server/docs/user/get-refresh-token.md) |

### Note:

| Method |                      Endpoint                       |
| :----: | :-------------------------------------------------: |
|  GET   |        [`/note`](./server/docs/note/get.md)         |
|  POST  |        [`/note`](./server/docs/note/post.md)        |
|  PUT   |      [`/note/:id`](./server/docs/note/put.md)       |
|  GET   |    [`/note/:id`](./server/docs/note/getById.md)     |
| DELETE |     [`/note/:id`](./server/docs/note/delete.md)     |
|  POST  | [`/note/:id/file`](./server/docs/note/post-file.md) |

### Speech-to-text:

| Method |                             Endpoint                             |
| :----: | :--------------------------------------------------------------: |
|  GET   | [`/api/get-speech-token`](./server/docs/api/get-speech-token.md) |

## Tests

### E2E

#### To run tests:

`npm run e2e`

#### Note

<details>

<summary>if note title is too short, prompt an error</summary>

```javascript
it("if note title is too short, prompt an error", () => {
  localStorage.setItem("at", "");

  cy.visit("http://localhost:5000/createNote");

  cy.get('[data-cy="noteTitleInput"]').type("tes");

  cy.get('[data-cy="createNoteButton"]').click();

  cy.get('[data-cy="createNoteError"]').should(
    "contain",
    "Note title is too short."
  );
});
```

</details>

<details>

<summary>if note title is too long, prompt an error</summary>

```javascript
it("if note title is too long, prompt an error", () => {
  localStorage.setItem("at", "");

  cy.visit("http://localhost:5000/createNote");

  cy.get('[data-cy="noteTitleInput"]').type("testtest1");

  cy.get('[data-cy="createNoteButton"]').click();

  cy.get('[data-cy="createNoteError"]').should(
    "contain",
    "Note title is too long."
  );
});
```

</details>

#### User

<details>

<summary>if user credentials are incorrect, prompt error</summary>

```javascript
it("if user credentials are incorrect, prompt error", () => {
  cy.visit("http://localhost:5000/login");

  cy.get('[data-cy="emailInput"]').type("user2404gmail.com");

  cy.get('[data-cy="passwordInput"]').type("test404");

  cy.get('[data-cy="userBtn"]').click();

  cy.get("[data-cy='emailError']").should(
    "contain",
    "Please enter a valid email"
  );
});
```

</details>

<details>

<summary>if user credentials are correct, redirect to note list page</summary>

```javascript
it("if user credentials are correct, redirect to note list page", () => {
  cy.visit("http://localhost:5000/login");

  cy.get('[data-cy="emailInput"]').type("user2@gmail.com");

  cy.get('[data-cy="passwordInput"]').type("test123");

  cy.get('[data-cy="userBtn"]').click();

  cy.location().should((loc) => {
    expect(loc.href).to.eq("http://localhost:5000/");
  });
});
```

</details>

<br />

### API

#### To run tests:

`npm run api`

`GET /note`

<details>

<summary>when jwt doesn't exists</summary>

```javascript
test("when jwt doesn't exists", async () => {
  const notes = await request(app).get("/note");

  expect(notes.status).toEqual(401);
  expect(notes.body.jwt_error).toEqual("Jwt doesn't exists");
});
```

</details>

<details>
<summary>when jwt is incorrect</summary>

```javascript
test("when jwt is incorrect", async () => {
  const notes = await request(app)
    .get("/note")
    .set("Authorization", "Bearer ssss");

  expect(notes.status).toEqual(403);
  expect(notes.body.error).toEqual("jwt malformed");
});
```

</details>

<details>
<summary>when jwt is expired</summary>

```javascript
test("when jwt is expired", async () => {
  const notes = await request(app)
    .get("/note")
    .set("Authorization", `Bearer ${jwt};`);

  expect(notes.status).toEqual(403);
  expect(notes.body.error).toEqual("invalid token");
});
```

</details>

<br />

`POST /note`

<details>
<summary>when jwt doesn't exists</summary>

```javascript
test("when jwt doesn't exists", async () => {
  const newNote = await request(app)
    .post("/note")
    .send({ title: "new note added in jest", content: "" });
  expect(newNote.status).toBe(403);
  expect(newNote.body.error).toBe("Jwt doesn't exist");
});
```

</details>

<details>
<summary>when jwt is incorrect</summary>

```javascript
test("when jwt is incorrect", async () => {
  const newNote = await request(app)
    .post("/note")
    .send({ title: "new note added in jest", content: "" })
    .set("Authorization", "Bearer falseToken");

  expect(newNote.status).toBe(403);
  expect(newNote.body.error).toBe("jwt malformed");
});
```

</details>

<details>
<summary>when jwt is expired</summary>

```javascript
test("when jwt is expired", async () => {
  const newNote = await request(app)
    .post("/note")
    .send({ title: "just next note added in jest", content: "" })
    .set("Authorization", `Bearer ${jwt}`);

  expect(newNote.status).toBe(201);
  expect(newNote.body.title).toBe("just next note added in jest");
});
```

</details>

<br />

`POST /user`

<details>
<summary>when credentials are correct</summary>

```javascript
test("when credentials are correct", async () => {
  let user = {
    email: "testuser@gmail.com",
    password: "testpassword123",
  };

  const newUser = await request(app).post("/user").send(user);

  expect(newUser.body.email).toEqual(user.email);
  expect(newUser.status).toEqual(200);
});
```

</details>

<details>
<summary>when credentials are incorrect</summary>

```javascript
test("when credentials are incorrect", async () => {
  let user = {
    email: "testuser",
    password: "test",
  };

  const newUser = await request(app).post("/user").send(user);

  expect(newUser.body.errors).toBeTruthy();
  expect(newUser.status).toEqual(400);
});
```

</details>

<br />

`POST /user/authenticate`

<details>
<summary>when credentials are correct</summary>

```javascript
test("when credentials are correct", async () => {
  let user = {
    email: "testuser@gmail.com",
    password: "testpassword123",
  };

  const newUser = await request(app).post("/user/authenticate").send(user);

  expect(newUser.body.token).toBeTruthy();
  expect(newUser.status).toEqual(201);
});
```

</details>

<details>

<summary>when credentials don't match user in db</summary>

```javascript
test("when credentials don't match user in db", async () => {
  let user = {
    email: "testuser",
    password: "test",
  };

  const newUser = await request(app).post("/user/authenticate").send(user);

  expect(newUser.body.error).toBeTruthy();
  expect(newUser.status).toEqual(400);
});
```

</details>

<details>

<summary>when credentials are incorrect</summary>

```javascript
test("when credentials are incorrect", async () => {
  let user = {
    email: "testuser2@gmail.com",
    password: "test1234",
  };

  const newUser = await request(app).post("/user/authenticate").send(user);

  expect(newUser.body.error).toBeTruthy();
  expect(newUser.status).toEqual(400);
});
```

</details>
