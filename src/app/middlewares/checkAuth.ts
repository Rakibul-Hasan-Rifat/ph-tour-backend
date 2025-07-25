import httpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app.error";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import environmentVariables from "../config/env.config";
import User from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(
          httpStatusCodes.UNAUTHORIZED,
          "No token is available to verify!!!"
        );
      }

      const isVerified = verifyToken(accessToken, environmentVariables.JWT_ACCESS_SECRET);

      const isUserAvailable = await User.findOne({
        email: (isVerified as JwtPayload).email,
      });

      if (!isUserAvailable) {
          throw new AppError(
            httpStatusCodes.NOT_FOUND,
            "User not found in database. Please register first!"
          );
        }
      
        if (
          isUserAvailable.isActive === IsActive.BLOCKED ||
          isUserAvailable.isActive === IsActive.INACTIVE
        ) {
          throw new AppError(httpStatusCodes.BAD_REQUEST, `The user is ${isUserAvailable.isActive}` )}
      
        if (isUserAvailable.isDeleted) {
          throw new AppError(httpStatusCodes.BAD_REQUEST, `The user is deleted! ❌`);
        }

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