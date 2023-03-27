import { Router } from "express";
import { ContactController } from "../controllers/Contact.controller";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserMiddleware } from "../middlewares/User.middleware";
import { ContactSchema } from "../schemas/Contact.schema";

const contactController = new ContactController();
const userMiddleware = new UserMiddleware();
const dataMiddleware = new DataMiddleware();

export const contactRoutes = Router();

contactRoutes.post(
  "/",
  userMiddleware.tokenExists,
  dataMiddleware.ensureData(ContactSchema.create),
  contactController.create
);
contactRoutes.get(
  "/",
  userMiddleware.tokenExists,
  contactController.getUserContacts
);
contactRoutes.delete(
  "/:id",
  userMiddleware.tokenExists,
  contactController.delete
);
contactRoutes.patch(
  "/:id",
  userMiddleware.tokenExists,
  dataMiddleware.ensureData(ContactSchema.update),
  contactController.update
);
