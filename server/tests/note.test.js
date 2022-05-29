const { path } = require("app-root-path");
require("dotenv").config({ path: `${path}/.env` });
const createServer = require("../util/createServer");
const request = require("supertest");
const { dbConnection } = require("../db/connection");
const Note = require("../models/Note");

const flush = require("./hooks/flushDocument");

let app = createServer();

let jwt = process.env.JWT;

beforeAll(async () => await dbConnection(process.env.DB_URI));

afterAll(async () => await flush(Note));

describe("GET /note", () => {
  test("when jwt doesn't exists", async () => {
    const notes = await request(app).get("/note");

    expect(notes.status).toEqual(401);
    expect(notes.body.jwt_error).toEqual("Jwt doesn't exists");
  });

  test("when jwt is incorrect", async () => {
    const notes = await request(app).get("/note").set("Cookie", "jwt=ssss;");

    expect(notes.status).toEqual(401);
    expect(notes.body.jwt_error).toEqual("Jwt is not valid");
  });

  test("when jwt is correct", async () => {
    const notes = await request(app).get("/note").set("Cookie", `jwt=${jwt};`);

    expect(notes.body).toBeTruthy();
    expect(notes.status).toEqual(200);
  });
});

describe("POST /note", () => {
  test("when jwt doesn't exists", async () => {
    const newNote = await request(app)
      .post("/note")
      .send({ title: "new note added in jest", content: "" });
    expect(newNote.status).toBe(401);
    expect(newNote.body.jwt_error).toBe("Jwt doesn't exists");
  });

  test("when jwt is incorrect", async () => {
    const newNote = await request(app)
      .post("/note")
      .send({ title: "new note added in jest", content: "" })
      .set("Cookie", "jwt=false-token;");
    expect(newNote.status).toBe(401);
    expect(newNote.body.jwt_error).toBe("Jwt is not valid");
  });

  test("when jwt is correct", async () => {
    const newNote = await request(app)
      .post("/note")
      .send({ title: "just next note added in jest", content: "" })
      .set("Cookie", `jwt=${jwt};`);

    expect(newNote.status).toBe(201);
    expect(newNote.body.title).toBe("just next note added in jest");
  });
});
