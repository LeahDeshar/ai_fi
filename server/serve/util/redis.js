import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-10452.c246.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 10452,
  },
});

client
  .on("connect", () => {
    console.log("Connected to Redis");
  })
  .on("error", () => {
    console.log("Error connecting to Redis");
  });
await client.connect();