import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

console.log("👀 CHECKING ENV URI:", process.env.VITE_DB_URI);

export const pl = new Pool({
    connectionString: process.env.VITE_DB_URI
  });

  // export default db;

  // export const pl = new Pool({
  //   user: process.env.VITE_DB_USER,
  //   host: process.env.VITE_DB_HOST,
  //   database: process.env.VITE_DB_NAME,
  //   password: process.env.VITE_DB_PASSWORD,
  //   port: process.env.VITE_DB_PORT
  // });

  export default pl;