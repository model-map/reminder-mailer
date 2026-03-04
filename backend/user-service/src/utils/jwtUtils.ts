import jwt from "jsonwebtoken";
import { IUser } from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();

// Generate 24h verification token
export const generateVerificationToken = (id: string) => {
  const JWT_SECRET = process.env.JWT_SECRET_VERIFICATION_MAIL;
  if (!JWT_SECRET) {
    throw new Error(`JWT_SECRET_VERIFICATION_MAIL not defined`);
  }
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "24h" });
  return token;
};

export const generateLoginToken = (id: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Error generating JWT Token - JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: "15d",
  });
  return token;
};
