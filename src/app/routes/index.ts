import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";
import divisionRoute from "../modules/division/division.route";

const router = Router();

const routeModules = [
    {
        path: "/user",
        route: userRoute
    },
    {
        path: "/auth", 
        route: authRoute
    },
    {
        path: "/division",
        route: divisionRoute
    }
];

routeModules.forEach(routeModule => {    
    router.use(routeModule.path, routeModule.route)
})

export default router;