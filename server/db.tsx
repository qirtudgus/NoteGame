import mysql from "mysql";
const db = mysql.createConnection({
  host: process.env.local_DB_host,
  port: 3306,
  user: process.env.local_DB_user,
  password: process.env.local_DB_password,
  database: process.env.local_DB,
  charset: "utf8mb4",
});


module.exports = db;