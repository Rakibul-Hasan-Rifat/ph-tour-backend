import httpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app.error";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(
          httpStatusCodes.UNAUTHORIZED,
          "No token is available to verify!!!"
        );
      }

      const isVerified = verifyToken(accessToken);

      if(!authRoles.includes((isVerified as JwtPayload).role)) {
        throw new AppError(403, "Access denied");
      }

      req.user = isVerified as JwtPayload;

      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      next(error);
    }
  }

  export default checkAuth;