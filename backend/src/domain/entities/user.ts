import generateUUID from "../../lib/uuid/identifier-generator";

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
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

  static create({
    id,
    username,
    email,
    password,
    created_at,
    updated_at,
  }): Partial<User> {
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
