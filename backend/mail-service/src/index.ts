import express, { NextFunction, Request, Response } from "express";
import path from "path";
import morganMiddleware from "./middleware/morganMiddleware.js";
import logger from "./utils/logger.js";
import { createClient } from "redis";
import TryCatch from "./utils/TryCatch.js";
import cors from "cors";
import dotenv from "dotenv";
import mailRouter from "./routes/mail.js";
import { startSendVerificationMailConsumer } from "./config/rabbitmq.js";
import { connectRedis, redisClient } from "./config/redis.js";
dotenv.config();

// Initialising express app
const app = express();

// Global middleware for serving static files
app.use(express.static(path.resolve(process.cwd(), "dist/public")));

// Global middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global middleware for logging HTTP requests via morgan
app.use(morganMiddleware);

// Allowing cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

// Start RabbitMQ verification mail consumer
startSendVerificationMailConsumer();

// Connect redis
connectRedis();

// '/' endpoint
const project = process.env.PROJECT || "unknown-project";
const service = process.env.SERVICE || "unknown-service";
app.get(
  "/",
  TryCatch(async (req, res) => {
    // Current server start time
    const time =
      (await redisClient.get(`${project}-${service}-service-startTime`)) ||
      new Date(Date.now()).toISOString();

    const uptime = Math.floor((Date.now() - Date.parse(time)) / 1000);
    // response
    res.status(200).json({
      message: {
        application: `${project}`,
        "micro-service": `${service}-service`,
      },
      started: `${time}`,
      uptime: `${uptime} seconds`, //uptime in seconds
    });
  }),
);

// Routes
app.use("/api/v1/mail", mailRouter);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Internal server error: ${err}`);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, (err) => {
  if (err) {
    logger.error("Failed to start server:", err);
    return;
  }
  redisClient.set(
    `${project}-${service}-service-startTime`,
    new Date(Date.now()).toISOString(),
  );
  logger.info(`Server is running on: http://localhost:${PORT}`);
});
