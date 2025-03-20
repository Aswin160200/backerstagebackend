const pool = require("../config/db");

const Investor = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM investors");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching investors", error: error.message };
    }
  },

  getById: async (investorid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM investors WHERE investorid = $1", [investorid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Investor not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error fetching investor", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM investors WHERE producersid = $1", [producersid]);
      if (rows.length === 0) {
        throw { status: 404, message: "No investors found for this producer" };
      }
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching investors by producer ID", error: error.message };
    }
  },

  create: async (investorData) => {
    try {
      const {
        producersid, firstname, lastname, emailid, mobilenumber, address, city, state,
        zipcode, accredited, referralsource, dateadded, investorprobability, generalcomments
      } = investorData;

      const { rows } = await pool.query(
        `INSERT INTO investors 
          (producersid, firstname, lastname, emailid, mobilenumber, address, city, state, 
          zipcode, accredited, referralsource, dateadded, investorprobability, generalcomments, 
          createddate, updateddate) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW()) 
        RETURNING *`,
        [
          producersid, firstname, lastname, emailid, mobilenumber, address, city, state,
          zipcode, accredited, referralsource, dateadded, investorprobability, generalcomments
        ]
      );

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error creating investor", error: error.message };
    }
  },

  update: async (investorid, investorData) => {
    try {
      const {
        producersid, firstname, lastname, emailid, mobilenumber, address, city, state,
        zipcode, accredited, referralsource, dateadded, investorprobability, generalcomments
      } = investorData;

      const { rows } = await pool.query(
        `UPDATE investors 
        SET 
          producersid = $1, firstname = $2, lastname = $3, emailid = $4, mobilenumber = $5, 
          address = $6, city = $7, state = $8, zipcode = $9, accredited = $10, 
          referralsource = $11, dateadded = $12, investorprobability = $13, 
          generalcomments = $14, updateddate = NOW() 
        WHERE investorid = $15 
        RETURNING *`,
        [
          producersid, firstname, lastname, emailid, mobilenumber, address, city, state,
          zipcode, accredited, referralsource, dateadded, investorprobability, generalcomments,
          investorid
        ]
      );

      if (rows.length === 0) {
        throw { status: 404, message: "Investor not found" };
      }

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error updating investor", error: error.message };
    }
  },

  delete: async (investorid) => {
    try {
      const { rows } = await pool.query("DELETE FROM investors WHERE investorid = $1 RETURNING *", [investorid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Investor not found" };
      }
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error deleting investor", error: error.message };
    }
  },
};

module.exports = Investor;
