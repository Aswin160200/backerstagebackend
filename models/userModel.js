const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid"); 

const Users = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error retrieving users", error: error.message };
    }
  },

  getById: async (userid) => {
    try {
      if (!userid || isNaN(userid)) {
        throw { status: 400, message: "Invalid or missing user ID format" };
      }

      const { rows } = await pool.query("SELECT * FROM users WHERE userid = $1", [userid]);

      if (rows.length === 0) {
        throw { status: 404, message: "User not found" };
      }

      return rows[0];
    } catch (error) {
      throw error.status
        ? error
        : { status: 500, message: "Error retrieving user", error: error.message };
    }
  },

  create: async (
    username, password, firstname, lastname, email, phone,
    legalentity, street, city, state, role, zipcode, status, updateddate
  ) => {
    try {
      const userid = uuidv4(); 
      const { rows } = await pool.query(
        `INSERT INTO users 
         (userid, username, password, firstname, lastname, email, phone, 
          legalentity, street, city, state, role, zipcode, status, createddate, updateddate) 
         VALUES 
         ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), $15) 
         RETURNING *`,
        [userid, username, password, firstname, lastname, email, phone,
         legalentity, street, city, state, role, zipcode, status, updateddate]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw { status: 400, message: "User already exists (duplicate entry)" };
      } else if (error.code === "23503") {
        throw { status: 400, message: "Invalid reference (foreign key constraint violation)" };
      }
      throw { status: 500, message: "Error creating user", error: error.message };
    }
  },

  update: async (
    userid, username, password, firstname, lastname, email, phone,
    legalentity, street, city, state, role, zipcode, status
  ) => {
    try {
      if (!userid || isNaN(userid)) {
        throw { status: 400, message: "Invalid or missing user ID format" };
      }

      const { rows } = await pool.query(
        `UPDATE users 
         SET username = $1, password = $2, firstname = $3, lastname = $4, email = $5, phone = $6,
             legalentity = $7, street = $8, city = $9, state = $10, role = $11, 
             zipcode = $12, status = $13, updateddate = NOW()
         WHERE userid = $14 
         RETURNING *`,
        [username, password, firstname, lastname, email, phone,
         legalentity, street, city, state, role, zipcode, status, userid]
      );

      if (rows.length === 0) {
        throw { status: 404, message: "User not found" };
      }

      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error updating user", error: error.message };
    }
  },

  delete: async (userid) => {
    try {
      if (!userid || isNaN(userid)) {
        throw { status: 400, message: "Invalid or missing user ID format" };
      }

      const { rows } = await pool.query("DELETE FROM users WHERE userid = $1 RETURNING *", [userid]);

      if (rows.length === 0) {
        throw { status: 404, message: "User not found" };
      }

      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error deleting user", error: error.message };
    }
  },
};

module.exports = Users;
