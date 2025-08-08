import pg from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const { Pool } = pg;
const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASS,
   port: 5432,
   max: 20,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 2000,
});

export default pool;
