import { Router } from "express";
import { loginUser } from "../controller/user.js";

const router = Router();

router.post("/login", loginUser);

export default router;
