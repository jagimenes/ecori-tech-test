import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/exception/app-error";

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  let status = 500;
  if (err instanceof AppError) {
    status = 400;
  }

  const errMsg = err.message || "Something went wrong";
  res.status(status).json({
    message: errMsg,
  });
};

export default errorHandler;
