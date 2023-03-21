import DataSource from "../data-source";
import User from "../entities/User.entity";

export const userRepository = DataSource.getRepository(User);
