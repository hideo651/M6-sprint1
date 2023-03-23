import {
  ICreateUser,
  IUserLogin,
  IUserUpdate,
} from "../interfaces/user.interface";
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

  async update(payload: IUserUpdate, userId: string) {
    const { cellphone, email, name, password } = payload;

    const user = await userRepository.findOneBy({ id: userId });

    const keys = Object.keys(payload);

    if (
      keys.includes("id") ||
      keys.includes("contacts") ||
      keys.includes("createdAt")
    ) {
      throw new UnauthorizedError(
        "Não é possível modificar os campos ID, createdAt e contacts"
      );
    }

    if (password) {
      const hashPassword = await bcrypt.hash(password!, 10);

      const updateUser = userRepository.create({
        ...user,
        email,
        cellphone,
        name,
        password: hashPassword,
      });

      await userRepository.save(updateUser);

      return instanceToInstance(updateUser);
    }

    const updateUser = userRepository.create({
      ...user,
      email,
      cellphone,
      name,
    });

    await userRepository.save(updateUser);

    return instanceToInstance(updateUser);
  }
}
