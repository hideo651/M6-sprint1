import { ICreateUser } from "../interfaces/user.interface";
import bcrypt, { compare } from "bcrypt";
import { userRepository } from "../repositories/user.repository";
import { instanceToInstance } from "class-transformer";

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
}
