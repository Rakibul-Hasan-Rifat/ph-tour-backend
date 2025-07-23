import { Router } from "express";
import authControllers from "./auth.controller";

const authRoute = Router();

authRoute.post("/login", authControllers.credentialsLoginController)

export default authRoute;