import { User } from "../../../domain/entities/user";
import { AppError } from "../../exception/app-error";
import UserRepository from "../../../domain/interfaces/repositories/user-repository";
import { compareTextToHash, hash } from "../../../lib/bcrypt/hash";
import jwt from "jsonwebtoken";

const { SECRET } = process.env;

type AuthenticateUserInput = {
  email: string;
  password: string;
};

export default class AuthenticateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateUserInput) {
    let user = await this.userRepository.findByEmail(email, true);

    if (!user) throw new AppError("invalid email or password");

    const isEqual = await compareTextToHash(password, user.password!);

    if (!isEqual) throw new AppError("invalid email or password");

    const token = jwt.sign({ id: user.id }, SECRET as string, {
      expiresIn: 86400,
    });

    return {
      token,
    };
  }
}
