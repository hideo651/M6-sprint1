import { Router } from "express";
import { UserController } from "../controllers/User.controller";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.post("/", userController.create);
