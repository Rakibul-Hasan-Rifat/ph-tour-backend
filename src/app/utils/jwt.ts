import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, jwt_secret: string) => {
  const token = jwt.sign({ ...payload }, jwt_secret);
  return token;
};

export const verifyToken = (token: string, jwt_secret: string) => {
    const verifiedToken = jwt.verify(token, jwt_secret);
    return verifiedToken;
}