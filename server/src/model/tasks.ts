import pool from "./index";

class TaskModel {
  async checkAndCreateDatabase() {
    const client = await pool.connect();

    try {
      const queryText =
        "SELECT datname FROM pg_database WHERE datname = 'postgres'";
      const { rows } = await pool.query(queryText);

      if (rows.length === 0) {
        const createDatabaseQuery = "CREATE DATABASE postgres";
        await client.query(createDatabaseQuery);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async tableExists() {
    const client = await pool.connect();
    const queryText = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'tasks'
        )`;

    try {
      const result = await client.query(queryText);

      const exists = result.rows[0].exists;
      return exists;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async functionExists() {
    const client = await pool.connect();
    const queryText = `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'update_tasks_trigger'
      )`;

    try {
      const result = await client.query(queryText);
      const exists = result.rows[0].exists;

      return exists;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async triggerExists() {
    const client = await pool.connect();
    const queryText = `
      SELECT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'tasks_update_trigger'
      )`;

    try {
      const result = await client.query(queryText);
      const exists = result.rows[0].exists;

      return exists;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async createNewTable() {
    const client = await pool.connect();
    const queryText = `
      CREATE TABLE tasks(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NULL,
        completed_at TIMESTAMP NULL,
        completed BOOLEAN NOT NULL DEFAULT false
      )`;

    try {
      await client.query(queryText);
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async createNewFunction() {
    const client = await pool.connect();
    const queryText = `
      CREATE OR REPLACE FUNCTION update_tasks_trigger()
      RETURNS TRIGGER AS $$
      BEGIN
          IF OLD.completed IS DISTINCT FROM NEW.completed THEN
              NEW.completed_at = now();
          END IF;
      
          IF (OLD.title, OLD.description) IS DISTINCT FROM (NEW.title, NEW.description) THEN
              NEW.updated_at = now();
          END IF;
      
          RETURN NEW;
      END;
      $$ LANGUAGE 'plpgsql'`;

    try {
      await client.query(queryText);
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  async createNewTrigger() {
    const client = await pool.connect();
    const queryText = `
      CREATE TRIGGER tasks_update_trigger
      BEFORE UPDATE
      ON tasks
      FOR EACH ROW
      EXECUTE FUNCTION update_tasks_trigger();`;

    try {
      await client.query(queryText);
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }
}

export default new TaskModel();
