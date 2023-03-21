import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";
import { UserSchemas } from "../schemas/User.schema";

const userController = new UserController();
const userSchemas = UserSchemas;
const dataMiddleware = new DataMiddleware();
const userMiddleware = new UserMiddleware();

export const userRoutes = Router();

userRoutes.post(
  "/",
  dataMiddleware.ensureData(userSchemas.create),
  userMiddleware.emailExist,
  userController.create
);
userRoutes.patch(
  "/",
  userMiddleware.tokenExists,
  dataMiddleware.ensureData(userSchemas.update),
  userController.update
);
