import { IContact, ICreateContact } from "../../interfaces/contact.interface";
import {
  IUser,
  ICreateUser,
  IUserLogin,
  IUserUpdate,
} from "../../interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      validate:
        | IUser
        | ICreateUser
        | IUserLogin
        | IUserUpdate
        | ICreateContact
        | IContact;
    }
  }
}
