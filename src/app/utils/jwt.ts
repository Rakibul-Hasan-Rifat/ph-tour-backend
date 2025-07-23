import jwt, { JwtPayload } from "jsonwebtoken";
import environmentVariables from "../config/env.config";

export const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign({ ...payload }, environmentVariables.secret_key);
  return token;
};

export const verifyToken = (token: string) => {
    const verifiedToken = jwt.verify(token, environmentVariables.secret_key);

    return verifiedToken;
}