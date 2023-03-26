import { IContact } from "./contact.interface";

export interface ICreateUser {
  name: string;
  email: string;
  cellphone: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  createdAt: Date;
  contacts: IContact[];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  cellphone?: string;
}
