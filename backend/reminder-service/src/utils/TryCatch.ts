import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "./logger.js";

export const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Unexpected error - ${error.message}`);
        res
          .status(500)
          .json({ message: `Unexpected error - ${error.message}` });
      } else {
        logger.error(`Unexpected error - Unknown error`);
        res.status(500).json({ message: `Unexpected error - Unknown error` });
      }
      next(error);
    }
  };
};

export default TryCatch;
