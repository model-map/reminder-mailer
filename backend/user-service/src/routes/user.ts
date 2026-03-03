import { Router } from "express";
import { getUser, login, signUp } from "../controller/user.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", isAuth, getUser);

export default router;
