import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../model/User.js";
import { ApiError } from "../types/api-error.js";
import jwt, { JwtPayload } from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: Omit<IUser, "password">;
}

const JWT_SECRET = process.env.JWT_SECRET;

const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith(`Bearer `)) {
      const err: ApiError = {
        code: "unauthenticated",
        message: `Please login`,
      };
      return res.status(401).json({ error: err });
    }

    const token = authheader.split(" ")[1];

    // Verify token
    if (!JWT_SECRET) {
      throw new Error(`JWT_SECRET not defined`);
    }
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // search user with id
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      const err: ApiError = {
        code: "unauthenticated",
        message: "Invalid or expired JWT token",
      };
      return res.status(401).json({ error: err });
    }
    const {
      password: _password,
      __v,
      ...userWithoutPassword
    } = user.toObject();

    req.user = userWithoutPassword;
    logger.info(`isAuth - user authenticated`);
    next();
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      const err: ApiError = {
        code: "unauthenticated",
        message: "Invalid or expired token",
      };
      logger.error(err);
      return res.status(401).json({ error: err });
    } else if (error instanceof Error) {
      const err: ApiError = {
        code: "internal_server_error",
        message: `Unexpected error: ${error.message}`,
      };
      logger.error(err);
      return res.status(500).json({ error: err });
    } else {
      const err: ApiError = {
        code: "internal_server_error",
        message: `Unexpected error: Unknown error`,
      };
      logger.error(err);
      return res.status(500).json({ error: err });
    }
  }
};

export default isAuth;
