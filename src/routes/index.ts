import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { LoginSchema } from "../schemas/Login.schema";

import { userRoutes } from "./user.routes";

const dataMiddleware = new DataMiddleware();
const loginSchema = LoginSchema;

export const routes = Router();

routes.use("/users", userRoutes);
routes.use(
  "/login",
  dataMiddleware.ensureData(loginSchema.login),
  new UserController().login
);
