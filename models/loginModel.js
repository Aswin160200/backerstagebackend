const db = require("../config/db");

const User = {
  getByUsername: async (username) => {
    console.log("Fetching user from database:", username);
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    console.log("Database query result:", result.rows);
    return result.rows[0]; // Return the first found user
  },
};

module.exports = User;
