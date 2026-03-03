import bcryptjs from "bcryptjs";
import { IUser } from "../model/User.js";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcryptjs.genSalt(saltRounds);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isMatch = await bcryptjs.compare(password, hashedPassword);
  return isMatch;
};
