import { User } from "../../../domain/entities/user";
import UserRepository from "../../../domain/interfaces/repositories/user-repository";

type CreateUserInput = { username: string; email: string; password: string };

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ username, email, password }: CreateUserInput) {
    const user = await User.create({
      username,
      email,
      password,
    });

    await this.userRepository.create({
      username: user.username,
      email: user.email,
      password: user.password!,
    });
  }
}
