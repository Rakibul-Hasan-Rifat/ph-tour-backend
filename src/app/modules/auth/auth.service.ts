import bcrypt from "bcryptjs";
import httpStatusCodes from "http-status-codes";

import User from "../user/user.model";
import AppError from "../../errors/app.error";
import { IUser } from "../user/user.interface";
import { generateToken } from "../../utils/jwt";

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

  const accessToken = generateToken({
    _id: isUserAvailable._id,
    email: isUserAvailable.email,
    role: isUserAvailable.role,
  });

  return { accessToken };
};

const authServices = { credentialsLoginService };

export default authServices;
