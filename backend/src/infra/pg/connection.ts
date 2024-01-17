import { Pool } from "pg";

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const connectionPool = new Pool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default connectionPool;
