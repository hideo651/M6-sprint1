import { IUser } from "./user.interface";

export interface ICreateContact {
  name: string;
  email: string;
  cellphone: string;
  user: IUser;
}

export interface IContact {
  name: string;
  email: string;
  cellphone: string;
  createdAt: Date;
  user: IUser;
  isActive: boolean;
}
