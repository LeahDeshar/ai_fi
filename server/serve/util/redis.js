import { createClient } from "redis";

export const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-10452.c246.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 10452,
  },
});
