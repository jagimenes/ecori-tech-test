import UserRepository from "../../../domain/interfaces/repositories/user-repository";
import AuthenticateUser from "../../use-cases/user/authenticate-user";
import CreateUser from "../../use-cases/user/create-user";

export function makeCreateUser(repository: UserRepository) {
  return new CreateUser(repository);
}

export function makeAuthenticateUser(repository: UserRepository) {
  return new AuthenticateUser(repository);
}
