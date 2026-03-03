import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/TryCatch.js";
import { IUser, User } from "../model/User.js";
import { ApiError } from "../types/api-error.js";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: IUser;
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
        error: "unauthenticated",
        message: `Please login`,
      };
      return res.status(401).json(err);
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
        error: "unauthenticated",
        message: "Invalid or expired JWT token",
      };
      return res.status(401).json(err);
    }

    req.user = user;
    logger.info(`isAuth - user authenticated`);
    next();
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      const err: ApiError = {
        error: "unauthenticated",
        message: "Invalid or expired token",
      };
      logger.error(err);
      return res.status(401).json(err);
    } else if (error instanceof Error) {
      const err: ApiError = {
        error: "internal_server_error",
        message: `Unexpected error: ${error.message}`,
      };
      logger.error(err);
      return res.status(500).json(err);
    } else {
      const err: ApiError = {
        error: "internal_server_error",
        message: `Unexpected error: Unknown error`,
      };
      logger.error(err);
      return res.status(500).json(err);
    }
  }
};

export default isAuth;
