import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import httpStatusCodes from "http-status-codes";

import User from "../user/user.model";
import AppError from "../../errors/app.error";
import { IUser } from "../user/user.interface";
import environmentVariables from "../../config/env.config";
import createUserToken, { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";


const credentialsLoginService = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserAvailable = await User.findOne({ email });

  if (!isUserAvailable) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      "User not found in database. Please register first!"
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserAvailable.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatusCodes.UNAUTHORIZED,
      "Credentials not matched perfectly!"
    );
  }

  const userTokens = createUserToken({
    _id: isUserAvailable._id, 
    email: isUserAvailable.email, 
    role: isUserAvailable.role
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...rest } = isUserAvailable.toObject();

  return {
    user: rest,
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
  };
};

const getNewAccessTokenService = async (refreshToken: string) => {

  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

  return {accessToken: newAccessToken}
  
};

const resetPasswordService = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

const user = await User.findById(decodedToken._id)

const isOldPasswordMatched = await bcrypt.compare(oldPassword, user?.password as string);

if(!isOldPasswordMatched) {
  throw new AppError(httpStatusCodes.UNAUTHORIZED, "Old password does not match!")
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
user!.password = await bcrypt.hash(newPassword, environmentVariables.BCRYPT_SALT_ROUND);

user?.save();
  
}

const authServices = { credentialsLoginService, getNewAccessTokenService, resetPasswordService };

export default authServices;
