import { User } from "../../../domain/entities/user";
import UserRepository from "../../../domain/interfaces/repositories/user-repository";
import connectionPool from "../connection";

type CreateUserInput = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type FindInput = { email: string; password: string };

export default class PgUserRepository implements UserRepository {
  async findById(id: string): Promise<User> {
    const client = await connectionPool.connect();

    const result = await client.query<User>(
      "select id, username, email, created_at, updated_at from users where id = $1",
      [id]
    );

    client.release();

    return result.rows[0];
  }

  async find({ email, password }: FindInput): Promise<User> {
    const client = await connectionPool.connect();

    const result = await client.query<User>(
      "select id, username, email, created_at, updated_at from users where email = $1 and password = $2",
      [email, password]
    );

    client.release();

    return result.rows[0];
  }

  async findByEmail(email: string, fetchPassword = false): Promise<User> {
    const client = await connectionPool.connect();

    const result = await client.query<User>(
      `select id, username,${fetchPassword ? "password," : ""} email, created_at, updated_at from users where email = $1`,
      [email]
    );

    client.release();

    return result.rows[0];
  }

  async create({
    id,
    username,
    email,
    password,
  }: CreateUserInput): Promise<User> {
    const client = await connectionPool.connect();

    const result = await client.query<User>(
      "insert into users (id, username, email, password) values ($1, $2, $3, $4) returning id, username, email, created_at, updated_at",
      [id, username, email, password]
    );

    client.release();

    return result.rows[0];
  }
}
