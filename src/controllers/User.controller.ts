import { Request, Response } from "express";
import { UserService } from "../services/User.service";

export class UserController {
  async create(req: Request, res: Response) {
    const user = await new UserService().create();

    return res.status(201).json(user);
  }
}
