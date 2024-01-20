import { beforeEach } from "vitest";
import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, SECRET } = process.env;
const { Client } = pg;

const dbTestName = `${DB_NAME}_test`;
process.env.DB_NAME = dbTestName;

const connectionStringHostDb = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;
const connectionStringTestDb = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${dbTestName}`;
const pgClientHost = new Client(connectionStringHostDb);
const pgClientTest = new Client(connectionStringTestDb);

try {
  await pgClientHost.connect();
  await pgClientHost.query(
    `DROP DATABASE IF EXISTS "${dbTestName}" WITH (FORCE);`
  );
  await pgClientHost.query(`CREATE DATABASE "${dbTestName}"`);
  pgClientHost.end();

  await pgClientTest.connect();
  const initDbScript = fs.readFileSync("./db.sql").toString();
  await pgClientTest.query(initDbScript);
  pgClientTest.end();
} catch (error) {
  console.log(error);
}

beforeEach(async () => {
  const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${dbTestName}`;
  const pgClient = new Client(connectionString);

  try {
    await pgClient.connect();
    const queries: string[] = [];
    queries.push(`TRUNCATE TABLE tasks CASCADE;`);
    queries.push(`TRUNCATE TABLE users CASCADE;`);

    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      await pgClient.query(query);
    }

    const id = randomUUID();

    const result = await pgClient.query(
      "insert into users (id, username, email, password) values ($1, $2, $3, $4) returning id, username, email, created_at, updated_at",
      [id, "test user", "test@test.com", "123456"]
    );

    const token = jwt.sign({ id }, SECRET as string);

    pgClient.end();

    TestUtil.token = `Bearer ${token}`;
  } catch (error) {
    console.log(error);
  }
});

export class TestUtil {
  static token = "";
}
