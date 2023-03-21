import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import {
  ICreateUser,
  IUserLogin,
  IUserUpdate,
} from "../interfaces/user.interface";

export class UserController {
  async create(req: Request, res: Response) {
    const payload: ICreateUser = req.body;
    const user = await new UserService().create(payload);

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const payload: IUserLogin = req.body;
    const data = await new UserService().login(payload);

    return res.status(200).json({ token: data });
  }

  async update(req: Request, res: Response) {
    const payload: IUserUpdate = req.body;
    const { id } = req.user;

    const data = await new UserService().update(payload, id);

    return res.status(200).json(data);
  }
}
