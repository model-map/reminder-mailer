import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.json({ message: "To-do mail API endpoints" }),
);

export default router;
