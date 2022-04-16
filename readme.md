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
- [API Endpoints](#api-endpoints)

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

### Navigate to project folder

```sh
cd /path/to/project
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

[![](https://mermaid.ink/img/pako:eNptkLFqw0AMhl9FaHIgfgEPBdvXoUOhtIUutyg-JT4S37l3uiHEefeqJB5SqkXi14d-SRccomNs8JBoHuHT2AAabdWfPAeBL95toK6fYEn8XTjLAl31rhnat5fNDe5WIM8xZF6gfdAPLJBn5mGsj3xeoK9e_ZBijvt_hqhHUsZUhoR2lPne7lcPKSk8jOtugPmzhMo24BYnThN5pxdefkGLMvLEFhstHaWjRRuuypXZkfCz8xITNns6Zd4iFYkf5zBgI6nwChlP-q3pTl1_AC3UZ08)](https://mermaid.live/edit#pako:eNptkLFqw0AMhl9FaHIgfgEPBdvXoUOhtIUutyg-JT4S37l3uiHEefeqJB5SqkXi14d-SRccomNs8JBoHuHT2AAabdWfPAeBL95toK6fYEn8XTjLAl31rhnat5fNDe5WIM8xZF6gfdAPLJBn5mGsj3xeoK9e_ZBijvt_hqhHUsZUhoR2lPne7lcPKSk8jOtugPmzhMo24BYnThN5pxdefkGLMvLEFhstHaWjRRuuypXZkfCz8xITNns6Zd4iFYkf5zBgI6nwChlP-q3pTl1_AC3UZ08)

### Database Architecture

[![](https://mermaid.ink/img/pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)](https://mermaid.live/edit#pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)

## App flow

[![](https://mermaid.ink/img/pako:eNpNkc9uwyAMxl_F4tRJ7Qvk0Klt-ve63UoPKHgpagIRcTtVSd59JiRLuACffzb-TCMyp1EkIvequsN3Ki3w2lw95qYm9FCpHG-wWq3bUWph25gaMuc9ZvTZxZRtYOC8eGP9MVcuC-sG4dILXIf8G6Zqmxg9x6hVL5MrQiAHpTK2b6CF3fX_cov8LvKZx0Bb_AXriMn0GnYgQwXO-TTyNRJMQAv7iM_A_QCS8sRtsk9tbA4vZzLmD8F7n1KrF-rR_qFPOs7sR-U02T-O9rUJgwsGCx4Be4vxU4w_EKvZs85yj9KKpSjR8ww0f1YTEqSgO5YoRcJHrfxDCmk75p6V5onstSHnRfKjihqXQj3Jfb1tJhLyTxyh1Cj--HKguj-Oeaf2)](https://mermaid.live/edit#pako:eNpNkc9uwyAMxl_F4tRJ7Qvk0Klt-ve63UoPKHgpagIRcTtVSd59JiRLuACffzb-TCMyp1EkIvequsN3Ki3w2lw95qYm9FCpHG-wWq3bUWph25gaMuc9ZvTZxZRtYOC8eGP9MVcuC-sG4dILXIf8G6Zqmxg9x6hVL5MrQiAHpTK2b6CF3fX_cov8LvKZx0Bb_AXriMn0GnYgQwXO-TTyNRJMQAv7iM_A_QCS8sRtsk9tbA4vZzLmD8F7n1KrF-rR_qFPOs7sR-U02T-O9rUJgwsGCx4Be4vxU4w_EKvZs85yj9KKpSjR8ww0f1YTEqSgO5YoRcJHrfxDCmk75p6V5onstSHnRfKjihqXQj3Jfb1tJhLyTxyh1Cj--HKguj-Oeaf2)

## API Endpoints

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
