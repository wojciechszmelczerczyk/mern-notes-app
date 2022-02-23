# Notes App

## Project description

Target of project are students with hearing problem and completely deaf.

Main objective of the created system is to help those students by showing them transcrypted to text lessons.

Student can record teacher voice by clicking a button which will transcrypt voice to text for their better understandment.

Registered users will have ability to export notes to .txt and .pdf file.

Student will be able to change speech language.

Students will be able to search lessons by title they provide before transcryption to text.

Server side of application will be made in `Node` using `Express` framework.

Data will be saved to `Mongo` database.

Client side will be created in `React` using `Javascript` language.

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

## Usage

- `git clone repo` - to clone repository
- `npm i` - install dependencies
- `npm start` - to start application

## Architectures

### App Architecture

[![](https://mermaid.ink/img/pako:eNpNj8EKwjAMhl-l5LTB9gI7CFvrwYMgKnjpJVujFm07uu4gY-9uXR0sp3z__yckE3ROEVTw8Ng_2VVIy2LVGX9rsoHdqM1ZWe5Yk51pCKw-HfJ_ZJF5gmaBOgHfQnJ4dtSdd4O7b1ckT2QCA7Y4UL6dbxKIFaSFAgx5g1rFe6efLSE8yZCEKrYK_UuCtHPMjb3CQHulg_NQBT9SATgGd_nYbuWUERrj6yaJ8xdH-E18)](https://mermaid.live/edit#pako:eNpNj8EKwjAMhl-l5LTB9gI7CFvrwYMgKnjpJVujFm07uu4gY-9uXR0sp3z__yckE3ROEVTw8Ng_2VVIy2LVGX9rsoHdqM1ZWe5Yk51pCKw-HfJ_ZJF5gmaBOgHfQnJ4dtSdd4O7b1ckT2QCA7Y4UL6dbxKIFaSFAgx5g1rFe6efLSE8yZCEKrYK_UuCtHPMjb3CQHulg_NQBT9SATgGd_nYbuWUERrj6yaJ8xdH-E18)

### Database Architecture

[![](https://mermaid.ink/img/pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)](https://mermaid.live/edit#pako:eNpNzjEOwjAMBdCrWJ6rHiAzWalEYctiNS6NIAlykwElvTsBFYSnL_2nLxecomVUyHJwdBXyJsDvLqM-Qa19Xwsch7MGBQutb_GvALBDz-LJ2bZUPj2mhT0bVC1akptBE7bm8sNSYm1dioJqpvvKHVJOcXyGCVWSzF-0P7Sr7QWbhjTi)

## App flow

[![](https://mermaid.ink/img/pako:eNplkUFugzAQRa8yspRduACLVhBIsqzU7HAXlj0FVLCRPVSNMHevDUEirTe2_ryvmT-emDQKWcpqK4YGbgXXEE5WWaxbR2jfRI0fkCQvflM85FPrQBprUdLrvDoOB8giBpdYHB1aaMQ3gpDSjHqPXRbM39F5uFadqVu9NPkLaOMhW8V8ZzlVvXhy5P_w06pIi4IQtCH0UFTxvrXU4c5brKRDWjCgWPdQLvCOKx8cCUtA-EMJmcQNiLLxcI6JF7sLidUW9bwf-kmKo5ZcsyPr0YY0Kux_igRn1GCPnKXhqYT94ozrOXDjoEKUUrVkLEs_RefwyMRI5v2uJUvJjrhBRSvCX_YPav4F6pOZNg)](https://mermaid.live/edit#pako:eNplkUFugzAQRa8yspRduACLVhBIsqzU7HAXlj0FVLCRPVSNMHevDUEirTe2_ryvmT-emDQKWcpqK4YGbgXXEE5WWaxbR2jfRI0fkCQvflM85FPrQBprUdLrvDoOB8giBpdYHB1aaMQ3gpDSjHqPXRbM39F5uFadqVu9NPkLaOMhW8V8ZzlVvXhy5P_w06pIi4IQtCH0UFTxvrXU4c5brKRDWjCgWPdQLvCOKx8cCUtA-EMJmcQNiLLxcI6JF7sLidUW9bwf-kmKo5ZcsyPr0YY0Kux_igRn1GCPnKXhqYT94ozrOXDjoEKUUrVkLEs_RefwyMRI5v2uJUvJjrhBRSvCX_YPav4F6pOZNg)

## Endpoints

### User

- `/user` - registration `POST`
- `/user` - get current logged user info `GET`
- `/user/authenticate` - login `POST`
- `/user` - update user data `PUT`

### Note

- `/note` - create a note `POST`
- `/note` - get all notes of current auth user `GET`
- `/note/:id` - get single note if owned by the auth user `GET`
- `/note/:id` - update note `PUT`
- `/note/:id` - delete note `DELETE`
