import { config } from "dotenv";
config({ path: `${path}/.env` });
import { path } from "app-root-path";
import createServer from "../utils/createServer";
const request = require("supertest");
// import request from "supertest"
import { dbConnection } from "../db/connection";
import User from "../models/User";
import flush from "./hooks/flushDocument";

let app: Express.Application = createServer();

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
