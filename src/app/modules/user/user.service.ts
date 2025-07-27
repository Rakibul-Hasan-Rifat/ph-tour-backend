import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import httpStatusCodes from "http-status-codes";

import User from "./user.model";
import AppError from "../../errors/app.error";
import environmentVariables from "../../config/env.config";
import { IAuthProvider, IUser, Role } from "./user.interface";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  console.log('create user service', email, password);
  

  const isUserAvailable = await User.findOne({ email });

  // if (isUserAvailable) {
  //   throw new AppError(
  //     httpStatusCodes.BAD_REQUEST,
  //     "User already exists with this mail"
  //   );
  // }

  const hashedPassword = await bcrypt.hash(
    password as string,
    parseInt(environmentVariables.BCRYPT_SALT_ROUND) as number
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const updateUserService = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserAvailable = await User.findById(userId);

  if (!isUserAvailable) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "User not found to update");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(
        httpStatusCodes.FORBIDDEN,
        "You are not authorized! ❌"
      );
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(
        httpStatusCodes.FORBIDDEN,
        "You are not authorized! ❌"
      );
    }
  }

  if (payload.isActive || payload.isVerified || payload.isDeleted) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(
        httpStatusCodes.UNAUTHORIZED,
        "You are now authorized! ❌"
      );
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      environmentVariables.JWT_ACCESS_SECRET
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const getAllUserService = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const userServices = {
  getAllUserService,
  createUserService,
  updateUserService,
};

export default userServices;
