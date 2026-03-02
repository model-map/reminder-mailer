import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "./logger.js";

const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Unexpected error occured - ${error.message}`);
      } else {
        logger.error(`Unexpected error occured - ${error}`);
      }
      next(error);
    }
  };
};

export default TryCatch;
