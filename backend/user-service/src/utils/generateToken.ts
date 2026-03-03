import jwt from "jsonwebtoken";
import { IUser } from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user: IUser) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Error generating JWT Token - JWT_SECRET is not defined");
  }
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};

export default generateToken;
