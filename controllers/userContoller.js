const Users = require("../models/userModel");
const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { userid } = req.query; 

    if (!userid || isNaN(userid)) {
      return res.status(400).json({ message: "Invalid or missing user ID format" });
    }

    const user = await Users.getById(userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || "Error retrieving user" });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      phone,
      legalentity,
      street,
      city,
      state,
      role,
      zipcode,
      status,
      updateddate
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO users (username, password, firstname, lastname, email, phone, 
        legalentity, street, city, state, role, zipcode, status, createddate, updateddate) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), $14) 
      RETURNING *`,
      [
        username,
        password,
        firstname,
        lastname,
        email,
        phone,
        legalentity,
        street,
        city,
        state,
        role,
        zipcode,
        status,
        updateddate
      ]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    if (error.code === "23505") {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { userid } = req.query; 

    if (!userid || isNaN(userid)) {
      return res.status(400).json({ message: "Invalid or missing user ID format" });
    }

    const {
      username,
      password,
      firstname,
      lastname,
      email,
      phone,
      legalentity,
      street,
      city,
      state,
      role,
      zipcode,
      status,
    } = req.body;

    const { rowCount, rows } = await pool.query(
      `UPDATE users 
      SET 
        username = $1, 
        password = $2, 
        firstname = $3, 
        lastname = $4, 
        email = $5, 
        phone = $6, 
        legalentity = $7, 
        street = $8, 
        city = $9, 
        state = $10, 
        role = $11, 
        zipcode = $12, 
        status = $13, 
        updateddate = NOW()
      WHERE userid = $14 
      RETURNING *`,
      [
        username,
        password,
        firstname,
        lastname,
        email,
        phone,
        legalentity,
        street,
        city,
        state,
        role,
        zipcode,
        status,
        userid,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: rows[0] });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userid } = req.query; 

    if (!userid || isNaN(userid)) {
      return res.status(400).json({ message: "Invalid or missing user ID format" });
    }

    const { rowCount } = await pool.query("DELETE FROM users WHERE userid = $1", [userid]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser };
