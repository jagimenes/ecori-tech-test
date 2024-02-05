import pg, { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const types = pg.types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

const pool = new Pool({
  user: "postgres",
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
});

export default pool;
