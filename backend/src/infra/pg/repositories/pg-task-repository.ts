import { Task } from "../../../domain/entities/task";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";
import connectionPool from "../connection";

type CreateTaskInput = {
  id: string;
  title: string;
  description: string;
};

export default class PgTaskRepository implements TaskRepository {
  async findById(id: string): Promise<Task> {
    const client = await connectionPool.connect();

    const result = await client.query<Task>(
      "select * from tasks where id = $1",
      [id]
    );

    client.release();

    return result.rows[0];
  }

  async update({ id, title, description }: Task): Promise<Task> {
    const client = await connectionPool.connect();

    const result = await client.query<Task>(
      "update tasks set title = $1, description = $2 where id = $3 returning *",
      [title, description, id]
    );

    client.release();

    return result.rows[0];
  }

  async create({ id, title, description }: CreateTaskInput): Promise<Task> {
    const client = await connectionPool.connect();

    const result = await client.query<Task>(
      "insert into tasks (id, title, description) values ($1, $2, $3) returning *",
      [id, title, description]
    );

    client.release();

    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const client = await connectionPool.connect();

    await client.query<Task>("delete from tasks where id = $1", [id]);

    client.release();
  }
}
