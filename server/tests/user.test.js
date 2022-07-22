const { path } = require("app-root-path");
require("dotenv").config({ path: `${path}/.env` });
const createServer = require("../util/createServer");
const request = require("supertest");
const { dbConnection } = require("../db/connection");
const User = require("../models/User");

const flush = require("./hooks/flushDocument");

let app = createServer();

beforeAll(async () => await dbConnection(process.env.DB_URI));

afterAll(async () => await flush(User));

describe("POST /user", () => {
  test("when credentials are correct", async () => {
    let user = {
      email: "testuser@gmail.com",
      password: "testpassword123",
    };

    const newUser = await request(app).post("/user").send(user);

    expect(newUser.body.email).toEqual(user.email);
    expect(newUser.status).toEqual(200);
  });

  test("when credentials are incorrect", async () => {
    let user = {
      email: "testuser",
      password: "test",
    };

    const newUser = await request(app).post("/user").send(user);

    expect(newUser.body.errors).toBeTruthy();
    expect(newUser.status).toEqual(400);
  });
});

describe("POST /user/authenticate", () => {
  test("when credentials are correct", async () => {
    let user = {
      email: "testuser@gmail.com",
      password: "testpassword123",
    };

    const newUser = await request(app).post("/user/authenticate").send(user);

    expect(newUser.body.accessToken).toBeTruthy();
    expect(newUser.status).toEqual(201);
  });

  test("when credentials don't match user in db", async () => {
    let user = {
      email: "testuser",
      password: "test",
    };

    const newUser = await request(app).post("/user/authenticate").send(user);

    expect(newUser.body.error).toBeTruthy();
    expect(newUser.status).toEqual(400);
  });

  test("when credentials are incorrect", async () => {
    let user = {
      email: "testuser2@gmail.com",
      password: "test1234",
    };

    const newUser = await request(app).post("/user/authenticate").send(user);

    expect(newUser.body.error).toBeTruthy();
    expect(newUser.status).toEqual(400);
  });
});
