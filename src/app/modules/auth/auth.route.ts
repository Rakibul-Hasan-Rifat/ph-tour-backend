import { Request, Response, Router } from "express";
import authControllers from "./auth.controller";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";

const authRoute = Router();


authRoute.post("/logout", authControllers.logoutController);
authRoute.post("/login", authControllers.credentialsLoginController);
authRoute.post("/refresh-token", authControllers.getNewAccessTokenController);
authRoute.post("/reset-password", checkAuth(...Object.values(Role)), authControllers.resetPasswordController);
authRoute.get("/google", async(req: Request, res: Response) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {scope: ["profile", "email"], state: redirect as string})(req, res)
})
authRoute.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }), authControllers.googleCallbackControler)
export default authRoute;