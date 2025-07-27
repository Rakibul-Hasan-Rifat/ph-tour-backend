import { NextFunction, Request, Response } from "express";
import environmentVariables from "../config/env.config";
import AppError from "../errors/app.error";

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something went wrong!! ${err.message}`;
  const errorSources: any = [];

  // mongoose duplicate error
  if (err.code === 11000) {
    statusCode = 400;
    const matchedArr = err.message.match(/"([^"]*)"/);
    message = `${matchedArr[1]} already exists`;
  }
  // invalid objectId error
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectId!";
  }
  // mongoose validation error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);

    errors.forEach((errorObject: any) =>
      errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );
  } else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Zod Error";

    err.issues.forEach((issue: any) => {
      errorSources.push({
        path: issue.path[0],
        message: issue.msseage
      })
    })

  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: environmentVariables.NODE_ENV === "development" ? err.stack : null,
  });
};

export default globalErrorHandler;
