import { IUser } from "./user.interface";

export interface ICreateContact {
  name: string;
  email: string;
  cellphone: string;
}

export interface IContact {
  name: string;
  email: string;
  cellphone: string;
  createdAt: string;
  user: IUser;
}
