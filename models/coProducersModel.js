const pool = require("../config/db");

const Coproducer = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM coproducers");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching coproducers", error: error.message };
    }
  },

  getById: async (co_producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM coproducers WHERE co_producersid = $1", [co_producersid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Coproducer not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error fetching coproducer", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM coproducers WHERE producersid = $1", [producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching coproducers by producer ID", error: error.message };
    }
  },

  getByInvestorId: async (investorid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM coproducers WHERE investorid = $1", [investorid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching coproducers by investor ID", error: error.message };
    }
  },

  getByProjectId: async (projectid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM coproducers WHERE projectid = $1", [projectid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching coproducers by project ID", error: error.message };
    }
  },

  create: async (coproducerData) => {
    try {
      const {
        projectid, investorid, producersid, firstname, lastname, emailid, phone, legalentity,
        street, city, state, totalallocation, status, total_raised, entityelements,
        generalcomments
      } = coproducerData;

      const { rows } = await pool.query(
        `INSERT INTO coproducers 
          (projectid, investorid, producersid, firstname, lastname, emailid, phone, legalentity,
          street, city, state, totalallocation, status, total_raised, entityelements,
          generalcomments, createddate, updateddate) 
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW()) 
        RETURNING *`,
        [
          projectid, investorid, producersid, firstname, lastname, emailid, phone, legalentity,
          street, city, state, totalallocation, status, total_raised, entityelements,
          generalcomments
        ]
      );
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error creating coproducer", error: error.message };
    }
  },

  update: async (co_producersid, coproducerData) => {
    try {
      const {
        projectid, investorid, producersid, firstname, lastname, emailid, phone, legalentity,
        street, city, state, totalallocation, status, total_raised, entityelements,
        generalcomments
      } = coproducerData;

      const { rows } = await pool.query(
        `UPDATE coproducers 
        SET 
          projectid = $1, investorid = $2, producersid = $3, firstname = $4, lastname = $5,
          emailid = $6, phone = $7, legalentity = $8, street = $9, city = $10, state = $11,
          totalallocation = $12, status = $13, total_raised = $14, entityelements = $15,
          generalcomments = $16, updateddate = NOW() 
        WHERE co_producersid = $17 
        RETURNING *`,
        [
          projectid, investorid, producersid, firstname, lastname, emailid, phone, legalentity,
          street, city, state, totalallocation, status, total_raised, entityelements,
          generalcomments, co_producersid
        ]
      );
      if (rows.length === 0) {
        throw { status: 404, message: "Coproducer not found" };
      }
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error updating coproducer", error: error.message };
    }
  },

  delete: async (co_producersid) => {
    try {
      const { rows } = await pool.query("DELETE FROM coproducers WHERE co_producersid = $1 RETURNING *", [co_producersid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Coproducer not found" };
      }
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error deleting coproducer", error: error.message };
    }
  },
};

module.exports = Coproducer;
