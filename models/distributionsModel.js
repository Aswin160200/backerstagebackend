const pool = require("../config/db");

const Distribution = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM distributions");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error retrieving distributions", error: error.message };
    }
  },

  getById: async (id) => {
    try {
      const { rows } = await pool.query("SELECT * FROM distributions WHERE distributionid = $1", [id]);
      if (rows.length === 0) {
        throw { status: 404, message: "Distribution not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error retrieving distribution", error: error.message };
    }
  },

  getByProjectId: async (projectid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM distributions WHERE projectid = $1", [projectid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error retrieving distributions by project ID", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM distributions WHERE producersid = $1", [producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error retrieving distributions by producer ID", error: error.message };
    }
  },

  create: async (data) => {
    try {
      const { projectid, producersid, distributionname, distributionnumber, projectname, dateofdistribution, amountofdistribution, totalrecoupedtodate, createddate, updateddate } = data;

      const { rows } = await pool.query(
        "INSERT INTO distributions (projectid, producersid, distributionname, distributionnumber, projectname, dateofdistribution, amountofdistribution, totalrecoupedtodate, createddate, updateddate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [projectid, producersid, distributionname, distributionnumber, projectname, dateofdistribution, amountofdistribution, totalrecoupedtodate, createddate, updateddate]
      );

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error creating distribution", error: error.message };
    }
  },

  update: async (id, data) => {
    try {
      const { projectid, producersid, distributionname, distributionnumber, projectname, dateofdistribution, amountofdistribution, totalrecoupedtodate, updateddate } = data;

      const { rows } = await pool.query(
        "UPDATE distributions SET projectid = $1, producersid = $2, distributionname = $3, distributionnumber = $4, projectname = $5, dateofdistribution = $6, amountofdistribution = $7, totalrecoupedtodate = $8, updateddate = $9 WHERE distributionid = $10 RETURNING *",
        [projectid, producersid, distributionname, distributionnumber, projectname, dateofdistribution, amountofdistribution, totalrecoupedtodate, updateddate, id]
      );

      if (rows.length === 0) {
        throw { status: 404, message: "Distribution not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error updating distribution", error: error.message };
    }
  },

  delete: async (id) => {
    try {
      const { rows } = await pool.query("DELETE FROM distributions WHERE distributionid = $1 RETURNING *", [id]);
      if (rows.length === 0) {
        throw { status: 404, message: "Distribution not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error deleting distribution", error: error.message };
    }
  },
};

module.exports = Distribution;
