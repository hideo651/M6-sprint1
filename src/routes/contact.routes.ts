import { Router } from "express";
import { ContactController } from "../controllers/Contact.controller";
import { UserMiddleware } from "../middlewares/User.middleware";

const contactController = new ContactController();
const userMiddleware = new UserMiddleware();

export const contactRoutes = Router();

contactRoutes.post("/", userMiddleware.tokenExists, contactController.create);
contactRoutes.get(
  "/",
  userMiddleware.tokenExists,
  contactController.getUserContacts
);
contactRoutes.delete("/", userMiddleware.tokenExists, contactController.delete);
