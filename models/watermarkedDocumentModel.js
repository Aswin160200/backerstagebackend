const pool = require("../config/db");

const WatermarkedDocument = {
  getAll: async () => {
    const { rows } = await pool.query("SELECT * FROM watermarkeddocument");
    return rows;
  },

  getById: async (watermarkeddocumentid) => {
    const { rows } = await pool.query("SELECT * FROM watermarkeddocument WHERE watermarkeddocumentid = $1", [watermarkeddocumentid]);
    return rows[0];
  },

  getByProjectId: async (projectid) => {
    const { rows } = await pool.query("SELECT * FROM watermarkeddocument WHERE projectid = $1", [projectid]);
    return rows;
  },

  getByProducerId: async (producersid) => {
    const { rows } = await pool.query("SELECT * FROM watermarkeddocument WHERE producersid = $1", [producersid]);
    return rows;
  },

  getByInvestorId: async (investorid) => {
    const { rows } = await pool.query("SELECT * FROM watermarkeddocument WHERE investorid = $1", [investorid]);
    return rows;
  },

  create: async ({ projectid, investorid, producersid, filename, filetype, createddate, updateddate }) => {
    const { rows } = await pool.query(
      "INSERT INTO watermarkeddocument (projectid, investorid, producersid, filename, filetype, createddate, updateddate) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [projectid, investorid, producersid, filename, filetype, createddate, updateddate]
    );
    return rows[0];
  },

  update: async (watermarkeddocumentid, { filename, filetype, updateddate }) => {
    const { rows } = await pool.query(
      "UPDATE watermarkeddocument SET filename = $1, filetype = $2, updateddate = $3 WHERE watermarkeddocumentid = $4 RETURNING *",
      [filename, filetype, updateddate, watermarkeddocumentid]
    );
    return rows[0];
  },

  delete: async (watermarkeddocumentid) => {
    const { rows } = await pool.query("DELETE FROM watermarkeddocument WHERE watermarkeddocumentid = $1 RETURNING *", [watermarkeddocumentid]);
    return rows[0];
  },

  getByFilters: async (projectid, investorid, producersid) => {
    let query = `
      SELECT d.*, p.projectname, u.username AS producername, i.investorname 
      FROM watermarkeddocument d
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

module.exports = WatermarkedDocument;
