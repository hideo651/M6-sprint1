import { NextFunction, Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import { ConflictError } from "../helpers/Errors.helper";
import { userRepository } from "../repositories/user.repository";

export class UserMiddleware {
  async emailExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email } = req.body;
    const userExist = await userRepository.findOneBy({ email });

    if (userExist) {
      throw new ConflictError("E-mail já cadastrado");
    }

    next();
  }
}
