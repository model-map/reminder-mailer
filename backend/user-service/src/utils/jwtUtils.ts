import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();

interface IJwtPayload extends JwtPayload {
  userId: string;
}

// Generate 24h verification token
export const generateVerificationToken = (id: string) => {
  const JWT_SECRET = process.env.JWT_SECRET_VERIFICATION_MAIL;
  if (!JWT_SECRET) {
    throw new Error(
      `Error generating JWT Token - JWT_SECRET_VERIFICATION_MAIL is not defined`,
    );
  }
  const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "24h" });
  return token;
};

// Verify verification token
export const decodeVerificationToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET_VERIFICATION_MAIL;
  if (!JWT_SECRET) {
    throw new Error(
      `Error verifying JWT Token - JWT_SECRET_VERIFICATION_MAIL is not defined`,
    );
  }

  try {
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch {
    return null;
  }
};

// Generate 15d login token after verification
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

// verify login token

export const decodeLoginToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Error verifying JWT token - JWT_SECRET is not defined");
  }
  try {
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch {
    return null;
  }
};
