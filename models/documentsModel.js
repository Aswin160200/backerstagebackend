const pool = require("../config/db");

const Document = {
  getAll: async () => {
    const { rows } = await pool.query("SELECT * FROM documents");
    return rows;
  },

  getById: async (documentid) => {
    const { rows } = await pool.query("SELECT * FROM documents WHERE documentid = $1", [documentid]);
    return rows[0];
  },

  getByProjectId: async (projectid) => {
    const { rows } = await pool.query("SELECT * FROM documents WHERE projectid = $1", [projectid]);
    return rows;
  },

  getByProducerId: async (producersid) => {
    const { rows } = await pool.query("SELECT * FROM documents WHERE producersid = $1", [producersid]);
    return rows;
  },

  getByInvestorId: async (investorid) => {
    const { rows } = await pool.query("SELECT * FROM documents WHERE investorid = $1", [investorid]);
    return rows;
  },

  create: async ({ projectid, investorid, producersid, filename, filetype, createddate, updateddate }) => {
    const { rows } = await pool.query(
      "INSERT INTO documents (projectid, investorid, producersid, filename, filetype, createddate, updateddate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [projectid, investorid, producersid, filename, filetype, createddate, updateddate]
    );
    return rows[0];
  },

  update: async (documentid, { filename, filetype, updateddate }) => {
    const { rows } = await pool.query(
      "UPDATE documents SET filename = $1, filetype = $2, updateddate = $3 WHERE documentid = $4 RETURNING *",
      [filename, filetype, updateddate, documentid]
    );
    return rows[0];
  },

  delete: async (documentid) => {
    const { rows } = await pool.query("DELETE FROM documents WHERE documentid = $1 RETURNING *", [documentid]);
    return rows[0];
  },

  getByFilters: async (projectid, investorid, producersid) => {
    let query = `
      SELECT d.*, p.projectname, u.username AS producername, i.investorname 
      FROM documents d
      LEFT JOIN projects p ON d.projectid = p.projectid
      LEFT JOIN users u ON d.producersid = u.userid
      LEFT JOIN investors i ON d.investorid = i.investorid
      WHERE 1=1
    `;

    const values = [];
    if (projectid) {
      values.push(projectid);
      query += ` AND d.projectid = $${values.length}`;
    }
    if (investorid) {
      values.push(investorid);
      query += ` AND d.investorid = $${values.length}`;
    }
    if (producersid) {
      values.push(producersid);
      query += ` AND d.producersid = $${values.length}`;
    }

    const { rows } = await pool.query(query, values);
    return rows;
  },
};

module.exports = Document;
