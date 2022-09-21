import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
export const db = mysql.createConnection({
  host: process.env.local_DB_host,
  port: 3306,
  user: process.env.local_DB_user,
  password: process.env.local_DB_password,
  database: process.env.local_DB,
  charset: 'utf8mb4',
});

export default db;
