import { beforeEach } from "vitest";
import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
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
    const query = `TRUNCATE TABLE tasks CASCADE;`;
    await pgClient.query(query);
    pgClient.end();
  } catch (error) {
    console.log(error);
  }
});
