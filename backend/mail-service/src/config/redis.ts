import { createClient } from "redis";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

// Create a Redis client
export const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  pingInterval: 30000,
  socket: {
    keepAlive: true,
    host: process.env.REDIS_URL,
    port: parseInt(process.env.REDIS_PORT!),
    reconnectStrategy(retries, cause) {
      if (retries > 10) return new Error("Retry limit reached.");
      return Math.min(retries * 100, 3000);
    },
  },
});

export const connectRedis = async () => {
  redisClient.on("error", (err: any) => {
    console.log("Redis Client Error", err);
    logger.error(err);
  });
  await redisClient.connect().then(() => logger.info(`Connected to Redis.`));
};
