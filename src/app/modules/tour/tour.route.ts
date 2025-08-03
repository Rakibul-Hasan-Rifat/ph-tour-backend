import { Router } from "express";
import tourControllers from "./tour.controller";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { tourTypeZodSchema, tourZodSchemaToCreate, tourZodSchemaToUpdate } from "./tour.validation";

const tourRoute = Router();

// ----------------------------------------- TourTypes Routes -----------------------------------------
tourRoute.get("/tour-types", tourControllers.getTourController);
tourRoute.post(
  "/tour-types/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(tourTypeZodSchema),
  tourControllers.createTourController
);
tourRoute.patch(
  "/tour-types/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(tourTypeZodSchema),
  tourControllers.updateTourController
);
tourRoute.delete(
  "/tour-types/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  tourControllers.deleteTourController
);

// ----------------------------------------- Tour Routes -----------------------------------------

tourRoute.get("/", tourControllers.getTourController);
tourRoute.post(
  "/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(tourZodSchemaToCreate),
  tourControllers.createTourController
);
tourRoute.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(tourZodSchemaToUpdate),
  tourControllers.updateTourController
);
tourRoute.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  tourControllers.deleteTourController
);

export default tourRoute;
