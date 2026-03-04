import { Router } from "express";
import { getUser, login, signUp, verifyUser } from "../controller/user.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", isAuth, getUser);
router.get("/verify/:token", verifyUser);

export default router;
