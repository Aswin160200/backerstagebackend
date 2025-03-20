const pool = require("../config/db");

const PartysProject = {
  getAll: async () => {
    try {
      const { rows } = await pool.query("SELECT * FROM partysproject");
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching partys projects", error: error.message };
    }
  },

  getById: async (partysprojectid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM partysproject WHERE partysprojectid = $1", [partysprojectid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Partys Project not found" };
      }
      return rows[0];
    } catch (error) {
      throw error.status ? error : { status: 500, message: "Error fetching partys project", error: error.message };
    }
  },

  getByProjectId: async (projectid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM partysproject WHERE projectid = $1", [projectid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching by project ID", error: error.message };
    }
  },

  getByInvestorId: async (investorid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM partysproject WHERE investorid = $1", [investorid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching by investor ID", error: error.message };
    }
  },

  getByProducerId: async (producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM partysproject WHERE producersid = $1", [producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching by producer ID", error: error.message };
    }
  },

  getByCoProducerId: async (co_producersid) => {
    try {
      const { rows } = await pool.query("SELECT * FROM partysproject WHERE co_producersid = $1", [co_producersid]);
      return rows;
    } catch (error) {
      throw { status: 500, message: "Error fetching by co-producer ID", error: error.message };
    }
  },

    create: async (data) => {
      try {
        const {
          projectid,
          investorid,
          producersid,
          co_producersid,
          projectname,
          investingentityname,
          invesmentmethod,
          interestedamount,
          status,
          finalamount,
          documentreceived,
          investorcommands,
          fundsreceived,
          bonusandperks,
          co_producers,
        } = data;
  
        const query = `
          INSERT INTO partysproject (
            projectid, investorid, producersid, co_producersid, projectname,
            investingentityname, invesmentmethod, interestedamount, status,
            finalamount, documentreceived, investorcommands, fundsreceived,
            bonusandperks, co_producers, createddate, updateddate
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW()
          ) RETURNING *;
        `;
  
        const values = [
          projectid,
          investorid,
          producersid,
          co_producersid,
          projectname,
          investingentityname,
          invesmentmethod,
          interestedamount,
          status,
          finalamount,
          documentreceived,
          investorcommands,
          fundsreceived,
          bonusandperks,
          co_producers,
        ];
  
        const { rows } = await pool.query(query, values);
        return rows[0];
  
      } catch (error) {
        console.error("Database Error:", error); // Log database error
        throw { status: 500, message: "Error inserting partys project", error: error.message };
      }
    },
  
  update: async (partysprojectid, projectData) => {
    try {
      const {
        projectname, investingentityname, invesmentmethod, interestedamount, status, finalamount, 
        documentreceived, investorcommands, fundsreceived, bonusandperks, co_producers, updateddate
      } = projectData;

      const { rows } = await pool.query(
        `UPDATE partysproject 
        SET projectname = $1, investingentityname = $2, invesmentmethod = $3, interestedamount = $4, 
        status = $5, finalamount = $6, documentreceived = $7, investorcommands = $8, fundsreceived = $9, 
        bonusandperks = $10, co_producers = $11, updateddate = NOW()
        WHERE partysprojectid = $12 RETURNING *`,
        [
          projectname, investingentityname, invesmentmethod, interestedamount, status, finalamount, 
          documentreceived, investorcommands, fundsreceived, bonusandperks, co_producers, partysprojectid
        ]
      );

      if (rows.length === 0) {
        throw { status: 404, message: "Partys Project not found" };
      }

      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error updating partys project", error: error.message };
    }
  },

  delete: async (partysprojectid) => {
    try {
      const { rows } = await pool.query("DELETE FROM partysproject WHERE partysprojectid = $1 RETURNING *", [partysprojectid]);
      if (rows.length === 0) {
        throw { status: 404, message: "Partys Project not found" };
      }
      return rows[0];
    } catch (error) {
      throw { status: 500, message: "Error deleting partys project", error: error.message };
    }
  },
};

module.exports = PartysProject;
