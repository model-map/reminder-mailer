import jwt from "jsonwebtoken";
import { IUser } from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Error generating JWT Token - JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

export default generateToken;
