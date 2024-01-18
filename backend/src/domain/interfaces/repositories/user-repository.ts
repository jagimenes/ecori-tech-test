import { User } from "../../entities/user";

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

export default interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
}
