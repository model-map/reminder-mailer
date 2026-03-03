import { NextFunction, Request, RequestHandler, Response } from "express";

const TryCatch = (handler: RequestHandler): RequestHandler => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ message: `Internal Server Error - ${error.message}` });
      } else {
        return res
          .status(500)
          .json({ message: "Internal Server Error - Unknown error" });
      }
    }
  };
};

export default TryCatch;
