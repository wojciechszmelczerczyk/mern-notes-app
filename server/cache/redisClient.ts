import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", () => console.log("redis cache db error"));

redisClient.connect().then(() => console.log("connected to redis cache db"));

export default redisClient;
