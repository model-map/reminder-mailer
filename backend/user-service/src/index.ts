import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import morganMiddleware from "./middleware/morganMiddleware.js";
import logger from "./utils/logger.js";
dotenv.config();

const app = express();

// Global middleware for serving static files
app.use(express.static(path.resolve(process.cwd(), "dist/public")));

// Global middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global middleware for logging HTTP requests via morgan
app.use(morganMiddleware);

app.get("/", (req, res) =>
  res.json({
    message: `${process.env.SERVICE || "unknown-service"} running`,
  }),
);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Internal server error: ${err}`);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
