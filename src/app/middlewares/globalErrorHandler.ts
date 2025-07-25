import { NextFunction, Request, Response } from "express";
import environmentVariables from "../config/env.config";
import AppError from "../errors/app.error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message  = `Something went wrong!! ${err.message}`;

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        message = err.message
    }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: environmentVariables.NODE_ENV === "development" ? err.stack : null,
  });
}

export default globalErrorHandler;