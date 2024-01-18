import generateUUID from "../../lib/uuid/identifier-generator";
import hash from "../../lib/bcrypt/hash";
import { AppError } from "../exception/app-error";

export class User {
  id: string;
  username: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date | null;

  private constructor({
    id,
    username,
    email,
    password,
    created_at,
    updated_at,
  }: User) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create({
    id,
    username,
    email,
    password,
    created_at,
    updated_at,
  }: Partial<User>) {
    if (username === undefined) throw new AppError("username is not defined");
    if (username === null) throw new AppError("username is null");

    if (email === undefined) throw new AppError("email is not defined");
    if (email === null) throw new AppError("email is null");

    if (!!id === false && password === undefined)
      throw new AppError("password is not defined");

    if (password !== undefined) {
      password = await hash(password);
    }

    return new User({
      id: id ?? generateUUID(),
      username,
      email,
      password,
      created_at,
      updated_at,
    });
  }
}
