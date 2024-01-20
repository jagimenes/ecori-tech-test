import { NextFunction, Request, Response } from "express";
import { AppError } from "../exception/app-error";
import { NotAuthenticatedError } from "../exception/not-authenticated-error";

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

  if (err instanceof NotAuthenticatedError) {
    status = 401;
  }

  const errMsg = err.message || "Something went wrong";
  res.status(status).json({
    message: errMsg,
  });
};

export default errorHandler;
