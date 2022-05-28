const appRoot = require("app-root-path");
require("dotenv").config({ path: `${appRoot}.env` });
const createServer = require("../util/createServer");
const request = require("supertest");
const { dbConnection, dbDisconnect } = require("../db/connection");

let app = createServer();

let jwt = process.env.JWT;

beforeEach(async () => {
  await dbConnection(process.env.DB_URI);
});

afterEach(async () => {
  await dbDisconnect();
});

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
