import { User } from "../../../domain/entities/user";
import { AppError } from "../../exception/app-error";
import UserRepository from "../../../domain/interfaces/repositories/user-repository";

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    username,
    email,
    password,
    passwordConfirmation,
  }: CreateUserInput) {
    if (password !== passwordConfirmation)
      throw new AppError("passwords does not match");

    const user = await User.create({
      username,
      email,
      password,
    });

    const output = await this.userRepository.create({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password!,
    });

    return output;
  }
}
