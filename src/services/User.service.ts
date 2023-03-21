import { ICreateUser, IUserLogin } from "../interfaces/user.interface";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { instanceToInstance } from "class-transformer";

import { UnauthorizedError } from "../helpers/Errors.helper";

export class UserService {
  async create(payload: ICreateUser) {
    const { cellphone, email, name, password } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      cellphone,
      password: hashPassword,
    });

    await userRepository.save(newUser);

    return instanceToInstance(newUser);
  }

  async login(payload: IUserLogin) {
    const { email, password } = payload;

    const user = await userRepository.findOne({
      select: { id: true, email: true, password: true },
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError("Usuário ou senha inválido!");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Usuário ou senha inválido!");
    }

    const token = jwt.sign({ id: user?.id }, process.env.SECRET_KEY as string, {
      expiresIn: "24h",
      subject: user?.email,
    });

    return token;
  }
}
