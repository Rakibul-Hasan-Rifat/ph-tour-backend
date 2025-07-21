import { Router } from "express";
import userRoute from "../modules/user/user.route";

const router = Router();

const routeModules = [
    {
        path: "/user",
        route: userRoute
    }
];

routeModules.forEach(routeModule => {    
    router.use(routeModule.path, routeModule.route)
})

export default router;