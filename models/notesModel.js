const pool = require("../config/db");

const Note = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM notes");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching notes", error: error.message };
    }
  },

  getById: async (noteid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM notes WHERE noteid = $1", [noteid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Note not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error fetching note", error: error.message };
    }
  },

  getByProjectId: async (projectid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM notes WHERE projectid = $1", [projectid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching notes by project ID", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM notes WHERE producersid = $1", [producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching notes by producer ID", error: error.message };
    }
  },

  getByInvestorId: async (investorid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM notes WHERE investorid = $1", [investorid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching notes by investor ID", error: error.message };
    }
  },

  getByCoProducerId: async (co_producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM notes WHERE co_producersid = $1", [co_producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching notes by co-producer ID", error: error.message };
    }
  },

  create: async (data) => {
    try {
      const { projectid, investorid, producersid, co_producersid, notetitle, notedescription } = data;

      const query = `
        INSERT INTO notes (projectid, investorid, producersid, co_producersid, notetitle, notedescription, createddate, updateddate)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
        RETURNING *;
      `;

      const values = [projectid, investorid, producersid, co_producersid, notetitle, notedescription];
      const { rows } = await pool.query(query, values);

      return rows[0];

    } catch (error) {
      throw { status: 500, message: "Error creating note", error: error.message };
    }
  },

  update: async (noteid, data) => {
    try {
      const { notetitle, notedescription } = data;

      const query = `
        UPDATE notes 
        SET notetitle = $1, notedescription = $2, updateddate = NOW()
        WHERE noteid = $3 
        RETURNING *;
      `;

      const values = [notetitle, notedescription, noteid];
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        throw { status: 404, message: "Note not found" };
      }

      return rows[0];

    } catch (error) {
      throw { status: 500, message: "Error updating note", error: error.message };
    }
  },

  delete: async (noteid) => {
    try {
      const { rows } = await pool.query("DELETE FROM notes WHERE noteid = $1 RETURNING *", [noteid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Note not found" };
      }
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error deleting note", error: error.message };
    }
  },
};

module.exports = Note;
