import { generateToken, verifyToken } from "./jwt";
import { IsActive } from "../modules/user/user.interface";
import environmentVariables from "../config/env.config";
import AppError from "../errors/app.error";
import httpStatusCodes from "http-status-codes";
import User from "../modules/user/user.model";
import { JwtPayload } from "jsonwebtoken";

const createUserToken = (user: Express.User) => {
  const accessToken = generateToken(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    environmentVariables.JWT_ACCESS_SECRET
  );

  const refreshToken = generateToken(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    environmentVariables.JWT_REFRESH_SECRET
  );

  return { accessToken, refreshToken };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  if (!refreshToken) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      "No refresh token from cookie is found!"
    );
  }

  const verifiedRefreshToken = verifyToken(
    refreshToken,
    environmentVariables.JWT_REFRESH_SECRET
  );

  const isUserAvailable = await User.findOne({
    email: (verifiedRefreshToken as JwtPayload).email,
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
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `The user is ${isUserAvailable.isActive}`
    );
  }

  if (isUserAvailable.isDeleted) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, `The user is deleted! ❌`);
  }

  const accessToken = generateToken(
    {
      _id: isUserAvailable._id,
      email: isUserAvailable.email,
      role: isUserAvailable.role,
    },
    environmentVariables.JWT_ACCESS_SECRET
  );

  return accessToken;
};

export default createUserToken;
