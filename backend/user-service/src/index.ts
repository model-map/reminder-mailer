import express, { NextFunction, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Global middleware for serving static files
app.use(express.static(path.resolve(process.cwd(), "dist/public")));

// Global middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.json({
    message: `${process.env.SERVICE || ""} user-service running`,
  }),
);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(`Internal server error: ${err}`);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
