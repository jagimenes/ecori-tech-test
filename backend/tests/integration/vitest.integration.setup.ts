import { beforeAll } from "vitest";
import pg from "pg";
import generateUUID from "../../src/lib/uuid/identifier-generator";
import dotenv from "dotenv";
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Client, Pool } = pg;

beforeAll(async () => {
  const schema = `test-${generateUUID()}`;
  const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;
  const pgClient = new Client(connectionString);

  try {
    await pgClient.connect();
    await pgClient.query(`CREATE SCHEMA "${schema}"`);
    pgClient.end();
  } catch (error) {
    console.log(error);
  }

  return async () => {
    try {
      const client = new Client(connectionString);
      await client.connect();
      await client.query(`DROP SCHEMA "${schema}" CASCADE;`);
      await client.end();
    } catch (error) {
      console.log(error);
    }
  };
});
