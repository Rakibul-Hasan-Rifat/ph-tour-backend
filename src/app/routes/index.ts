import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";

const router = Router();

const routeModules = [
    {
        path: "/user",
        route: userRoute
    },
    {
        path: "/auth", 
        route: authRoute
    }
];

routeModules.forEach(routeModule => {    
    router.use(routeModule.path, routeModule.route)
})

export default router;