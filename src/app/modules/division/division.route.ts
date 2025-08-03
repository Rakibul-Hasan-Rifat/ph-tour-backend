import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import divisionControllers from "./division.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  divisionZodSchemaToCreate,
  divisionZodSchemaToUpdate,
} from "./division.validation";

const divisionRoute = Router();

divisionRoute.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(divisionZodSchemaToCreate),
  divisionControllers.createDivisionController
);

divisionRoute.get("/", divisionControllers.getDivisionController);

divisionRoute.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(divisionZodSchemaToUpdate),
  divisionControllers.updateDivisionController
);

divisionRoute.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.ADMIN), divisionControllers.deleteDivisionController)

export default divisionRoute;
