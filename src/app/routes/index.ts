import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";
import divisionRoute from "../modules/division/division.route";
import tourRoute from "../modules/tour/tour.route";

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
    },
    {
        path: "/tour",
        route: tourRoute
    }
];

routeModules.forEach(routeModule => {    
    router.use(routeModule.path, routeModule.route)
})

export default router;