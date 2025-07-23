import { Router } from "express";
import { Role } from "./user.interface";
import userControllers from "./user.controller";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { userZodShemaToCreate, userZodShemaToUpdate } from "./user.validation";

const userRoute = Router();

userRoute.post("/register", validateRequest(userZodShemaToCreate), userControllers.createUserContrller);
userRoute.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUserController);
userRoute.patch("/:id", checkAuth(...Object.values(Role)), validateRequest(userZodShemaToUpdate), userControllers.updateUserContrller);

export default userRoute;
