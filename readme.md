# Notes App

## Project description

The project target is helping hearing impaired students during the lessons they attend. But potentially can be used by any student.

The project aims to introduce a speech to text system able to transcript the voice of the professor into a text on the screen of the student pc or mobile phone.

Student can record teacher voice by clicking a button which will transcrypt voice to text for their better understandment.

Registered user will have premium feature to store the transcriptions online and save them to a file (txt or pdf format).

Student will be able to change speech language.

Students will be able to search lessons by title they provide before transcryption to text.

Server side of application will be made in `Node` using `Express` framework.

Data will be saved to `Mongo` database.

Client side will be created in `React` using `Javascript` language.

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

- [App flow](#app-flow)
- [Client routing](#client-routing)
- [API Endpoints](#api-endpoints)
- [JWT](#jwt)

  - [Middleware](#middleware)
  - [Create token](#create-token-helper-function)
  - [Extract user id](#extract-user-id-helper-function)
  - [Refresh token](#refresh-token)

- [Tests](#tests)

## Techstack

- `React.js`
- `JavaScript`
- `Express.js`
- `MongoDB`
- `Mongoose`
- `Redis`
- `Jest`
- `Supertest`
- `Cypress`
- `Docker`

## Requirements

- install `node`
- install `mongo`

## Usage

### Clone repository

```
git clone https://github.com/wojciechszmelczerczyk/express-notes-app.git
```

### Navigate to project folder

```sh
cd /express-notes-app
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

# Refresh token cookie path
REFRESH_TOKEN_SCOPE=/user/refresh-token
```

## Architectures

### App Architecture

[![](https://mermaid.ink/img/pako:eNptkLFqw0AMhl9FaHIgfgEPBdvXoUOhtIUutyg-JT4S37l3uiHEefeqJB5SqkXi14d-SRccomNs8JBoHuHT2AAabdWfPAeBL95toK6fYEn8XTjLAl31rhnat5fNDe5WIM8xZF6gfdAPLJBn5mGsj3xeoK9e_ZBijvt_hqhHUsZUhoR2lPne7lcPKSk8jOtugPmzhMo24BYnThN5pxdefkGLMvLEFhstHaWjRRuuypXZkfCz8xITNns6Zd4iFYkf5zBgI6nwChlP-q3pTl1_AC3UZ08)](https://mermaid.live/edit#pako:eNptkLFqw0AMhl9FaHIgfgEPBdvXoUOhtIUutyg-JT4S37l3uiHEefeqJB5SqkXi14d-SRccomNs8JBoHuHT2AAabdWfPAeBL95toK6fYEn8XTjLAl31rhnat5fNDe5WIM8xZF6gfdAPLJBn5mGsj3xeoK9e_ZBijvt_hqhHUsZUhoR2lPne7lcPKSk8jOtugPmzhMo24BYnThN5pxdefkGLMvLEFhstHaWjRRuuypXZkfCz8xITNns6Zd4iFYkf5zBgI6nwChlP-q3pTl1_AC3UZ08)

### Database Architecture

[![](https://mermaid.ink/img/pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)](https://mermaid.live/edit#pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)

## App flow

[![](https://mermaid.ink/img/pako:eNpVks9uwjAMxl_FyolJ8AI9bALa8ee63SgHq_FKBE0q1zChlnefSwp0vaT5_LNjf0lrimDJJKZkrA_wneYe9JvvmErXCDHUWNIeZrP3ruZwcZagYLLkxeGp6WDRIv-ToAjMVMjHLZZa9LmwmVypeRsr24kPg7C9C53wFZ7HYonOdzCPxCYSHi-uRCGQAJXG7811sNw9N_vILyOvbfW0p1_wQZRMd_0K4uREYz6NfEMCL6CDLOIjMBtAQRZtVme1zpdD9c_WNTG_wQvZhwOf95zVyIGorF8OrGJZddH13vXzndQHHS3G1zF-JKpHpwY1KMu9mZqKWC2weo9tn5AbOVBFuUn01yIfc5P7m3Ln2qohmXUS2CQ_el00NXiW8HX1hUmEz_SAUof6JqqBuv0B3yOyKw)](https://mermaid.live/edit#pako:eNpVks9uwjAMxl_FyolJ8AI9bALa8ee63SgHq_FKBE0q1zChlnefSwp0vaT5_LNjf0lrimDJJKZkrA_wneYe9JvvmErXCDHUWNIeZrP3ruZwcZagYLLkxeGp6WDRIv-ToAjMVMjHLZZa9LmwmVypeRsr24kPg7C9C53wFZ7HYonOdzCPxCYSHi-uRCGQAJXG7811sNw9N_vILyOvbfW0p1_wQZRMd_0K4uREYz6NfEMCL6CDLOIjMBtAQRZtVme1zpdD9c_WNTG_wQvZhwOf95zVyIGorF8OrGJZddH13vXzndQHHS3G1zF-JKpHpwY1KMu9mZqKWC2weo9tn5AbOVBFuUn01yIfc5P7m3Ln2qohmXUS2CQ_el00NXiW8HX1hUmEz_SAUof6JqqBuv0B3yOyKw)

## Client routing

| Endpoint      | Authenticated |      Component       | Description                    |
| :------------ | :-----------: | :------------------: | ------------------------------ |
| `/`           |      \*       |  NoteListComponent   | Note list of current auth user |
| `/register`   |       -       |  RegisterComponent   | Register form                  |
| `/login`      |       -       |    LoginComponent    | Login form                     |
| `/note/:id`   |      \*       | NoteDetailsComponent | Single note details            |
| `/createNote` |      \*       | CreateNoteComponent  | Set note title                 |
| `/saveNote`   |      \*       |  SaveNoteComponent   | Speech-to-text component       |

## API Endpoints

### User:

| Endpoint              | Method | Authenticated | Action                                               |
| :-------------------- | :----: | :-----------: | :--------------------------------------------------- |
| `/user`               |  GET   |      \*       | Returns current user data                            |
| `/user`               |  POST  |       -       | Creates a new user                                   |
| `/user`               | DELETE |      \*       | Logout user, delete access token                     |
| `/user`               |  PUT   |      \*       | Update current user                                  |
| `/user/authenticate`  |  POST  |       -       | Authenticate the user, return access token           |
| `/user/refresh-token` |  GET   |      \*       | If access token has expired, return new access token |

### Note:

| Endpoint         | Method | Authenticated | Action                                    |
| :--------------- | :----: | :-----------: | :---------------------------------------- |
| `/note`          |  GET   |      \*       | Get all notes of current auth user        |
| `/note`          |  POST  |      \*       | Create a note                             |
| `/note/save`     |  POST  |      \*       | Fill note content via speech-to-text api  |
| `/note/:id`      |  GET   |      \*       | Get single note if owned by the auth user |
| `/note/:id`      |  PUT   |      \*       | Update note                               |
| `/note/:id`      | DELETE |      \*       | Delete note                               |
| `/note/:id/file` |  POST  |      \*       | Download Note in pdf/txt format           |

### Speech-to-text:

| Endpoint                | Method | Authenticated | Action                           |
| :---------------------- | :----: | :-----------: | :------------------------------- |
| `/api/get-speech-token` |  GET   |      \*       | Get speech token data and region |

## JWT

### Basic token auth implementation.

#### If access token is valid get protected route resource, otherwise send refresh token and get new access token.

[![](https://mermaid.ink/img/pako:eNpNkEGOgzAMRa9ied1egMVUFJiqW8qOsIiIW6KSpDKhVRW4-6TASPXK8n-W_3fA1inCBG8sHx1UubAQK62zXpP1Dez3PzCl1QTHunJ3siBH34HRSvX0kkzNunBcwDycB0greMpeq8O8SvkiQRbeNGyjbBn91iUNbuSW4EL8JG6-F4pg3YYXq4syujjV6ef-N39aVUuveHqKAXCHhthIrWKu8GEE-o4MCUxiqyTfBQo7R258KOmpUNo7xuQq-4F2GBO6y9u2mHge6R_KtYw_Mhs1_wFqSmIt)](https://mermaid.live/edit#pako:eNpNkEGOgzAMRa9ied1egMVUFJiqW8qOsIiIW6KSpDKhVRW4-6TASPXK8n-W_3fA1inCBG8sHx1UubAQK62zXpP1Dez3PzCl1QTHunJ3siBH34HRSvX0kkzNunBcwDycB0greMpeq8O8SvkiQRbeNGyjbBn91iUNbuSW4EL8JG6-F4pg3YYXq4syujjV6ef-N39aVUuveHqKAXCHhthIrWKu8GEE-o4MCUxiqyTfBQo7R258KOmpUNo7xuQq-4F2GBO6y9u2mHge6R_KtYw_Mhs1_wFqSmIt)

### Middleware

#### Middleware which verify access token.

```javascript
const validateToken = (req, res, next) => {
  try {
    // retrieve jwt from auth header
    let authHeader = req.headers["authorization"];

    let token = authHeader && authHeader.split(" ")[1];

    // if token doesn't exist throw error
    if (token === undefined) throw new Error("Jwt doesn't exist");

    // otherwise check if token expired
    verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          res.status(403).json({ error: error.message });
        }
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    res.status(403).json({
      fail: true,
      error: error.message,
    });
  }
};
```

### Create token helper function.

#### Function sign new token with user id.

```javascript
const createToken = (id, secret, exp) => {
  return sign(
    {
      id,
    },
    secret,
    {
      expiresIn: exp,
    }
  );
};
```

### Extract user id helper function.

#### Function take token as a parameter and return user id.

```javascript
const extractIdFromToken = (token) => {
  const { id } = decode(token);
  return id;
};
```

### Refresh token

#### When middleware respond with `403` status Axios response interceptor will catch response, send API request to `/user/refresh-token` and update expired at with new one.

```javascript
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      try {
        const { data } = await userService.refreshToken(rt);

        prevRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        localStorage.setItem("at", data.accessToken);

        return axiosInstance(prevRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  },
  (err) => Promise.reject(err)
);
```

## Tests

### Backend API

### To run tests:

`npm run api-test`

### Note

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

### User

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
