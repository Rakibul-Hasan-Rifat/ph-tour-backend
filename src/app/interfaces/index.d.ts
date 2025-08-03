import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }

    interface User {
      _id?: Types.ObjectId; // MongoDB ID
      email: string;
      role: string;
    }
  }
}
