import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import { ICreateUser } from "../interfaces/user.interface";

export class UserController {
  async create(req: Request, res: Response) {
    const payload: ICreateUser = req.body;
    const user = await new UserService().create(payload);

    return res.status(201).json(user);
  }
}
