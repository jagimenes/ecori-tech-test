import { User } from "../../entities/user";

type CreateUserInput = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type FindInput = {
  email: string;
  password: string;
};

export default interface UserRepository {
  findById(id: string): Promise<User>;
  find(input: FindInput): Promise<User>;
  findByEmail(email: string, fetchPassword: boolean): Promise<User>;
  create(input: CreateUserInput): Promise<User>;
}
