import { Router } from "express";
import userControllers from "./user.controller";

const userRoute = Router();

userRoute.post("/register", userControllers.createUserContrller);
userRoute.get("/all-users", userControllers.getAllUserController)

export default userRoute;