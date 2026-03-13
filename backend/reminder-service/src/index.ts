import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import morganMiddleware from "./middleware/morganMiddleware.js";
import connectDb from "./config/db.js";
dotenv.config();

const app = express();

// Global middleware for serving static files
app.use(express.static(path.resolve(process.cwd(), "dist/public")));

// Global body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global middleware for logging HTTP requests
app.use(morganMiddleware);

// Connect to database
connectDb();

app.get("/", (req, res) => res.json({ message: "Hello world" }));

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Internal server error: ${err}`);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = Number(process.env.PORT) || 6001;
app.listen(PORT, (err) => {
  if (err) {
    logger.error("Failed to start server:", err);
    return;
  }
  logger.info(`Server is running on: http://localhost:${PORT}`);
});
