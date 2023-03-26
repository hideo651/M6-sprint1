import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ConflictError, UnauthorizedError } from "../helpers/Errors.helper";
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
  tokenExists(req: Request, res: Response, next: NextFunction): void {
    let token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError("Token inválido");
    }

    token = token.split(" ")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error, decoded: any) => {
        if (error) {
          throw new UnauthorizedError("Token inválido");
        }

        req.user = {
          id: decoded.id,
          email: decoded.email,
        };

        next();
      }
    );
  }
}
