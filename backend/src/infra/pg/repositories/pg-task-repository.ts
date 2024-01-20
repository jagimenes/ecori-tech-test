import { Task } from "../../../domain/entities/task";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";
import connectionPool from "../connection";

type SearchFields = {
  title?: string;
  description?: string;
};

type Pagination = {
  page: number;
  size: number;
};

type ListTaskInput = {
  searchFields?: SearchFields;
  pagination: Pagination;
};

type CreateTaskInput = {
  id: string;
  title: string;
  description: string;
};
type Filter = { statement: string; value: any };

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

  async list({ searchFields, pagination }: ListTaskInput): Promise<Task[]> {
    const client = await connectionPool.connect();

    const filters: Filter[] = [];

    let paramsCount = 1;
    for (const key in searchFields) {
      const value = searchFields[key];

      if (!!value) {
        filters.push({
          statement: `${key} = $${paramsCount}`,
          value: value,
        });
        paramsCount++;
      }
    }

    const hasFilters = filters.length > 0;

    const statement = hasFilters
      ? filters.map((x) => x.statement).join(" and ")
      : "";

    const values = hasFilters ? filters.map((x) => x.value) : [];

    const hasLimit = !!pagination.size;
    const hasOffset = !!pagination.page;

    const query = `select * from tasks${hasFilters ? ` where ${statement}` : ""}${hasLimit ? ` limit ${pagination.size}` : ""}${hasOffset ? ` offset ${pagination.page * pagination.size}` : ""}`;

    const result = await client.query<Task>(query, values);

    client.release();

    return result.rows;
  }

  async update({
    id,
    title,
    description,
    completed_at,
    updated_at,
  }: Task): Promise<Task> {
    const client = await connectionPool.connect();

    let task: Task | undefined = undefined;
    try {
      await client.query("BEGIN");
      let _ = await client.query<Task>(
        "select * from tasks where id = $1 for update",
        [id]
      );

      const result = await client.query<Task>(
        "update tasks set title = $1, description = $2, completed_at = $4, updated_at = $5 where id = $3 returning *",
        [title, description, id, completed_at, updated_at]
      );

      await client.query("COMMIT");
      task = result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    return task;
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
