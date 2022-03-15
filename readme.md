# Notes App

## Project description

### The project target is helping hearing impaired students during the lessons they attend. But potentially can be used by any student.

### The project aims to introduce a speech to text system able to transcript the voice of the professor into a text on the screen of the student pc or mobile phone.

### Student can record teacher voice by clicking a button which will transcrypt voice to text for their better understandment.

### Registered user will have premium feature to store the transcriptions online and save them to a file (txt or pdf format).

### Student will be able to change speech language.

### Students will be able to search lessons by title they provide before transcryption to text.

### Server side of application will be made in `Node` using `Express` framework.

### Data will be saved to `Mongo` database.

### Client side will be created in `React` using `Javascript` language.

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
- [Endpoints](#endpoints)

## Techstack

- `React.js`
- `JavaScript`
- `Express.js`
- `MongoDB`
- `Mongoose`
- `Jest`
- `Supertest`

## Requirements

- install `node`
- install `mongo`

## Usage

### Clone repository

```
git clone repo
```

### Install dependencies

```
npm i
```

### Run app

<br/>

#### Run React server

```
npm start
```

#### Run Express REST API

```sh
# navigate to folder with express api
cd /server

# run app with node cli (nodemon recommended)
node index.js
```

### Env setup

```dockerfile
# Uri to mongo database
DB_URI=

# Speech key for Microsoft Cognitive Services
SPEECH_KEY=

# Speech region for Microsoft Cognitive Services
SPEECH_REGION=

# Token secret
JWT_SECRET=


# Token expiration time
JWT_EXPIRATION=
```

## Architectures

### App Architecture

[![](https://mermaid.ink/img/pako:eNpNj8EKwjAMhl-l5LTB9gI7CFvrwYMgKnjpJVujFm07uu4gY-9uXR0sp3z__yckE3ROEVTw8Ng_2VVIy2LVGX9rsoHdqM1ZWe5Yk51pCKw-HfJ_ZJF5gmaBOgHfQnJ4dtSdd4O7b1ckT2QCA7Y4UL6dbxKIFaSFAgx5g1rFe6efLSE8yZCEKrYK_UuCtHPMjb3CQHulg_NQBT9SATgGd_nYbuWUERrj6yaJ8xdH-E18)](https://mermaid.live/edit#pako:eNpNj8EKwjAMhl-l5LTB9gI7CFvrwYMgKnjpJVujFm07uu4gY-9uXR0sp3z__yckE3ROEVTw8Ng_2VVIy2LVGX9rsoHdqM1ZWe5Yk51pCKw-HfJ_ZJF5gmaBOgHfQnJ4dtSdd4O7b1ckT2QCA7Y4UL6dbxKIFaSFAgx5g1rFe6efLSE8yZCEKrYK_UuCtHPMjb3CQHulg_NQBT9SATgGd_nYbuWUERrj6yaJ8xdH-E18)

### Database Architecture

[![](https://mermaid.ink/img/pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)](https://mermaid.live/edit#pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)

## App flow

[![](https://mermaid.ink/img/pako:eNplkUFugzAQRa8yspRduACLVhBIsqzU7HAXlj0FVLCRPVSNMHevDUEirTe2_ryvmT-emDQKWcpqK4YGbgXXEE5WWaxbR2jfRI0fkCQvflM85FPrQBprUdLrvDoOB8giBpdYHB1aaMQ3gpDSjHqPXRbM39F5uFadqVu9NPkLaOMhW8V8ZzlVvXhy5P_w06pIi4IQtCH0UFTxvrXU4c5brKRDWjCgWPdQLvCOKx8cCUtA-EMJmcQNiLLxcI6JF7sLidUW9bwf-kmKo5ZcsyPr0YY0Kux_igRn1GCPnKXhqYT94ozrOXDjoEKUUrVkLEs_RefwyMRI5v2uJUvJjrhBRSvCX_YPav4F6pOZNg)](https://mermaid.live/edit#pako:eNplkUFugzAQRa8yspRduACLVhBIsqzU7HAXlj0FVLCRPVSNMHevDUEirTe2_ryvmT-emDQKWcpqK4YGbgXXEE5WWaxbR2jfRI0fkCQvflM85FPrQBprUdLrvDoOB8giBpdYHB1aaMQ3gpDSjHqPXRbM39F5uFadqVu9NPkLaOMhW8V8ZzlVvXhy5P_w06pIi4IQtCH0UFTxvrXU4c5brKRDWjCgWPdQLvCOKx8cCUtA-EMJmcQNiLLxcI6JF7sLidUW9bwf-kmKo5ZcsyPr0YY0Kux_igRn1GCPnKXhqYT94ozrOXDjoEKUUrVkLEs_RefwyMRI5v2uJUvJjrhBRSvCX_YPav4F6pOZNg)

## Endpoints

### User:

| Endpoint             | Method | Authenticated | Action                                        |
| :------------------- | :----: | :-----------: | :-------------------------------------------- |
| `/user`              |  GET   |      \*       | Returns current user data                     |
| `/user`              |  POST  |       -       | Creates a new user                            |
| `/user`              | DELETE |      \*       | Logout user, delete access token              |
| `/user`              |  PUT   |      \*       | Update current user                           |
| `/user/authenticate` |  POST  |       -       | Authenticate the user, returning access token |

### Note:

| Endpoint    | Method | Authenticated | Action                                    |
| :---------- | :----: | :-----------: | :---------------------------------------- |
| `/note`     |  GET   |      \*       | Get all notes of current auth user        |
| `/note`     |  POST  |      \*       | Create a note                             |
| `/note/:id` |  GET   |      \*       | Get single note if owned by the auth user |
| `/note/:id` |  PUT   |      \*       | Update note                               |
| `/note/:id` | DELETE |      \*       | Delete note                               |
