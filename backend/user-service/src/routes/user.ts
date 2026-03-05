import { Router } from "express";
import {
  getUser,
  login,
  resendVerificationMail,
  signUp,
  verifyUser,
} from "../controller/user.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/verify/resendMail", resendVerificationMail);
router.get("/verify", verifyUser);
router.get("/me", isAuth, getUser);

export default router;
