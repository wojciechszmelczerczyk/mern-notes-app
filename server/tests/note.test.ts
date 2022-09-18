import { config } from "dotenv";
config({ path: `${path}/.env` });
import { path } from "app-root-path";
import createServer from "../utils/createServer";
const request = require("supertest");
// import request from "supertest"
import { dbConnection } from "../db/connection";
import Note from "../models/Note";
import flush from "./hooks/flushDocument";

let app: Express.Application = createServer();

let jwt: string = process.env.JWT;

beforeAll(async () => await dbConnection(process.env.DB_URI));

afterAll(async () => await flush(Note));

describe("GET /note", () => {
  test("when jwt doesn't exists", async () => {
    const notes = await request(app).get("/note");

    expect(notes.status).toEqual(403);
    expect(notes.body.error).toEqual("Jwt doesn't exist");
  });

  test("when jwt is incorrect", async () => {
    const notes = await request(app)
      .get("/note")
      .set("Authorization", "Bearer ssss");

    expect(notes.status).toEqual(403);
    expect(notes.body.error).toEqual("jwt malformed");
  });

  test("when jwt is expired", async () => {
    const notes = await request(app)
      .get("/note")
      .set("Authorization", `Bearer ${jwt};`);

    expect(notes.status).toEqual(403);
    expect(notes.body.error).toEqual("invalid token");
  });
});

describe("POST /note", () => {
  test("when jwt doesn't exists", async () => {
    const newNote = await request(app)
      .post("/note")
      .send({ title: "new note added in jest", content: "" });
    expect(newNote.status).toBe(403);
    expect(newNote.body.error).toBe("Jwt doesn't exist");
  });

  test("when jwt is incorrect", async () => {
    const newNote = await request(app)
      .post("/note")
      .send({ title: "new note added in jest", content: "" })
      .set("Authorization", "Bearer falseToken");

    expect(newNote.status).toBe(403);
    expect(newNote.body.error).toBe("jwt malformed");
  });

  test("when jwt is expired", async () => {
    const newNote = await request(app)
      .post("/note")
      .send({ title: "just next note added in jest", content: "" })
      .set("Authorization", `Bearer ${jwt}`);

    expect(newNote.status).toBe(201);
    expect(newNote.body.title).toBe("just next note added in jest");
  });
});
