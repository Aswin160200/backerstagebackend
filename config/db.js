const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    password: "backerstage123",
    host: "backerstage.cov2muso87um.us-east-1.rds.amazonaws.com",
    port: 5432,
    database: "backerstage",
    ssl: { rejectUnauthorized: false } ,
    // user: "postgres",
    // password: "Admin@123",
    // host: "localhost",
    // port: "5432",
    // database: "backerstage",
});

const testConnection = async () => {
    try {
      const res = await pool.query("SELECT NOW()");
      console.log("Connected to AWS RDS:", res.rows[0]);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  testConnection();

module.exports = pool;
